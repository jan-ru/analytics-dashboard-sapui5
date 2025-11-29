/**
 * Excel Handler Utility
 * Handles Excel file import and export using SheetJS (xlsx library)
 */

/**
 * Import Excel file and convert to JSON
 * @param {File} file - Excel file object from file input
 * @returns {Promise} - Resolves with parsed data and metadata
 */
export async function importExcel(file) {
  return new Promise((resolve, reject) => {
    // Validate file type
    const validExtensions = ['.xlsx', '.xls'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      reject(new Error('Invalid file type. Please upload .xlsx or .xls file.'));
      return;
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      reject(new Error('File is too large. Maximum size is 10MB.'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        // Parse Excel file using SheetJS
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Get sheet names
        const sheetNames = workbook.SheetNames;

        if (sheetNames.length === 0) {
          reject(new Error('Excel file contains no sheets.'));
          return;
        }

        // Read first sheet by default
        const firstSheetName = sheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert to JSON (array of objects)
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          raw: false,  // Keep formatting
          defval: ''   // Default value for empty cells
        });

        if (jsonData.length === 0) {
          reject(new Error('Sheet is empty. No data to process.'));
          return;
        }

        // Return parsed data with metadata
        resolve({
          data: jsonData,
          sheetNames: sheetNames,
          fileName: file.name,
          sheetName: firstSheetName,
          rowCount: jsonData.length,
          columnCount: Object.keys(jsonData[0] || {}).length
        });

      } catch (error) {
        reject(new Error(`Failed to parse Excel file: ${error.message}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file. Please try again.'));
    };

    // Read file as ArrayBuffer
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Export data to Excel file
 * @param {Array} data - Array of objects to export
 * @param {string} fileName - Output file name (without extension)
 * @returns {boolean} - Success status
 */
export function exportToExcel(data, fileName = 'export') {
  try {
    if (!data || data.length === 0) {
      console.error('No data to export');
      return false;
    }

    // Convert JSON to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    // Auto-fit column widths
    const columnWidths = [];
    const columns = Object.keys(data[0] || {});

    columns.forEach((col, idx) => {
      const maxLength = Math.max(
        col.length,
        ...data.map(row => String(row[col] || '').length)
      );
      columnWidths[idx] = { wch: Math.min(maxLength + 2, 50) };
    });

    worksheet['!cols'] = columnWidths;

    // Add timestamp to filename
    const timestamp = new Date().toISOString().split('T')[0];
    const finalFileName = `${fileName}-${timestamp}.xlsx`;

    // Write file and trigger download
    XLSX.writeFile(workbook, finalFileName);

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
 * @returns {boolean} - Success status
 */
export function exportColumnsToExcel(data, columns, fileName = 'export') {
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

    return exportToExcel(filteredData, fileName);

  } catch (error) {
    console.error('Export failed:', error);
    return false;
  }
}
