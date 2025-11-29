# SAP Fiori Tiles - Feature Documentation

## Overview

The application now includes **SAP Fiori-style tiles** that provide an intuitive, visually appealing way to display key metrics and enable quick actions.

## SAP Tile Features

### Visual Design
- **SAP Fiori Colors**: Blue, Green, Orange, Red, Purple
- **Left Border Accent**: 4px colored border for visual hierarchy
- **Hover Effect**: Elevates on hover with shadow effect
- **Click Feedback**: Subtle press animation
- **Responsive Grid**: Auto-adjusts to screen size

### Tile Components

Each tile includes:
1. **Header**: Small label (uppercase, gray)
2. **Value**: Large, bold number or icon
3. **Footer**: Descriptive text or call-to-action

## Where Tiles Are Used

### 1. Upload View (Landing Page)

**4 Step-by-Step Process Tiles**:

```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  Step 1     │ │  Step 2     │ │  Step 3     │ │  Step 4     │
│   📁        │ │   ⚙️         │ │   📊        │ │   💾        │
│  Choose     │ │  Process    │ │  View       │ │  Export     │
│  file       │ │  data       │ │  insights   │ │  results    │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
  Green           Orange          Purple          Red
```

**Purpose**: Guide users through the workflow

### 2. Dashboard View (Main Dashboard)

**Dynamic Metric Tiles**:

```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│TOTAL RECORDS│ │DATA COLUMNS │ │   SALES     │ │   PROFIT    │
│    1,234    │ │      5      │ │   2.5K      │ │    450      │
│Click to view│ │Available    │ │Total: 25    │ │Total: 25    │
│data table   │ │fields       │ │entries      │ │entries      │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
  Blue (Click)    Green           Orange          Purple
```

**Features**:
- First tile (Total Records) - Clickable, navigates to data table
- Second tile (Columns) - Shows column count
- Remaining tiles - Auto-generated from numeric columns
- Smart number formatting (K for thousands, M for millions)
- Click any metric tile to see detailed statistics

## Tile Color Scheme

Based on SAP Fiori design guidelines:

| Color  | Hex Code | Usage                        |
|--------|----------|------------------------------|
| Blue   | #0854a0  | Primary actions, main metrics|
| Green  | #107e3e  | Success, positive metrics    |
| Orange | #e26800  | Warnings, secondary metrics  |
| Red    | #bb0000  | Critical, important metrics  |
| Purple | #91007b  | Special, tertiary metrics    |

## Interactive Features

### Click Actions

1. **Total Records Tile**:
   - Navigates to Data Table view
   - Allows quick access to full data

2. **Metric Tiles** (Sales, Profit, etc.):
   - Shows popup with detailed statistics
   - Displays: Total, Average, Min, Max, Count

### Hover Effects

- Box shadow increases
- Tile lifts 2px
- Smooth transition (0.2s)

### Active State

- Tile presses down
- Shadow reduces
- Provides tactile feedback

## Code Example

### Creating a SAP Tile

```html
<div class="sap-tile tile-green" data-action="metric">
  <div>
    <div class="tile-header">SALES</div>
    <div class="tile-value">2.5K</div>
  </div>
  <div class="tile-footer">Total: 25 entries</div>
</div>
```

### Tile Classes

```css
.sap-tile           /* Base tile */
.tile-green         /* Green accent */
.tile-orange        /* Orange accent */
.tile-red           /* Red accent */
.tile-purple        /* Purple accent */
```

## Smart Features

### Number Formatting

The tiles automatically format large numbers:

| Value     | Display |
|-----------|---------|
| 450       | 450     |
| 1,234     | 1.2K    |
| 45,678    | 45.7K   |
| 1,234,567 | 1.2M    |

### Auto-Generated Tiles

The dashboard automatically creates tiles for:
- Total row count
- Column count
- Up to 4 numeric columns from your data
- Each with unique color

## Accessibility

- **Keyboard Navigation**: Tiles are focusable
- **Screen Readers**: Proper semantic HTML
- **Color Contrast**: Meets WCAG AA standards
- **Touch Targets**: Minimum 140px height

## Responsive Behavior

Tiles adapt to screen size:

- **Desktop**: 4-6 tiles per row
- **Tablet**: 3-4 tiles per row
- **Mobile**: 2 tiles per row (or 1 for very small screens)

Grid uses `repeat(auto-fill, minmax(180px, 1fr))`

## Usage Tips

### For Developers

1. Add `data-action` attribute for click handling
2. Use appropriate color class for meaning
3. Keep headers short (max 15 characters)
4. Footer should be actionable or descriptive

### For Users

1. Hover over tiles to see they're interactive
2. Click metric tiles to see detailed stats
3. Click "Total Records" to jump to data table
4. Use tiles for quick overview of your data

## Future Enhancements

Potential additions:

- [ ] Trend indicators (▲ up, ▼ down)
- [ ] Sparkline charts in tiles
- [ ] Custom tile colors based on thresholds
- [ ] Tile reordering (drag & drop)
- [ ] Tile size options (small, medium, large)
- [ ] Export tile as image
- [ ] Tile refresh animation

## Testing the Feature

1. **Upload View**:
   - Navigate to Upload page
   - See 4 step tiles with emojis
   - Observe green, orange, purple, red colors

2. **Dashboard View**:
   - Upload a sample Excel file
   - See metric tiles appear
   - Click "Total Records" tile → navigates to data table
   - Click any metric tile → see statistics popup
   - Hover over tiles → see elevation effect

## Browser Compatibility

- ✅ Chrome 89+
- ✅ Firefox 87+
- ✅ Safari 14.1+
- ✅ Edge 89+

---

**The SAP tiles bring a modern, enterprise-grade UI to your analytics dashboard!** 🎨✨
