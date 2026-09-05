/**
 * Holt das echte Vorschaubild jedes Social-Beitrags und legt es lokal ab.
 *
 * Warum überhaupt herunterladen statt direkt einzubinden?
 *
 * 1. **Datenschutz.** Ein `<img src="https://p16-…tiktokcdn-eu.com/…">` überträgt
 *    die IP-Adresse jedes Besuchers an die Plattform, bevor irgendjemand
 *    zugestimmt hat — genau das, was die Zwei-Klick-Lösung verhindern soll.
 * 2. **Haltbarkeit.** Die CDN-Links sind signiert und laufen ab: TikTok hängt
 *    `x-expires` an, Instagram `oe=`. Ein direkt eingebundenes Bild wäre nach
 *    Tagen ein toter Platzhalter.
 *
 * Das Ergebnis liegt unter `public/images/social/` und wird über `next/image`
 * ausgeliefert (dort entsteht auch das WebP — deshalb braucht dieses Skript
 * kein ImageMagick).
 *
 * Aufruf: `pnpm social:thumbnails`
 *
 * Die Quellen je Plattform, alle ohne Zugangsdaten erreichbar:
 * - TikTok    → oEmbed (`https://www.tiktok.com/oembed?url=…`), Feld `thumbnail_url`
 * - YouTube   → `https://i.ytimg.com/vi/<id>/oardefault.jpg` liefert das echte
 *               Hochformat eines Shorts (1080×1920). `maxresdefault` wäre 16:9
 *               mit schwarzen Balken, deshalb nur als Rückfallebene.
 * - Instagram → das Einbett-Dokument selbst; darin steht `class="EmbeddedMediaImage"`
 *               mit der Bild-URL. Der offizielle oEmbed-Weg liefert seit der
 *               Umstellung kein `thumbnail_url` mehr und verlangt ein App-Token.
 *
 * Warum Instagram über `curl` statt über `fetch` geholt wird: Instagram erkennt
 * den TLS-Fingerabdruck von Nodes undici und antwortet darauf mit
 * `X-Frame-Options: DENY` und einem Dokument ohne Bild. Derselbe Aufruf über
 * `curl` liefert den echten Beitrag. Im Browser lädt die Einbettung ohnehin
 * (nachgewiesen über die `MOUNTED`-postMessage der Instagram-Einbettung) — die
 * Sperre trifft nur automatisierte Clients, nicht die Website.
 *
 * Wichtig: Titel der Plattformen werden bewusst *nicht* übernommen. Der
 * YouTube-Titel nennt die Straße („… Bürgermeister-Keckl-Straße …"); die
 * Beschriftung folgt weiterhin dem Referenzdatensatz. Siehe Regel 2 in
 * `src/lib/content/social-channels.ts`.
 */

import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const registryPath = join(root, 'src', 'lib', 'content', 'social-channels.ts')
const outputDir = join(root, 'public', 'images', 'social')
const manifestPath = join(root, 'src', 'lib', 'content', 'social-thumbnails.generated.json')

/** Ein echter Browser-Kontext. Instagram antwortet sonst mit `X-Frame-Options: DENY`. */
const BROWSER_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
}

/** Header, die eine echte iframe-Navigation kennzeichnen. Ohne sie sperrt Instagram. */
const IFRAME_HEADERS = {
  ...BROWSER_HEADERS,
  'Sec-Fetch-Dest': 'iframe',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'cross-site',
  'Upgrade-Insecure-Requests': '1',
}

/**
 * Liest `id`, `platform` und `url` aus dem POSTS-Array der Registry.
 *
 * Bewusst eine Textauswertung statt eines Imports: Die Registry hängt an
 * `@/i18n/routing` und weiteren Pfad-Aliassen, die ein blankes Node-Skript nicht
 * auflöst. Kommt die erwartete Form nicht heraus, bricht das Skript ab, statt
 * stillschweigend zu wenige Beiträge zu holen.
 */
function readPosts() {
  const source = readFileSync(registryPath, 'utf8')
  const start = source.indexOf('const POSTS')
  if (start === -1) throw new Error('POSTS-Array in social-channels.ts nicht gefunden.')
  const body = source.slice(start, source.indexOf('\n]', start))

  const posts = []
  const entry = /id:\s*'([^']+)',\s*\n\s*platform:\s*'([^']+)',\s*\n\s*url:\s*'([^']+)'/g
  let match
  while ((match = entry.exec(body)) !== null) {
    posts.push({ id: match[1], platform: match[2], url: match[3] })
  }

  if (posts.length === 0) throw new Error('Keine Beiträge aus social-channels.ts gelesen.')
  return posts
}

