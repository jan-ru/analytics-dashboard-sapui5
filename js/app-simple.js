/**
 * Application Bootstrap (Simplified version without UI5 Web Components)
 */

import { initRouter } from './router-simple.js';
import { initAppState } from './utils/data-processor.js';

/**
 * Initialize the application
 */
function initApp() {
  console.log('🚀 Analytics Dashboard starting...');

  // Initialize application state
  initAppState();

  // Initialize router
  initRouter();

  // Set up navigation
  setupNavigation();

  console.log('✅ Application initialized successfully');
  console.log('📊 Ready to analyze data!');
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
