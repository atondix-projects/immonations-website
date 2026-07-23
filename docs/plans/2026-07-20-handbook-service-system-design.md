# Handbook service system

## Intent

Replace the static Premium-Marketing grid with an accessible service selector inspired by the interaction pattern at `von-otto.de/#marketing`. The visual language, copy, proof points, and service model remain original to Immonation and are derived from `Immonation-Handbuch-Verkauf.pdf`.

## Content model

The selector contains ten handbook-derived topics:

1. Verkaufssystem
2. Bewertung
3. Objektaufnahme
4. Grundrisse
5. Foto & Drohne
6. 360°-Rundgang
7. Visualisierung
8. Exposé & Portale
9. Sichtbarkeit
10. Käuferprüfung

Each topic provides a title, explanatory paragraph, short benefit statement, included services, a result statement, and three proof labels. Claims that conflict with other project sources or require live verification are excluded.

## Interaction and layout

- The server component loads locale-specific data and passes serializable content to a focused client component.
- Semantic ARIA tabs support click, arrow keys, Home, and End.
- All panels remain rendered and inactive panels use the `hidden` attribute, preserving the complete handbook content in the document.
- Desktop uses a compact ten-item selector above a two-column detail panel. Mobile uses a two-column selector and a single-column detail panel.
- The existing local Immonation presentation video appears only in the 360° panel. Other panels use an original, data-led service blueprint rather than copied reference imagery.

## Verification

- TypeScript, ESLint, formatting, and production build.
- Desktop and 390 px mobile inspection.
- Keyboard tab switching, active-state semantics, no horizontal overflow, and no console errors.
