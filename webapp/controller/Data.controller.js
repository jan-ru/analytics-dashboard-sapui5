sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/table/Table",
  "sap/ui/table/Column",
  "sap/m/Text",
  "sap/m/MessageToast"
], function (Controller, JSONModel, Table, Column, Text, MessageToast) {
  "use strict";

  return Controller.extend("analytics.dashboard.controller.Data", {

    /**
     * Called when the controller is instantiated
     * @public
     */
    onInit: function () {
      this.oRouter = this.getOwnerComponent().getRouter();
      this.oRouter.getRoute("data").attachPatternMatched(this._onRouteMatched, this);
    },

    /**
     * Handler for route matched event
     * @param {sap.ui.base.Event} oEvent - the event object
     * @private
     */
    _onRouteMatched: function (oEvent) {
      this._createTable();
    },

    /**
     * Create and populate the table
     * @private
     */
    _createTable: function () {
      var oAppModel = this.getOwnerComponent().getModel("appData");
      var aData = oAppModel.getProperty("/currentData");

      if (!aData || !aData.length) {
        return;
      }

      var oContainer = this.byId("tableContainer");
      if (!oContainer) {
        return;
      }

      // Clear existing content
      oContainer.destroyItems();

      // Create a local model for the table
      var oTableModel = new JSONModel({
        rows: aData
      });

      // Create table
      var oTable = new Table({
        id: this.createId("dataTable"),
        selectionMode: "Single",
        visibleRowCount: 15,
        rows: "{tableData>/rows}",
        width: "100%",
        rowActionCount: 1
      });

      // Add columns dynamically based on data keys
      var aKeys = Object.keys(aData[0]);
      aKeys.forEach(function(sKey) {
        var oColumn = new Column({
          label: new sap.m.Label({ text: sKey }),
          template: new Text({
            text: "{tableData>" + sKey + "}",
            wrapping: false
          }),
          sortProperty: sKey,
          filterProperty: sKey,
          width: "auto"
        });
        oTable.addColumn(oColumn);
      });

      // Set model
      this.getView().setModel(oTableModel, "tableData");

      // Add table to container
      oContainer.addItem(oTable);

      // Update row count
      this.byId("rowCount").setText(aData.length + " rows");
    },

    /**
     * Handler for search
     * @param {sap.ui.base.Event} oEvent - the event object
     * @public
     */
    onSearch: function (oEvent) {
      var sQuery = oEvent.getParameter("query");
      MessageToast.show("Search: " + sQuery);
      // TODO: Implement search filtering
    },

    /**
     * Export data to Excel
     * @public
     */
    onExport: function () {
      var oAppModel = this.getOwnerComponent().getModel("appData");
      var aData = oAppModel.getProperty("/currentData");
      var sFileName = oAppModel.getProperty("/fileName");

      if (!aData || !aData.length) {
        MessageToast.show("No data to export");
        return;
      }

      try {
        var workbook = new ExcelJS.Workbook();
        var worksheet = workbook.addWorksheet("Data");

        var aHeaders = Object.keys(aData[0]);
        worksheet.addRow(aHeaders);

        var headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true };
        headerRow.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF0070F2' }
        };
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };

        aData.forEach(function(row) {
          var aRowData = aHeaders.map(function(header) {
            return row[header];
          });
          worksheet.addRow(aRowData);
        });

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
      }
    }

  });
});
