import type { BuyerProfileRecord } from '../buyer-profiles'
import { d, t } from './shared'

/** Suchprofile für Fürth — zusammen decken sie alle 15 Fürther Stadtteilseiten ab. */
export const FUERTH_PROFILES: readonly BuyerProfileRecord[] = [
  {
    id: 'fue-01',
    city: 'fuerth',
    districts: [
      d('dambach', 'Dambach'),
      d('burgfarrnbach', 'Burgfarrnbach'),
      d('oberfuerberg', 'Oberfürberg'),
    ],
    segment: 'family',
    propertyType: 'house',
    budgetMax: 650_000,
    roomsMin: 5,
    areaMin: 120,
    financing: 'checked',
    headline: t(
      'Familie sucht Doppelhaushälfte oder Reihenendhaus',
      'Family looking for a semi-detached or end-terrace house',
    ),
    brief: t(
      'Die Wohnung in der Fürther Innenstadt wird zu klein. Die Familie möchte in Fürth bleiben, Kita und Arbeitsplatz liegen im Stadtgebiet.',
      'Their apartment in central Fürth is getting too small. The family wants to stay in Fürth, where nursery and work are.',
    ),
    wishes: [
      t('Garten', 'Garden'),
      t('Stellplatz oder Garage', 'Parking space or garage'),
      t('Einzug innerhalb von sechs Monaten', 'Move-in within six months'),
    ],
  },
  {
    id: 'fue-02',
    city: 'fuerth',
    districts: [
      d('innenstadt', 'Innenstadt'),
      d('hardhoehe', 'Hardhöhe'),
      d('unterfarrnbach', 'Unterfarrnbach'),
    ],
    segment: 'investor',
    propertyType: 'apartment',
    budgetMax: 250_000,
    roomsMin: 2,
    areaMin: 50,
    financing: 'equity',
    headline: t(
      'Kapitalanleger sucht vermietete Eigentumswohnung',
      'Investor looking for a tenanted apartment',
    ),
    brief: t(
      'Aufbau einer Altersvorsorge mit ein bis zwei Wohnungen. Ein laufendes Mietverhältnis ist erwünscht, Rendite geht vor Lage.',
      'Building a retirement portfolio with one or two apartments. An existing tenancy is welcome; yield comes before location.',
    ),
    wishes: [
      t('vermietet', 'Tenanted'),
      t('Unterlagen zu Hausgeld und Rücklage', 'Service-charge and reserve records'),
      t('nachvollziehbarer Kaufpreisfaktor', 'Traceable price-to-rent ratio'),
    ],
  },
  {
    id: 'fue-03',
    city: 'fuerth',
    districts: [d('altstadt', 'Altstadt'), d('suedstadt', 'Südstadt')],
    segment: 'couple',
    propertyType: 'apartment',
    budgetMax: 390_000,
    roomsMin: 3,
    areaMin: 85,
    financing: 'checked',
    headline: t(
      'Pendlerpaar sucht Altbauwohnung nahe der U1',
      'Commuting couple looking for a period apartment near the U1',
    ),
    brief: t(
      'Einer arbeitet in Nürnberg, einer in Fürth. Die Wohnung soll Charakter haben und beide Wege kurz halten.',
      'One works in Nuremberg, the other in Fürth. The apartment should have character and keep both commutes short.',
    ),
    wishes: [
      t('U-Bahn in Laufweite', 'Underground within walking distance'),
      t('Stuck oder Dielenboden', 'Period details or floorboards'),
      t('Platz für ein Arbeitszimmer', 'Room for a study'),
    ],
  },
  {
    id: 'fue-04',
    city: 'fuerth',
    districts: [
      d('stadeln', 'Stadeln'),
      d('vach', 'Vach'),
      d('sack', 'Sack'),
      d('atzenhof', 'Atzenhof'),
    ],
    segment: 'family',
    propertyType: 'house',
    budgetMax: 560_000,
    roomsMin: 5,
    areaMin: 120,
    financing: 'checked',
    headline: t(
      'Familie sucht Haus im Fürther Norden',
      'Family looking for a house in northern Fürth',
    ),
    brief: t(
      'Mehr Platz, weniger Verkehr: Die Familie zieht aus der Fürther Innenstadt an den Stadtrand und sucht ein Haus mit Garten nahe der Regnitz.',
      'More space, less traffic: the family is moving from central Fürth to the edge of town and wants a house with a garden near the Regnitz.',
    ),
    wishes: [
      t('Garten', 'Garden'),
      t('S-Bahn oder Bus nach Fürth', 'S-Bahn or bus into Fürth'),
      t('Einliegerwohnung wäre ideal', 'A granny flat would be ideal'),
    ],
  },
  {
    id: 'fue-05',
    city: 'fuerth',
    districts: [d('poppenreuth', 'Poppenreuth'), d('ronhof', 'Ronhof'), d('espan', 'Espan')],
    segment: 'single',
    propertyType: 'apartment',
    budgetMax: 210_000,
    roomsMin: 2,
    areaMin: 50,
    financing: 'checked',
    headline: t(
      'Single sucht Zweizimmerwohnung im Fürther Norden',
      'Single buyer looking for a two-room apartment in northern Fürth',
    ),
    brief: t(
      'Die erste eigene Wohnung, gern mit Blick ins Grüne. Die Nähe zum Stadtpark und zur U-Bahn wäre ideal.',
      'A first home of their own, ideally with a green view. Being close to the Stadtpark and the underground would be ideal.',
    ),
    wishes: [
      t('Balkon', 'Balcony'),
      t('Stellplatz', 'Parking space'),
      t('bezugsfrei', 'Vacant on completion'),
    ],
  },
]

