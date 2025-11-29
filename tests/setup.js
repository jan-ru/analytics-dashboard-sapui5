/**
 * Vitest Test Setup
 * Global setup for all tests
 */

// Mock window.appState
global.window = global.window || {};
window.appState = {
  currentData: null,
  fileName: '',
  sheetNames: [],
  currentSheet: 0,
  filters: {},
  sortColumn: null,
  sortDirection: 'asc',
  metrics: {
    rowCount: 0,
    columnCount: 0,
    numericColumns: {}
  }
};

// Mock DOM elements commonly used
global.document = global.document || {
  getElementById: () => ({
    innerHTML: '',
    appendChild: () => {},
    remove: () => {}
  }),
  createElement: (tag) => ({
    tagName: tag,
    classList: {
      add: () => {},
      remove: () => {},
      toggle: () => {}
    },
    style: {},
    appendChild: () => {},
    remove: () => {}
  }),
  body: {
    appendChild: () => {}
  }
};
