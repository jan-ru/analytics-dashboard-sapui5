/**
 * Toast Notification System
 * Non-blocking UI notifications to replace alert() dialogs
 */

import { TIMING, TOAST_TYPES, SAP_COLORS } from '../constants.js';

/**
 * Show a toast notification
 * @param {string} message - The message to display
 * @param {string} type - Type of toast (success, error, info, warning)
 * @param {number} duration - Duration in milliseconds (default: 3000)
 */
export function showToast(message, type = TOAST_TYPES.INFO, duration = TIMING.TOAST_DURATION) {
  // Create toast container if it doesn't exist
  let container = document.getElementById('toast-container');
  if (!container) {
    container = createToastContainer();
  }

  // Create toast element
  const toast = createToastElement(message, type);
  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  // Auto-remove after duration
  setTimeout(() => {
    hideToast(toast);
  }, duration);

  // Click to dismiss
  toast.addEventListener('click', () => {
    hideToast(toast);
  });
}

/**
 * Create the toast container (only once)
 */
function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: 10px;
    pointer-events: none;
  `;
  document.body.appendChild(container);
  return container;
}

/**
 * Create a toast element
 */
function createToastElement(message, type) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const config = getToastConfig(type);

  toast.style.cssText = `
    background: ${config.background};
    color: ${config.color};
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 300px;
    max-width: 500px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    opacity: 0;
    transform: translateX(400px);
    transition: all ${TIMING.TOAST_FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: auto;
    border-left: 4px solid ${config.borderColor};
  `;

  // Add icon
  const icon = document.createElement('span');
  icon.textContent = config.icon;
  icon.style.fontSize = '1.5rem';
  toast.appendChild(icon);

  // Add message
  const messageEl = document.createElement('span');
  messageEl.textContent = message;
  messageEl.style.flex = '1';
  toast.appendChild(messageEl);

  // Add close button
  const closeBtn = document.createElement('span');
  closeBtn.textContent = '×';
  closeBtn.style.cssText = `
    font-size: 1.5rem;
    line-height: 1;
    opacity: 0.7;
    cursor: pointer;
  `;
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    hideToast(toast);
  });
  toast.appendChild(closeBtn);

  return toast;
}

/**
 * Get toast configuration based on type
 */
function getToastConfig(type) {
  const configs = {
    [TOAST_TYPES.SUCCESS]: {
      background: '#e8f5e9',
      color: '#1b5e20',
      borderColor: SAP_COLORS.GREEN,
      icon: '✅'
    },
    [TOAST_TYPES.ERROR]: {
      background: '#ffebee',
      color: '#c62828',
      borderColor: SAP_COLORS.RED,
      icon: '❌'
    },
    [TOAST_TYPES.WARNING]: {
      background: '#fff3e0',
      color: '#e65100',
      borderColor: SAP_COLORS.ORANGE,
      icon: '⚠️'
    },
    [TOAST_TYPES.INFO]: {
      background: '#e3f2fd',
      color: '#0d47a1',
      borderColor: SAP_COLORS.BLUE,
      icon: 'ℹ️'
    }
  };

  return configs[type] || configs[TOAST_TYPES.INFO];
}

/**
 * Hide and remove a toast
 */
function hideToast(toast) {
  toast.classList.remove('show');
  toast.style.opacity = '0';
  toast.style.transform = 'translateX(400px)';

  setTimeout(() => {
    toast.remove();
  }, TIMING.TOAST_FADE_DURATION);
}

/**
 * Convenience methods for different toast types
 */
export function showSuccess(message, duration) {
  showToast(message, TOAST_TYPES.SUCCESS, duration);
}

export function showError(message, duration) {
  showToast(message, TOAST_TYPES.ERROR, duration);
}

export function showWarning(message, duration) {
  showToast(message, TOAST_TYPES.WARNING, duration);
}

export function showInfo(message, duration) {
  showToast(message, TOAST_TYPES.INFO, duration);
}
