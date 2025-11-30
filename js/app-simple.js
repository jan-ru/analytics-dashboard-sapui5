/**
 * Application Bootstrap (Simplified version with UI5 Web Components)
 */

import { initRouter } from './router-simple.js';
import { initAppState } from './utils/data-processor.js';

/**
 * Initialize the application
 */
async function initApp() {
  console.log('🚀 Analytics Dashboard starting...');

  // Wait for OpenUI5 core to be ready
  await waitForOpenUI5();

  // UI5 Web Components are loaded via HTML script tags
  console.log('📦 UI5 Web Components loading from HTML...');

  // Initialize application state
  initAppState();

  // Initialize router (OpenUI5 Router)
  initRouter();

  // Set up navigation
  setupNavigation();

  console.log('✅ Application initialized successfully');
  console.log('📊 Ready to analyze data!');
}

/**
 * Wait for OpenUI5 core to be ready (with timeout)
 */
function waitForOpenUI5() {
  return new Promise((resolve) => {
    let resolved = false;

    // Set a timeout to prevent infinite waiting
    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        console.warn('⚠️ OpenUI5 Core timeout - continuing anyway');
        resolve();
      }
    }, 3000); // 3 second timeout

    if (window.sap && window.sap.ui) {
      sap.ui.getCore().attachInit(function() {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          console.log('✅ OpenUI5 Core ready');
          resolve();
        }
      });
    } else {
      // Immediate fallback if sap.ui not available
      if (!resolved) {
        resolved = true;
        clearTimeout(timeout);
        console.log('✅ OpenUI5 not found - continuing without it');
        resolve();
      }
    }
  });
}

/**
 * Set up sidebar navigation
 */
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const route = item.getAttribute('data-route');

      // Update active state
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      // Navigate
      window.location.hash = route;
    });
  });
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