/** Suchprofile für Erlangen — zusammen decken sie alle 13 Erlanger Stadtteilseiten ab. */
export const ERLANGEN_PROFILES: readonly BuyerProfileRecord[] = [
  {
    id: 'erl-01',
    city: 'erlangen',
    districts: [
      d('buechenbach', 'Büchenbach'),
      d('frauenaurach', 'Frauenaurach'),
      d('tennenlohe', 'Tennenlohe'),
    ],
    segment: 'family',
    propertyType: 'house',
    budgetMax: 950_000,
    roomsMin: 5,
    areaMin: 140,
    financing: 'checked',
    headline: t(
      'Familie aus der Forschung sucht Haus mit Garten',
      'Research family looking for a house with a garden',
    ),
    brief: t(
      'Neue Stelle in Erlangen, Umzug aus München. Gesucht ist ein Haus mit Garten und guter Radanbindung.',
      'A new job in Erlangen and a move from Munich. They want a house with a garden and good cycle links.',
    ),
    wishes: [
      t('Radweg zum Arbeitsplatz', 'Cycle route to work'),
      t('Grundschule in der Nähe', 'Primary school nearby'),
      t('Begleitung auf Englisch erwünscht', 'Support in English welcome'),
    ],
  },
  {
    id: 'erl-02',
    city: 'erlangen',
    districts: [
      d('innenstadt', 'Innenstadt'),
      d('anger', 'Anger'),
      d('roethelheimpark', 'Röthelheimpark'),
    ],
    segment: 'investor',
    propertyType: 'apartment',
    budgetMax: 230_000,
    roomsMin: 1,
    areaMin: 30,
    financing: 'equity',
    headline: t(
      'Eltern suchen Apartment fürs Studium und als Anlage',
      'Parents looking for a studio for university and investment',
    ),
    brief: t(
      'Das Apartment wird während des Studiums selbst genutzt und danach vermietet. Nähe zu Universität und Bahnhof ist entscheidend.',
      'The studio will be lived in during university and let afterwards. Proximity to the university and the station is decisive.',
    ),
    wishes: [
      t('Universität zu Fuß', 'University on foot'),
      t('möbliert möglich', 'Furnished is fine'),
      t('überschaubares Hausgeld', 'Moderate service charge'),
    ],
  },
  {
    id: 'erl-03',
    city: 'erlangen',
    districts: [
      d('sieglitzhof', 'Sieglitzhof'),
      d('alterlangen', 'Alterlangen'),
      d('bruck', 'Bruck'),
    ],
    segment: 'couple',
    propertyType: 'apartment',
    budgetMax: 720_000,
    roomsMin: 3,
    areaMin: 100,
    financing: 'checked',
    headline: t(
      'Paar sucht moderne Wohnung mit Dachterrasse',
      'Couple looking for a modern apartment with a roof terrace',
    ),
    brief: t(
      'Die Kinder sind aus dem Haus, das Haus wird verkauft. Gesucht ist eine helle, moderne Wohnung mit wenig Pflegeaufwand.',
      'The children have left home and the house is being sold. They want a bright, modern apartment with little upkeep.',
    ),
    wishes: [
      t('Dachterrasse oder großer Balkon', 'Roof terrace or large balcony'),
      t('Baujahr ab 2010', 'Built 2010 or later'),
      t('Aufzug', 'Lift'),
    ],
  },
  {
    id: 'erl-04',
    city: 'erlangen',
    districts: [d('dechsendorf', 'Dechsendorf'), d('kosbach', 'Kosbach')],
    segment: 'family',
    propertyType: 'house',
    budgetMax: 780_000,
    roomsMin: 5,
    areaMin: 140,
    financing: 'checked',
    headline: t(
      'Familie sucht Haus im Erlanger Westen',
      'Family looking for a house in western Erlangen',
    ),
    brief: t(
      'Ländliches Umfeld mit Stadtanschluss: Weiher und Felder vor der Tür, Schule und Arbeit trotzdem schnell erreichbar.',
      'A rural setting with city access: ponds and fields on the doorstep, with school and work still close by.',
    ),
    wishes: [
      t('Garten', 'Garden'),
      t('Radweg in die Stadt', 'Cycle route into town'),
      t('Photovoltaik willkommen', 'Solar panels welcome'),
    ],
  },
  {
    id: 'erl-05',
    city: 'erlangen',
    districts: [d('burgberg', 'Burgberg'), d('eltersdorf', 'Eltersdorf')],
    segment: 'retirees',
    propertyType: 'apartment',
    budgetMax: 480_000,
    roomsMin: 3,
    areaMin: 80,
    financing: 'cash',
    headline: t(
      'Ehepaar sucht Wohnung nach dem Hausverkauf',
      'Married couple looking for an apartment after selling their house',
    ),
    brief: t(
      'Das Familienhaus wird verkauft, der Erlös fließt in eine Wohnung. Gesucht sind drei Zimmer, ein Aufzug und ein ruhiger Blick ins Grüne.',
      'The family home is being sold and the proceeds will go into an apartment. They want three rooms, a lift, and a quiet green view.',
    ),
    wishes: [
      t('Aufzug', 'Lift'),
      t('Gästezimmer für die Enkel', 'Guest room for the grandchildren'),
      t('Tiefgarage', 'Underground parking'),
    ],
  },
]
