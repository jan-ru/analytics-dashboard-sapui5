/**
 * Application Bootstrap
 * Initializes the application and dynamically loads UI5 Web Components
 */

// Import application modules
import { initRouter } from './router.js';
import { initAppState } from './utils/data-processor.js';

/**
 * Load UI5 Web Components dynamically
 */
async function loadUI5Components() {
  const BASE = 'https://cdn.jsdelivr.net/npm/@ui5/webcomponents@1.24.0/dist/';
  const BASE_FIORI = 'https://cdn.jsdelivr.net/npm/@ui5/webcomponents-fiori@1.24.0/dist/';

  const components = [
    `${BASE}Button.js`,
    `${BASE}Title.js`,
    `${BASE}Label.js`,
    `${BASE}Card.js`,
    `${BASE}CardHeader.js`,
    `${BASE}Table.js`,
    `${BASE}TableColumn.js`,
    `${BASE}TableRow.js`,
    `${BASE}TableCell.js`,
    `${BASE}Input.js`,
    `${BASE}FileUploader.js`,
    `${BASE}MessageStrip.js`,
    `${BASE}BusyIndicator.js`,
    `${BASE_FIORI}ShellBar.js`,
    `${BASE_FIORI}SideNavigation.js`,
    `${BASE_FIORI}SideNavigationItem.js`
  ];

  try {
    await Promise.all(components.map(url => import(url)));
    console.log('✅ UI5 Web Components loaded successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to load UI5 Web Components:', error);
    return false;
  }
}

/**
 * Check browser compatibility
 */
function checkBrowserCompatibility() {
  // Check for Import Maps support
  if (!HTMLScriptElement.supports || !HTMLScriptElement.supports('importmap')) {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        <div style="padding: 2rem; text-align: center; font-family: Arial, sans-serif;">
          <h1>Browser Not Supported</h1>
          <p>This application requires a modern browser with Import Maps support.</p>
          <p>Please use one of the following browsers:</p>
          <ul style="list-style: none; padding: 0;">
            <li>Chrome 89+ (March 2021)</li>
            <li>Firefox 87+ (March 2021)</li>
            <li>Safari 14.1+ (April 2021)</li>
            <li>Edge 89+ (March 2021)</li>
          </ul>
        </div>
      `;
    }
    return false;
  }
  return true;
}

/**
 * Initialize the application
 */
async function initApp() {
  console.log('🚀 Analytics Dashboard starting...');

  // Check browser compatibility
  if (!checkBrowserCompatibility()) {
    console.error('Browser not supported');
    return;
  }

  // Load UI5 Web Components
  console.log('📦 Loading UI5 Web Components...');
  const componentsLoaded = await loadUI5Components();

  if (!componentsLoaded) {
    console.error('Failed to load UI5 Web Components');
    document.getElementById('app').innerHTML = `
      <div style="padding: 2rem; text-align: center;">
        <h1>Failed to Load Components</h1>
        <p>Could not load UI5 Web Components. Please check your internet connection and try again.</p>
        <button onclick="location.reload()">Reload Page</button>
      </div>
    `;
    return;
  }

  // Initialize application state
  initAppState();

  // Initialize router
  initRouter();

  console.log('✅ Application initialized successfully');
  console.log('📊 Ready to analyze data!');
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Application error:', event.error);
});

// Global unhandled rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
