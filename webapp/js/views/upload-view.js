/**
 * Upload View
 * Handles file upload interface and Excel file processing
 */

import { importExcel } from '../utils/excel-handler.js';
import { updateAppState } from '../utils/data-processor.js';
import { navigateTo } from '../router.js';

export function showUploadView() {
  const content = document.getElementById('content');

  content.innerHTML = `
    <div class="view-container">
      <ui5-title level="H2">Upload Excel File</ui5-title>

      <ui5-message-strip id="infoStrip" design="Information">
        Upload an Excel file (.xlsx or .xls) to begin analyzing your data.
      </ui5-message-strip>

      <ui5-card class="upload-card">
        <ui5-card-header
          slot="header"
          title-text="Select File"
          subtitle-text="Maximum file size: 10MB">
        </ui5-card-header>

        <div slot="content" class="upload-content">
          <ui5-file-uploader
            id="fileUploader"
            accept=".xlsx,.xls"
            hide-input
            value-state="None">
            <ui5-button id="uploadBtn" design="Emphasized">Choose Excel File</ui5-button>
          </ui5-file-uploader>

          <div id="fileInfo" class="file-info"></div>

          <ui5-busy-indicator id="busyIndicator" active="false" size="Medium">
            <ui5-button id="processBtn" design="Positive" disabled>Process File</ui5-button>
          </ui5-busy-indicator>
        </div>
      </ui5-card>

      <ui5-message-strip id="messageStrip" design="Success" hidden></ui5-message-strip>
    </div>
  `;

  // Attach event handlers after DOM is ready
  setTimeout(() => {
    attachUploadHandlers();
  }, 100);
}

function attachUploadHandlers() {
  const fileUploader = document.getElementById('fileUploader');
  const processBtn = document.getElementById('processBtn');
  const fileInfo = document.getElementById('fileInfo');
  const busyIndicator = document.getElementById('busyIndicator');

  if (!fileUploader || !processBtn) {
    console.error('Upload elements not found');
    return;
  }

  let selectedFile = null;

  // File selection handler
  fileUploader.addEventListener('change', (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      selectedFile = files[0];

      // Display file info
      fileInfo.innerHTML = `
        <ui5-label>Selected: <strong>${selectedFile.name}</strong></ui5-label><br>
        <ui5-label>Size: ${(selectedFile.size / 1024).toFixed(2)} KB</ui5-label>
      `;

      // Enable process button
      processBtn.disabled = false;
    }
  });

  // Process button handler
  processBtn.addEventListener('click', async () => {
    if (!selectedFile) return;

    // Show loading state
    busyIndicator.active = true;
    processBtn.disabled = true;
    hideMessage();

    try {
      // Import Excel file
      const result = await importExcel(selectedFile);

      // Update application state
      updateAppState(result);

      // Show success message
      showMessage(
        `Successfully loaded ${result.rowCount} rows from ${result.fileName}`,
        'Success'
      );

      // Navigate to dashboard after short delay
      setTimeout(() => {
        navigateTo('/dashboard');
      }, 1000);

    } catch (error) {
      // Show error message
      showMessage(error.message, 'Negative');
      processBtn.disabled = false;
    } finally {
      busyIndicator.active = false;
    }
  });
}

function showMessage(text, type) {
  const messageStrip = document.getElementById('messageStrip');
  if (messageStrip) {
    messageStrip.textContent = text;
    messageStrip.design = type;
    messageStrip.hidden = false;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      messageStrip.hidden = true;
    }, 5000);
  }
}

function hideMessage() {
  const messageStrip = document.getElementById('messageStrip');
  if (messageStrip) {
    messageStrip.hidden = true;
  }
}
