import '@testing-library/jest-dom/vitest';

import { beforeAll, vi } from 'vitest';

/**
 * Defines getBoundingClientRect for tip-tap
 * @see https://github.com/jsdom/jsdom/issues/3729
 */
function getBoundingClientRect(): DOMRect {
  const rec = {
    x: 0,
    y: 0,
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  };
  return { ...rec, toJSON: () => rec };
}

class FakeDOMRectList extends Array<DOMRect> implements DOMRectList {
  item(index: number): DOMRect | null {
    return this[index];
  }
}

beforeAll(() => {
  // Ensure HTMLElement and other DOM APIs are available in jsdom environment
  if (typeof HTMLElement !== 'undefined') {
    HTMLElement.prototype.getBoundingClientRect = getBoundingClientRect;
    HTMLElement.prototype.getClientRects = (): DOMRectList =>
      new FakeDOMRectList();
    HTMLElement.prototype.scrollTo = () => undefined;
    HTMLElement.prototype.scrollIntoView = vi.fn();
  }

  if (typeof Range !== 'undefined') {
    Range.prototype.getBoundingClientRect = getBoundingClientRect;
    Range.prototype.getClientRects = (): DOMRectList => new FakeDOMRectList();
  }

  if (typeof document !== 'undefined') {
    document.elementFromPoint = (): null => null;
  }

  if (typeof global !== 'undefined') {
    global.ResizeObserver = class ResizeObserver {
      disconnect = () => null;
      observe = () => null;
      unobserve = () => null;
    };
  }

  if (typeof window !== 'undefined') {
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  }

  Object.defineProperty(global, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

export const setQueriesMock = vi.fn();
export const getFiltersMock = vi.fn();

export const useDeepLinkMock = {
  page: 1,
  size: 10,
  q: '',
  sort: [],
  setQueries: setQueriesMock,
  getFilters: getFiltersMock,
};

const usePaginationMock = {
  onFirstPageButtonClick: vi.fn(),
  onLastPageButtonClick: vi.fn(),
  onNextPageButtonClick: vi.fn(),
  onPrevPageButtonClick: vi.fn(),
  isPrevPageButtonDisabled: false,
  isNextPageButtonDisabled: false,
  isFirstPageButtonDisabled: false,
  isLastPageButtonDisabled: false,
  pageButtons: [1, 2, 3, 4, 5],
  numPages: 10,
};
