/**
 * Data Processor Utility
 * Handles application state management and data transformations
 */

/**
 * Initialize application state
 */
export function initAppState() {
  window.appState = {
    currentData: null,
    fileName: '',
    sheetNames: [],
    currentSheet: 0,
    filters: {},
    sortColumn: null,
    sortDirection: 'asc',
    metrics: null
  };

  console.log('Application state initialized');
}

/**
 * Update application state with new data from Excel file
 * @param {Object} parsedExcel - Output from importExcel function
 */
export function updateAppState(parsedExcel) {
  window.appState.currentData = parsedExcel.data;
  window.appState.fileName = parsedExcel.fileName;
  window.appState.sheetNames = parsedExcel.sheetNames;
  window.appState.currentSheet = 0;

  // Reset filters and sorting
  window.appState.filters = {};
  window.appState.sortColumn = null;
  window.appState.sortDirection = 'asc';

  // Calculate metrics
  window.appState.metrics = calculateMetrics(parsedExcel.data);

  console.log('Application state updated:', {
    fileName: parsedExcel.fileName,
    rowCount: parsedExcel.rowCount,
    columnCount: parsedExcel.columnCount
  });
}

/**
 * Calculate KPI metrics from data
 * @param {Array} data - Array of objects
 * @returns {Object} - Calculated metrics
 */
export function calculateMetrics(data) {
  if (!data || data.length === 0) {
    return {
      rowCount: 0,
      columnCount: 0,
      columns: [],
      numericColumns: {}
    };
  }

  const metrics = {
    rowCount: data.length,
    columnCount: Object.keys(data[0]).length,
    columns: Object.keys(data[0]),
    numericColumns: {}
  };

  // Find numeric columns and calculate statistics
  metrics.columns.forEach(col => {
    const values = data.map(row => row[col]).filter(val => {
      const parsed = parseFloat(val);
      return !isNaN(parsed) && isFinite(parsed);
    });

    if (values.length > 0) {
      const numericValues = values.map(v => parseFloat(v));
      metrics.numericColumns[col] = {
        sum: numericValues.reduce((a, b) => a + b, 0),
        avg: numericValues.reduce((a, b) => a + b, 0) / numericValues.length,
        min: Math.min(...numericValues),
        max: Math.max(...numericValues),
        count: numericValues.length
      };
    }
  });

  return metrics;
}

/**
 * Get filtered and sorted data based on current state
 * @returns {Array} - Processed data
 */
export function getProcessedData() {
  if (!window.appState.currentData) {
    return [];
  }

  let data = [...window.appState.currentData];

  // Apply filters
  Object.keys(window.appState.filters).forEach(column => {
    const filterValue = window.appState.filters[column];
    if (filterValue && filterValue.trim() !== '') {
      const filterLower = filterValue.toLowerCase().trim();
      data = data.filter(row =>
        String(row[column]).toLowerCase().includes(filterLower)
      );
    }
  });

  // Apply sorting
  if (window.appState.sortColumn) {
    const column = window.appState.sortColumn;
    const direction = window.appState.sortDirection;

    data.sort((a, b) => {
      const aVal = a[column];
      const bVal = b[column];

      // Try numeric comparison first
      const aNum = parseFloat(aVal);
      const bNum = parseFloat(bVal);

      if (!isNaN(aNum) && !isNaN(bNum)) {
        return direction === 'asc'
          ? aNum - bNum
          : bNum - aNum;
      }

      // Fall back to string comparison
      const aStr = String(aVal);
      const bStr = String(bVal);

      return direction === 'asc'
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }

  return data;
}

/**
 * Set filter for a specific column
 * @param {string} column - Column name
 * @param {string} value - Filter value
 */
export function setFilter(column, value) {
  window.appState.filters[column] = value;
}

/**
 * Clear all filters
 */
export function clearFilters() {
  window.appState.filters = {};
}

/**
 * Set sort column and direction
 * @param {string} column - Column name to sort by
 */
export function toggleSort(column) {
  if (window.appState.sortColumn === column) {
    // Toggle direction if same column
    window.appState.sortDirection =
      window.appState.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    // New column, default to ascending
    window.appState.sortColumn = column;
    window.appState.sortDirection = 'asc';
  }

  console.log(`Sorting by ${column} (${window.appState.sortDirection})`);
}

/**
 * Clear sorting
 */
export function clearSort() {
  window.appState.sortColumn = null;
  window.appState.sortDirection = 'asc';
}

/**
 * Get current sort state for a column
 * @param {string} column - Column name
 * @returns {string} - 'asc', 'desc', or null
 */
export function getSortDirection(column) {
  if (window.appState.sortColumn === column) {
    return window.appState.sortDirection;
  }
  return null;
}
