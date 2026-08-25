import type { ReactNode } from 'react'

export type HomeChapterId =
  | 'hero'
  | 'proof'
  | 'difference'
  | 'market'
  | 'process'
  | 'sales-system'
  | 'situations'
  | 'results'
  | 'trust'
  | 'local'
  | 'guidance'
  | 'company'
  | 'faq'
  | 'next-step'
  | 'contact'

export function HomeChapter({ id, children }: { id: HomeChapterId; children: ReactNode }) {
  return <div data-home-chapter={id}>{children}</div>
}
