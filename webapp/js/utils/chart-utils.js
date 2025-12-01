/**
 * Chart Utilities
 * Helper functions for Chart.js integration
 */

/**
 * Create a Chart.js chart
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {string} type - Chart type (bar, line, pie, doughnut)
 * @param {Object} data - Chart data
 * @param {Object} options - Additional options
 * @returns {Chart} - Chart.js instance
 */
export function createChart(canvas, type, data, options = {}) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        enabled: true
      }
    }
  };

  // Merge options
  const finalOptions = mergeOptions(defaultOptions, options);

  // Add scale options for bar/line charts
  if (type === 'bar' || type === 'line') {
    finalOptions.scales = {
      y: {
        beginAtZero: true
      }
    };
  }

  return new Chart(canvas, {
    type: type,
    data: data,
    options: finalOptions
  });
}

/**
 * Prepare data for charts from Excel data
 * @param {Array} data - Excel data
 * @param {string} labelColumn - Column for labels
 * @param {string} valueColumn - Column for values
 * @param {number} maxRows - Maximum rows to include (default 10)
 * @returns {Object} - Chart.js data object
 */
export function prepareChartData(data, labelColumn, valueColumn, maxRows = 10) {
  // Limit data to maxRows
  const limitedData = data.slice(0, maxRows);

  const labels = limitedData.map(row => String(row[labelColumn] || ''));
  const values = limitedData.map(row => {
    const val = parseFloat(row[valueColumn]);
    return isNaN(val) ? 0 : val;
  });

  return {
    labels: labels,
    datasets: [{
      label: valueColumn,
      data: values,
      backgroundColor: generateColors(values.length, 0.8),
      borderColor: generateColors(values.length, 1),
      borderWidth: 1
    }]
  };
}

/**
 * Prepare data for multi-series charts
 * @param {Array} data - Excel data
 * @param {string} labelColumn - Column for labels
 * @param {Array} valueColumns - Array of column names for values
 * @param {number} maxRows - Maximum rows to include
 * @returns {Object} - Chart.js data object
 */
export function prepareMultiSeriesChartData(data, labelColumn, valueColumns, maxRows = 10) {
  const limitedData = data.slice(0, maxRows);
  const labels = limitedData.map(row => String(row[labelColumn] || ''));

  const datasets = valueColumns.map((col, index) => {
    const values = limitedData.map(row => {
      const val = parseFloat(row[col]);
      return isNaN(val) ? 0 : val;
    });

    const colors = getSAPColors();
    const color = colors[index % colors.length];

    return {
      label: col,
      data: values,
      backgroundColor: `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.8)`,
      borderColor: `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`,
      borderWidth: 1
    };
  });

  return {
    labels: labels,
    datasets: datasets
  };
}

/**
 * Generate array of colors using SAP theme palette
 * @param {number} count - Number of colors needed
 * @param {number} alpha - Opacity (0-1)
 * @returns {Array} - Array of rgba color strings
 */
function generateColors(count, alpha = 0.8) {
  const baseColors = getSAPColors();
  const colors = [];

  for (let i = 0; i < count; i++) {
    const [r, g, b] = baseColors[i % baseColors.length];
    colors.push(`rgba(${r}, ${g}, ${b}, ${alpha})`);
  }

  return colors;
}

/**
 * Get SAP Fiori color palette
 * @returns {Array} - Array of [r, g, b] values
 */
function getSAPColors() {
  return [
    [8, 84, 160],     // SAP Blue
    [16, 126, 62],    // SAP Green
    [226, 104, 0],    // SAP Orange
    [187, 0, 0],      // SAP Red
    [145, 0, 123],    // SAP Purple
    [0, 143, 211],    // SAP Light Blue
    [224, 170, 0],    // SAP Yellow
    [106, 109, 112]   // SAP Grey
  ];
}

/**
 * Destroy chart instance if exists
 * @param {Chart} chart - Chart.js instance
 */
export function destroyChart(chart) {
  if (chart && typeof chart.destroy === 'function') {
    chart.destroy();
  }
}

/**
 * Destroy multiple chart instances
 * @param {Object} charts - Object containing chart instances
 */
export function destroyAllCharts(charts) {
  Object.values(charts).forEach(chart => {
    destroyChart(chart);
  });
}

/**
 * Get best columns for charting
 * @param {Object} metrics - Metrics object from data processor
 * @returns {Object} - {labelColumn, valueColumn}
 */
export function getBestChartColumns(metrics) {
  if (!metrics || !metrics.columns || metrics.columns.length === 0) {
    return { labelColumn: null, valueColumn: null };
  }

  // First column as label (usually ID or name)
  const labelColumn = metrics.columns[0];

  // First numeric column as value
  const numericColumns = Object.keys(metrics.numericColumns);
  const valueColumn = numericColumns.length > 0 ? numericColumns[0] : metrics.columns[1];

  return { labelColumn, valueColumn };
}

/**
 * Merge options objects (deep merge)
 * @param {Object} defaults - Default options
 * @param {Object} custom - Custom options
 * @returns {Object} - Merged options
 */
function mergeOptions(defaults, custom) {
  const result = { ...defaults };

  Object.keys(custom).forEach(key => {
    if (custom[key] && typeof custom[key] === 'object' && !Array.isArray(custom[key])) {
      result[key] = mergeOptions(result[key] || {}, custom[key]);
    } else {
      result[key] = custom[key];
    }
  });

  return result;
}

/**
 * Update chart data without destroying the chart
 * @param {Chart} chart - Chart.js instance
 * @param {Object} newData - New data object
 */
export function updateChartData(chart, newData) {
  if (!chart) return;

  chart.data.labels = newData.labels;
  chart.data.datasets = newData.datasets;
  chart.update();
}
