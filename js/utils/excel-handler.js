/**
 * Excel Handler Utility
 * Handles Excel file import and export using ExcelJS
 */

/**
 * Import Excel file and convert to JSON
 * @param {File} file - Excel file object from file input
 * @returns {Promise} - Resolves with parsed data and metadata
 */
export async function importExcel(file) {
  // Validate file type
  const validExtensions = ['.xlsx', '.xls'];
  const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

  if (!validExtensions.includes(fileExtension)) {
    throw new Error('Invalid file type. Please upload .xlsx or .xls file.');
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    throw new Error('File is too large. Maximum size is 10MB.');
  }

  try {
    // Read file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Create ExcelJS workbook
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);

    // Get sheet names
    const sheetNames = workbook.worksheets.map(ws => ws.name);

    if (sheetNames.length === 0) {
      throw new Error('Excel file contains no sheets.');
    }

    // Read first sheet by default
    const worksheet = workbook.worksheets[0];
    const firstSheetName = worksheet.name;

    // Convert to JSON (array of objects)
    const jsonData = [];
    const headers = [];

    // Get headers from first row
    const firstRow = worksheet.getRow(1);
    firstRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      headers[colNumber - 1] = cell.value ? String(cell.value) : `Column${colNumber}`;
    });

    // Process data rows (skip header row)
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row

      const rowData = {};
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        const header = headers[colNumber - 1];
        rowData[header] = cell.value !== null && cell.value !== undefined
          ? String(cell.value)
          : '';
      });

      jsonData.push(rowData);
    });

    if (jsonData.length === 0) {
      throw new Error('Sheet is empty. No data to process.');
    }

    // Return parsed data with metadata
    return {
      data: jsonData,
      sheetNames: sheetNames,
      fileName: file.name,
      sheetName: firstSheetName,
      rowCount: jsonData.length,
      columnCount: headers.length
    };

  } catch (error) {
    throw new Error(`Failed to parse Excel file: ${error.message}`);
  }
}

/**
 * Export data to Excel file
 * @param {Array} data - Array of objects to export
 * @param {string} fileName - Output file name (without extension)
 * @returns {Promise<boolean>} - Success status
 */
export async function exportToExcel(data, fileName = 'export') {
  try {
    if (!data || data.length === 0) {
      console.error('No data to export');
      return false;
    }

    // Create workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Get column headers
    const columns = Object.keys(data[0] || {});

    // Set up columns with auto-width
    worksheet.columns = columns.map(col => ({
      header: col,
      key: col,
      width: Math.min(Math.max(col.length, 10), 50)
    }));

    // Add data rows
    data.forEach(row => {
      worksheet.addRow(row);
    });

    // Auto-fit column widths based on content
    worksheet.columns.forEach((column, idx) => {
      let maxLength = column.header.length;
      data.forEach(row => {
        const value = String(row[column.key] || '');
        maxLength = Math.max(maxLength, value.length);
      });
      column.width = Math.min(maxLength + 2, 50);
    });

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE3F2FD' }
    };

    // Add timestamp to filename
    const timestamp = new Date().toISOString().split('T')[0];
    const finalFileName = `${fileName}-${timestamp}.xlsx`;

    // Generate Excel file and trigger download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = finalFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    console.log(`Exported ${data.length} rows to ${finalFileName}`);
    return true;

  } catch (error) {
    console.error('Export failed:', error);
    return false;
  }
}

/**
 * Export specific columns to Excel
 * @param {Array} data - Array of objects
 * @param {Array} columns - Column names to include
 * @param {string} fileName - Output file name
 * @returns {Promise<boolean>} - Success status
 */
export async function exportColumnsToExcel(data, columns, fileName = 'export') {
  try {
    if (!data || data.length === 0) {
      console.error('No data to export');
      return false;
    }

    // Filter data to only include specified columns
    const filteredData = data.map(row => {
      const filteredRow = {};
      columns.forEach(col => {
        if (col in row) {
          filteredRow[col] = row[col];
        }
      });
      return filteredRow;
    });

    return await exportToExcel(filteredData, fileName);

  } catch (error) {
    console.error('Export failed:', error);
    return false;
  }
}
