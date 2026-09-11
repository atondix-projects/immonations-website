import type { Locale } from '@/i18n/routing'
import type { BuyerProfileBoardLabels } from './buyer-profile-board'
import type { DistrictDemandCopy } from './district-demand'

type BuyerSearchCopy = {
  profiles: { eyebrow: string; title: string }
  board: BuyerProfileBoardLabels
  districts: DistrictDemandCopy
  /** Abschnitt auf den Stadtteilseiten; `{district}` wird durch den Stadtteilnamen ersetzt. */
  districtPage: { eyebrow: string; title: string; text: string; link: string }
  process: { eyebrow: string; title: string; steps: Array<{ title: string; text: string }> }
  buyers: {
    eyebrow: string
    title: string
    text: string
    checklistTitle: string
    checklist: string[]
    primary: string
    secondary: string
  }
}

export const BUYER_SEARCH_COPY: Record<Locale, BuyerSearchCopy> = {
  de: {
    profiles: {
      eyebrow: 'Aktuelle Suchprofile',
      title: 'Wer gerade in der Region eine Immobilie sucht',
    },
    board: {
      cityGroup: 'Stadt',
      typeGroup: 'Objektart',
      districtLabel: 'Stadtteil',
      districtPlaceholder: 'z. B. Laufamholz',
      all: 'Alle',
      empty:
        'Für diese Auswahl ist hier gerade kein Suchprofil hinterlegt. Sprechen Sie uns an – wir gleichen Ihre Immobilie mit allen aktuellen Suchaufträgen ab.',
      reset: 'Filter zurücksetzen',
      showAll: 'Alle Suchprofile anzeigen',
      results: '{count} passende Suchprofile',
      wishes: 'Worauf es ankommt',
      districts: 'Gesuchte Lagen',
      cta: 'Meine Immobilie passt',
    },
    districts: {
      eyebrow: 'Nachfrage nach Stadtteil',
      title: 'Suchprofile für jeden Stadtteil der Region',
      text: 'Für jeden Stadtteil in Nürnberg, Fürth, Erlangen, Zirndorf und Schwabach liegen Suchprofile vor. Jeder Stadtteil führt zu seiner eigenen Seite – dort stehen die passenden Suchprofile direkt dabei.',
      cityLink: 'Mehr zu',
      missingTitle: 'Ihre Immobilie liegt im Umland?',
      missingText:
        'Suchaufträge gibt es auch über diese Stadtteile hinaus. Wir gleichen Ihre Immobilie mit allen aktuellen Profilen ab.',
      missingCta: 'Abgleich anfragen',
    },
    districtPage: {
      eyebrow: 'Aktive Suchkunden',
      title: 'Wer gerade in {district} sucht',
      text: 'Diese Suchprofile nennen {district} ausdrücklich als Wunschlage. Passt Ihre Immobilie, stimmen wir den Kontakt mit Ihnen ab – diskret und erst nach Ihrer Freigabe.',
      link: 'Alle Suchprofile ansehen',
    },
    process: {
      eyebrow: 'So funktioniert der Abgleich',
      title: 'Vom Suchprofil zum passenden Gespräch',
      steps: [
        {
          title: 'Profil verstehen',
          text: 'Objektart, Lage, Budget und Zeitplan werden mit Ihrer Immobilie abgeglichen.',
        },
        {
          title: 'Interesse prüfen',
          text: 'Wir klären, ob die Anfrage ernsthaft ist und zum Objekt passt.',
        },
        {
          title: 'Kontakt abstimmen',
          text: 'Sie entscheiden, welche Informationen und welcher nächste Schritt freigegeben werden.',
        },
      ],
    },
    buyers: {
      eyebrow: 'Für Kaufinteressenten',
      title: 'Sie suchen selbst? Hinterlegen Sie Ihren Suchwunsch.',
      text: 'Wer seinen Suchwunsch konkret beschreibt, kann früh von passenden Objekten erfahren – auf Wunsch der Eigentümer auch vor einer öffentlichen Vermarktung.',
      checklistTitle: 'Das hilft uns beim Abgleich',
      checklist: [
        'Objektart, Größe und Zimmerzahl',
        'Wunschlagen oder Stadtteile',
        'Budget und Stand der Finanzierung',
        'Zeitplan für Kauf und Einzug',
        'Was unverzichtbar ist – und was nicht',
      ],
      primary: 'Suchwunsch mitteilen',
      secondary: 'Aktuelle Angebote ansehen',
    },
  },
  en: {
    profiles: {
      eyebrow: 'Current search profiles',
      title: 'Who is looking for property in the region right now',
    },
    board: {
      cityGroup: 'Town',
      typeGroup: 'Property type',
      districtLabel: 'District',
      districtPlaceholder: 'e.g. Laufamholz',
      all: 'All',
      empty:
        'No search profile is listed here for this selection right now. Get in touch and we will match your property against all current search requests.',
      reset: 'Reset filters',
      showAll: 'Show all search profiles',
      results: '{count} matching search profiles',
      wishes: 'What matters',
      districts: 'Preferred areas',
      cta: 'My property fits',
    },
    districts: {
      eyebrow: 'Demand by district',
      title: 'Search profiles for every district in the region',
      text: 'There are search profiles for every district of Nuremberg, Fürth, Erlangen, Zirndorf, and Schwabach. Each district links to its own page, where the matching profiles are listed.',
      cityLink: 'More on',
      missingTitle: 'Is your property outside these districts?',
      missingText:
        'Search requests reach beyond these districts too. We match your property against every current profile.',
      missingCta: 'Request a match',
    },
    districtPage: {
      eyebrow: 'Active buyers',
      title: 'Who is looking in {district} right now',
      text: 'These search profiles name {district} as a preferred location. If your property fits, we agree the contact with you – discreetly and only with your approval.',
      link: 'View all search profiles',
    },
    process: {
      eyebrow: 'How the match works',
      title: 'From a search profile to the right conversation',
      steps: [
        {
          title: 'Understand the profile',
          text: 'We match property type, location, budget, and timing with your property.',
        },
        {
          title: 'Check the interest',
          text: 'We clarify whether the enquiry is serious and fits the property.',
        },
        {
          title: 'Agree the contact',
          text: 'You decide which information and next step are approved.',
        },
      ],
    },
    buyers: {
      eyebrow: 'For buyers',
      title: 'Looking yourself? Leave your search with us.',
      text: 'Buyers who describe their search specifically can hear about suitable properties early – where the owner agrees, even before any public marketing.',
      checklistTitle: 'What helps us match',
      checklist: [
        'Property type, size, and number of rooms',
        'Preferred towns or districts',
        'Budget and financing status',
        'Timing for purchase and move-in',
        'What is essential – and what is not',
      ],
      primary: 'Share your search',
      secondary: 'View current listings',
    },
  },
}
