/**
 * Router (OpenUI5 Router version)
 */

import { showUploadViewSimple } from './views/upload-view-simple.js';
import { showDashboardViewSimple } from './views/dashboard-view-simple.js';
import { showDataViewSimple } from './views/data-view-simple.js';
import { showAboutViewSimple } from './views/about-view-simple.js';
import { showTilesViewSimple } from './views/tiles-view-simple.js';
import { showChartTypesViewSimple } from './views/chart-types-view-simple.js';
import { showUi5ComponentsViewSimple } from './views/ui5-components-view-simple.js';
import { showSapIconsViewSimple } from './views/sap-icons-view-simple.js';
import { showSapColorsViewSimple } from './views/sap-colors-view-simple.js';
import { ROUTES, MESSAGES } from './constants.js';
import { showError } from './utils/toast.js';

let router;
let hashChanger;

/**
 * Higher-order function to require data before showing view
 */
function requireData(viewFunction) {
  return () => {
    if (!window.appState.currentData) {
      showError(MESSAGES.UPLOAD_REQUIRED);
      navigateTo(ROUTES.UPLOAD);
    } else {
      viewFunction();
    }
  };
}

/**
 * Route configuration
 */
const routeConfig = {
  [ROUTES.HOME]: () => showUploadViewSimple(),
  [ROUTES.UPLOAD]: () => showUploadViewSimple(),
  [ROUTES.DASHBOARD]: requireData(showDashboardViewSimple),
  [ROUTES.CHART_TYPES]: requireData(showChartTypesViewSimple),
  [ROUTES.TILES]: requireData(showTilesViewSimple),
  [ROUTES.UI5_COMPONENTS]: () => showUi5ComponentsViewSimple(),
  [ROUTES.SAP_ICONS]: () => showSapIconsViewSimple(),
  [ROUTES.SAP_COLORS]: () => showSapColorsViewSimple(),
  [ROUTES.DATA]: requireData(showDataViewSimple),
  [ROUTES.ABOUT]: () => showAboutViewSimple()
};

/**
 * Handle hash change
 */
function handleHashChange(hash) {
  // Remove leading # or #/ from hash
  const cleanHash = hash.replace(/^#\/?/, '');
  const route = cleanHash ? `/${cleanHash}` : '/';

  console.log('Route changed:', route);

  // Find and execute the route handler
  const handler = routeConfig[route];
  if (handler) {
    handler();
  } else {
    console.warn('Unknown route:', route);
    showError('Page not found');
    navigateTo(ROUTES.HOME);
  }
}

/**
 * Initialize the router using OpenUI5 HashChanger
 */
export function initRouter() {
  console.log('🔀 Initializing OpenUI5 Router...');

  // Wait for OpenUI5 to be ready
  sap.ui.require(['sap/ui/core/routing/HashChanger'], function(HashChanger) {
    // Get the HashChanger instance
    hashChanger = HashChanger.getInstance();

    // Set up event listener for hash changes
    hashChanger.attachEvent('hashChanged', function(oEvent) {
      const newHash = oEvent.getParameter('newHash');
      handleHashChange(newHash);
    });

    // Initialize with current hash
    const currentHash = hashChanger.getHash();
    if (!currentHash) {
      // No hash, navigate to home
      hashChanger.setHash('upload');
    } else {
      handleHashChange(currentHash);
    }

    console.log('✅ OpenUI5 Router initialized');
  });
}

/**
 * Navigate to a route
 */
export function navigateTo(route) {
  if (hashChanger) {
    // Remove leading slash for hash
    const hash = route.replace(/^\//, '');
    hashChanger.setHash(hash);
  } else {
    // Fallback to window.location.hash
    window.location.hash = route;
  }
}
