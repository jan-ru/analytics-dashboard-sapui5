sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel",
  "sap/f/library"
], function (UIComponent, JSONModel, fioriLibrary) {
  "use strict";

  return UIComponent.extend("analytics.dashboard.Component", {
    metadata: {
      manifest: "json"
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
    init: function () {
      console.log("===== Component.init() called =====");
      // call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);
      console.log("Base component init complete");

      // Initialize app data model (replaces window.appState from old implementation)
      var oAppDataModel = new JSONModel({
        currentData: null,
        fileName: "",
        sheetNames: [],
        currentSheet: 0,
        filters: {},
        sortColumn: null,
        sortDirection: "asc",
        metrics: {
          rowCount: 0,
          columnCount: 0,
          numericColumns: {}
        },
        layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
        previousLayout: null,
        actionButtonsInfo: {
          midColumn: {
            fullScreen: false,
            exitFullScreen: false,
            closeColumn: false
          },
          endColumn: {
            fullScreen: false,
            exitFullScreen: false,
            closeColumn: false
          }
        }
      });
      this.setModel(oAppDataModel, "appData");
      console.log("App data model set");

      // enable routing
      console.log("Initializing router...");
      this.getRouter().initialize();
      console.log("Router initialized");

      // Force render of root view
      var oRootView = this.getRootControl();
      console.log("Root view:", oRootView);
      if (oRootView) {
        console.log("Root view ID:", oRootView.getId());
        console.log("Root view DOM ref before placeAt:", oRootView.getDomRef());

        // If not rendered, force render to body
        if (!oRootView.getDomRef()) {
          console.log("Root view not rendered, forcing placeAt...");
          oRootView.placeAt("content");
          console.log("Root view placed at content");
        }
      }
    },

    /**
     * Returns the content density class for the current device
     * @public
     * @returns {string} CSS class
     */
    getContentDensityClass: function () {
      if (!this._sContentDensityClass) {
        if (!sap.ui.Device.support.touch) {
          this._sContentDensityClass = "sapUiSizeCompact";
        } else {
          this._sContentDensityClass = "sapUiSizeCozy";
        }
      }
      return this._sContentDensityClass;
    }
  });
});
