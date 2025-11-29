/**
 * Tiles View - SAP Fiori Tile Showcase
 */

import {
  renderGenericTiles,
  renderComparisonTile,
  renderMicroChartTile,
  initializeSlideTile,
  showMetricDetails
} from '../utils/tile-renderer.js';

let slideInterval;

export function showTilesViewSimple() {
  const { currentData, metrics, fileName } = window.appState;

  if (!currentData || !metrics) {
    document.getElementById('content').innerHTML = `
      <div class="card">
        <div class="message message-error">No data available. Please upload an Excel file first.</div>
      </div>
    `;
    return;
  }

  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="toolbar">
      <h2 style="margin: 0;">🎨 SAP Fiori Tiles Showcase</h2>
    </div>

    <div class="message message-info">
      Viewing data from: <strong>${fileName}</strong> (${metrics.rowCount} rows, ${metrics.columnCount} columns)
    </div>

    <!-- SAP Fiori Tiles - All 8 Types -->
    <div class="tile-container">
      <!-- Type 1: Analytical Tile - Combines Records & Columns -->
      <div class="sap-tile analytical" data-action="overview">
        <div class="analytical-header">
          <div>
            <div class="analytical-title">Dataset Overview</div>
            <div class="analytical-subtitle">Complete data summary</div>
          </div>
          <div style="font-size: 2rem;">📊</div>
        </div>
        <div class="analytical-metrics">
          <div class="analytical-metric">
            <div class="analytical-metric-label">Total Records</div>
            <div class="analytical-metric-value">${metrics.rowCount.toLocaleString()}</div>
          </div>
          <div class="analytical-metric">
            <div class="analytical-metric-label">Data Columns</div>
            <div class="analytical-metric-value">${metrics.columnCount}</div>
          </div>
        </div>
        <div class="analytical-trend trend-neutral">
          <span>📈</span>
          <span>Density: ${(metrics.rowCount * metrics.columnCount).toLocaleString()} cells</span>
        </div>
      </div>

      <!-- Type 2: Numeric Content Tile - Records -->
      <div class="sap-tile numeric-content" data-action="data-table">
        <div class="numeric-icon">📋</div>
        <div class="numeric-content-data">
          <div class="numeric-main-value">${metrics.rowCount.toLocaleString()}</div>
          <div class="numeric-label">Total Records</div>
          <div class="numeric-subtitle">Click to view data table</div>
        </div>
      </div>

      <!-- Type 2: Numeric Content Tile - Columns -->
      <div class="sap-tile numeric-content tile-green" data-action="columns">
        <div class="numeric-icon">🔢</div>
        <div class="numeric-content-data">
          <div class="numeric-main-value">${metrics.columnCount}</div>
          <div class="numeric-label">Data Columns</div>
          <div class="numeric-subtitle">Available fields</div>
        </div>
      </div>

      <!-- Type 3: Generic Tiles -->
      ${renderGenericTiles(metrics)}

      <!-- Type 4: Slide Tile - Rotating Metrics -->
      <div class="sap-tile slide tile-blue" id="slideTile">
        <div class="slide-content" id="slideContent">
          <div class="slide-item active">
            <div class="tile-header">TODAY</div>
            <div class="tile-value">${metrics.rowCount.toLocaleString()}</div>
            <div class="tile-footer">Total Records</div>
          </div>
        </div>
        <div class="slide-navigation">
          <button class="slide-prev" aria-label="Previous">‹</button>
          <button class="slide-next" aria-label="Next">›</button>
        </div>
        <div class="slide-indicators" id="slideIndicators">
          <span class="indicator active"></span>
          <span class="indicator"></span>
          <span class="indicator"></span>
        </div>
      </div>

      <!-- Type 5: Comparison Tile -->
      ${renderComparisonTile(metrics)}

      <!-- Type 6: Micro Chart Tile -->
      ${renderMicroChartTile(metrics)}

      <!-- Type 7: Feed Tile -->
      <div class="sap-tile feed tile-purple">
        <div class="feed-timestamp">${new Date().toLocaleString()}</div>
        <div class="feed-content">
          <strong>${fileName}</strong> successfully loaded and ready for analysis.
          ${Object.keys(metrics.numericColumns).length} numeric columns detected.
        </div>
        <div class="feed-author">System</div>
      </div>

      <!-- Type 8: Action Tile -->
      <div class="sap-tile action" data-action="upload">
        <div class="action-icon">📤</div>
        <div class="action-label">Upload New File</div>
        <div class="action-description">Click to upload another Excel file</div>
      </div>
    </div>

    <div class="card" style="margin-top: 2rem;">
      <div class="card-header">Tile Types Reference</div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-top: 1rem;">
        <div>
          <strong>1. Analytical Tile</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.9rem;">Combines multiple metrics with trend information (2x width)</p>
        </div>
        <div>
          <strong>2. Numeric Content Tile</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.9rem;">Single KPI with circular icon background</p>
        </div>
        <div>
          <strong>3. Generic Tile</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.9rem;">Simple metric with trend indicator</p>
        </div>
        <div>
          <strong>4. Feed Tile</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.9rem;">News, updates, or activity feed</p>
        </div>
        <div>
          <strong>5. Slide Tile</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.9rem;">Auto-rotating carousel with navigation</p>
        </div>
        <div>
          <strong>6. Comparison Tile</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.9rem;">Side-by-side value comparison</p>
        </div>
        <div>
          <strong>7. Micro Chart Tile</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.9rem;">Inline sparkline visualization</p>
        </div>
        <div>
          <strong>8. Action Tile</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.9rem;">Interactive button for user actions</p>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    attachHandlers();
    initializeSlideTile(metrics);
  }, 100);
}


function attachHandlers() {
  const tiles = document.querySelectorAll('.sap-tile');
  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const action = tile.getAttribute('data-action');

      if (action === 'data-table') {
        window.location.hash = '/data';
      } else if (action === 'upload') {
        window.location.hash = '/upload';
      } else if (action === 'metric') {
        const column = tile.getAttribute('data-column');
        showMetricDetails(column, window.appState.metrics);
      }
    });
  });
}
