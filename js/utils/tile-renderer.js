/**
 * Tile Renderer Utility
 * Shared rendering functions for SAP Fiori tiles
 */

import { NUMBER_FORMAT, TREND, TIMING, TILE_CLASSES } from '../constants.js';
import { showInfo } from './toast.js';

/**
 * Format large numbers with K/M abbreviations
 */
export function formatNumber(num) {
  if (num >= NUMBER_FORMAT.MILLION_THRESHOLD) {
    return (num / NUMBER_FORMAT.MILLION_THRESHOLD).toFixed(NUMBER_FORMAT.DECIMAL_PLACES) + NUMBER_FORMAT.MILLION_SUFFIX;
  } else if (num >= NUMBER_FORMAT.THOUSAND_THRESHOLD) {
    return (num / NUMBER_FORMAT.THOUSAND_THRESHOLD).toFixed(NUMBER_FORMAT.DECIMAL_PLACES) + NUMBER_FORMAT.THOUSAND_SUFFIX;
  }
  return num.toFixed(0);
}

/**
 * Calculate trend indicator based on average vs max ratio
 */
export function calculateTrend(stats) {
  const ratio = stats.avg / stats.max;
  if (ratio > TREND.HIGH_THRESHOLD) return TREND.ICONS.UP;
  if (ratio < TREND.LOW_THRESHOLD) return TREND.ICONS.DOWN;
  return TREND.ICONS.NEUTRAL;
}

/**
 * Render generic tiles from numeric columns
 */
export function renderGenericTiles(metrics, maxTiles = 2) {
  const numericCols = Object.keys(metrics.numericColumns);
  if (numericCols.length === 0) return '';

  const colors = [TILE_CLASSES.ORANGE, TILE_CLASSES.RED];

  return numericCols.slice(0, maxTiles).map((col, index) => {
    const stats = metrics.numericColumns[col];
    const color = colors[index % colors.length];
    const trend = calculateTrend(stats);

    return `
      <div class="sap-tile ${color}" data-action="metric" data-column="${col}">
        <div>
          <div class="tile-header">${col}</div>
          <div class="tile-value">${formatNumber(stats.sum)}</div>
        </div>
        <div class="tile-footer">
          ${trend} Avg: ${formatNumber(stats.avg)}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Render comparison tile
 */
export function renderComparisonTile(metrics) {
  const numericCols = Object.keys(metrics.numericColumns);
  if (numericCols.length === 0) return '';

  const firstCol = metrics.numericColumns[numericCols[0]];
  const current = firstCol.avg;
  const previous = firstCol.min;
  const delta = ((current - previous) / previous * 100).toFixed(1);
  const isPositive = delta >= 0;

  return `
    <div class="sap-tile comparison tile-orange">
      <div class="tile-header">${numericCols[0]} COMPARISON</div>
      <div class="comparison-values">
        <div>
          <div style="font-size: 0.75rem; color: #999;">Current</div>
          <div style="font-size: 1.5rem; font-weight: 600;">${formatNumber(current)}</div>
          <div class="comparison-bar">
            <div class="comparison-bar-fill" style="width: ${(current / firstCol.max * 100).toFixed(0)}%;"></div>
          </div>
        </div>
        <div class="comparison-divider">vs</div>
        <div>
          <div style="font-size: 0.75rem; color: #999;">Previous</div>
          <div style="font-size: 1.5rem; font-weight: 600;">${formatNumber(previous)}</div>
          <div class="comparison-bar">
            <div class="comparison-bar-fill" style="width: ${(previous / firstCol.max * 100).toFixed(0)}%; background: #ccc;"></div>
          </div>
        </div>
      </div>
      <div class="comparison-delta ${isPositive ? 'positive' : 'negative'}">
        ${isPositive ? '▲' : '▼'} ${Math.abs(delta)}% ${isPositive ? 'increase' : 'decrease'}
      </div>
    </div>
  `;
}

/**
 * Render micro chart tile
 */
export function renderMicroChartTile(metrics) {
  const numericCols = Object.keys(metrics.numericColumns);
  if (numericCols.length === 0) return '';

  const firstCol = metrics.numericColumns[numericCols[0]];
  const values = [firstCol.min, firstCol.avg * 0.8, firstCol.avg, firstCol.avg * 1.2, firstCol.max];
  const maxVal = Math.max(...values);

  const bars = values.map(val => {
    const height = (val / maxVal * 100).toFixed(0);
    return `<div class="chart-bar" style="height: ${height}%;"></div>`;
  }).join('');

  return `
    <div class="sap-tile micro-chart tile-green">
      <div class="tile-header">${numericCols[0]} TREND</div>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <div class="tile-value" style="margin: 0;">${formatNumber(firstCol.avg)}</div>
        <div class="micro-chart-container">
          ${bars}
        </div>
      </div>
      <div class="tile-footer">5-period average trend</div>
    </div>
  `;
}

/**
 * Initialize slide tile with auto-rotation
 */
export function initializeSlideTile(metrics) {
  const slideContent = document.getElementById('slideContent');
  const indicators = document.getElementById('slideIndicators');

  if (!slideContent) return null;

  const numericCols = Object.keys(metrics.numericColumns);
  const slides = [
    {
      header: 'TODAY',
      value: metrics.rowCount.toLocaleString(),
      footer: 'Total Records'
    },
    {
      header: 'THIS WEEK',
      value: metrics.columnCount,
      footer: 'Data Columns'
    },
    {
      header: 'THIS MONTH',
      value: numericCols.length > 0 ? formatNumber(metrics.numericColumns[numericCols[0]].sum) : '0',
      footer: numericCols.length > 0 ? `${numericCols[0]} Total` : 'No Data'
    }
  ];

  slideContent.innerHTML = slides.map((slide, index) => `
    <div class="slide-item ${index === 0 ? 'active' : ''}">
      <div class="tile-header">${slide.header}</div>
      <div class="tile-value">${slide.value}</div>
      <div class="tile-footer">${slide.footer}</div>
    </div>
  `).join('');

  const prevBtn = document.querySelector('.slide-prev');
  const nextBtn = document.querySelector('.slide-next');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    const items = slideContent.querySelectorAll('.slide-item');
    const dots = indicators.querySelectorAll('.indicator');

    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentSlide = index;
  }

  function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      const newIndex = (currentSlide + 1) % slides.length;
      showSlide(newIndex);
    }, 3000);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const newIndex = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(newIndex);
      resetSlideInterval();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const newIndex = (currentSlide + 1) % slides.length;
      showSlide(newIndex);
      resetSlideInterval();
    });
  }

  resetSlideInterval();
  return slideInterval;
}

/**
 * Show metric details in toast notification
 */
export function showMetricDetails(column, metrics) {
  const stats = metrics.numericColumns[column];

  if (stats) {
    const details = `${column}: Total ${stats.sum.toFixed(2)}, Avg ${stats.avg.toFixed(2)}, Min ${stats.min.toFixed(2)}, Max ${stats.max.toFixed(2)}, Count ${stats.count}`;
    showInfo(details, 5000); // Show for 5 seconds
  }
}
