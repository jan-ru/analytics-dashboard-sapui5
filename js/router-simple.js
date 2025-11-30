/**
 * Router (Simplified version)
 */

import { showUploadViewSimple } from './views/upload-view-simple.js';
import { showDashboardViewSimple } from './views/dashboard-view-simple.js';
import { showDataViewSimple } from './views/data-view-simple.js';
import { showAboutViewSimple } from './views/about-view-simple.js';
import { showGraphsViewSimple } from './views/graphs-view-simple.js';
import { showTilesViewSimple } from './views/tiles-view-simple.js';
import { showChartTypesViewSimple } from './views/chart-types-view-simple.js';
import { showSapIconsViewSimple } from './views/sap-icons-view-simple.js';
import { showSapColorsViewSimple } from './views/sap-colors-view-simple.js';
import { ROUTES, MESSAGES } from './constants.js';
import { showError } from './utils/toast.js';

let router;

/**
 * Higher-order function to require data before showing view
 */
function requireData(viewFunction) {
  return () => {
    if (!window.appState.currentData) {
      showError(MESSAGES.UPLOAD_REQUIRED);
      router.navigate(ROUTES.UPLOAD);
    } else {
      viewFunction();
    }
  };
}

/**
 * Initialize the router
 */
export function initRouter() {
  router = new Navigo('/', { hash: true });

  router.on({
    [ROUTES.HOME]: () => showUploadViewSimple(),
    [ROUTES.UPLOAD]: () => showUploadViewSimple(),
    [ROUTES.DASHBOARD]: requireData(showDashboardViewSimple),
    [ROUTES.GRAPHS]: requireData(showGraphsViewSimple),
    [ROUTES.CHART_TYPES]: requireData(showChartTypesViewSimple),
    [ROUTES.TILES]: requireData(showTilesViewSimple),
    [ROUTES.SAP_ICONS]: () => showSapIconsViewSimple(),
    [ROUTES.SAP_COLORS]: () => showSapColorsViewSimple(),
    [ROUTES.DATA]: requireData(showDataViewSimple),
    [ROUTES.ABOUT]: () => showAboutViewSimple()
  });

  router.resolve();
}

/**
 * Navigate to a route
 */
export function navigateTo(route) {
  if (router) {
    router.navigate(route);
  }
}
