sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("analytics.dashboard.controller.Master", {

    /**
     * Called when the controller is instantiated
     * @public
     */
    onInit: function () {
      console.log("===== Master.controller.onInit() called =====");
      this.oRouter = this.getOwnerComponent().getRouter();
      this.oRouter.attachRouteMatched(this._onRouteMatched, this);

      var oPage = this.byId("masterPage");
      console.log("Master page found:", !!oPage);
      if (oPage) {
        console.log("Master page visible:", oPage.getVisible());
        console.log("Master page ID:", oPage.getId());
      }
    },

    /**
     * Handler for route matched event
     * Updates the selected item in the navigation list
     * @param {sap.ui.base.Event} oEvent - the event object
     * @private
     */
    _onRouteMatched: function (oEvent) {
      var sRouteName = oEvent.getParameter("name");
      var oList = this.byId("navigationList");

      // Map route names to list item IDs
      var mRouteToItemId = {
        "upload": "navUpload",
        "main": "navUpload",
        "dashboard": "navDashboard",
        "chartTypes": "navChartTypes",
        "tiles": "navTiles",
        "ui5Components": "navUi5Components",
        "sapIcons": "navSapIcons",
        "sapColors": "navSapColors",
        "data": "navData",
        "dataDetail": "navData", // Detail route should keep data item selected
        "about": "navAbout"
      };

      var sItemId = mRouteToItemId[sRouteName];
      if (sItemId) {
        var oItem = this.byId(sItemId);
        if (oItem) {
          oList.setSelectedItem(oItem);
        }
      }
    },

    /**
     * Handler for selection change in the navigation list
     * @param {sap.ui.base.Event} oEvent - the event object
     * @public
     */
    onSelectionChange: function (oEvent) {
      var oSelectedItem = oEvent.getParameter("listItem");
      console.log("Navigation selection changed:", oSelectedItem.getTitle());
    },

    /**
     * Navigate to Upload view
     * @public
     */
    onNavToUpload: function () {
      this.oRouter.navTo("upload");
    },

    /**
     * Navigate to Dashboard view
     * @public
     */
    onNavToDashboard: function () {
      // Check if data is available
      var oModel = this.getOwnerComponent().getModel("appData");
      var oData = oModel.getProperty("/currentData");

      if (!oData || !oData.length) {
        MessageToast.show("Please upload an Excel file first");
        this.oRouter.navTo("upload");
        return;
      }

      this.oRouter.navTo("dashboard");
    },

    /**
     * Navigate to Chart Types view
     * @public
     */
    onNavToChartTypes: function () {
      // Check if data is available
      var oModel = this.getOwnerComponent().getModel("appData");
      var oData = oModel.getProperty("/currentData");

      if (!oData || !oData.length) {
        MessageToast.show("Please upload an Excel file first");
        this.oRouter.navTo("upload");
        return;
      }

      this.oRouter.navTo("chartTypes");
    },

    /**
     * Navigate to Tiles view
     * @public
     */
    onNavToTiles: function () {
      // Check if data is available
      var oModel = this.getOwnerComponent().getModel("appData");
      var oData = oModel.getProperty("/currentData");

      if (!oData || !oData.length) {
        MessageToast.show("Please upload an Excel file first");
        this.oRouter.navTo("upload");
        return;
      }

      this.oRouter.navTo("tiles");
    },

    /**
     * Navigate to UI5 Components view
     * @public
     */
    onNavToUi5Components: function () {
      this.oRouter.navTo("ui5Components");
    },

    /**
     * Navigate to SAP Icons view
     * @public
     */
    onNavToSapIcons: function () {
      this.oRouter.navTo("sapIcons");
    },

    /**
     * Navigate to SAP Colors view
     * @public
     */
    onNavToSapColors: function () {
      this.oRouter.navTo("sapColors");
    },

    /**
     * Navigate to Data Table view
     * @public
     */
    onNavToData: function () {
      // Check if data is available
      var oModel = this.getOwnerComponent().getModel("appData");
      var oData = oModel.getProperty("/currentData");

      if (!oData || !oData.length) {
        MessageToast.show("Please upload an Excel file first");
        this.oRouter.navTo("upload");
        return;
      }

      this.oRouter.navTo("data");
    },

    /**
     * Navigate to About view
     * @public
     */
    onNavToAbout: function () {
      this.oRouter.navTo("about");
    }
  });
});
