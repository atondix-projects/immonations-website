/**
 * Generates branded, fillable Muster-Widerrufsformular PDFs (print-friendly).
 *
 * Run: node scripts/generate-withdrawal-form-pdf.mjs
 * Output: public/legal/muster-widerrufsformular.pdf
 *         public/legal/model-withdrawal-form.pdf
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PDFDocument, PDFName, PDFString, StandardFonts, rgb } from 'pdf-lib'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'legal')
const logoPath = path.join(root, 'public', 'immonation-logo.png')

const BRAND = rgb(0.067, 0.498, 0.659) // #117fa8 brand-600
const INK = rgb(0.12, 0.14, 0.16)
const MUTED = rgb(0.42, 0.45, 0.48)
const BORDER = rgb(0.72, 0.74, 0.76)
const RULE = rgb(0.82, 0.84, 0.86)
const WHITE = rgb(1, 1, 1)

const A4 = { width: 595.28, height: 841.89 }
const MARGIN_X = 56
const CONTENT_WIDTH = A4.width - MARGIN_X * 2

/** @typedef {{
 *  locale: 'de' | 'en'
 *  filename: string
 *  title: string
 *  instruction: string
 *  recipient: string
 *  declaration: string
 *  orderedReceived: string
 *  consumerName: string
 *  consumerAddress: string
 *  signature: string
 *  date: string
 *  footnote: string
 *  footer: string
 *  fieldTooltip: {
 *    service: string
 *    orderDate: string
 *    name: string
 *    address: string
 *    signature: string
 *    date: string
 *  }
 * }} FormLocale */

/** @type {FormLocale[]} */
const LOCALES = [
  {
    locale: 'de',
    filename: 'muster-widerrufsformular.pdf',
    title: 'Muster-Widerrufsformular',
    instruction:
      '(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)',
    recipient:
      'An: Immonation GmbH, Nürnberger Straße 18, 90513 Zirndorf, E-Mail: info@immonations.de',
    declaration:
      'Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung:',
    orderedReceived: 'Bestellt am (*) / erhalten am (*):',
    consumerName: 'Name des/der Verbraucher(s):',
    consumerAddress: 'Anschrift des/der Verbraucher(s):',
    signature: 'Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)',
    date: 'Datum:',
    footnote: '(*) Unzutreffendes streichen.',
    footer: 'Immonation GmbH · Nürnberger Straße 18 · 90513 Zirndorf · Stand: Juli 2026',
    fieldTooltip: {
      service: 'Beschreibung der Dienstleistung',
      orderDate: 'Bestellt am / erhalten am',
      name: 'Name des Verbrauchers',
      address: 'Anschrift des Verbrauchers',
      signature: 'Unterschrift',
      date: 'Datum',
    },
  },
  {
    locale: 'en',
    filename: 'model-withdrawal-form.pdf',
    title: 'Model withdrawal form',
    instruction: '(Complete and return this form only if you wish to withdraw from the contract.)',
    recipient:
      'To: Immonation GmbH, Nürnberger Straße 18, 90513 Zirndorf, Email: info@immonations.de',
    declaration:
      'I/We (*) hereby give notice that I/We (*) withdraw from my/our (*) contract for the provision of the following service:',
    orderedReceived: 'Ordered on (*) / received on (*):',
    consumerName: 'Name of consumer(s):',
    consumerAddress: 'Address of consumer(s):',
    signature: 'Signature of consumer(s) (only if this form is notified on paper)',
    date: 'Date:',
    footnote: '(*) Delete as appropriate.',
    footer:
      'Immonation GmbH · Nürnberger Straße 18 · 90513 Zirndorf · As of July 2026 · German version authoritative',
    fieldTooltip: {
      service: 'Description of the service',
      orderDate: 'Ordered on / received on',
      name: 'Name of consumer(s)',
      address: 'Address of consumer(s)',
      signature: 'Signature',
      date: 'Date',
    },
  },
]

/**
 * @param {import('pdf-lib').PDFFont} font
 * @param {string} text
 * @param {number} maxWidth
 * @param {number} size
 */
function wrapText(font, text, maxWidth, size) {
  const words = text.split(/\s+/)
  const lines = []
  let current = ''

  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (font.widthOfTextAtSize(next, size) <= maxWidth) {
      current = next
    } else {
      if (current) lines.push(current)
      current = word
    }
  }
  if (current) lines.push(current)
  return lines
}

/**
 * @param {import('pdf-lib').PDFPage} page
 * @param {import('pdf-lib').PDFFont} font
 * @param {string} text
 * @param {{ x: number, y: number, size: number, color: import('pdf-lib').RGB, maxWidth: number, lineHeight?: number }} opts
 */
function drawWrapped(page, font, text, opts) {
  const lineHeight = opts.lineHeight ?? opts.size * 1.5
  const lines = wrapText(font, text, opts.maxWidth, opts.size)
  let y = opts.y
  for (const line of lines) {
    page.drawText(line, {
      x: opts.x,
      y,
      size: opts.size,
      font,
      color: opts.color,
    })
    y -= lineHeight
  }
  return y
}

/**
 * @param {FormLocale} copy
 */
