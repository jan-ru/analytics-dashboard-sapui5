sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("analytics.dashboard.controller.Tiles", {

    /**
     * Called when the controller is instantiated
     * @public
     */
    onInit: function () {
      // Initialize controller
    },

    /**
     * Handler for tile press event
     * @param {sap.ui.base.Event} oEvent - the event object
     * @public
     */
    onTilePress: function (oEvent) {
      var oTile = oEvent.getSource();
      var sHeader = oTile.getHeader();
      MessageToast.show("Tile pressed: " + sHeader);
    }

  });
});
