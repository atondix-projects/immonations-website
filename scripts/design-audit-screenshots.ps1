param(
  [string]$OutDir = "output/design-audit/before",
  [string]$BaseUrl = "http://localhost:3000"
)

$pages = @(
  @{ name = "de-home"; path = "/de" },
  @{ name = "de-about"; path = "/de/ueber-uns" },
  @{ name = "de-buy"; path = "/de/immobilie-kaufen" },
  @{ name = "de-careers"; path = "/de/karriere" },
  @{ name = "de-contact"; path = "/de/kontakt" },
  @{ name = "de-downloads"; path = "/de/downloads" },
  @{ name = "de-faq"; path = "/de/faq" },
  @{ name = "de-imprint"; path = "/de/impressum" },
  @{ name = "de-privacy"; path = "/de/datenschutz" },
  @{ name = "de-terms"; path = "/de/agb" },
  @{ name = "de-property-valuation"; path = "/de/immobilienbewertung" },
  @{ name = "de-referrers"; path = "/de/tippgeber" },
  @{ name = "de-blog"; path = "/de/ratgeber" },
  @{ name = "de-services"; path = "/de/leistungen" },
  @{ name = "de-service-initial-consultation"; path = "/de/leistungen/initial-consultation" },
  @{ name = "en-property-valuation"; path = "/en/property-valuation" },
  @{ name = "en-services"; path = "/en/services" }
)

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

foreach ($page in $pages) {
  $url = "$BaseUrl$($page.path)"
  foreach ($kind in @("desktop", "mobile")) {
    $file = Join-Path $OutDir "$($page.name)-$kind.png"
    if ($kind -eq "desktop") {
      npx --yes playwright screenshot $url $file --full-page --viewport-size "1440,900" --browser chromium
    } else {
      npx --yes playwright screenshot $url $file --full-page --viewport-size "390,844" --browser chromium
    }
    Write-Host "saved $file"
  }
}