async function fetchText(url, headers) {
  const response = await fetch(url, { headers, redirect: 'follow' })
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} für ${url}`)
  return response.text()
}

/** Wie `fetchText`, aber über `curl` — siehe Kopfkommentar zu Instagram. */
function fetchTextViaCurl(url, headers) {
  const args = ['-sS', '--fail', '--location', '--max-time', '30']
  for (const [name, value] of Object.entries(headers)) args.push('-H', `${name}: ${value}`)
  args.push(url)
  return execFileSync('curl', args, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 })
}

/** `&amp;` → `&`. Die Bild-URL steht als HTML-Attribut im Einbett-Dokument. */
function decodeEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

async function resolveThumbnailUrl(post) {
  if (post.platform === 'tiktok') {
    const json = JSON.parse(
      await fetchText(
        `https://www.tiktok.com/oembed?url=${encodeURIComponent(post.url)}`,
        BROWSER_HEADERS,
      ),
    )
    if (!json.thumbnail_url) throw new Error('oEmbed ohne thumbnail_url')
    return { url: json.thumbnail_url, source: 'tiktok-oembed' }
  }

  if (post.platform === 'youtube') {
    const id =
      /\/(?:shorts|embed)\/([A-Za-z0-9_-]{6,})/.exec(post.url)?.[1] ??
      /[?&]v=([A-Za-z0-9_-]{6,})/.exec(post.url)?.[1]
    if (!id) throw new Error('Keine YouTube-Video-ID in der URL')
    // `oardefault`/`oar2` = original aspect ratio, für Shorts das echte 9:16-Bild.
    // Welche der beiden existiert, ist je Video verschieden (`oardefault` liefert
    // sonst 404), deshalb werden beide probiert.
    // Fehlende Varianten liefern nicht 404, sondern ein graues 120×90-Platzhalterbild
    // mit Status 200 — deshalb wird die Größe geprüft und nicht nur der Status.
    for (const variant of [
      'oardefault',
      'oar2',
      'maxresdefault',
      'hq720',
      'sddefault',
      'hqdefault',
    ]) {
      const url = `https://i.ytimg.com/vi/${id}/${variant}.jpg`
      const response = await fetch(url, { headers: BROWSER_HEADERS })
      if (!response.ok) continue
      const buffer = Buffer.from(await response.arrayBuffer())
      let size
      try {
        size = jpegSize(buffer)
      } catch {
        continue
      }
      if (size.width >= 480 && size.height >= 360 && buffer.length > 15_000) {
        return { url, source: `youtube-${variant}` }
      }
    }
    throw new Error('Kein brauchbares YouTube-Standbild (nur Platzhalter)')
  }

  if (post.platform === 'instagram') {
    const shortcode = /\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/.exec(post.url)?.[1]
    if (!shortcode) throw new Error('Kein Instagram-Shortcode in der URL')
    const html = fetchTextViaCurl(
      `https://www.instagram.com/p/${shortcode}/embed/captioned/`,
      IFRAME_HEADERS,
    )
    const found = /class="EmbeddedMediaImage"[^>]*?src="([^"]+)"/.exec(html)
    if (!found) throw new Error('Kein EmbeddedMediaImage im Einbett-Dokument')
    return { url: decodeEntities(found[1]), source: 'instagram-embed-document' }
  }

  throw new Error(`Plattform ${post.platform} nicht unterstützt`)
}

/** Maße direkt aus dem JPEG-Header — ohne sie kennt der Browser das Seitenverhältnis erst nach dem Laden. */
function jpegSize(buffer) {
  let offset = 2
  while (offset < buffer.length - 9) {
    if (buffer[offset] !== 0xff) {
      offset += 1
      continue
    }
    const marker = buffer[offset + 1]
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2
      continue
    }
    const length = buffer.readUInt16BE(offset + 2)
    const isFrameHeader =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf)
    if (isFrameHeader) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) }
    }
    offset += 2 + length
  }
  throw new Error('JPEG-Maße nicht lesbar')
}

async function main() {
  const posts = readPosts()
  mkdirSync(outputDir, { recursive: true })

  const thumbnails = {}
  const failures = []

  for (const post of posts) {
    try {
      const { url, source } = await resolveThumbnailUrl(post)
      const response = await fetch(url, { headers: BROWSER_HEADERS })
      if (!response.ok) throw new Error(`${response.status} beim Bildabruf`)

      const buffer = Buffer.from(await response.arrayBuffer())
      const { width, height } = jpegSize(buffer)
      const fileName = `${post.id}.jpg`
      writeFileSync(join(outputDir, fileName), buffer)

      thumbnails[post.id] = {
        src: `/images/social/${fileName}`,
        width,
        height,
        source,
        bytes: buffer.length,
      }
      console.log(`✓ ${post.id.padEnd(32)} ${width}×${height}  ${source}`)
    } catch (error) {
      failures.push(`${post.id}: ${error.message}`)
      console.warn(`✗ ${post.id.padEnd(32)} ${error.message}`)
    }
  }

  const manifest = {
    // Kopf der erzeugten Datei — sie wird eingecheckt, damit der Build ohne
    // Netzzugriff auskommt und die Vorschaubilder reproduzierbar bleiben.
    generatedBy: 'scripts/fetch-social-thumbnails.mjs',
    generatedAt: new Date().toISOString().slice(0, 10),
    thumbnails,
  }
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')

  console.log(`\n${Object.keys(thumbnails).length}/${posts.length} Vorschaubilder gespeichert.`)
  if (failures.length > 0) {
    console.warn(`\nFehlgeschlagen:\n${failures.map((line) => `  - ${line}`).join('\n')}`)
    process.exitCode = 1
  }
}

await main()
