sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("analytics.dashboard.controller.SapIcons", {

    /**
     * Called when the controller is instantiated
     * @public
     */
    onInit: function () {
      this._renderIcons();
    },

    /**
     * Render icon grid
     * @private
     */
    _renderIcons: function () {
      var aIcons = [
        "home", "action", "add", "delete", "edit", "save", "cancel",
        "accept", "decline", "alert", "notification", "message-information",
        "upload", "download", "attachment", "excel-attachment", "pdf-attachment",
        "chart", "line-chart", "bar-chart", "pie-chart",
        "calendar", "date-time", "time", "clock",
        "customer", "employee", "group", "person-placeholder",
        "email", "phone", "addresses", "contacts",
        "product", "sales-order", "cart", "basket",
        "settings", "wrench", "configuration", "filter",
        "search", "refresh", "undo", "redo",
        "table-view", "table-chart", "grid", "list"
      ];

      var oContainer = this.byId("iconGrid");
      if (!oContainer) {
        return;
      }

      aIcons.forEach(function(sIcon) {
        var oCard = new sap.m.VBox({
          width: "120px",
          alignItems: "Center",
          class: "sapUiTinyMargin"
        });

        var oIcon = new sap.ui.core.Icon({
          src: "sap-icon://" + sIcon,
          size: "2rem",
          class: "sapUiTinyMarginBottom",
          press: function() {
            MessageToast.show("Copied: sap-icon://" + sIcon);
          }
        });

        var oText = new sap.m.Text({
          text: sIcon,
          class: "sapUiTinyText"
        });

        oCard.addItem(oIcon);
        oCard.addItem(oText);
        oContainer.addItem(oCard);
      });
    },

    /**
     * Handler for icon search
     * @param {sap.ui.base.Event} oEvent - the event object
     * @public
     */
    onSearch: function (oEvent) {
      var sQuery = oEvent.getParameter("query");
      MessageToast.show("Search icons: " + sQuery);
      // TODO: Implement icon filtering
    }

  });
});
