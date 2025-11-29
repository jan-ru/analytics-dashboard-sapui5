# Quick Start Guide

## Getting Started in 3 Steps

### 1. Start a Local Server

Choose one of these methods:

**Python 3** (Recommended):
```bash
cd /Users/jrm/Projects/sapui5
python3 -m http.server 8000
```

**Node.js**:
```bash
npx http-server -p 8000
```

**PHP**:
```bash
php -S localhost:8000
```

### 2. Open Your Browser

Navigate to:
```
http://localhost:8000
```

### 3. Upload Sample Data

You have two options:

**Option A: Use the provided CSV file**
1. Open `sample-data.csv` in Excel, Google Sheets, or LibreOffice
2. Save it as `sample-data.xlsx`
3. Upload it to the application

**Option B: Create your own Excel file**
1. Create a new Excel file with these columns:
   - Product (text)
   - Category (text)
   - Sales (numbers)
   - Profit (numbers)
   - Date (dates)
2. Add some sample data
3. Save as .xlsx
4. Upload to the application

## What to Expect

After uploading:
1. You'll be redirected to the **Dashboard**
2. See KPI cards showing total rows, columns, and metrics
3. View 3 different chart types visualizing your data
4. Navigate to **Data Table** to explore and filter your data
5. Click **Export** to download your data back to Excel

## Testing Checklist

- [ ] Application loads without errors
- [ ] Side navigation works (Upload, Dashboard, Data, About)
- [ ] File upload accepts .xlsx files
- [ ] Dashboard displays KPI cards
- [ ] All 3 charts render (Bar, Line, Pie)
- [ ] Data table displays all rows
- [ ] Clicking column headers sorts data
- [ ] Search box filters data
- [ ] Export button downloads Excel file

## Troubleshooting

**Problem: Application doesn't load**
- Check browser console (F12) for errors
- Ensure you're using a modern browser (Chrome 89+, Firefox 87+, Safari 14.1+, Edge 89+)
- Verify you're accessing via http://localhost (not file://)

**Problem: Charts don't display**
- Check browser console for Chart.js errors
- Verify your data has numeric columns
- Try refreshing the page

**Problem: File upload fails**
- Ensure file is .xlsx or .xls format
- Check file size is under 10MB
- Verify file contains at least one sheet with data

## Next Steps

Once everything works:
1. Read the full README.md for detailed documentation
2. Check design.md for architecture details
3. Review requirements.md for original project specifications
4. Explore the code in the `js/` directory

## Need Help?

Check these files in order:
1. `README.md` - Comprehensive documentation
2. `design.md` - Technical architecture
3. `requirements.md` - Project requirements
4. Browser developer console (F12) - Error messages

Happy analyzing! 📊
