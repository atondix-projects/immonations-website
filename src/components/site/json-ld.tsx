type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

/**
 * XSS-safe JSON-LD renderer. Escapes the only HTML-significant character
 * (`<`) inside the JSON payload per Next.js JSON-LD guide.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
