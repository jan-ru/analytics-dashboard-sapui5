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

      <!-- Type 2: Numeric Content Tile -->
      <div class="sap-tile numeric-content" data-action="data-table">
        <div class="numeric-icon">📋</div>
        <div class="numeric-content-data">
          <div class="numeric-main-value">${metrics.rowCount.toLocaleString()}</div>
          <div class="numeric-label">Total Records</div>
          <div class="numeric-subtitle">Click to view data table</div>
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

      <!-- Type 9: KPI Tile - Large number with status -->
      <div class="sap-tile kpi tile-green">
        <div class="kpi-tile-header">
          <div class="kpi-tile-title">Data Quality</div>
          <div class="kpi-tile-icon sap-icon">&#xe1e2;</div>
        </div>
        <div>
          <span class="kpi-tile-value">98</span>
          <span class="kpi-tile-unit">%</span>
        </div>
        <div class="kpi-tile-status status-good">
          <span>✓</span>
          <span>Excellent</span>
        </div>
        <div class="kpi-tile-footer">
          <span class="sap-icon" style="font-size: 0.9rem;">&#xe1db;</span>
          <span>Last validated ${new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <!-- Type 10: Launch Tile - App launcher -->
      <div class="sap-tile launch tile-orange" data-action="graphs">
        <div class="launch-icon sap-icon">&#xe0c1;</div>
        <div class="launch-title">Charts</div>
        <div class="launch-description">Visualize your data with interactive charts</div>
      </div>

      <!-- Type 11: Link List Tile - Multiple links -->
      <div class="sap-tile link-list">
        <div class="link-list-header">Quick Actions</div>
        <div class="link-list-items">
          <div class="link-list-item" data-action="data-table">
            <span class="link-list-item-icon sap-icon">&#xe1b3;</span>
            <span class="link-list-item-text">View Data Table</span>
            <span class="link-list-item-arrow">→</span>
          </div>
          <div class="link-list-item" data-action="graphs">
            <span class="link-list-item-icon sap-icon">&#xe0c1;</span>
            <span class="link-list-item-text">View Charts</span>
            <span class="link-list-item-arrow">→</span>
          </div>
          <div class="link-list-item" data-action="dashboard">
            <span class="link-list-item-icon sap-icon">&#xe112;</span>
            <span class="link-list-item-text">Dashboard</span>
            <span class="link-list-item-arrow">→</span>
          </div>
        </div>
        <div class="link-list-footer">
          <div class="link-list-more">View all actions</div>
        </div>
      </div>

      <!-- Type 12: Progress Tile - Goal tracking -->
      <div class="sap-tile progress tile-blue">
        <div>
          <div class="progress-tile-header">
            <div class="progress-tile-title">Data Processing Goal</div>
            <div class="progress-tile-icon">🎯</div>
          </div>
          <div class="progress-tile-metrics">
            <div class="progress-current">${metrics.rowCount.toLocaleString()}</div>
            <div class="progress-goal">/ 10,000 rows</div>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${Math.min((metrics.rowCount / 10000) * 100, 100)}%"></div>
          </div>
          <div class="progress-percentage">${Math.min(Math.round((metrics.rowCount / 10000) * 100), 100)}%</div>
        </div>
        <div class="progress-footer">Updated ${new Date().toLocaleDateString()}</div>
      </div>

      <!-- Type 13: Notification Tile - Alert badge -->
      <div class="sap-tile notification tile-orange">
        <div class="notification-badge">${Object.keys(metrics.numericColumns).length}</div>
        <div class="notification-title">Numeric Columns</div>
        <div class="notification-subtitle">Detected in dataset</div>
      </div>

      <!-- Type 14: Timeline Tile - Activity log -->
      <div class="sap-tile timeline">
        <div class="timeline-header">
          <span>Recent Activity</span>
          <span class="sap-icon" style="font-size: 0.9rem;">&#xe1db;</span>
        </div>
        <div class="timeline-items">
          <div class="timeline-item timeline-success">
            <div class="timeline-time">Just now</div>
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-content-text">File uploaded successfully</div>
              <div class="timeline-content-meta">${fileName}</div>
            </div>
          </div>
          <div class="timeline-item timeline-success">
            <div class="timeline-time">1m ago</div>
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-content-text">Data processed</div>
              <div class="timeline-content-meta">${metrics.rowCount} rows analyzed</div>
            </div>
          </div>
          <div class="timeline-item timeline-warning">
            <div class="timeline-time">2m ago</div>
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-content-text">Validation complete</div>
              <div class="timeline-content-meta">${metrics.columnCount} columns verified</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top: 2rem;">
      <div class="card-header">Tile Types Reference (14 Types)</div>
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
        <div>
          <strong>9. KPI Tile</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.9rem;">Large number with status indicator and SAP icon</p>
        </div>
        <div>
          <strong>10. Launch Tile</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.9rem;">App launcher with SAP icon and description</p>
        </div>
        <div>
          <strong>11. Link List Tile</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.9rem;">Multiple clickable links with SAP icons</p>
        </div>
        <div>
          <strong>12. Progress Tile</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.9rem;">Goal tracking with animated progress bar</p>
        </div>
        <div>
          <strong>13. Notification Tile</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.9rem;">Badge with count and pulse animation</p>
        </div>
        <div>
          <strong>14. Timeline Tile</strong>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.9rem;">Activity timeline with colored status dots</p>
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
      } else if (action === 'graphs') {
        window.location.hash = '/graphs';
      } else if (action === 'dashboard') {
        window.location.hash = '/dashboard';
      } else if (action === 'metric') {
        const column = tile.getAttribute('data-column');
        showMetricDetails(column, window.appState.metrics);
      }
    });
  });

  // Handle link list items separately
  const linkItems = document.querySelectorAll('.link-list-item');
  linkItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = item.getAttribute('data-action');

      if (action === 'data-table') {
        window.location.hash = '/data';
      } else if (action === 'graphs') {
        window.location.hash = '/graphs';
      } else if (action === 'dashboard') {
        window.location.hash = '/dashboard';
      }
    });
  });
}
