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

  console.log('📍 Route changed:', route);

  // DEBUG: Check content element before routing
  const content = document.getElementById('content');
  console.log('🔍 Content element check:', {
    exists: !!content,
    element: content,
    offsetParent: content?.offsetParent,
    dimensions: {
      offsetWidth: content?.offsetWidth,
      offsetHeight: content?.offsetHeight,
      clientWidth: content?.clientWidth,
      clientHeight: content?.clientHeight
    },
    computedStyle: content ? {
      display: window.getComputedStyle(content).display,
      visibility: window.getComputedStyle(content).visibility,
      opacity: window.getComputedStyle(content).opacity
    } : null
  });

  // Find and execute the route handler
  const handler = routeConfig[route];
  if (handler) {
    try {
      console.log('🎯 Executing route handler for:', route);
      handler();
      console.log('✅ Route handler completed for:', route);

      // DEBUG: Check content after route handler execution
      setTimeout(() => {
        const contentAfter = document.getElementById('content');
        console.log('🔍 Content element after handler (100ms later):', {
          exists: !!contentAfter,
          childElementCount: contentAfter?.childElementCount,
          innerHTML_length: contentAfter?.innerHTML.length,
          firstChild: contentAfter?.firstChild
        });
      }, 100);
    } catch (error) {
      console.error('❌ Route handler error:', error);
      showError('Failed to load page: ' + error.message);
    }
  } else {
    console.warn('❓ Unknown route:', route);
    showError('Page not found');
    navigateTo(ROUTES.HOME);
  }
}

/**
 * Initialize the router using OpenUI5 HashChanger (with fallback)
 */
export function initRouter() {
  console.log('🔀 Initializing OpenUI5 Router...');

  // Check if OpenUI5 is available
  if (!window.sap || !window.sap.ui) {
    console.warn('⚠️ OpenUI5 not available - using fallback router');
    initFallbackRouter();
    return;
  }

  // Try to use OpenUI5 HashChanger with timeout
  const timeout = setTimeout(() => {
    console.warn('⚠️ OpenUI5 Router timeout - using fallback');
    initFallbackRouter();
  }, 2000);

  try {
    sap.ui.require(['sap/ui/core/routing/HashChanger'], function(HashChanger) {
      clearTimeout(timeout);

      // Get the HashChanger instance
      hashChanger = HashChanger.getInstance();

      // Set up event listener for hash changes
      hashChanger.attachEvent('hashChanged', function(oEvent) {
        const newHash = oEvent.getParameter('newHash');
        console.log('🔔 HashChanged event:', newHash);
        handleHashChange(newHash);
      });

      // Initialize with current hash
      const currentHash = hashChanger.getHash();
      console.log('🔍 Current hash on init:', currentHash);

      if (!currentHash) {
        // No hash, set to upload and handle immediately
        console.log('📝 Setting initial hash to: upload');
        hashChanger.setHash('upload');
        // Manually trigger the route handler since event might not fire on initial set
        handleHashChange('upload');
      } else {
        // Handle current hash immediately
        console.log('📝 Handling existing hash:', currentHash);
        handleHashChange(currentHash);
      }

      console.log('✅ OpenUI5 Router initialized');
    });
  } catch (error) {
    clearTimeout(timeout);
    console.error('❌ OpenUI5 Router error:', error);
    initFallbackRouter();
  }
}

/**
 * Fallback router using plain window.location.hash
 */
function initFallbackRouter() {
  console.log('🔀 Using fallback hash router...');

  // Listen to hash changes
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1); // Remove #
    handleHashChange(hash);
  });

  // Initialize with current hash
  const currentHash = window.location.hash.substring(1);
  if (!currentHash) {
    window.location.hash = '#upload';
  } else {
    handleHashChange(currentHash);
  }

  console.log('✅ Fallback Router initialized');
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
