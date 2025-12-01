sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("analytics.dashboard.controller.Dashboard", {

    /**
     * Called when the controller is instantiated
     * @public
     */
    onInit: function () {
      this.oRouter = this.getOwnerComponent().getRouter();
      this.oRouter.getRoute("dashboard").attachPatternMatched(this._onRouteMatched, this);
    },

    /**
     * Handler for route matched event
     * @param {sap.ui.base.Event} oEvent - the event object
     * @private
     */
    _onRouteMatched: function (oEvent) {
      var oModel = this.getOwnerComponent().getModel("appData");
      var oData = oModel.getProperty("/currentData");

      // Update file info message
      var sFileName = oModel.getProperty("/fileName");
      var iRowCount = oModel.getProperty("/metrics/rowCount");
      var iColumnCount = oModel.getProperty("/metrics/columnCount");

      var sMessage = "Viewing data from: " + sFileName +
                     " (" + iRowCount + " rows, " + iColumnCount + " columns)";

      var oFileInfo = this.byId("fileInfo");
      if (oFileInfo) {
        oFileInfo.setText(sMessage);
      }
    },

    /**
     * Navigate to Chart Types view
     * @public
     */
    onNavToCharts: function () {
      this.oRouter.navTo("chartTypes");
    },

    /**
     * Navigate to Tiles view
     * @public
     */
    onNavToTiles: function () {
      this.oRouter.navTo("tiles");
    },

    /**
     * Navigate to Data Table view
     * @public
     */
    onNavToData: function () {
      this.oRouter.navTo("data");
    },

    /**
     * Export current data to Excel
     * @public
     */
    onExportToExcel: function () {
      var oModel = this.getOwnerComponent().getModel("appData");
      var aData = oModel.getProperty("/currentData");
      var sFileName = oModel.getProperty("/fileName");

      if (!aData || !aData.length) {
        MessageToast.show("No data to export");
        return;
      }

      try {
        // Create a new workbook
        var workbook = new ExcelJS.Workbook();
        var worksheet = workbook.addWorksheet("Data");

        // Get column headers from first data row
        var aHeaders = Object.keys(aData[0]);

        // Add headers
        worksheet.addRow(aHeaders);

        // Style the header row
        var headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true };
        headerRow.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF0070F2' }
        };
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };

        // Add data rows
        aData.forEach(function(row) {
          var aRowData = aHeaders.map(function(header) {
            return row[header];
          });
          worksheet.addRow(aRowData);
        });

        // Auto-fit columns
        worksheet.columns.forEach(function(column) {
          var maxLength = 0;
          column.eachCell({ includeEmpty: true }, function(cell) {
            var columnLength = cell.value ? cell.value.toString().length : 10;
            if (columnLength > maxLength) {
              maxLength = columnLength;
            }
          });
          column.width = maxLength < 10 ? 10 : maxLength + 2;
        });

        // Generate Excel file and download
        workbook.xlsx.writeBuffer().then(function(buffer) {
          var blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          });
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = url;
          a.download = "export_" + sFileName;
          a.click();
          window.URL.revokeObjectURL(url);

          MessageToast.show("Data exported successfully!");
        });

      } catch (error) {
        MessageToast.show("Error exporting data: " + error.message);
        console.error("Export error:", error);
      }
    }
  });
});
