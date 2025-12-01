/**
 * Chart Types View - Showcase 6 Different Chart Types
 * Displays: Line, Bar, Radar, Doughnut, Polar Area, and Bubble charts
 */

import { MESSAGES, ICONS, TIMING, SAP_COLORS } from '../constants.js';
import { showSuccess, showError } from '../utils/toast.js';

let charts = {};

export function showChartTypesViewSimple() {
  const { currentData, metrics, fileName } = window.appState;

  if (!currentData || !metrics) {
    document.getElementById('content').innerHTML = `
      <div class="card">
        <div class="message message-error">${MESSAGES.NO_DATA}</div>
      </div>
    `;
    return;
  }

  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="toolbar">
      <h2 style="margin: 0;">📊 Chart.js - 6 Chart Types Showcase</h2>
    </div>

    <div class="message message-info">
      Viewing data from: <strong>${fileName}</strong> (${metrics.rowCount} rows, ${metrics.columnCount} columns)
    </div>

    <div class="card">
      <div class="card-header">${ICONS.CHART} Chart Types Overview</div>
      <p style="margin: 1rem 0; color: #666;">
        This page demonstrates 6 different chart types using Chart.js v4.4.0.
        Each chart visualizes the same dataset in different ways to help you understand data patterns.
      </p>
    </div>

    <!-- Chart Grid - 2 columns -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(500px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">

      <!-- 1. Line Chart -->
      <div class="card chart-card">
        <div class="card-header">1. Line Chart</div>
        <p style="margin: 0.5rem 0; color: #666; font-size: 0.875rem;">
          Best for showing trends over time or continuous data
        </p>
        <div class="chart-container">
          <canvas id="lineChartCanvas"></canvas>
        </div>
      </div>

      <!-- 2. Bar Chart -->
      <div class="card chart-card">
        <div class="card-header">2. Bar Chart</div>
        <p style="margin: 0.5rem 0; color: #666; font-size: 0.875rem;">
          Perfect for comparing values across categories
        </p>
        <div class="chart-container">
          <canvas id="barChartCanvas"></canvas>
        </div>
      </div>

      <!-- 3. Radar Chart -->
      <div class="card chart-card">
        <div class="card-header">3. Radar Chart</div>
        <p style="margin: 0.5rem 0; color: #666; font-size: 0.875rem;">
          Ideal for multivariate analysis and comparison
        </p>
        <div class="chart-container">
          <canvas id="radarChartCanvas"></canvas>
        </div>
      </div>

      <!-- 4. Doughnut Chart -->
      <div class="card chart-card">
        <div class="card-header">4. Doughnut Chart</div>
        <p style="margin: 0.5rem 0; color: #666; font-size: 0.875rem;">
          Shows proportions and part-to-whole relationships
        </p>
        <div class="chart-container">
          <canvas id="doughnutChartCanvas"></canvas>
        </div>
      </div>

      <!-- 5. Polar Area Chart -->
      <div class="card chart-card">
        <div class="card-header">5. Polar Area Chart</div>
        <p style="margin: 0.5rem 0; color: #666; font-size: 0.875rem;">
          Similar to pie chart but with variable radius
        </p>
        <div class="chart-container">
          <canvas id="polarChartCanvas"></canvas>
        </div>
      </div>

      <!-- 6. Bubble Chart -->
      <div class="card chart-card">
        <div class="card-header">6. Bubble Chart</div>
        <p style="margin: 0.5rem 0; color: #666; font-size: 0.875rem;">
          Displays three dimensions of data (x, y, radius)
        </p>
        <div class="chart-container">
          <canvas id="bubbleChartCanvas"></canvas>
        </div>
      </div>

    </div>

    <!-- Chart Information -->
    <div class="card" style="margin-top: 1.5rem;">
      <div class="card-header">Chart Type Comparison</div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-top: 1rem;">
        <div>
          <strong>Line Chart</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.875rem;">
            Use Case: Time series, trends, continuous data<br>
            Best For: Showing change over time, comparing multiple series
          </p>
        </div>
        <div>
          <strong>Bar Chart</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.875rem;">
            Use Case: Category comparison, discrete data<br>
            Best For: Comparing values across different categories
          </p>
        </div>
        <div>
          <strong>Radar Chart</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.875rem;">
            Use Case: Multivariate data, performance metrics<br>
            Best For: Showing multiple variables on same scale
          </p>
        </div>
        <div>
          <strong>Doughnut Chart</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.875rem;">
            Use Case: Part-to-whole, percentages<br>
            Best For: Showing composition and proportions
          </p>
        </div>
        <div>
          <strong>Polar Area Chart</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.875rem;">
            Use Case: Circular data, cyclic patterns<br>
            Best For: Comparing values in circular layout
          </p>
        </div>
        <div>
          <strong>Bubble Chart</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.875rem;">
            Use Case: 3D relationships, correlation analysis<br>
            Best For: Showing relationships between 3 variables
          </p>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    createAllCharts(currentData, metrics);
  }, TIMING.VIEW_INIT_DELAY);
}

