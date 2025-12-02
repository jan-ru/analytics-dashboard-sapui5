# Analytics Dashboard - Enterprise (SAPUI5)

**Full-featured enterprise analytics dashboard** built with SAPUI5 framework using the Model-View-Controller (MVC) pattern and FlexibleColumnLayout for responsive navigation.

> 💡 **Looking for a simpler version?** Check out [analytics-dashboard-legacy](https://github.com/yourusername/analytics-dashboard-legacy) for the lightweight UI5 Web Components version with zero build tools.

## Features

- **Excel File Upload**: Upload .xlsx or .xls files directly from your local filesystem
- **FlexibleColumnLayout Navigation**: SAP Fiori 3-column responsive layout pattern
- **Interactive Dashboard**: View your data through KPI cards and analytics
- **Chart Types Showcase**: Demonstrations of various chart types and patterns
- **SAP Fiori Tiles**: Complete tile showcase with various tile types
- **UI5 Components Gallery**: Interactive demos of SAPUI5 controls
- **SAP Icons Browser**: Browse and explore 100+ SAP UI5 icon codes
- **SAP Color Palette**: Explore SAP Fiori color schemes
- **Data Table with Drill-Down**: Sort, filter, and drill into data details
- **Excel Export**: Export your data back to Excel with formatting
- **Fully Client-Side**: All processing happens in your browser
- **Responsive Design**: Adaptive layout for desktop, tablet, and mobile

## Technology Stack

- **UI Framework**: [SAPUI5 1.108+](https://sdk.openui5.org/)
- **Architecture**: Model-View-Controller (MVC)
- **Layout**: FlexibleColumnLayout (sap.f library)
- **Routing**: sap.f.routing.Router
- **Components**: sap.m, sap.f, sap.ui.table, sap.ui.unified
- **Excel Processing**: [ExcelJS v4.4.0](https://github.com/exceljs/exceljs)
- **Build Tools**: UI5 Tooling / SAP Fiori tools
- **Development**: Component-based architecture with XML views

## Quick Start

### Prerequisites

- Node.js 14+ (for development server)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sapui5
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run start-noflp
   ```

4. **Open your browser**
   ```
   http://localhost:8082
   ```

5. **Upload an Excel file and start analyzing!**

### Available Scripts

- `npm run start-noflp` - Start development server without Fiori Launchpad
- `npm run build` - Build the application for production
- `npm run test` - Run unit tests (if configured)

## Project Structure

```
sapui5/webapp/
├── index.html                          # Application entry point
├── Component.js                        # Root component
├── manifest.json                       # Application descriptor
│
├── controller/                         # MVC Controllers
│   ├── App.controller.js              # Root controller with FCL logic
│   ├── Master.controller.js           # Navigation sidebar controller
│   ├── Upload.controller.js           # File upload controller
│   ├── Dashboard.controller.js        # Dashboard view controller
│   ├── Data.controller.js             # Data table controller
│   ├── DataDetail.controller.js       # Detail view controller
│   └── ... (other controllers)
│
├── view/                               # XML Views
│   ├── App.view.xml                   # Root view with FlexibleColumnLayout
│   ├── Master.view.xml                # Navigation sidebar
│   ├── Upload.view.xml                # File upload page
│   ├── Dashboard.view.xml             # Analytics dashboard
│   ├── Data.view.xml                  # Data table
│   ├── DataDetail.view.xml            # Row detail view
│   └── ... (other views)
│
├── css/
│   └── style.css                      # Application styles
│
├── i18n/
│   ├── i18n.properties                # Resource bundle (default)
│   └── i18n_en.properties             # English translations
│
└── docs/                              # Documentation
    ├── requirements.md
    ├── design.md
    └── ...
```

## Architecture

### SAPUI5 MVC Pattern

This application follows the standard SAPUI5 MVC architecture:

- **Model**: JSON models for application data (`appData` model)
- **View**: XML views for declarative UI definition
- **Controller**: JavaScript controllers for business logic

### FlexibleColumnLayout

The app uses SAP Fiori's FlexibleColumnLayout pattern:

- **Begin Column**: Navigation sidebar (Master view)
- **Mid Column**: Main content views (Upload, Dashboard, Data, etc.)
- **End Column**: Detail views (e.g., data row details)

### Component-Based

- Root component (`Component.js`) manages app initialization
- `manifest.json` defines app configuration, routing, and models
- Routing handled by `sap.f.routing.Router` for FCL support

## How to Use

### 1. Upload Data

1. Click **Upload** in the navigation menu
2. Select an Excel file (.xlsx or .xls)
3. Click "Process File"
4. Data will be loaded and you'll be redirected to the Dashboard

### 2. Navigate Views

Use the navigation menu on the left to explore:

- **Upload**: Import Excel files
- **Dashboard**: View analytics and KPIs
- **Chart Types**: Explore chart patterns
- **Tiles**: SAP Fiori tile showcase
- **UI5 Components**: SAPUI5 controls gallery
- **SAP Icons**: Icon browser
- **SAP Colors**: Color palette explorer
- **Data**: Table view with sorting and filtering
- **About**: Application information

### 3. Data Table

In the Data view:
- Click column headers to sort
- Use search to filter rows
- Click a row to view details in the right panel
- Export data to Excel

### 4. Responsive Layout

The FlexibleColumnLayout automatically adapts:
- **Desktop**: 2 or 3 columns visible
- **Tablet**: 1-2 columns with navigation
- **Mobile**: Single column with back navigation

## Development

### Adding a New View

1. **Create the view**: `webapp/view/MyView.view.xml`
   ```xml
   <mvc:View
     controllerName="analytics.dashboard.controller.MyView"
     xmlns="sap.m"
     xmlns:mvc="sap.ui.core.mvc">
     <Page title="My View">
       <!-- Content -->
     </Page>
   </mvc:View>
   ```

2. **Create the controller**: `webapp/controller/MyView.controller.js`
   ```javascript
   sap.ui.define([
     "sap/ui/core/mvc/Controller"
   ], function (Controller) {
     "use strict";
     return Controller.extend("analytics.dashboard.controller.MyView", {
       onInit: function () {
         // Initialization
       }
     });
   });
   ```

3. **Add routing** in `manifest.json`:
   ```json
   {
     "pattern": "myview",
     "name": "myView",
     "target": ["master", "myView"]
   }
   ```

4. **Add target** in `manifest.json`:
   ```json
   {
     "myView": {
       "type": "View",
       "id": "myView",
       "name": "MyView",
       "level": 1,
       "controlAggregation": "midColumnPages"
     }
   }
   ```

5. **Add navigation** in `Master.view.xml` and `Master.controller.js`

### Debugging

Enable debug mode:
```
http://localhost:8082/index.html?sap-ui-debug=true
```

View diagnostics:
- Press `Ctrl+Alt+Shift+S` to open Support Assistant
- Press `Ctrl+Alt+Shift+P` to enable UI5 Inspector

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deploy to SAP Business Technology Platform

1. Install Cloud Foundry CLI
2. Login to your BTP account
3. Deploy:
   ```bash
   cf push
   ```

### Static Hosting

Deploy the `webapp/` folder to any static hosting service:
- **SAP BTP**: cf push or HTML5 Application Repository
- **Netlify**: Drag and drop or connect repository
- **Vercel**: Import project
- **GitHub Pages**: Enable in repository settings
- **AWS S3**: Upload to S3 bucket with static hosting

## Browser Requirements

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## File Requirements

Excel files should:
- Be in .xlsx or .xls format
- Have maximum size of 10MB
- Contain at least one sheet with data
- Have headers in the first row

## Troubleshooting

### Application doesn't load
- Check browser console for errors
- Verify Node.js and npm are installed
- Run `npm install` to ensure dependencies are installed
- Check that port 8082 is not in use

### FlexibleColumnLayout not showing
- Check CSS is loading correctly
- Verify viewport units (vh/vw) are supported
- Check that Component.js is calling `placeAt()`

### Views not rendering
- Check manifest.json routing configuration
- Verify controlAggregation settings
- Check that all view and controller files exist

### Excel upload fails
- Verify ExcelJS library is loaded
- Check file format and size
- Review browser console for specific errors

## Performance

- **Initial Load**: ~2-3 seconds (CDN-cached UI5 libraries)
- **File Processing**: Handles up to 10,000 rows efficiently
- **Navigation**: Instant view transitions with routing
- **Memory**: Optimized for datasets up to 50MB

## Privacy & Security

- **Client-Side Only**: No server communication required
- **No Tracking**: No analytics or telemetry
- **Local Processing**: All data stays in your browser
- **No Persistence**: Data not saved between sessions

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Design Principles

This application follows SAP Fiori design guidelines:
- **Responsive**: Adapts to all screen sizes
- **Role-Based**: Clear navigation and workflows
- **Coherent**: Consistent design patterns
- **Simple**: Focus on user tasks
- **Delightful**: Smooth animations and interactions

## Comparison: Enterprise vs. Legacy

| Feature | Enterprise (This Version) | Legacy (Web Components) |
|---------|-------------------------|-------------------------|
| **Setup** | npm install, build tools | Zero config, CDN-based |
| **Architecture** | MVC, component-based | Procedural, direct DOM |
| **UI Framework** | SAPUI5 1.108+ | UI5 Web Components v1.24 |
| **Navigation** | FlexibleColumnLayout | Simple hash routing |
| **Build Tools** | ✅ UI5 Tooling | ❌ None required |
| **i18n** | ✅ Full i18n support | ❌ Not supported |
| **Routing** | Advanced with targets | Basic hash-based |
| **State Management** | Component models | Global object |
| **Drill-Down** | ✅ 3-column detail views | ❌ Single level |
| **Best For** | Enterprise applications | Prototypes, simple apps |
| **Learning Curve** | ⭐⭐⭐ Moderate | ⭐ Easy |

## Related Repositories

- **[analytics-dashboard-legacy](https://github.com/yourusername/analytics-dashboard-legacy)** - Simple UI5 Web Components version
- **[analytics-dashboard-shared](https://github.com/yourusername/analytics-dashboard-shared)** - Shared utilities package

Both versions share the same core business logic through the shared utilities package.

## License

MIT License - Free to use for learning and development

## Resources

- [SAPUI5 Documentation](https://sdk.openui5.org/)
- [SAP Fiori Design Guidelines](https://experience.sap.com/fiori-design/)
- [UI5 Tooling](https://sap.github.io/ui5-tooling/)
- [FlexibleColumnLayout](https://sdk.openui5.org/api/sap.f.FlexibleColumnLayout)

## Credits

Built with:
- [SAPUI5](https://sdk.openui5.org/)
- [ExcelJS](https://github.com/exceljs/exceljs)
- [SAP Fiori Tools](https://help.sap.com/viewer/product/SAP_FIORI_tools/Latest/)

---

**Happy Analyzing!** 📊✨
