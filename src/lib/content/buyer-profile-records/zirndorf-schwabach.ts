import type { BuyerProfileRecord } from '../buyer-profiles'
import { d, t } from './shared'

/** Suchprofile für Zirndorf — zusammen decken sie alle 8 Zirndorfer Stadtteilseiten ab. */
export const ZIRNDORF_PROFILES: readonly BuyerProfileRecord[] = [
  {
    id: 'zir-01',
    city: 'zirndorf',
    districts: [
      d('weiherhof', 'Weiherhof'),
      d('wintersdorf', 'Wintersdorf'),
      d('bronnamberg', 'Bronnamberg'),
    ],
    segment: 'family',
    propertyType: 'house',
    budgetMax: 520_000,
    roomsMin: 4,
    areaMin: 110,
    financing: 'checked',
    headline: t(
      'Junge Familie sucht Reihenhaus in den Zirndorfer Ortsteilen',
      'Young family looking for a terraced house around Zirndorf',
    ),
    brief: t(
      'Im Landkreis aufgewachsen, jetzt mit eigenem Nachwuchs zurück. Ein Reihenhaus mit kleinem Garten wäre ideal.',
      'Grew up in the district and are now returning with a child of their own. A terraced house with a small garden would be ideal.',
    ),
    wishes: [
      t('kleiner Garten', 'Small garden'),
      t('Kita im Ort', 'Nursery nearby'),
      t('Busanbindung nach Fürth', 'Bus connection to Fürth'),
    ],
  },
  {
    id: 'zir-02',
    city: 'zirndorf',
    districts: [d('zirndorf-stadt', 'Zirndorf Stadt'), d('leichendorf', 'Leichendorf')],
    segment: 'retirees',
    propertyType: 'apartment',
    budgetMax: 310_000,
    roomsMin: 2,
    areaMin: 65,
    financing: 'cash',
    headline: t(
      'Ehepaar sucht kleinere Wohnung in Zirndorf',
      'Married couple looking to downsize in Zirndorf',
    ),
    brief: t(
      'Nach über 30 Jahren im eigenen Haus sollen es weniger Treppen sein – aber im gewohnten Umfeld, nah an Ärzten und Einkauf.',
      'After more than 30 years in their own house they want fewer stairs – but in familiar surroundings close to doctors and shops.',
    ),
    wishes: [
      t('Erdgeschoss oder Aufzug', 'Ground floor or lift'),
      t('Stellplatz', 'Parking space'),
      t('flexible Übergabe', 'Flexible handover'),
    ],
  },
  {
    id: 'zir-03',
    city: 'zirndorf',
    districts: [d('anwanden', 'Anwanden'), d('banderbach', 'Banderbach'), d('lind', 'Lind')],
    segment: 'developer',
    propertyType: 'land',
    budgetMax: 1_200_000,
    areaMin: 800,
    financing: 'equity',
    headline: t(
      'Bauträger sucht Grundstück für Doppelhäuser',
      'Developer looking for a plot for semi-detached homes',
    ),
    brief: t(
      'Regionaler Bauträger mit eigener Planung. Auch Grundstücke mit Altbestand kommen infrage, der Rückbau wird übernommen.',
      'A regional developer with in-house planning. Plots with existing buildings are also considered; demolition is taken care of.',
    ),
    wishes: [
      t('Baurecht vorhanden oder absehbar', 'Planning permission in place or likely'),
      t('Altbestand möglich', 'Existing building acceptable'),
      t('Kauf ohne Finanzierungsvorbehalt', 'No financing condition'),
    ],
  },
]

/** Suchprofile für Schwabach — zusammen decken sie alle 7 Schwabacher Stadtteilseiten ab. */
export const SCHWABACH_PROFILES: readonly BuyerProfileRecord[] = [
  {
    id: 'swa-01',
    city: 'schwabach',
    districts: [
      d('limbach', 'Limbach'),
      d('wolkersdorf', 'Wolkersdorf'),
      d('penzendorf', 'Penzendorf'),
    ],
    segment: 'family',
    propertyType: 'house',
    budgetMax: 690_000,
    roomsMin: 5,
    areaMin: 140,
    financing: 'checked',
    headline: t(
      'Familie sucht Einfamilienhaus mit großem Garten',
      'Family looking for a detached house with a large garden',
    ),
    brief: t(
      'Beide arbeiten im Nürnberger Süden und wünschen sich mehr Platz im Grünen – Schwabach ist die bewusste Wahl.',
      'Both work in southern Nuremberg and want more space and greenery – Schwabach is a deliberate choice.',
    ),
    wishes: [
      t('Grundstück ab 500 m²', 'Plot of 500 m² or more'),
      t('Doppelgarage', 'Double garage'),
      t('S-Bahn nach Nürnberg', 'S-Bahn to Nuremberg'),
    ],
  },
  {
    id: 'swa-02',
    city: 'schwabach',
    districts: [d('altstadt', 'Altstadt'), d('forsthof', 'Forsthof')],
    segment: 'investor',
    propertyType: 'multi-family',
    budgetMax: 1_400_000,
    financing: 'equity',
    headline: t(
      'Investor sucht Wohn- und Geschäftshaus in der Altstadt',
      'Investor looking for a mixed-use building in the old town',
    ),
    brief: t(
      'Family Office aus der Region mit Fokus auf Bestandsimmobilien. Gewerbe im Erdgeschoss ist erwünscht, Denkmalschutz kein Ausschlussgrund.',
      'A regional family office focused on existing buildings. A ground-floor shop is welcome; listed status is no obstacle.',
    ),
    wishes: [
      t('Gewerbe im Erdgeschoss', 'Ground-floor commercial unit'),
      t('Denkmalschutz möglich', 'Listed building acceptable'),
      t('Abwicklung ohne Inserat', 'Transaction without a public listing'),
    ],
  },
  {
    id: 'swa-03',
    city: 'schwabach',
    districts: [d('unterreichenbach', 'Unterreichenbach'), d('dietersdorf', 'Dietersdorf')],
    segment: 'retirees',
    propertyType: 'house',
    budgetMax: 520_000,
    roomsMin: 3,
    areaMin: 100,
    financing: 'equity',
    headline: t(
      'Paar im Ruhestand sucht ebenerdigen Bungalow',
      'Retired couple looking for a single-storey bungalow',
    ),
    brief: t(
      'Treppen werden zur Last, der Garten soll bleiben. Ein Bungalow oder ein Haus mit Schlafzimmer im Erdgeschoss wäre ideal.',
      'Stairs are becoming a burden, but the garden should stay. A bungalow or a house with a ground-floor bedroom would be ideal.',
    ),
    wishes: [
      t('ebenerdig wohnen', 'Single-level living'),
      t('pflegeleichter Garten', 'Low-maintenance garden'),
      t('Arzt und Einkauf in der Nähe', 'Doctor and shops nearby'),
    ],
  },
]
