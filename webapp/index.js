sap.ui.define([
  "sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
  "use strict";

  new ComponentContainer({
    name: "analytics.dashboard",
    settings: {
      id: "analyticsApp"
    },
    async: true
  }).placeAt("content");
});
