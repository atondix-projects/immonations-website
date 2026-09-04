from playwright.sync_api import sync_playwright


BASE = "http://127.0.0.1:3000"


def wait(page, path):
    page.goto(f"{BASE}{path}", wait_until="domcontentloaded", timeout=60000)
    page.wait_for_load_state("networkidle", timeout=60000)


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})

    wait(page, "/de/referenzen")
    cards = page.locator('a[href^="/de/referenzen/"]')
    assert cards.count() == 29, cards.count()
    detail_href = cards.first.get_attribute("href")
    assert detail_href

    page.goto(f"{BASE}{detail_href}", wait_until="domcontentloaded", timeout=60000)
    page.wait_for_load_state("networkidle", timeout=60000)
    assert page.get_by_text("Ausgangslage", exact=True).count() >= 1
    image_alts = page.locator('img').evaluate_all("elements => elements.map(element => element.alt)")
    assert any("Außenansicht" in alt for alt in image_alts)
    assert any("Innenansicht" in alt for alt in image_alts)
    assert any("Detailansicht" in alt for alt in image_alts)

    wait(page, "/de/stadt/nuernberg")
    assert page.locator('a[href^="/de/referenzen/"]').count() == 9

    wait(page, "/de/objekt/nuernberg-st-johannis-3zi")
    assert page.get_by_text("Ähnlich verkauft / lokale Referenz", exact=True).count() == 1
    assert page.get_by_text("Archivierte Referenz", exact=True).count() >= 1

    wait(page, "/de/objektart/wohnung")
    assert page.get_by_text("Passende Referenzobjekte", exact=True).count() == 1

    browser.close()

print("Reference smoke test passed: hub, detail, Nürnberg local page, listing, and seller guide.")