function createAllCharts(data, metrics) {
  // Destroy existing charts
  Object.values(charts).forEach(chart => {
    if (chart) chart.destroy();
  });
  charts = {};

  // Prepare data for charts
  const numericCols = Object.keys(metrics.numericColumns);
  if (numericCols.length === 0) {
    showError('No numeric columns found for charting');
    return;
  }

  // Use first 6 records for better visibility
  const sampleData = data.slice(0, 6);
  const labels = sampleData.map((row, idx) => `Record ${idx + 1}`);

  // Get first numeric column for single-series charts
  const firstCol = numericCols[0];
  const values = sampleData.map(row => parseFloat(row[firstCol]) || 0);

  // Colors
  const colors = [
    SAP_COLORS.BLUE,
    SAP_COLORS.GREEN,
    SAP_COLORS.ORANGE,
    SAP_COLORS.RED,
    SAP_COLORS.PURPLE,
    '#2196F3'
  ];

  const backgroundColors = colors.map(color => color + '80'); // Add transparency

  // 1. Line Chart
  const lineCanvas = document.getElementById('lineChartCanvas');
  if (lineCanvas) {
    charts.line = new Chart(lineCanvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: firstCol,
          data: values,
          borderColor: SAP_COLORS.BLUE,
          backgroundColor: SAP_COLORS.BLUE_LIGHT,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          title: {
            display: true,
            text: `${firstCol} Trend`
          }
        }
      }
    });
  }

  // 2. Bar Chart
  const barCanvas = document.getElementById('barChartCanvas');
  if (barCanvas) {
    charts.bar = new Chart(barCanvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: firstCol,
          data: values,
          backgroundColor: backgroundColors,
          borderColor: colors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          title: {
            display: true,
            text: `${firstCol} Comparison`
          }
        }
      }
    });
  }

  // 3. Radar Chart
  const radarCanvas = document.getElementById('radarChartCanvas');
  if (radarCanvas) {
    // Use multiple numeric columns if available
    const datasets = numericCols.slice(0, 3).map((col, idx) => ({
      label: col,
      data: sampleData.map(row => parseFloat(row[col]) || 0),
      borderColor: colors[idx],
      backgroundColor: colors[idx] + '40',
      borderWidth: 2
    }));

    charts.radar = new Chart(radarCanvas, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          title: {
            display: true,
            text: 'Multi-Variable Comparison'
          }
        },
        scales: {
          r: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // 4. Doughnut Chart
  const doughnutCanvas = document.getElementById('doughnutChartCanvas');
  if (doughnutCanvas) {
    charts.doughnut = new Chart(doughnutCanvas, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: firstCol,
          data: values,
          backgroundColor: backgroundColors,
          borderColor: colors,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right'
          },
          title: {
            display: true,
            text: `${firstCol} Distribution`
          }
        }
      }
    });
  }

  // 5. Polar Area Chart
  const polarCanvas = document.getElementById('polarChartCanvas');
  if (polarCanvas) {
    charts.polar = new Chart(polarCanvas, {
      type: 'polarArea',
      data: {
        labels: labels,
        datasets: [{
          label: firstCol,
          data: values,
          backgroundColor: backgroundColors,
          borderColor: colors,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right'
          },
          title: {
            display: true,
            text: `${firstCol} Polar View`
          }
        },
        scales: {
          r: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // 6. Bubble Chart
  const bubbleCanvas = document.getElementById('bubbleChartCanvas');
  if (bubbleCanvas) {
    // Create bubble data with x, y, and radius
    const bubbleData = sampleData.map((row, idx) => {
      const x = parseFloat(row[numericCols[0]]) || 0;
      const y = numericCols[1] ? (parseFloat(row[numericCols[1]]) || 0) : idx * 10;
      const r = Math.abs(x / 10); // Radius based on first value
      return { x, y, r: Math.max(r, 5) };
    });

    charts.bubble = new Chart(bubbleCanvas, {
      type: 'bubble',
      data: {
        datasets: [{
          label: `${firstCol} vs ${numericCols[1] || 'Index'}`,
          data: bubbleData,
          backgroundColor: backgroundColors,
          borderColor: colors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          title: {
            display: true,
            text: '3D Relationship View'
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: firstCol
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: numericCols[1] || 'Index'
            }
          }
        }
      }
    });
  }

  showSuccess('All 6 chart types rendered successfully!');
}

// Clean up charts when view changes
export function destroyChartTypesCharts() {
  Object.values(charts).forEach(chart => {
    if (chart) chart.destroy();
  });
  charts = {};
}
