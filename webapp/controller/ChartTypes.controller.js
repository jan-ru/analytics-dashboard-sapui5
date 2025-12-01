sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("analytics.dashboard.controller.ChartTypes", {

    /**
     * Called when the controller is instantiated
     * @public
     */
    onInit: function () {
      this.oRouter = this.getOwnerComponent().getRouter();
      this.oRouter.getRoute("chartTypes").attachPatternMatched(this._onRouteMatched, this);
    },

    /**
     * Handler for route matched event
     * @param {sap.ui.base.Event} oEvent - the event object
     * @private
     */
    _onRouteMatched: function (oEvent) {
      // Render charts when view is shown
      this._renderCharts();
    },

    /**
     * Render all charts
     * @private
     */
    _renderCharts: function () {
      var oModel = this.getOwnerComponent().getModel("appData");
      var aData = oModel.getProperty("/currentData");

      if (!aData || !aData.length) {
        MessageToast.show("No data available");
        return;
      }

      var oContainer = this.byId("chartContainer");
      if (!oContainer) {
        return;
      }

      // Clear existing content
      oContainer.destroyItems();

      // Add placeholder message
      var sHtml = '<div class="sapUiSmallMargin">' +
                  '<p>Charts will be implemented with Chart.js integration.</p>' +
                  '<p>Available chart types:</p>' +
                  '<ul>' +
                  '<li>Bar Chart</li>' +
                  '<li>Line Chart</li>' +
                  '<li>Pie Chart</li>' +
                  '<li>Doughnut Chart</li>' +
                  '<li>Radar Chart</li>' +
                  '<li>Polar Area Chart</li>' +
                  '</ul>' +
                  '</div>';

      var oHtml = new sap.ui.core.HTML({
        content: sHtml
      });

      oContainer.addItem(oHtml);
    }

  });
});
