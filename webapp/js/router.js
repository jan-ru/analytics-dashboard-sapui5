/**
 * Router
 * Handles client-side routing with Navigo
 */

import { showUploadView } from './views/upload-view.js';
import { showDashboardView } from './views/dashboard-view.js';
import { showDataView } from './views/data-view.js';
import { showAboutView } from './views/about-view.js';

let router;

/**
 * Initialize the router
 */
export function initRouter() {
  // Create Navigo instance with hash-based routing
  router = new Navigo('/', { hash: true });

  // Define routes
  router.on({
    '/': () => {
      updateSideNavSelection('/upload');
      showUploadView();
    },
    '/upload': () => {
      updateSideNavSelection('/upload');
      showUploadView();
    },
    '/dashboard': () => {
      if (!window.appState.currentData) {
        console.warn('No data available, redirecting to upload');
        showWarning('Please upload a file first');
        router.navigate('/upload');
      } else {
        updateSideNavSelection('/dashboard');
        showDashboardView();
      }
    },
    '/data': () => {
      if (!window.appState.currentData) {
        console.warn('No data available, redirecting to upload');
        showWarning('Please upload a file first');
        router.navigate('/upload');
      } else {
        updateSideNavSelection('/data');
        showDataView();
      }
    },
    '/about': () => {
      updateSideNavSelection('/about');
      showAboutView();
    }
  });

  // Set up side navigation handlers
  configureSideNav();

  // Resolve initial route
  router.resolve();

  console.log('Router initialized');
}

/**
 * Configure side navigation click handlers
 */
function configureSideNav() {
  const sideNav = document.querySelector('ui5-side-navigation');

  if (sideNav) {
    sideNav.addEventListener('selection-change', (event) => {
      const item = event.detail.item;
      const route = item.getAttribute('data-route');
      if (route) {
        navigateTo(route);
      }
    });
  }
}

/**
 * Update side navigation selection
 * @param {string} route - Route path
 */
function updateSideNavSelection(route) {
  const sideNav = document.querySelector('ui5-side-navigation');
  if (!sideNav) return;

  const items = sideNav.querySelectorAll('ui5-side-navigation-item');
  items.forEach(item => {
    const itemRoute = item.getAttribute('data-route');
    if (itemRoute === route) {
      item.selected = true;
    } else {
      item.selected = false;
    }
  });
}

/**
 * Navigate to a specific route
 * @param {string} route - Route path
 */
export function navigateTo(route) {
  if (router) {
    router.navigate(route);
  }
}

/**
 * Show warning message (for route guards)
 * @param {string} message - Warning message
 */
function showWarning(message) {
  const content = document.getElementById('content');
  if (content) {
    const messageHtml = `
      <div class="view-container">
        <ui5-message-strip design="Warning">${message}</ui5-message-strip>
      </div>
    `;
    content.innerHTML = messageHtml;
  }
}

/**
 * Get current route
 * @returns {string} - Current route path
 */
export function getCurrentRoute() {
  return router ? router.getCurrentLocation().url : '/';
}
