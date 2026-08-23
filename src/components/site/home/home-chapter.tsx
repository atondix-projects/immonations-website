import type { ReactNode } from 'react'

export type HomeChapterId =
  | 'hero'
  | 'proof'
  | 'difference'
  | 'process'
  | 'sales-system'
  | 'situations'
  | 'results'
  | 'trust'
  | 'market'
  | 'local'
  | 'guidance'
  | 'company'
  | 'faq'
  | 'next-step'
  | 'contact'

export function HomeChapter({ id, children }: { id: HomeChapterId; children: ReactNode }) {
  return <div data-home-chapter={id}>{children}</div>
}
