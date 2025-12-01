sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("analytics.dashboard.controller.DataDetail", {

    /**
     * Called when the controller is instantiated
     * @public
     */
    onInit: function () {
      this.oRouter = this.getOwnerComponent().getRouter();
      this.oRouter.getRoute("dataDetail").attachPatternMatched(this._onRouteMatched, this);
    },

    /**
     * Handler for route matched event
     * @param {sap.ui.base.Event} oEvent - the event object
     * @private
     */
    _onRouteMatched: function (oEvent) {
      var sRowId = oEvent.getParameter("arguments").rowId;
      this._displayRowDetails(sRowId);
    },

    /**
     * Display details for a specific row
     * @param {string} sRowId - the row ID
     * @private
     */
    _displayRowDetails: function (sRowId) {
      var oModel = this.getOwnerComponent().getModel("appData");
      var aData = oModel.getProperty("/currentData");

      if (!aData || !aData.length) {
        return;
      }

      var iIndex = parseInt(sRowId, 10);
      if (isNaN(iIndex) || iIndex < 0 || iIndex >= aData.length) {
        return;
      }

      var oRow = aData[iIndex];
      oModel.setProperty("/selectedRow", Object.assign({}, oRow, { id: iIndex }));

      // Render details
      var oContainer = this.byId("detailContent");
      if (oContainer) {
        oContainer.destroyItems();

        Object.keys(oRow).forEach(function(sKey) {
          var oLabel = new sap.m.Label({
            text: sKey + ":",
            class: "sapUiTinyMarginTop"
          });
          var oText = new sap.m.Text({
            text: String(oRow[sKey]),
            class: "sapUiTinyMarginBottom"
          });

          oContainer.addItem(oLabel);
          oContainer.addItem(oText);
        });
      }
    },

    /**
     * Navigate back
     * @public
     */
    onNavBack: function () {
      this.oRouter.navTo("data");
    }

  });
});
