sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/f/library",
  "sap/f/FlexibleColumnLayoutSemanticHelper"
], function (Controller, fioriLibrary, FlexibleColumnLayoutSemanticHelper) {
  "use strict";

  return Controller.extend("analytics.dashboard.controller.App", {

    /**
     * Called when the controller is instantiated
     * @public
     */
    onInit: function () {
      console.log("===== App.controller.onInit() called =====");
      this.oRouter = this.getOwnerComponent().getRouter();
      this.oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
      this.oRouter.attachRouteMatched(this._onRouteMatched, this);

      var oFCL = this.byId("layout");
      console.log("FCL found in App.controller:", !!oFCL);
      if (oFCL) {
        console.log("FCL ID:", oFCL.getId());
        console.log("FCL visible:", oFCL.getVisible());
        console.log("FCL DOM ref:", oFCL.getDomRef());

        // Check after a short delay to let router populate views
        setTimeout(function() {
          console.log("===== After router initialized =====");
          console.log("Begin column pages:", oFCL.getBeginColumnPages().length);
          console.log("Mid column pages:", oFCL.getMidColumnPages().length);
          console.log("Current layout:", oFCL.getLayout());
        }, 1000);
      }
    },

    /**
     * Handler for before route matched event
     * Sets the layout based on the route name
     * @param {sap.ui.base.Event} oEvent - the event object
     * @private
     */
    _onBeforeRouteMatched: function (oEvent) {
      var oModel = this.getOwnerComponent().getModel("appData");
      var sLayout = oModel.getProperty("/layout");
      var sRouteName = oEvent.getParameter("name");

      // Save current layout as previous
      oModel.setProperty("/previousLayout", sLayout);

      // Determine new layout based on route
      var oNextLayout = this._getLayoutForRoute(sRouteName);

      if (oNextLayout && oNextLayout !== sLayout) {
        oModel.setProperty("/layout", oNextLayout);
      }
    },

    /**
     * Handler for route matched event
     * @param {sap.ui.base.Event} oEvent - the event object
     * @private
     */
    _onRouteMatched: function (oEvent) {
      // Route matched - layout will be updated by _onBeforeRouteMatched
    },

    /**
     * Get the appropriate layout for a given route
     * @param {string} sRouteName - the route name
     * @returns {string} the layout type
     * @private
     */
    _getLayoutForRoute: function (sRouteName) {
      var LayoutType = fioriLibrary.LayoutType;

      // Routes that should show 3 columns (with detail)
      if (sRouteName === "dataDetail") {
        return LayoutType.ThreeColumnsMidExpanded;
      }

      // All routes show 2 columns (master + content)
      return LayoutType.TwoColumnsMidExpanded;
    },

    /**
     * Handler for FlexibleColumnLayout state changed event
     * @param {sap.ui.base.Event} oEvent - the event object
     * @public
     */
    onStateChanged: function (oEvent) {
      var oModel = this.getOwnerComponent().getModel("appData");
      var sLayout = oEvent.getParameter("layout");

      // Update the layout in the model
      oModel.setProperty("/layout", sLayout);

      // Update action buttons info for mid and end columns
      this._updateActionButtonsInfo();
    },

    /**
     * Update action buttons information based on current layout
     * @private
     */
    _updateActionButtonsInfo: function () {
      var oModel = this.getOwnerComponent().getModel("appData");
      var oFCL = this.byId("layout");
      var oHelper = FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL);
      var sCurrentLayout = oModel.getProperty("/layout");

      var oActionButtonsInfo = {
        midColumn: {},
        endColumn: {}
      };

      // Get action buttons info from semantic helper
      if (oHelper) {
        var oMidColumnInfo = oHelper.getCurrentUIState();

        oActionButtonsInfo.midColumn = {
          fullScreen: oMidColumnInfo.actionButtonsInfo.midColumn.fullScreen || null,
          exitFullScreen: oMidColumnInfo.actionButtonsInfo.midColumn.exitFullScreen || null,
          closeColumn: oMidColumnInfo.actionButtonsInfo.midColumn.closeColumn || null
        };

        oActionButtonsInfo.endColumn = {
          fullScreen: oMidColumnInfo.actionButtonsInfo.endColumn.fullScreen || null,
          exitFullScreen: oMidColumnInfo.actionButtonsInfo.endColumn.exitFullScreen || null,
          closeColumn: oMidColumnInfo.actionButtonsInfo.endColumn.closeColumn || null
        };
      }

      oModel.setProperty("/actionButtonsInfo", oActionButtonsInfo);
    }
  });
});
