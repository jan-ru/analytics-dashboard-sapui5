/**
 * About View (Simplified)
 */

export function showAboutViewSimple() {
  const content = document.getElementById('content');

  content.innerHTML = `
    <div class="card">
      <div class="card-header">About This Application</div>

      <p><strong>Analytics Dashboard</strong> - Version 1.0.0</p>

      <h3 style="margin-top: 1.5rem;">Features</h3>
      <ul style="margin: 1rem 0; padding-left: 2rem;">
        <li>Upload Excel files (.xlsx, .xls)</li>
        <li>Automatic data processing and validation</li>
        <li>Interactive dashboard with KPI cards</li>
        <li>Multiple chart types (Bar, Line, Pie)</li>
        <li>Sortable and filterable data tables</li>
        <li>Export data to Excel format</li>
        <li>Fully client-side processing</li>
      </ul>

      <h3 style="margin-top: 1.5rem;">Technology Stack</h3>
      <ul style="margin: 1rem 0; padding-left: 2rem;">
        <li><strong>Chart.js</strong> - Interactive charts</li>
        <li><strong>SheetJS (xlsx)</strong> - Excel processing</li>
        <li><strong>Navigo</strong> - Client-side routing</li>
        <li><strong>Vanilla JavaScript</strong> - No frameworks</li>
      </ul>

      <h3 style="margin-top: 1.5rem;">How to Use</h3>
      <ol style="margin: 1rem 0; padding-left: 2rem;">
        <li>Click "Upload" to select an Excel file</li>
        <li>Click "Process File" to analyze the data</li>
        <li>View "Dashboard" for charts and KPIs</li>
        <li>View "Data Table" to explore your data</li>
        <li>Click "Export" to download results</li>
      </ol>

      <div class="message message-info" style="margin-top: 1.5rem;">
        All processing happens locally in your browser. Your data never leaves your device.
      </div>
    </div>
  `;
}
