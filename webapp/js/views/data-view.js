/**
 * Data View
 * Displays data in a table with sorting and filtering
 */

import { getProcessedData, toggleSort, getSortDirection, setFilter } from '../utils/data-processor.js';
import { exportToExcel } from '../utils/excel-handler.js';

export function showDataView() {
  const content = document.getElementById('content');
  const { currentData, metrics } = window.appState;

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

  renderDataTable();
}

function renderDataTable() {
  const content = document.getElementById('content');
  const data = getProcessedData();
  const { metrics } = window.appState;

  if (data.length === 0) {
    content.innerHTML = `
      <div class="view-container">
        <ui5-title level="H2">Data Table</ui5-title>
        <ui5-message-strip design="Information">
          No data matches your filter criteria.
        </ui5-message-strip>
      </div>
    `;
    return;
  }

  const columns = metrics.columns;

  content.innerHTML = `
    <div class="view-container">
      <ui5-title level="H2">Data Table</ui5-title>

      <div class="table-toolbar">
        <div class="table-toolbar-left">
          <ui5-input
            id="searchInput"
            placeholder="Search all columns..."
            value-state="None">
          </ui5-input>
        </div>
        <div class="table-toolbar-right">
          <ui5-button id="exportBtn" design="Emphasized" icon="excel-attachment">Export</ui5-button>
          <ui5-button id="refreshBtn" design="Transparent" icon="refresh">Refresh</ui5-button>
        </div>
      </div>

      <ui5-table id="dataTable" sticky-column-header>
        ${renderTableColumns(columns)}
        ${renderTableRows(data, columns)}
      </ui5-table>

      <ui5-message-strip design="Information">
        Showing ${data.length} of ${window.appState.currentData.length} rows
      </ui5-message-strip>
    </div>
  `;

  setTimeout(() => {
    attachDataViewHandlers();
  }, 100);
}

function renderTableColumns(columns) {
  return columns.map(col => {
    const sortDir = getSortDirection(col);
    const sortIcon = sortDir === 'asc' ? '▲' : sortDir === 'desc' ? '▼' : '';

    return `
      <ui5-table-column slot="columns" data-column="${col}">
        <span>${col} ${sortIcon}</span>
      </ui5-table-column>
    `;
  }).join('');
}

function renderTableRows(data, columns) {
  return data.map((row, index) => `
    <ui5-table-row>
      ${columns.map(col => `
        <ui5-table-cell>${escapeHtml(String(row[col] || ''))}</ui5-table-cell>
      `).join('')}
    </ui5-table-row>
  `).join('');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function attachDataViewHandlers() {
  const searchInput = document.getElementById('searchInput');
  const exportBtn = document.getElementById('exportBtn');
  const refreshBtn = document.getElementById('refreshBtn');
  const dataTable = document.getElementById('dataTable');

  // Column header click for sorting
  if (dataTable) {
    const columns = dataTable.querySelectorAll('ui5-table-column');
    columns.forEach(column => {
      column.style.cursor = 'pointer';
      column.addEventListener('click', () => {
        const columnName = column.getAttribute('data-column');
        toggleSort(columnName);
        renderDataTable();
      });
    });
  }

  // Search input with debounce
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (event) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const searchValue = event.target.value;
        applyGlobalSearch(searchValue);
        renderDataTable();
      }, 300);
    });
  }

  // Export button
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const data = getProcessedData();
      const success = exportToExcel(data, 'data-export');

      showMessage(
        success ? 'Data exported successfully!' : 'Export failed. Please try again.',
        success ? 'Success' : 'Negative'
      );
    });
  }

  // Refresh button
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      // Clear filters and search
      window.appState.filters = {};
      if (searchInput) {
        searchInput.value = '';
      }
      renderDataTable();
      showMessage('Data refreshed', 'Information');
    });
  }
}

function applyGlobalSearch(searchValue) {
  const { metrics } = window.appState;

  if (!searchValue || searchValue.trim() === '') {
    // Clear all filters
    window.appState.filters = {};
    return;
  }

  // This is a simplified global search
  // In a real app, you might want more sophisticated filtering
  // For now, we'll filter on the first column
  if (metrics && metrics.columns.length > 0) {
    const firstColumn = metrics.columns[0];
    setFilter(firstColumn, searchValue);
  }
}

function showMessage(text, type) {
  const content = document.getElementById('content');
  const viewContainer = content.querySelector('.view-container');

  if (viewContainer) {
    const messageHtml = `<ui5-message-strip design="${type}">${text}</ui5-message-strip>`;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = messageHtml;
    viewContainer.insertBefore(tempDiv.firstChild, viewContainer.firstChild);

    // Auto-hide after 3 seconds
    setTimeout(() => {
      const msg = viewContainer.querySelector('ui5-message-strip[design="' + type + '"]');
      if (msg) msg.remove();
    }, 3000);
  }
}
