/**
 * UI5 Web Components Showcase View
 * Demonstrates Card, Input, AnalyticalCard, and ShellBar components
 */

export function showUi5ComponentsViewSimple() {
  const content = document.getElementById('content');

  content.innerHTML = `
    <div class="toolbar">
      <h2 style="margin: 0;">🎯 UI5 Web Components Showcase</h2>
    </div>

    <div class="message message-info">
      This page demonstrates 4 UI5 Web Components: Card, Input, AnalyticalCard, and ShellBar.
      Components are loaded from CDN (v2.16.2) and rendered as native web components.
    </div>

    <!-- Cards Section -->
    <div class="card">
      <div class="card-header">ui5-card - Standard Cards</div>
      <p style="margin: 1rem 0; color: #666;">
        Cards are container components that group related information and actions.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
        <ui5-card class="demo-card">
          <div slot="header" class="ui5-card-header">
            <div style="padding: 1rem;">
              <div style="font-size: 1.25rem; font-weight: 600; color: #0854a0;">Project Status</div>
              <div style="font-size: 0.875rem; color: #666; margin-top: 0.25rem;">Development Phase</div>
            </div>
          </div>
          <div style="padding: 1rem;">
            <p style="margin: 0 0 1rem 0;">Current sprint progress tracking and key deliverables.</p>
            <div style="display: flex; gap: 0.5rem;">
              <span style="background: #e3f2fd; color: #0854a0; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.875rem;">On Track</span>
              <span style="background: #e8f5e9; color: #107e3e; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.875rem;">85% Complete</span>
            </div>
          </div>
        </ui5-card>

        <ui5-card class="demo-card">
          <div slot="header" class="ui5-card-header">
            <div style="padding: 1rem;">
              <div style="font-size: 1.25rem; font-weight: 600; color: #0854a0;">Team Metrics</div>
              <div style="font-size: 0.875rem; color: #666; margin-top: 0.25rem;">Last 30 Days</div>
            </div>
          </div>
          <div style="padding: 1rem;">
            <div style="display: grid; gap: 0.75rem;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #666;">Tasks Completed</span>
                <strong style="color: #0854a0;">127</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #666;">Active Members</span>
                <strong style="color: #0854a0;">12</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #666;">Avg. Velocity</span>
                <strong style="color: #0854a0;">42 pts</strong>
              </div>
            </div>
          </div>
        </ui5-card>

        <ui5-card class="demo-card">
          <div slot="header" class="ui5-card-header">
            <div style="padding: 1rem;">
              <div style="font-size: 1.25rem; font-weight: 600; color: #0854a0;">System Health</div>
              <div style="font-size: 0.875rem; color: #666; margin-top: 0.25rem;">Real-time Status</div>
            </div>
          </div>
          <div style="padding: 1rem;">
            <div style="display: grid; gap: 0.75rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <div style="width: 12px; height: 12px; background: #107e3e; border-radius: 50%;"></div>
                <span>API Server: Online</span>
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <div style="width: 12px; height: 12px; background: #107e3e; border-radius: 50%;"></div>
                <span>Database: Connected</span>
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <div style="width: 12px; height: 12px; background: #e26800; border-radius: 50%;"></div>
                <span>Cache: Warming up</span>
              </div>
            </div>
          </div>
        </ui5-card>
      </div>
    </div>

    <!-- Inputs Section -->
    <div class="card" style="margin-top: 2rem;">
      <div class="card-header">ui5-input - Input Fields</div>
      <p style="margin: 1rem 0; color: #666;">
        Input components for user data entry with various configurations.
      </p>

      <div style="display: grid; gap: 1.5rem; margin-top: 1.5rem; max-width: 600px;">
        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Username</label>
          <ui5-input
            id="username-input"
            placeholder="Enter your username"
            value=""
            style="width: 100%;">
          </ui5-input>
          <div style="margin-top: 0.25rem; font-size: 0.875rem; color: #666;">
            Standard input field with placeholder
          </div>
        </div>

        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email Address</label>
          <ui5-input
            id="email-input"
            type="Email"
            placeholder="user@example.com"
            value=""
            style="width: 100%;">
          </ui5-input>
          <div style="margin-top: 0.25rem; font-size: 0.875rem; color: #666;">
            Email type input with validation
          </div>
        </div>

        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Search Query</label>
          <ui5-input
            id="search-input"
            placeholder="Search..."
            value=""
            icon="search"
            style="width: 100%;">
          </ui5-input>
          <div style="margin-top: 0.25rem; font-size: 0.875rem; color: #666;">
            Input with search icon
          </div>
        </div>
      </div>
    </div>

    <!-- Analytical Cards Section -->
    <div class="card" style="margin-top: 2rem;">
      <div class="card-header">Custom Analytical Cards (Fiori-style)</div>
      <p style="margin: 1rem 0; color: #666;">
        Custom analytical cards display KPIs, trends, and business metrics with visual indicators.
        Built with pure HTML/CSS following SAP Fiori design patterns.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
        <div class="analytical-card-wrapper">
          <div class="analytical-card">
            <div class="analytical-header">
              <div>
                <div class="analytical-title">Revenue</div>
                <div class="analytical-subtitle">This Quarter</div>
              </div>
              <div style="font-size: 2rem;">💰</div>
            </div>
            <div class="analytical-value">
              <div style="font-size: 2.5rem; font-weight: 600; color: #0854a0;">$2.4M</div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                <span style="color: #107e3e; font-weight: 500;">↑ 12.5%</span>
                <span style="color: #666; font-size: 0.875rem;">vs last quarter</span>
              </div>
            </div>
            <div class="analytical-chart">
              <div style="height: 60px; background: linear-gradient(to top, #e3f2fd 0%, #0854a0 100%); border-radius: 4px; opacity: 0.3;"></div>
            </div>
          </div>
        </div>

        <div class="analytical-card-wrapper">
          <div class="analytical-card">
            <div class="analytical-header">
              <div>
                <div class="analytical-title">Active Users</div>
                <div class="analytical-subtitle">Monthly Active</div>
              </div>
              <div style="font-size: 2rem;">👥</div>
            </div>
            <div class="analytical-value">
              <div style="font-size: 2.5rem; font-weight: 600; color: #0854a0;">45.2K</div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                <span style="color: #107e3e; font-weight: 500;">↑ 8.3%</span>
                <span style="color: #666; font-size: 0.875rem;">vs last month</span>
              </div>
            </div>
            <div class="analytical-chart">
              <div style="height: 60px; background: linear-gradient(to top, #e8f5e9 0%, #107e3e 100%); border-radius: 4px; opacity: 0.3;"></div>
            </div>
          </div>
        </div>

        <div class="analytical-card-wrapper">
          <div class="analytical-card">
            <div class="analytical-header">
              <div>
                <div class="analytical-title">Conversion Rate</div>
                <div class="analytical-subtitle">Last 7 Days</div>
              </div>
              <div style="font-size: 2rem;">📊</div>
            </div>
            <div class="analytical-value">
              <div style="font-size: 2.5rem; font-weight: 600; color: #0854a0;">3.2%</div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                <span style="color: #bb0000; font-weight: 500;">↓ 0.4%</span>
                <span style="color: #666; font-size: 0.875rem;">vs previous week</span>
              </div>
            </div>
            <div class="analytical-chart">
              <div style="height: 60px; background: linear-gradient(to top, #ffebee 0%, #bb0000 100%); border-radius: 4px; opacity: 0.3;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ShellBar Section -->
    <div class="card" style="margin-top: 2rem;">
      <div class="card-header">ui5-shellbar - Application Shell Bar (Fiori)</div>
      <p style="margin: 1rem 0; color: #666;">
        ShellBar is a horizontal bar component providing branding, navigation, and user actions.
        Below are 3 different ShellBar configurations:
      </p>

      <div style="display: grid; gap: 1.5rem; margin-top: 1.5rem;">
        <!-- ShellBar 1: Full Featured -->
        <div>
          <div style="margin-bottom: 0.5rem; font-weight: 500;">1. Full-Featured ShellBar</div>
          <ui5-shellbar
            id="shellbar-1"
            primary-title="Analytics Dashboard"
            secondary-title="Production Environment"
            show-notifications
            show-product-switch
            show-co-pilot
            notification-count="5"
            style="width: 100%;">
          </ui5-shellbar>
          <div style="margin-top: 0.5rem; font-size: 0.875rem; color: #666;">
            With notifications, product switch, and co-pilot
          </div>
        </div>

        <!-- ShellBar 2: Simple -->
        <div>
          <div style="margin-bottom: 0.5rem; font-weight: 500;">2. Simple ShellBar</div>
          <ui5-shellbar
            id="shellbar-2"
            primary-title="SAP Fiori Application"
            style="width: 100%;">
          </ui5-shellbar>
          <div style="margin-top: 0.5rem; font-size: 0.875rem; color: #666;">
            Minimal configuration with title only
          </div>
        </div>

        <!-- ShellBar 3: With Logo -->
        <div>
          <div style="margin-bottom: 0.5rem; font-weight: 500;">3. ShellBar with Branding</div>
          <ui5-shellbar
            id="shellbar-3"
            primary-title="Enterprise Portal"
            secondary-title="v2.0"
            show-notifications
            notification-count="12"
            style="width: 100%;">
          </ui5-shellbar>
          <div style="margin-top: 0.5rem; font-size: 0.875rem; color: #666;">
            With secondary title and notification badge
          </div>
        </div>
      </div>
    </div>

    <!-- Component Properties -->
    <div class="card" style="margin-top: 2rem;">
      <div class="card-header">Component Properties & Events</div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
        <div>
          <strong>ui5-card</strong>
          <ul style="margin: 0.5rem 0 0 1.5rem; color: #666; font-size: 0.875rem;">
            <li>Slots: header, default (content)</li>
            <li>Customizable header and content</li>
            <li>Accessibility built-in</li>
          </ul>
        </div>
        <div>
          <strong>ui5-input</strong>
          <ul style="margin: 0.5rem 0 0 1.5rem; color: #666; font-size: 0.875rem;">
            <li>Properties: value, placeholder, type</li>
            <li>Events: change, input</li>
            <li>Validation support</li>
          </ul>
        </div>
        <div>
          <strong>Custom Analytical Cards</strong>
          <ul style="margin: 0.5rem 0 0 1.5rem; color: #666; font-size: 0.875rem;">
            <li>KPI visualization</li>
            <li>Trend indicators</li>
            <li>SAP Fiori styling</li>
          </ul>
        </div>
        <div>
          <strong>ui5-shellbar</strong>
          <ul style="margin: 0.5rem 0 0 1.5rem; color: #666; font-size: 0.875rem;">
            <li>Branding and navigation</li>
            <li>Notifications, user menu</li>
            <li>Product switcher</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    attachEventHandlers();
  }, 100);
}

function attachEventHandlers() {
  // Input event handlers
  const usernameInput = document.getElementById('username-input');
  const emailInput = document.getElementById('email-input');
  const searchInput = document.getElementById('search-input');

  if (usernameInput) {
    usernameInput.addEventListener('change', (e) => {
      console.log('Username changed:', e.target.value);
    });
  }

  if (emailInput) {
    emailInput.addEventListener('change', (e) => {
      console.log('Email changed:', e.target.value);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      console.log('Search input:', e.target.value);
    });
  }

  // ShellBar event handlers
  const shellbars = [
    document.getElementById('shellbar-1'),
    document.getElementById('shellbar-2'),
    document.getElementById('shellbar-3')
  ];

  shellbars.forEach((shellbar, idx) => {
    if (shellbar) {
      shellbar.addEventListener('notifications-click', () => {
        console.log(`ShellBar ${idx + 1}: Notifications clicked`);
        if (window.showSuccess) {
          window.showSuccess(`Notifications clicked on ShellBar ${idx + 1}`);
        }
      });

      shellbar.addEventListener('product-switch-click', () => {
        console.log(`ShellBar ${idx + 1}: Product switch clicked`);
        if (window.showSuccess) {
          window.showSuccess(`Product switch clicked on ShellBar ${idx + 1}`);
        }
      });
    }
  });
}
