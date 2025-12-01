sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/unified/FileUploader"
], function (Controller, MessageToast, FileUploader) {
  "use strict";

  return Controller.extend("analytics.dashboard.controller.Upload", {

    /**
     * Called when the controller is instantiated
     * @public
     */
    onInit: function () {
      this.oRouter = this.getOwnerComponent().getRouter();
    },

    /**
     * Handler for file selection change
     * @param {sap.ui.base.Event} oEvent - the event object
     * @public
     */
    onFileChange: function (oEvent) {
      var oFileUploader = this.byId("fileUploader");
      var sFileName = oEvent.getParameter("newValue");
      var oProcessButton = this.byId("processButton");
      var oStatusMessage = this.byId("statusMessage");

      if (sFileName) {
        oProcessButton.setEnabled(true);
        oStatusMessage.setText("File selected: " + sFileName);
        oStatusMessage.setType("Information");
        oStatusMessage.setVisible(true);
      } else {
        oProcessButton.setEnabled(false);
        oStatusMessage.setVisible(false);
      }
    },

    /**
     * Handler for process file button press
     * @public
     */
    onProcessFile: function () {
      var oFileUploader = this.byId("fileUploader");
      var oStatusMessage = this.byId("statusMessage");

      // Get the file from the FileUploader
      var oDomRef = oFileUploader.oFileUpload;
      if (!oDomRef) {
        MessageToast.show("File uploader not ready");
        return;
      }

      var oFile = oDomRef.files[0];
      if (!oFile) {
        MessageToast.show("Please select a file first");
        return;
      }

      oStatusMessage.setText("Processing file...");
      oStatusMessage.setType("Information");
      oStatusMessage.setVisible(true);

      // Read the file
      var oReader = new FileReader();
      oReader.onload = function (e) {
        try {
          var oData = new Uint8Array(e.target.result);
          var oWorkbook = new ExcelJS.Workbook();

          // ExcelJS load method returns a promise
          oWorkbook.xlsx.load(oData).then(function() {
            // Get first sheet
            var oSheet = oWorkbook.worksheets[0];
            if (!oSheet) {
              throw new Error("No worksheets found in file");
            }

            // Convert to JSON
            var aData = [];
            var aHeaders = [];

            oSheet.eachRow(function (row, rowNumber) {
              if (rowNumber === 1) {
                // First row is headers
                row.eachCell(function (cell) {
                  aHeaders.push(cell.value);
                });
              } else {
                // Data rows
                var oRow = {};
                row.eachCell(function (cell, colNumber) {
                  var sHeader = aHeaders[colNumber - 1];
                  oRow[sHeader] = cell.value;
                });
                aData.push(oRow);
              }
            });

            // Store in model
            var oModel = this.getOwnerComponent().getModel("appData");
            oModel.setProperty("/currentData", aData);
            oModel.setProperty("/fileName", oFile.name);
            oModel.setProperty("/metrics/rowCount", aData.length);
            oModel.setProperty("/metrics/columnCount", aHeaders.length);

            oStatusMessage.setText("File processed successfully! " + aData.length + " rows loaded.");
            oStatusMessage.setType("Success");

            MessageToast.show("File uploaded successfully!");

            // Navigate to dashboard
            setTimeout(function () {
              this.oRouter.navTo("dashboard");
            }.bind(this), 1500);

          }.bind(this)).catch(function(error) {
            oStatusMessage.setText("Error processing file: " + error.message);
            oStatusMessage.setType("Error");
            MessageToast.show("Error: " + error.message);
          });

        } catch (error) {
          oStatusMessage.setText("Error processing file: " + error.message);
          oStatusMessage.setType("Error");
          MessageToast.show("Error: " + error.message);
        }
      }.bind(this);

      oReader.onerror = function (error) {
        oStatusMessage.setText("Error reading file");
        oStatusMessage.setType("Error");
        MessageToast.show("Error reading file");
      };

      oReader.readAsArrayBuffer(oFile);
    },

    /**
     * Handler for upload complete event
     * @param {sap.ui.base.Event} oEvent - the event object
     * @public
     */
    onUploadComplete: function (oEvent) {
      var sResponse = oEvent.getParameter("response");
      MessageToast.show("Upload complete: " + sResponse);
    }
  });
});
