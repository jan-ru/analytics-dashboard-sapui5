/**
 * Data View (Simplified)
 */

import { getProcessedData, toggleSort, setFilter } from '../utils/data-processor.js';
import { exportToExcel } from '../utils/excel-handler.js';

export function showDataViewSimple() {
  renderTable();
}

function renderTable() {
  const data = getProcessedData();
  const { metrics } = window.appState;

  if (!data || data.length === 0) {
    document.getElementById('content').innerHTML = `
      <div class="card">
        <div class="message message-info">No data to display</div>
      </div>
    `;
    return;
  }

  const columns = metrics.columns;

  document.getElementById('content').innerHTML = `
    <div class="card">
      <div class="card-header">Data Table</div>

      <div class="toolbar">
        <input type="text" id="searchInput" placeholder="Search..." />
        <button class="btn btn-primary" id="exportBtn">📥 Export</button>
      </div>

      <table>
        <thead>
          <tr>
            ${columns.map(col => `<th data-column="${col}">${col} ▲▼</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${data.map(row => `
            <tr>
              ${columns.map(col => `<td>${escapeHtml(String(row[col] || ''))}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="message message-info">
        Showing ${data.length} of ${window.appState.currentData.length} rows
      </div>
    </div>
  `;

  setTimeout(() => {
    attachHandlers();
  }, 100);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function attachHandlers() {
  const searchInput = document.getElementById('searchInput');
  const exportBtn = document.getElementById('exportBtn');

  // Column sorting
  const headers = document.querySelectorAll('th[data-column]');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const column = header.getAttribute('data-column');
      toggleSort(column);
      renderTable();
    });
  });

  // Search with debounce
  if (searchInput) {
    let timeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const searchValue = e.target.value;
        if (searchValue.trim()) {
          const { metrics } = window.appState;
          if (metrics.columns.length > 0) {
            setFilter(metrics.columns[0], searchValue);
          }
        } else {
          window.appState.filters = {};
        }
        renderTable();
      }, 300);
    });
  }

  // Export
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const data = getProcessedData();
      const success = exportToExcel(data, 'data-export');
      alert(success ? 'Data exported successfully!' : 'Export failed');
    });
  }
}
