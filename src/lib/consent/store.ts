export type ConsentChoice = 'all' | 'necessary'

const STORAGE_KEY = 'immonation.consent.v1'

const listeners = new Set<() => void>()

/**
 * Rückfallebene, wenn `localStorage` blockiert ist (Private Mode, Browser-Regel):
 * Die Auswahl gilt dann nur für die laufende Sitzung.
 */
let sessionChoice: ConsentChoice | null = null

function isConsentChoice(value: string | null): value is ConsentChoice {
  return value === 'all' || value === 'necessary'
}

export function subscribeToConsent(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange)
  // Hält parallele Tabs derselben Website synchron.
  window.addEventListener('storage', onStoreChange)

  return () => {
    listeners.delete(onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

export function getConsentSnapshot(): ConsentChoice | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isConsentChoice(stored)) return stored
  } catch {
    // Storage nicht verfügbar — auf die Sitzungsauswahl zurückfallen.
  }
  return sessionChoice
}

/**
 * Serverseitig ist die Auswahl unbekannt. Bewusst `null`, damit nie
 * eingebetteter Drittanbieter-Inhalt vorgerendert wird.
 */
export function getServerConsentSnapshot(): ConsentChoice | null {
  return null
}

export function storeConsentChoice(choice: ConsentChoice): void {
  sessionChoice = choice

  try {
    window.localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    // Ohne Storage bleibt die Auswahl in `sessionChoice` erhalten.
  }

  listeners.forEach((listener) => listener())
}
