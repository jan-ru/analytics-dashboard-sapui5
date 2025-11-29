/**
 * About View
 * Displays application information and features
 */

export function showAboutView() {
  const content = document.getElementById('content');

  content.innerHTML = `
    <div class="view-container about-content">
      <ui5-title level="H2">About This Application</ui5-title>

      <ui5-card class="mt-2">
        <ui5-card-header
          slot="header"
          title-text="Analytics Dashboard"
          subtitle-text="Version 1.0.0">
        </ui5-card-header>

        <div slot="content" style="padding: 1rem;">
          <p>This application allows you to upload Excel files, visualize data through interactive charts and tables, and export your results.</p>

          <ui5-title level="H4" class="mt-2">Features</ui5-title>
          <ul class="feature-list">
            <li>Upload Excel files (.xlsx, .xls) from your local filesystem</li>
            <li>Automatic data processing and validation</li>
            <li>Interactive dashboard with KPI cards</li>
            <li>Multiple chart types: Bar, Line, and Pie charts</li>
            <li>Sortable and filterable data tables</li>
            <li>Export data to Excel format</li>
            <li>Responsive design for all screen sizes</li>
          </ul>

          <ui5-title level="H4" class="mt-2">Technology Stack</ui5-title>
          <ul class="feature-list">
            <li><strong>UI5 Web Components v2</strong> - Modern UI framework</li>
            <li><strong>Chart.js</strong> - Interactive chart visualizations</li>
            <li><strong>SheetJS (xlsx)</strong> - Excel file processing</li>
            <li><strong>Navigo</strong> - Client-side routing</li>
          </ul>

          <ui5-title level="H4" class="mt-2">How to Use</ui5-title>
          <ol class="feature-list">
            <li>Click on "Upload" in the side navigation</li>
            <li>Select an Excel file from your computer (.xlsx or .xls)</li>
            <li>Click "Process File" to analyze the data</li>
            <li>Navigate to "Dashboard" to view charts and KPIs</li>
            <li>Navigate to "Data Table" to explore your data in detail</li>
            <li>Use the Export button to download your data</li>
          </ol>

          <ui5-title level="H4" class="mt-2">File Requirements</ui5-title>
          <ul class="feature-list">
            <li>File format: .xlsx or .xls</li>
            <li>Maximum file size: 10MB</li>
            <li>Must contain at least one sheet with data</li>
            <li>First row should contain column headers</li>
          </ul>

          <ui5-title level="H4" class="mt-2">Privacy & Security</ui5-title>
          <p>All data processing happens locally in your browser. No data is sent to any server. Your files remain completely private on your device.</p>
        </div>
      </ui5-card>

      <ui5-message-strip design="Information" class="mt-2">
        This is a demo application built with SAPUI5 Web Components v2. All processing is done client-side with no server requirements.
      </ui5-message-strip>
    </div>
  `;
}
