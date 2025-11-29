/**
 * Dashboard View
 * Displays KPIs and charts from uploaded data
 */

import { createChart, prepareChartData, getBestChartColumns, destroyAllCharts } from '../utils/chart-utils.js';
import { exportToExcel } from '../utils/excel-handler.js';

let charts = {}; // Store chart instances

export function showDashboardView() {
  const content = document.getElementById('content');
  const { currentData, metrics, fileName } = window.appState;

  if (!currentData || !metrics) {
    content.innerHTML = `
      <div class="view-container">
        <ui5-message-strip design="Warning">
          No data available. Please upload a file first.
        </ui5-message-strip>
      </div>
    `;
    return;
  }

  // Destroy existing charts
  destroyAllCharts(charts);
  charts = {};

  content.innerHTML = `
    <div class="view-container">
      <div class="dashboard-header">
        <ui5-title level="H2">Analytics Dashboard</ui5-title>
        <ui5-button id="exportBtn" design="Emphasized" icon="excel-attachment">
          Export to Excel
        </ui5-button>
      </div>

      <ui5-message-strip design="Information">
        Viewing data from: <strong>${fileName}</strong> (${metrics.rowCount} rows, ${metrics.columnCount} columns)
      </ui5-message-strip>

      <!-- KPI Cards -->
      <div class="kpi-grid">
        <ui5-card class="kpi-card">
          <ui5-card-header slot="header" title-text="Total Rows"></ui5-card-header>
          <div slot="content" class="kpi-value">${metrics.rowCount}</div>
        </ui5-card>

        <ui5-card class="kpi-card">
          <ui5-card-header slot="header" title-text="Columns"></ui5-card-header>
          <div slot="content" class="kpi-value">${metrics.columnCount}</div>
        </ui5-card>

        ${renderNumericMetrics(metrics)}
      </div>

      <!-- Chart Cards -->
      <div class="chart-grid">
        ${renderChartCards()}
      </div>
    </div>
  `;

  // Initialize charts after DOM is ready
  setTimeout(() => {
    initializeCharts(currentData, metrics);
    attachDashboardHandlers();
  }, 100);
}

function renderNumericMetrics(metrics) {
  const numericCols = Object.keys(metrics.numericColumns);

  if (numericCols.length === 0) {
    return '';
  }

  // Show first 2 numeric columns as KPIs
  return numericCols.slice(0, 2).map(col => {
    const stats = metrics.numericColumns[col];
    return `
      <ui5-card class="kpi-card">
        <ui5-card-header slot="header" title-text="${col} (Sum)"></ui5-card-header>
        <div slot="content" class="kpi-value">${stats.sum.toFixed(2)}</div>
      </ui5-card>
    `;
  }).join('');
}

function renderChartCards() {
  return `
    <ui5-card class="chart-card">
      <ui5-card-header
        slot="header"
        title-text="Bar Chart"
        subtitle-text="First 10 rows">
      </ui5-card-header>
      <div slot="content" class="chart-container">
        <canvas id="barChart"></canvas>
      </div>
    </ui5-card>

    <ui5-card class="chart-card">
      <ui5-card-header
        slot="header"
        title-text="Line Chart"
        subtitle-text="Trend visualization">
      </ui5-card-header>
      <div slot="content" class="chart-container">
        <canvas id="lineChart"></canvas>
      </div>
    </ui5-card>

    <ui5-card class="chart-card">
      <ui5-card-header
        slot="header"
        title-text="Pie Chart"
        subtitle-text="Distribution">
      </ui5-card-header>
      <div slot="content" class="chart-container">
        <canvas id="pieChart"></canvas>
      </div>
    </ui5-card>
  `;
}

function initializeCharts(data, metrics) {
  const chartData = data.slice(0, 10);
  const { labelColumn, valueColumn } = getBestChartColumns(metrics);

  if (!labelColumn || !valueColumn) {
    console.warn('Could not determine chart columns');
    return;
  }

  // Bar Chart
  const barCanvas = document.getElementById('barChart');
  if (barCanvas) {
    try {
      const barData = prepareChartData(chartData, labelColumn, valueColumn);
      charts.bar = createChart(barCanvas, 'bar', barData);
    } catch (error) {
      console.error('Failed to create bar chart:', error);
    }
  }

  // Line Chart
  const lineCanvas = document.getElementById('lineChart');
  if (lineCanvas) {
    try {
      const lineData = prepareChartData(chartData, labelColumn, valueColumn);
      charts.line = createChart(lineCanvas, 'line', lineData);
    } catch (error) {
      console.error('Failed to create line chart:', error);
    }
  }

  // Pie Chart
  const pieCanvas = document.getElementById('pieChart');
  if (pieCanvas) {
    try {
      const pieData = prepareChartData(chartData, labelColumn, valueColumn);
      charts.pie = createChart(pieCanvas, 'pie', pieData);
    } catch (error) {
      console.error('Failed to create pie chart:', error);
    }
  }
}

function attachDashboardHandlers() {
  const exportBtn = document.getElementById('exportBtn');

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const success = exportToExcel(window.appState.currentData, 'dashboard-export');

      const content = document.getElementById('content');
      const messageHtml = success
        ? '<ui5-message-strip design="Success">Data exported successfully!</ui5-message-strip>'
        : '<ui5-message-strip design="Negative">Export failed. Please try again.</ui5-message-strip>';

      // Insert message at top of view container
      const viewContainer = content.querySelector('.view-container');
      if (viewContainer) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = messageHtml;
        viewContainer.insertBefore(tempDiv.firstChild, viewContainer.firstChild);

        // Auto-hide after 3 seconds
        setTimeout(() => {
          const msg = viewContainer.querySelector('ui5-message-strip');
          if (msg) msg.remove();
        }, 3000);
      }
    });
  }
}
