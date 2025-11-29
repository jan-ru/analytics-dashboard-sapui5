# Creating Sample Data for Testing

## Quick Method: Convert the CSV File

We've included a `sample-data.csv` file in this project. Here's how to convert it to Excel:

### Method 1: Microsoft Excel

1. Open Microsoft Excel
2. Go to File → Open
3. Select `sample-data.csv`
4. Go to File → Save As
5. Choose format: **Excel Workbook (.xlsx)**
6. Save as `sample-data.xlsx`

### Method 2: Google Sheets

1. Go to [Google Sheets](https://sheets.google.com)
2. Click File → Import
3. Upload `sample-data.csv`
4. After import, click File → Download → Microsoft Excel (.xlsx)

### Method 3: LibreOffice Calc

1. Open LibreOffice Calc
2. Open `sample-data.csv`
3. File → Save As
4. Format: **Excel 2007-365 (.xlsx)**

## Create Your Own Excel File

If you want to create your own test data:

### Example 1: Sales Data

| Product      | Category    | Sales | Profit | Date       |
|--------------|-------------|-------|--------|------------|
| Laptop       | Electronics | 1200  | 300    | 2024-01-15 |
| Phone        | Electronics | 800   | 200    | 2024-01-16 |
| Desk         | Furniture   | 450   | 120    | 2024-01-18 |
| Chair        | Furniture   | 200   | 50     | 2024-01-19 |

### Example 2: Monthly Revenue

| Month    | Revenue | Expenses | Profit | Growth |
|----------|---------|----------|--------|--------|
| January  | 50000   | 30000    | 20000  | 5.2    |
| February | 52000   | 31000    | 21000  | 4.0    |
| March    | 55000   | 32000    | 23000  | 5.8    |
| April    | 58000   | 33000    | 25000  | 5.5    |

### Example 3: Student Grades

| Student      | Math | Science | English | Average |
|--------------|------|---------|---------|---------|
| Alice Smith  | 95   | 88      | 92      | 91.67   |
| Bob Johnson  | 78   | 85      | 80      | 81.00   |
| Carol Lee    | 92   | 90      | 88      | 90.00   |
| David Brown  | 85   | 82      | 84      | 83.67   |

## Data Guidelines

For best results with the dashboard:

### Required Elements
- **Headers**: First row must contain column names
- **Data**: At least 2-3 rows of actual data
- **Mixed Types**: Include both text and numeric columns

### Recommended Structure
- **Label Column**: First column with names/categories (text)
- **Numeric Columns**: 1-3 columns with numbers for charts
- **Optional Columns**: Dates, categories, additional metadata

### File Requirements
- Format: .xlsx or .xls
- Maximum size: 10MB
- At least one sheet
- At least one row of data (plus headers)

## Testing Different Scenarios

### Test 1: Small Dataset (5-10 rows)
Good for testing basic functionality and chart rendering.

### Test 2: Medium Dataset (100-500 rows)
Test sorting, filtering, and export performance.

### Test 3: Large Dataset (1000-5000 rows)
Test application performance with larger data.

### Test 4: Multiple Numeric Columns
See how the dashboard handles and displays multiple KPIs.

### Test 5: Different Data Types
Mix of text, numbers, dates, decimals, and percentages.

## Quick Data Generation Tools

If you need to generate larger test datasets:

### Online Tools:
- [Mockaroo](https://www.mockaroo.com/) - Generate realistic test data
- [GenerateData](https://www.generatedata.com/) - Custom data generation
- [Random Data Generator](https://www.randomlists.com/data)

### Steps:
1. Visit one of the tools above
2. Define your columns (Product, Sales, Date, etc.)
3. Choose data types and ranges
4. Generate 50-100 rows
5. Download as Excel or CSV
6. Upload to the application

## Troubleshooting Sample Data

### Issue: "Sheet is empty"
**Solution**: Ensure your Excel file has at least one row of data beyond the headers.

### Issue: Charts show all zeros
**Solution**: Make sure you have numeric columns (not formatted as text).

### Issue: "No numeric columns found"
**Solution**: Include at least one column with actual numbers for charts to work.

### Issue: Export fails
**Solution**: Check that your data doesn't contain any special characters or formulas.

## Pre-made Sample Files

You can download pre-made sample Excel files from:

1. **Microsoft Office Templates**: [templates.office.com](https://templates.office.com)
2. **Google Sheets Templates**: [Google Sheets Template Gallery](https://docs.google.com/spreadsheets/u/0/)
3. **Sample Data Repositories**: Search for "sample excel data" on GitHub

Just make sure they meet the file requirements (under 10MB, .xlsx/.xls format).

---

**Ready to test?** Start with the included `sample-data.csv` file and convert it to Excel using one of the methods above!