async function buildPdf(copy) {
  const pdf = await PDFDocument.create()
  pdf.setTitle(copy.title)
  pdf.setAuthor('Immonation GmbH')
  pdf.setSubject(
    copy.locale === 'de'
      ? 'Ausfüllbares Muster-Widerrufsformular'
      : 'Fillable model withdrawal form',
  )
  pdf.setCreator('Immonation Website')
  pdf.setLanguage(copy.locale === 'de' ? 'de-DE' : 'en-GB')
  pdf.setKeywords(['Widerruf', 'withdrawal', 'Immonation', 'Musterformular'])

  const page = pdf.addPage([A4.width, A4.height])
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold)

  const logoBytes = fs.readFileSync(logoPath)
  const logo = await pdf.embedPng(logoBytes)
  const LOGO_HEIGHT = 26
  const logoScale = LOGO_HEIGHT / logo.height
  const logoDims = { width: logo.width * logoScale, height: LOGO_HEIGHT }

  // White page — no tinted panel (print-friendly)
  page.drawRectangle({
    x: 0,
    y: 0,
    width: A4.width,
    height: A4.height,
    color: WHITE,
  })

  // Header: compact logo fully within the page
  const logoTop = A4.height - 36
  page.drawImage(logo, {
    x: MARGIN_X,
    y: logoTop - logoDims.height,
    width: logoDims.width,
    height: logoDims.height,
  })
  page.drawRectangle({
    x: MARGIN_X,
    y: logoTop - logoDims.height - 14,
    width: CONTENT_WIDTH,
    height: 2,
    color: BRAND,
  })

  let y = logoTop - logoDims.height - 42
  const textX = MARGIN_X
  const textW = CONTENT_WIDTH

  page.drawText(copy.title, {
    x: textX,
    y,
    size: 18,
    font: fontBold,
    color: BRAND,
  })
  y -= 20

  y = drawWrapped(page, font, copy.instruction, {
    x: textX,
    y,
    size: 10,
    color: MUTED,
    maxWidth: textW,
  })
  y -= 28

  y = drawWrapped(page, font, copy.recipient, {
    x: textX,
    y,
    size: 11,
    color: INK,
    maxWidth: textW,
  })
  y -= 22

  y = drawWrapped(page, font, copy.declaration, {
    x: textX,
    y,
    size: 11,
    color: INK,
    maxWidth: textW,
  })
  y -= 14

  const form = pdf.getForm()

  /**
   * @param {import('pdf-lib').PDFTextField} field
   * @param {string} tooltip
   * @param {{ x: number, y: number, width: number, height: number, multiline?: boolean }} box
   */
  const addField = (field, tooltip, box) => {
    field.addToPage(page, {
      x: box.x,
      y: box.y,
      width: box.width,
      height: box.height,
      borderWidth: 0.75,
      borderColor: BORDER,
      backgroundColor: WHITE,
      textColor: INK,
    })
    if (box.multiline) field.enableMultiline()
    field.setFontSize(11)
    field.acroField.dict.set(PDFName.of('TU'), PDFString.of(tooltip))
  }

  /**
   * @param {string} label
   * @param {number} labelY
   */
  const drawLabel = (label, labelY) => {
    page.drawText(label, {
      x: textX,
      y: labelY,
      size: 11,
      font,
      color: INK,
    })
  }

  const serviceField = form.createTextField('serviceDescription')
  addField(serviceField, copy.fieldTooltip.service, {
    x: textX,
    y: y - 44,
    width: textW,
    height: 44,
    multiline: true,
  })
  y -= 68

  drawLabel(copy.orderedReceived, y)
  y -= 10
  const orderField = form.createTextField('orderOrReceiptDate')
  addField(orderField, copy.fieldTooltip.orderDate, {
    x: textX,
    y: y - 24,
    width: 260,
    height: 24,
  })
  y -= 48

  drawLabel(copy.consumerName, y)
  y -= 10
  const nameField = form.createTextField('consumerName')
  addField(nameField, copy.fieldTooltip.name, {
    x: textX,
    y: y - 24,
    width: 340,
    height: 24,
  })
  y -= 48

  drawLabel(copy.consumerAddress, y)
  y -= 10
  const addressField = form.createTextField('consumerAddress')
  addField(addressField, copy.fieldTooltip.address, {
    x: textX,
    y: y - 56,
    width: textW,
    height: 56,
    multiline: true,
  })
  y -= 84

  drawLabel(copy.signature, y)
  y -= 10
  const signatureField = form.createTextField('signature')
  addField(signatureField, copy.fieldTooltip.signature, {
    x: textX,
    y: y - 32,
    width: 300,
    height: 32,
  })
  y -= 56

  drawLabel(copy.date, y)
  y -= 10
  const dateField = form.createTextField('withdrawalDate')
  addField(dateField, copy.fieldTooltip.date, {
    x: textX,
    y: y - 24,
    width: 180,
    height: 24,
  })
  y -= 48

  page.drawText(copy.footnote, {
    x: textX,
    y,
    size: 9,
    font,
    color: MUTED,
  })

  // Footer
  page.drawLine({
    start: { x: MARGIN_X, y: 52 },
    end: { x: A4.width - MARGIN_X, y: 52 },
    thickness: 0.6,
    color: RULE,
  })
  page.drawText(copy.footer, {
    x: MARGIN_X,
    y: 28,
    size: 8,
    font,
    color: MUTED,
  })
  page.drawText('immonationgmbh.de', {
    x: A4.width - MARGIN_X - font.widthOfTextAtSize('immonationgmbh.de', 8),
    y: 28,
    size: 8,
    font,
    color: BRAND,
  })

  form.updateFieldAppearances(font)

  const bytes = await pdf.save({ updateFieldAppearances: true })
  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, copy.filename)
  fs.writeFileSync(outPath, bytes)
  console.log(`Wrote ${path.relative(root, outPath)} (${bytes.length} bytes)`)
}

for (const locale of LOCALES) {
  await buildPdf(locale)
}
