/**
 * SAP Color Schemes View
 * Displays SAP Fiori color palettes and usage guidelines
 */

import { SAP_COLORS } from '../constants.js';

export function showSapColorsViewSimple() {
  const content = document.getElementById('content');

  // SAP Fiori Color Palette
  const colorSchemes = [
    {
      name: 'Primary Blue',
      description: 'Main brand color for primary actions and highlights',
      colors: [
        { name: 'Blue Dark', hex: SAP_COLORS.BLUE_DARK, usage: 'Hover states, emphasis' },
        { name: 'Blue', hex: SAP_COLORS.BLUE, usage: 'Primary actions, links' },
        { name: 'Blue Light', hex: SAP_COLORS.BLUE_LIGHT, usage: 'Backgrounds, subtle highlights' }
      ]
    },
    {
      name: 'Success Green',
      description: 'Positive states, success messages, confirmations',
      colors: [
        { name: 'Green', hex: SAP_COLORS.GREEN, usage: 'Success states, positive indicators' },
        { name: 'Green Light', hex: SAP_COLORS.GREEN_LIGHT, usage: 'Success backgrounds' }
      ]
    },
    {
      name: 'Warning Orange',
      description: 'Warning states, attention-required indicators',
      colors: [
        { name: 'Orange', hex: SAP_COLORS.ORANGE, usage: 'Warning states, caution' },
        { name: 'Orange Light', hex: SAP_COLORS.ORANGE_LIGHT, usage: 'Warning backgrounds' }
      ]
    },
    {
      name: 'Error Red',
      description: 'Error states, critical alerts, destructive actions',
      colors: [
        { name: 'Red', hex: SAP_COLORS.RED, usage: 'Error states, critical alerts' },
        { name: 'Red Light', hex: SAP_COLORS.RED_LIGHT, usage: 'Error backgrounds' }
      ]
    },
    {
      name: 'Accent Purple',
      description: 'Secondary highlights, special emphasis',
      colors: [
        { name: 'Purple', hex: SAP_COLORS.PURPLE, usage: 'Accent color, special features' },
        { name: 'Purple Light', hex: SAP_COLORS.PURPLE_LIGHT, usage: 'Accent backgrounds' }
      ]
    },
    {
      name: 'Neutral Grays',
      description: 'Text, borders, backgrounds, neutral elements',
      colors: [
        { name: 'Gray', hex: SAP_COLORS.GRAY, usage: 'Body text, secondary information' },
        { name: 'Gray Light', hex: SAP_COLORS.GRAY_LIGHT, usage: 'Disabled text, tertiary info' },
        { name: 'Gray Lighter', hex: SAP_COLORS.GRAY_LIGHTER, usage: 'Backgrounds, dividers' },
        { name: 'Border', hex: SAP_COLORS.BORDER, usage: 'Borders, separators' }
      ]
    }
  ];

  // Chart.js compatible color palettes
  const chartPalettes = [
    {
      name: 'SAP Standard',
      description: 'Default SAP Fiori colors for data visualization',
      colors: [
        SAP_COLORS.BLUE,
        SAP_COLORS.GREEN,
        SAP_COLORS.ORANGE,
        SAP_COLORS.RED,
        SAP_COLORS.PURPLE,
        '#2196F3'
      ]
    },
    {
      name: 'Semantic Status',
      description: 'Color palette for status indicators',
      colors: [
        SAP_COLORS.GREEN,    // Success
        SAP_COLORS.ORANGE,   // Warning
        SAP_COLORS.RED,      // Error
        SAP_COLORS.BLUE,     // Info
        SAP_COLORS.GRAY      // Neutral
      ]
    },
    {
      name: 'Data Visualization',
      description: 'Optimized for charts and graphs with maximum contrast',
      colors: [
        '#0854a0', // Blue
        '#107e3e', // Green
        '#e26800', // Orange
        '#bb0000', // Red
        '#91007b', // Purple
        '#2196F3', // Light Blue
        '#4caf50', // Light Green
        '#ff9800', // Light Orange
        '#f44336', // Light Red
        '#9c27b0'  // Light Purple
      ]
    },
    {
      name: 'Light Backgrounds',
      description: 'Soft pastel colors for backgrounds and fills',
      colors: [
        SAP_COLORS.BLUE_LIGHT,
        SAP_COLORS.GREEN_LIGHT,
        SAP_COLORS.ORANGE_LIGHT,
        SAP_COLORS.RED_LIGHT,
        SAP_COLORS.PURPLE_LIGHT,
        SAP_COLORS.GRAY_LIGHTER
      ]
    }
  ];

  content.innerHTML = `
    <div class="toolbar">
      <h2 style="margin: 0;">🎨 SAP Fiori Color Schemes</h2>
    </div>

    <div class="message message-info">
      SAP Fiori uses a carefully designed color palette for consistency, accessibility, and optimal user experience.
      Click any color to copy its hex code.
    </div>

    <!-- Color Schemes -->
    <div class="card">
      <div class="card-header">SAP Fiori Color Palette</div>
      <p style="margin: 1rem 0; color: #666;">
        The official SAP Fiori color palette with semantic meanings and usage guidelines.
      </p>

      <div style="display: grid; gap: 2rem; margin-top: 1.5rem;">
        ${colorSchemes.map(scheme => `
          <div class="color-scheme-section">
            <div class="color-scheme-header">
              <h3 style="margin: 0; font-size: 1.1rem;">${scheme.name}</h3>
              <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.9rem;">${scheme.description}</p>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
              ${scheme.colors.map(color => `
                <div class="color-swatch-item" data-hex="${color.hex}">
                  <div class="color-swatch-preview" style="background: ${color.hex};"></div>
                  <div class="color-swatch-info">
                    <div class="color-swatch-name">${color.name}</div>
                    <div class="color-swatch-hex">${color.hex.toUpperCase()}</div>
                    <div class="color-swatch-usage">${color.usage}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Chart Palettes -->
    <div class="card" style="margin-top: 2rem;">
      <div class="card-header">Chart.js Color Palettes</div>
      <p style="margin: 1rem 0; color: #666;">
        Ready-to-use color palettes for data visualization with Chart.js.
      </p>

      <div style="display: grid; gap: 1.5rem; margin-top: 1.5rem;">
        ${chartPalettes.map(palette => `
          <div class="chart-palette-section">
            <div>
              <h3 style="margin: 0; font-size: 1rem;">${palette.name}</h3>
              <p style="margin: 0.5rem 0 1rem 0; color: #666; font-size: 0.875rem;">${palette.description}</p>
            </div>
            <div class="chart-palette-colors">
              ${palette.colors.map((color, idx) => `
                <div class="chart-palette-color"
                     style="background: ${color};"
                     data-hex="${color}"
                     title="Color ${idx + 1}: ${color}">
                </div>
              `).join('')}
            </div>
            <div style="margin-top: 1rem;">
              <button class="copy-palette-btn" data-palette='${JSON.stringify(palette.colors)}'>
                📋 Copy Palette Array
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Usage Guidelines -->
    <div class="card" style="margin-top: 2rem;">
      <div class="card-header">Color Usage Guidelines</div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
        <div>
          <strong>✅ Do</strong>
          <ul style="margin: 0.5rem 0 0 1.5rem; color: #666; font-size: 0.9rem;">
            <li>Use semantic colors for their intended purpose (green for success, red for errors)</li>
            <li>Maintain sufficient contrast ratios (4.5:1 for text, 3:1 for UI elements)</li>
            <li>Use light variants for backgrounds and highlights</li>
            <li>Test colors with accessibility tools</li>
            <li>Provide non-color indicators (icons, text) for important information</li>
          </ul>
        </div>
        <div>
          <strong>❌ Don't</strong>
          <ul style="margin: 0.5rem 0 0 1.5rem; color: #666; font-size: 0.9rem;">
            <li>Use red for positive states or green for errors</li>
            <li>Rely solely on color to convey information</li>
            <li>Use too many different colors in one view</li>
            <li>Use brand colors for semantic states</li>
            <li>Override colors without considering accessibility</li>
          </ul>
        </div>
        <div>
          <strong>💡 Best Practices</strong>
          <ul style="margin: 0.5rem 0 0 1.5rem; color: #666; font-size: 0.9rem;">
            <li>Limit palette to 5-6 colors per chart</li>
            <li>Use consistent colors across the application</li>
            <li>Add transparency (40-80) for overlays and backgrounds</li>
            <li>Consider color-blind users (8% of males, 0.5% of females)</li>
            <li>Test in both light and dark environments</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Color Accessibility -->
    <div class="card" style="margin-top: 2rem;">
      <div class="card-header">Accessibility & WCAG Compliance</div>
      <div style="margin-top: 1rem;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f5f5f5;">
              <th style="padding: 0.75rem; text-align: left; border: 1px solid #ddd;">Color</th>
              <th style="padding: 0.75rem; text-align: left; border: 1px solid #ddd;">On White</th>
              <th style="padding: 0.75rem; text-align: left; border: 1px solid #ddd;">On Black</th>
              <th style="padding: 0.75rem; text-align: left; border: 1px solid #ddd;">Best Use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 0.75rem; border: 1px solid #ddd;">
                <span style="display: inline-block; width: 20px; height: 20px; background: ${SAP_COLORS.BLUE}; vertical-align: middle; margin-right: 0.5rem;"></span>
                Blue
              </td>
              <td style="padding: 0.75rem; border: 1px solid #ddd;">✅ AAA (11.6:1)</td>
              <td style="padding: 0.75rem; border: 1px solid #ddd;">❌ Fail (1.8:1)</td>
              <td style="padding: 0.75rem; border: 1px solid #ddd;">Text on light backgrounds</td>
            </tr>
            <tr style="background: #fafafa;">
              <td style="padding: 0.75rem; border: 1px solid #ddd;">
                <span style="display: inline-block; width: 20px; height: 20px; background: ${SAP_COLORS.GREEN}; vertical-align: middle; margin-right: 0.5rem;"></span>
                Green
              </td>
              <td style="padding: 0.75rem; border: 1px solid #ddd;">✅ AAA (8.2:1)</td>
              <td style="padding: 0.75rem; border: 1px solid #ddd;">⚠️ AA (2.6:1)</td>
              <td style="padding: 0.75rem; border: 1px solid #ddd;">Success indicators, icons</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem; border: 1px solid #ddd;">
                <span style="display: inline-block; width: 20px; height: 20px; background: ${SAP_COLORS.ORANGE}; vertical-align: middle; margin-right: 0.5rem;"></span>
                Orange
              </td>
              <td style="padding: 0.75rem; border: 1px solid #ddd;">✅ AA (4.7:1)</td>
              <td style="padding: 0.75rem; border: 1px solid #ddd;">⚠️ AA (4.5:1)</td>
              <td style="padding: 0.75rem; border: 1px solid #ddd;">Warnings with icon/text</td>
            </tr>
            <tr style="background: #fafafa;">
              <td style="padding: 0.75rem; border: 1px solid #ddd;">
                <span style="display: inline-block; width: 20px; height: 20px; background: ${SAP_COLORS.RED}; vertical-align: middle; margin-right: 0.5rem;"></span>
                Red
              </td>
              <td style="padding: 0.75rem; border: 1px solid #ddd;">✅ AAA (9.7:1)</td>
              <td style="padding: 0.75rem; border: 1px solid #ddd;">❌ Fail (2.2:1)</td>
              <td style="padding: 0.75rem; border: 1px solid #ddd;">Errors with clear text</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem; border: 1px solid #ddd;">
                <span style="display: inline-block; width: 20px; height: 20px; background: ${SAP_COLORS.GRAY}; vertical-align: middle; margin-right: 0.5rem;"></span>
                Gray
              </td>
              <td style="padding: 0.75rem; border: 1px solid #ddd;">✅ AAA (5.7:1)</td>
              <td style="padding: 0.75rem; border: 1px solid #ddd;">⚠️ AA (3.7:1)</td>
              <td style="padding: 0.75rem; border: 1px solid #ddd;">Body text</td>
            </tr>
          </tbody>
        </table>
        <p style="margin: 1rem 0 0 0; color: #666; font-size: 0.875rem;">
          <strong>Note:</strong> Contrast ratios are approximate. WCAG AA requires 4.5:1 for normal text and 3:1 for large text (18pt+).
          AAA requires 7:1 for normal text and 4.5:1 for large text.
        </p>
      </div>
    </div>

    <!-- Code Examples -->
    <div class="card" style="margin-top: 2rem;">
      <div class="card-header">Code Examples</div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
        <div>
          <strong>JavaScript (Import from constants.js)</strong>
          <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; margin-top: 0.5rem; overflow-x: auto;"><code>import { SAP_COLORS } from './constants.js';

// Use in Chart.js
backgroundColor: SAP_COLORS.BLUE,
borderColor: SAP_COLORS.BLUE_DARK,

// Use in styles
element.style.color = SAP_COLORS.GREEN;</code></pre>
        </div>
        <div>
          <strong>CSS Variables (Alternative)</strong>
          <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; margin-top: 0.5rem; overflow-x: auto;"><code>:root {
  --sap-blue: #0854a0;
  --sap-green: #107e3e;
  --sap-orange: #e26800;
  --sap-red: #bb0000;
}

.success { color: var(--sap-green); }</code></pre>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    attachColorHandlers();
  }, 100);
}

function attachColorHandlers() {
  // Handle color swatch clicks - copy hex code
  const swatches = document.querySelectorAll('.color-swatch-item, .chart-palette-color');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const hex = swatch.getAttribute('data-hex');
      copyToClipboard(hex, `Copied: ${hex}`);

      // Visual feedback
      swatch.style.transform = 'scale(0.95)';
      setTimeout(() => {
        swatch.style.transform = '';
      }, 200);
    });
  });

  // Handle palette array copy buttons
  const paletteButtons = document.querySelectorAll('.copy-palette-btn');
  paletteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const palette = JSON.parse(btn.getAttribute('data-palette'));
      const code = `const colors = ${JSON.stringify(palette, null, 2)};`;
      copyToClipboard(code, 'Palette array copied!');
    });
  });
}

function copyToClipboard(text, successMessage) {
  navigator.clipboard.writeText(text).then(() => {
    // Show toast if available
    if (window.showSuccess) {
      window.showSuccess(successMessage);
    }
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}
