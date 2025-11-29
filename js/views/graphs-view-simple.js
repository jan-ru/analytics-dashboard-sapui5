/**
 * Graphs View - Chart Visualizations
 */

import { createChart, prepareChartData, getBestChartColumns, destroyAllCharts } from '../utils/chart-utils.js';
import { exportToExcel } from '../utils/excel-handler.js';
import { MESSAGES, ICONS, UI, TIMING } from '../constants.js';
import { showSuccess, showError } from '../utils/toast.js';

let charts = {};

export function showGraphsViewSimple() {
  const { currentData, metrics, fileName } = window.appState;

  if (!currentData || !metrics) {
    document.getElementById(UI.CONTENT_ID).innerHTML = `
      <div class="${UI.CARD_CLASS}">
        <div class="${UI.MESSAGE_ERROR_CLASS}">${MESSAGES.NO_DATA}</div>
      </div>
    `;
    return;
  }

  // Destroy existing charts
  destroyAllCharts(charts);
  charts = {};

  const content = document.getElementById(UI.CONTENT_ID);
  content.innerHTML = `
    <div class="toolbar">
      <h2 style="margin: 0;">${ICONS.CHART} Chart Visualizations</h2>
      <button class="btn btn-primary" id="exportBtn">${ICONS.DOWNLOAD} Export to Excel</button>
    </div>

    <div class="${UI.MESSAGE_INFO_CLASS}">
      Viewing data from: <strong>${fileName}</strong> (${metrics.rowCount} rows, ${metrics.columnCount} columns)
    </div>

    <div class="chart-grid">
      <div class="card chart-card">
        <div class="card-header">Bar Chart</div>
        <div class="chart-container">
          <canvas id="barChart"></canvas>
        </div>
      </div>
      <div class="card chart-card">
        <div class="card-header">Line Chart</div>
        <div class="chart-container">
          <canvas id="lineChart"></canvas>
        </div>
      </div>
      <div class="card chart-card">
        <div class="card-header">Pie Chart</div>
        <div class="chart-container">
          <canvas id="pieChart"></canvas>
        </div>
      </div>
      <div class="card chart-card">
        <div class="card-header">Doughnut Chart</div>
        <div class="chart-container">
          <canvas id="doughnutChart"></canvas>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top: 2rem;">
      <div class="card-header">Chart Information</div>
      <p style="margin: 0; color: #666;">
        Charts display the first 10 records from your dataset.
        Use the Data Table view to see all records with sorting and filtering capabilities.
      </p>
    </div>
  `;

  setTimeout(() => {
    initializeCharts(currentData, metrics);
    attachHandlers();
  }, TIMING.VIEW_INIT_DELAY);
}

function initializeCharts(data, metrics) {
  const chartData = data.slice(0, 10);
  const { labelColumn, valueColumn } = getBestChartColumns(metrics);

  if (!labelColumn || !valueColumn) {
    console.warn('No suitable columns found for charts');
    return;
  }

  const barCanvas = document.getElementById('barChart');
  if (barCanvas) {
    const barData = prepareChartData(chartData, labelColumn, valueColumn);
    charts.bar = createChart(barCanvas, 'bar', barData);
  }

  const lineCanvas = document.getElementById('lineChart');
  if (lineCanvas) {
    const lineData = prepareChartData(chartData, labelColumn, valueColumn);
    charts.line = createChart(lineCanvas, 'line', lineData);
  }

  const pieCanvas = document.getElementById('pieChart');
  if (pieCanvas) {
    const pieData = prepareChartData(chartData, labelColumn, valueColumn);
    charts.pie = createChart(pieCanvas, 'pie', pieData);
  }

  const doughnutCanvas = document.getElementById('doughnutChart');
  if (doughnutCanvas) {
    const doughnutData = prepareChartData(chartData, labelColumn, valueColumn);
    charts.doughnut = createChart(doughnutCanvas, 'doughnut', doughnutData);
  }
}

function attachHandlers() {
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const success = exportToExcel(window.appState.currentData, 'graphs-export');
      if (success) {
        showSuccess(MESSAGES.EXPORT_SUCCESS);
      } else {
        showError(MESSAGES.EXPORT_FAILED);
      }
    });
  }
}
