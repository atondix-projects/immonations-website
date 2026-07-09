declare module 'page-flip' {
  export class PageFlip {
    constructor(element: HTMLElement, settings: Record<string, boolean | number | string>)
    destroy(): void
    update(): void
    loadFromImages(images: string[]): void
    loadFromHTML(items: HTMLElement[]): void
    flipNext(corner?: 'top' | 'bottom'): void
    flipPrev(corner?: 'top' | 'bottom'): void
    flip(page: number, corner?: 'top' | 'bottom'): void
    turnToPage(page: number): void
    getCurrentPageIndex(): number
    getOrientation(): 'portrait' | 'landscape'
    on(event: string, callback: (event: { data: number | string | boolean | object }) => void): void
  }
}
