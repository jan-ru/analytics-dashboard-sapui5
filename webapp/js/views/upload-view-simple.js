/**
 * Upload View (Simplified)
 */

import { importExcel } from '../utils/excel-handler.js';
import { updateAppState } from '../utils/data-processor.js';
import { navigateTo } from '../router-simple.js';
import { SAP_COLORS, ICONS, MESSAGES, FILE_UPLOAD, UI, TIMING, ROUTES } from '../constants.js';
import { showSuccess, showError, showInfo } from '../utils/toast.js';

export function showUploadViewSimple() {
  const content = document.getElementById(UI.CONTENT_ID);

  content.innerHTML = `
    <div style="text-align: center; margin-bottom: 2rem;">
      <h2 style="color: ${SAP_COLORS.BLUE}; margin-bottom: 0.5rem;">Welcome to Analytics Dashboard</h2>
      <p style="color: ${SAP_COLORS.GRAY};">Upload your Excel file to start analyzing your data</p>
    </div>

    <!-- Quick Action Tiles -->
    <div class="tile-container" style="max-width: 800px; margin: 0 auto 2rem;">
      <div class="sap-tile tile-green">
        <div>
          <div class="tile-header">Step 1</div>
          <div class="tile-value" style="font-size: 1.5rem;">📁</div>
        </div>
        <div class="tile-footer">Choose your Excel file</div>
      </div>

      <div class="sap-tile tile-orange">
        <div>
          <div class="tile-header">Step 2</div>
          <div class="tile-value" style="font-size: 1.5rem;">⚙️</div>
        </div>
        <div class="tile-footer">Process the data</div>
      </div>

      <div class="sap-tile tile-purple">
        <div>
          <div class="tile-header">Step 3</div>
          <div class="tile-value" style="font-size: 1.5rem;">📊</div>
        </div>
        <div class="tile-footer">View insights</div>
      </div>

      <div class="sap-tile tile-red">
        <div>
          <div class="tile-header">Step 4</div>
          <div class="tile-value" style="font-size: 1.5rem;">💾</div>
        </div>
        <div class="tile-footer">Export results</div>
      </div>
    </div>

    <!-- Action Tile - Upload Excel -->
    <div style="max-width: 400px; margin: 0 auto 2rem;">
      <div class="sap-tile action" id="uploadActionTile">
        <div class="action-icon">${ICONS.UPLOAD}</div>
        <div class="action-label">Upload Excel File</div>
        <div class="action-description">Click to select ${FILE_UPLOAD.ALLOWED_EXTENSIONS.join(' or ')} file</div>
      </div>
      <input type="file" id="fileInput" accept="${FILE_UPLOAD.ALLOWED_EXTENSIONS.join(',')}" style="display: none;" />
    </div>

    <div class="card" style="max-width: 600px; margin: 0 auto;">
      <div class="card-header">Upload Excel File</div>

      <div class="${UI.MESSAGE_INFO_CLASS}">
        Upload an Excel file (${FILE_UPLOAD.ALLOWED_EXTENSIONS.join(' or ')}) to begin analyzing your data.
        Maximum file size: ${(FILE_UPLOAD.MAX_SIZE / 1024 / 1024).toFixed(0)}MB
      </div>

      <button class="btn btn-primary" id="processBtn" disabled>Process File</button>

      <div id="statusMessage"></div>
    </div>
  `;

  setTimeout(() => {
    attachHandlers();
  }, TIMING.VIEW_INIT_DELAY);
}

function attachHandlers() {
  const fileInput = document.getElementById('fileInput');
  const processBtn = document.getElementById('processBtn');
  const statusMessage = document.getElementById('statusMessage');
  const uploadActionTile = document.getElementById('uploadActionTile');

  let selectedFile = null;

  // Action Tile click handler
  if (uploadActionTile) {
    uploadActionTile.addEventListener('click', () => {
      fileInput.click();
    });
  }

  fileInput.addEventListener('change', (e) => {
    selectedFile = e.target.files[0];
    if (selectedFile) {
      processBtn.disabled = false;
      statusMessage.innerHTML = `
        <p style="margin-top: 1rem;">
          <strong>Selected:</strong> ${selectedFile.name}<br>
          <strong>Size:</strong> ${(selectedFile.size / 1024).toFixed(2)} KB
        </p>
      `;

      // Update Action Tile to show file selected
      if (uploadActionTile) {
        uploadActionTile.innerHTML = `
          <div class="action-icon">${ICONS.CHECKMARK}</div>
          <div class="action-label">File Selected</div>
          <div class="action-description">${selectedFile.name}</div>
        `;
      }
    }
  });

  processBtn.addEventListener('click', async () => {
    if (!selectedFile) return;

    processBtn.disabled = true;
    statusMessage.innerHTML = `<p style="margin-top: 1rem;">${MESSAGES.FILE_PROCESSING}</p>`;

    try {
      const result = await importExcel(selectedFile);
      updateAppState(result);

      showSuccess(`Successfully loaded ${result.rowCount} rows from ${result.fileName}`);
      statusMessage.innerHTML = '';

      setTimeout(() => {
        navigateTo(ROUTES.DASHBOARD);
      }, 1000);

    } catch (error) {
      showError(error.message);
      statusMessage.innerHTML = '';
      processBtn.disabled = false;
    }
  });
}
