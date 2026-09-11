# onOffice-Betrieb und Freigaben

## Serverkonfiguration

Die Integration verwendet ausschließlich serverseitige Variablen:

- `ONOFFICE_API_TOKEN`
- `ONOFFICE_API_SECRET`
- `ONOFFICE_API_URL` (Standard: `https://api.onoffice.de/api/stable/api.php`)

Token und Secret dürfen nie mit `NEXT_PUBLIC_` beginnen oder in Git committed werden. Die Authentifizierung folgt HMAC v2 aus der [offiziellen onOffice-Dokumentation](https://apidoc.onoffice.de/onoffice-api-request/request-elemente/action/).

## Objektbestand

- Die Website fragt maximal 24 veröffentlichte Objekte mit `cache: no-store` ab.
- `status = 1` wird als veröffentlicht akzeptiert; das zusätzliche onOffice-Feld `reserviert` unterscheidet `available` und `reserved`.
- Nicht veröffentlichte, verkaufte oder entfernte Datensätze werden nicht in das öffentliche Listing-Modell übernommen.
- Bilder werden gesammelt über die offizielle Aktion `estatepictures` mit `publicationSetting: Homepage` gelesen. Damit gelangen nur Dateien in die Website, deren Veröffentlichung für die eigene Homepage/API freigegeben ist.
- Die dynamische Sitemap ergänzt die lokalisierten Detail-URLs der aktuell vom Provider gelieferten Objekte und lässt Providerfehler ohne falsche Einträge auslaufen.
- Ohne Konfiguration, bei leerem Bestand, Timeout oder Providerfehler erscheinen getrennte ehrliche Zustände. Demoobjekte werden nicht zugemischt.

Vor Produktionsfreigabe muss Immonation das konkrete Statusmapping im eigenen onOffice-Mandanten bestätigen, da kundenspezifische Felder und Schlüssel abweichen können.

## Kontakt- und Bewertungsleads

Beide Formulare erzeugen einen onOffice-Adressdatensatz. Bewertungsdaten werden mit dem vorhandenen Feldmapping als strukturierte Objektdaten in der Lead-Notiz übergeben. Erfolg erscheint erst, wenn onOffice eine Datensatz-ID zurückgegeben hat.

Die Route-Handler prüfen:

- Same-Origin,
- maximal 64 KiB Nutzlast,
- Honeypot,
- Rate-Limit von fünf Anfragen je zehn Minuten und IP/Route,
- Pflichtfelder, E-Mail-Format und Einwilligung,
- getrennte Fehler für `invalid`, `blocked`, `limited`, `not_configured` und `provider_error`.

Der Client verhindert parallele Doppelklick-Übertragungen. Ein Reload sendet den Fetch nicht erneut.

## Offene organisatorische Freigaben

- Verantwortliche onOffice-Zuständigkeit und internes Routing festlegen.
- Aufbewahrungs- und Löschfrist für Kontakt- und Bewertungsleads freigeben und in der Datenschutzerklärung abbilden.
- Zwei eindeutig markierte Testleads aus Kontakt und Bewertung im Zielmandanten bestätigen.
- Objektstichprobe einschließlich Titel, Status, Preis, Ort, Bildern und Detail-URL gegen onOffice abnehmen.
