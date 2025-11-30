# Analytics Dashboard - SAPUI5 Web Components v2

A modern, lightweight analytics dashboard application built with SAPUI5 Web Components v2. Upload Excel files, visualize data through interactive charts, and export your results—all running entirely in your browser with no server required.

## Features

- **Excel File Upload**: Upload .xlsx or .xls files directly from your local filesystem
- **Interactive Dashboard**: View your data through KPI cards and dynamic charts
- **6 Chart Types Showcase**: Line, Bar, Radar, Doughnut, Polar Area, and Bubble charts
- **15 SAP Fiori Tiles**: Complete tile showcase including Progress, Notification, Timeline, and Status tiles
- **100+ SAP Icons**: Browse and copy SAP UI5 icon codes with interactive showcase
- **SAP Color Schemes**: Explore SAP Fiori color palettes with accessibility guidelines
- **Data Table**: Sort and filter your data in an interactive table
- **Excel Export**: Export your data (with filters and sorting applied) back to Excel with styled headers
- **Fully Client-Side**: All processing happens in your browser—your data never leaves your machine
- **No Build Required**: CDN-based architecture with zero compilation needed
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technology Stack

- **UI Framework**: [UI5 Web Components v2.16.2](https://sap.github.io/ui5-webcomponents/)
- **Charts**: [Chart.js v4.4.0](https://www.chartjs.org/)
- **Excel Processing**: [ExcelJS v4.4.0](https://github.com/exceljs/exceljs)
- **Routing**: [Navigo v8.11.1](https://github.com/krasimir/navigo)
- **Testing**: [Deno Test](https://deno.land/)
- **Module System**: ES Modules with Import Maps
- **No Build Tools**: Pure HTML/CSS/JavaScript

## Quick Start

### Local Development

1. **Clone or download this repository**

2. **Start a local web server**

   Using Python 3:
   ```bash
   cd /path/to/sapui5
   python3 -m http.server 8000
   ```

   Using Node.js:
   ```bash
   npx http-server -p 8000
   ```

   Using PHP:
   ```bash
   php -S localhost:8000
   ```

3. **Open your browser**
   ```
   http://localhost:8000
   ```

4. **Upload an Excel file and start analyzing!**

### Browser Requirements

This application requires a modern browser with **Import Maps** support:

- Chrome 89+ (March 2021)
- Firefox 87+ (March 2021)
- Safari 14.1+ (April 2021)
- Edge 89+ (March 2021)

## Project Structure

```
sapui5/
├── index.html                      # Main entry point
├── README.md                       # This file
│
├── docs/                          # Documentation
│   ├── requirements.md            # Project requirements
│   ├── design.md                  # Detailed design document
│   ├── TILE_TYPES.md              # Complete guide to all 8 tile types
│   ├── TESTING.md                 # Testing guide
│   ├── VERSION.md                 # Version history
│   └── ... (more documentation)
│
├── assets/
│   └── css/
│       └── styles.css             # Global styles with SAP Fiori theme
│
└── js/
    ├── app.js                     # Application bootstrap
    ├── router.js                  # Client-side routing
    │
    ├── utils/
    │   ├── data-processor.js      # State management & data transformations
    │   ├── excel-handler.js       # Excel import/export logic
    │   └── chart-utils.js         # Chart.js helper functions
    │
    └── views/
        ├── upload-view.js         # File upload page
        ├── dashboard-view.js      # Charts and KPIs
        ├── data-view.js           # Data table with sorting/filtering
        └── about-view.js          # Application information
```

## How to Use

### 1. Upload Data

1. Navigate to the **Upload** page (default landing page)
2. Click "Choose Excel File"
3. Select an Excel file (.xlsx or .xls) from your computer
   - Maximum file size: 10MB
   - File must contain at least one sheet with data
4. Click "Process File"
5. You'll be automatically redirected to the Dashboard

### 2. View Dashboard

The Dashboard displays:
- **KPI Cards**: Total rows, columns, and calculated metrics
- **Bar Chart**: Visual comparison of data points
- **Line Chart**: Trend visualization
- **Pie Chart**: Data distribution

Click "Export to Excel" to download the complete dataset.

### 3. Explore Data Table

The Data Table view allows you to:
- **Sort**: Click column headers to sort ascending/descending
- **Search**: Use the search box to filter data
- **Export**: Download the current filtered/sorted view

### 4. Learn More

Visit the **About** page for detailed information about features and technology.

## File Requirements

Excel files should meet these requirements:

- **Format**: .xlsx or .xls
- **Size**: Maximum 10MB
- **Structure**: At least one sheet with data
- **Headers**: First row should contain column names
- **Data**: At least one row of data

## Example Data Structure

Your Excel file might look like this:

| Product  | Category    | Sales | Profit | Date       |
|----------|-------------|-------|--------|------------|
| Laptop   | Electronics | 1200  | 300    | 2024-01-15 |
| Phone    | Electronics | 800   | 200    | 2024-01-16 |
| Desk     | Furniture   | 450   | 120    | 2024-01-18 |

## Development

### Architecture

The application follows a modular architecture:

1. **App Bootstrap** (`app.js`): Initializes the application and imports UI5 components
2. **Router** (`router.js`): Handles hash-based routing and navigation
3. **Views** (`.js`): Each view renders its own HTML and attaches event handlers
4. **Utilities**: Reusable functions for data processing, Excel handling, and charts
5. **State**: Simple global object (`window.appState`) for state management

### Adding a New View

1. Create a new file in `js/views/` (e.g., `my-view.js`)
2. Export a `showMyView()` function
3. Add the route in `js/router.js`
4. Add a navigation item in `index.html`

Example:
```javascript
// js/views/my-view.js
export function showMyView() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="view-container">
      <ui5-title level="H2">My View</ui5-title>
      <!-- Your content here -->
    </div>
  `;
}
```

## Deployment

### Static Hosting

Since this is a pure client-side application with no build step, you can deploy it to any static hosting service:

- **GitHub Pages**: Push to a `gh-pages` branch
- **Netlify**: Drag and drop the project folder
- **Vercel**: Connect your repository
- **AWS S3 + CloudFront**: Upload files to S3 bucket
- **Azure Static Web Apps**: Deploy from GitHub

### Example: GitHub Pages

```bash
# Create a new repository on GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/sapui5-dashboard.git
git push -u origin main

# Enable GitHub Pages in repository settings
# Set source to main branch, root directory
# Your app will be available at: https://yourusername.github.io/sapui5-dashboard/
```

## Performance

- **Bundle Size**: ~1-1.1MB total (CDN-cached)
  - UI5 Web Components: ~150-200KB
  - Chart.js: ~60KB
  - SheetJS: ~800KB
  - Navigo: ~10KB
- **Load Time**: Typically < 2 seconds on modern connections
- **Data Handling**: Optimized for datasets up to 10,000 rows

## Privacy & Security

- **Client-Side Only**: All processing happens in your browser
- **No Server**: No data is sent to any server
- **No Tracking**: No analytics or telemetry
- **Local Files**: Your data never leaves your device
- **No Storage**: Data is not saved in localStorage or cookies

## Troubleshooting

### Application doesn't load

- Check browser console for errors
- Verify you're using a supported browser (Chrome/Firefox/Safari/Edge with Import Maps support)
- Ensure you're serving the app via HTTP (not file://)

### File upload fails

- Check file format (.xlsx or .xls only)
- Verify file size is under 10MB
- Ensure file contains at least one sheet with data
- Check browser console for specific error message

### Charts don't display

- Verify your data has numeric columns
- Check browser console for Chart.js errors
- Ensure canvas elements are rendering

### Export doesn't work

- Check that SheetJS library loaded correctly
- Verify browser allows downloads
- Check browser console for export errors

## Contributing

This is a demonstration project. Feel free to:

- Fork the repository
- Make improvements
- Submit pull requests
- Report issues

## Design Principles

This application follows a hybrid UI framework approach:

- **UI5 Web Components**: Used for shell, tiles, cards, and forms
- **Classic OpenUI5**: Used exclusively for tables
- **Chart.js**: Used for all data visualizations
- **Pure CSS**: Custom styling for layouts and components

This approach leverages the strengths of each library while maintaining simplicity and performance.

## Future Enhancements

Potential features for future versions:

- **Data Persistence**: Save recent files in localStorage
- **Advanced Filtering**: Multi-column filters, date ranges
- **Chart Export**: Download charts as PNG images
- **Dark Mode**: Theme toggle
- **Multi-File Support**: Compare multiple datasets
- **Virtual Scrolling**: Handle datasets with 100,000+ rows

## License

MIT License - Feel free to use this project for learning and development.

## Support

For questions or issues:

1. Check the **About** page within the application
2. Review the `docs/design.md` file for detailed architecture
3. Check the `docs/requirements.md` file for original specifications
4. See `docs/TESTING.md` for testing guide
5. See `docs/TILE_TYPES.md` for complete tile documentation
6. Open an issue on GitHub

## Credits

Built with:

- [SAP UI5 Web Components](https://sap.github.io/ui5-webcomponents/)
- [Chart.js](https://www.chartjs.org/)
- [ExcelJS](https://github.com/exceljs/exceljs)
- [Navigo](https://github.com/krasimir/navigo)

---

**Happy Data Analyzing!** 📊✨
