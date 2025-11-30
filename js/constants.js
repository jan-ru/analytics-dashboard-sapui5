/**
 * Application Constants
 * Centralized configuration for routes, colors, timing, and other magic values
 */

// ============================================================================
// ROUTES
// ============================================================================

export const ROUTES = {
  HOME: '/',
  UPLOAD: '/upload',
  DASHBOARD: '/dashboard',
  CHART_TYPES: '/chart-types',
  TILES: '/tiles',
  UI5_COMPONENTS: '/ui5-components',
  SAP_ICONS: '/sap-icons',
  SAP_COLORS: '/sap-colors',
  DATA: '/data',
  ABOUT: '/about'
};

// ============================================================================
// SAP FIORI COLORS
// ============================================================================

export const SAP_COLORS = {
  BLUE: '#0854a0',
  BLUE_DARK: '#064080',
  BLUE_LIGHT: '#e3f2fd',
  GREEN: '#107e3e',
  GREEN_LIGHT: '#e8f5e9',
  ORANGE: '#e26800',
  ORANGE_LIGHT: '#fff3e0',
  RED: '#bb0000',
  RED_LIGHT: '#ffebee',
  PURPLE: '#91007b',
  PURPLE_LIGHT: '#f3e5f5',
  GRAY: '#666',
  GRAY_LIGHT: '#999',
  GRAY_LIGHTER: '#f5f5f5',
  BORDER: '#ddd'
};

// ============================================================================
// TILE CLASSES
// ============================================================================

export const TILE_CLASSES = {
  BASE: 'sap-tile',
  ANALYTICAL: 'analytical',
  NUMERIC_CONTENT: 'numeric-content',
  GENERIC: '',
  FEED: 'feed',
  SLIDE: 'slide',
  COMPARISON: 'comparison',
  MICRO_CHART: 'micro-chart',
  ACTION: 'action',
  // Color modifiers
  GREEN: 'tile-green',
  ORANGE: 'tile-orange',
  RED: 'tile-red',
  PURPLE: 'tile-purple',
  BLUE: 'tile-blue'
};

// ============================================================================
// TIMING (milliseconds)
// ============================================================================

export const TIMING = {
  SLIDE_ROTATION: 3000,        // Slide tile auto-rotation interval
  VIEW_INIT_DELAY: 100,        // Delay before initializing view handlers
  TOAST_DURATION: 3000,        // Toast notification display duration
  TOAST_FADE_DURATION: 300,   // Toast fade out animation duration
  DEBOUNCE_DELAY: 300          // Input debounce delay
};

// ============================================================================
// FILE UPLOAD
// ============================================================================

export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024,  // 10MB in bytes
  ALLOWED_EXTENSIONS: ['.xlsx', '.xls'],
  ALLOWED_MIME_TYPES: [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel'
  ]
};

// ============================================================================
// DATA DISPLAY
// ============================================================================

export const DATA_DISPLAY = {
  CHART_DATA_LIMIT: 10,        // Number of records to show in charts
  TABLE_PAGE_SIZE: 50,         // Default table pagination size
  MAX_NUMERIC_COLUMNS: 5       // Max numeric columns to show in summary
};

// ============================================================================
// NUMBER FORMATTING
// ============================================================================

export const NUMBER_FORMAT = {
  MILLION_THRESHOLD: 1000000,
  THOUSAND_THRESHOLD: 1000,
  MILLION_SUFFIX: 'M',
  THOUSAND_SUFFIX: 'K',
  DECIMAL_PLACES: 1
};

// ============================================================================
// TREND THRESHOLDS
// ============================================================================

export const TREND = {
  HIGH_THRESHOLD: 0.7,   // Above 70% of max = upward trend
  LOW_THRESHOLD: 0.3,    // Below 30% of max = downward trend
  ICONS: {
    UP: '📈',
    NEUTRAL: '📊',
    DOWN: '📉'
  }
};

// ============================================================================
// MESSAGES
// ============================================================================

export const MESSAGES = {
  NO_DATA: 'No data available. Please upload an Excel file first.',
  UPLOAD_REQUIRED: 'Please upload a file first',
  EXPORT_SUCCESS: 'Data exported successfully!',
  EXPORT_FAILED: 'Export failed',
  FILE_PROCESSING: 'Processing...',
  INVALID_FILE_TYPE: 'Invalid file type. Please upload .xlsx or .xls files.',
  FILE_TOO_LARGE: 'File size exceeds 10MB limit.',
  NO_NUMERIC_COLUMNS: 'No numeric columns detected'
};

// ============================================================================
// CHART TYPES
// ============================================================================

export const CHART_TYPES = {
  BAR: 'bar',
  LINE: 'line',
  PIE: 'pie',
  DOUGHNUT: 'doughnut'
};

// ============================================================================
// UI ELEMENTS
// ============================================================================

export const UI = {
  CONTENT_ID: 'content',
  SIDEBAR_CLASS: 'sidebar',
  NAV_ITEM_CLASS: 'nav-item',
  NAV_ITEM_ACTIVE_CLASS: 'active',
  CARD_CLASS: 'card',
  MESSAGE_ERROR_CLASS: 'message message-error',
  MESSAGE_INFO_CLASS: 'message message-info',
  MESSAGE_SUCCESS_CLASS: 'message message-success'
};

// ============================================================================
// DATA ACTIONS
// ============================================================================

export const DATA_ACTIONS = {
  OVERVIEW: 'overview',
  DATA_TABLE: 'data-table',
  COLUMNS: 'columns',
  METRIC: 'metric',
  UPLOAD: 'upload'
};

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1440
};

// ============================================================================
// SLIDE TILE CONFIGURATION
// ============================================================================

export const SLIDE_CONFIG = {
  SLIDES: [
    { header: 'TODAY', key: 'today' },
    { header: 'THIS WEEK', key: 'week' },
    { header: 'THIS MONTH', key: 'month' }
  ],
  SLIDE_COUNT: 3
};

// ============================================================================
// TOAST NOTIFICATION TYPES
// ============================================================================

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};

// ============================================================================
// ICONS (Emojis)
// ============================================================================

export const ICONS = {
  UPLOAD: '📤',
  DOWNLOAD: '📥',
  CHART: '📊',
  TILES: '🎨',
  DATA: '📋',
  INFO: 'ℹ️',
  CHECKMARK: '✅',
  FILE: '📁',
  SETTINGS: '⚙️',
  SAVE: '💾',
  DASHBOARD: '📈',
  NUMBERS: '🔢'
};
