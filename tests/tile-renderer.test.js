/**
 * Unit Tests for Tile Renderer Utilities
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { formatNumber, calculateTrend } from '../js/utils/tile-renderer.js';
import { NUMBER_FORMAT, TREND } from '../js/constants.js';

describe('formatNumber', () => {
  it('should format numbers in millions with M suffix', () => {
    expect(formatNumber(1000000)).toBe('1.0M');
    expect(formatNumber(1500000)).toBe('1.5M');
    expect(formatNumber(2345678)).toBe('2.3M');
  });

  it('should format numbers in thousands with K suffix', () => {
    expect(formatNumber(1000)).toBe('1.0K');
    expect(formatNumber(2500)).toBe('2.5K');
    expect(formatNumber(45678)).toBe('45.7K');
  });

  it('should format small numbers without suffix', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(450)).toBe('450');
    expect(formatNumber(999)).toBe('999');
  });

  it('should handle decimal precision correctly', () => {
    expect(formatNumber(1234567)).toBe('1.2M');
    expect(formatNumber(1567)).toBe('1.6K');
  });

  it('should handle edge cases', () => {
    expect(formatNumber(999999)).toBe('1000.0K');
    expect(formatNumber(1000001)).toBe('1.0M');
  });
});

describe('calculateTrend', () => {
  it('should return upward trend for high ratio (> 0.7)', () => {
    const stats = { avg: 80, max: 100 };
    expect(calculateTrend(stats)).toBe(TREND.ICONS.UP);
  });

  it('should return upward trend for ratio exactly at threshold', () => {
    const stats = { avg: 70, max: 100 };
    expect(calculateTrend(stats)).toBe(TREND.ICONS.NEUTRAL);
  });

  it('should return neutral trend for medium ratio (0.3 - 0.7)', () => {
    const stats = { avg: 50, max: 100 };
    expect(calculateTrend(stats)).toBe(TREND.ICONS.NEUTRAL);
  });

  it('should return downward trend for low ratio (< 0.3)', () => {
    const stats = { avg: 20, max: 100 };
    expect(calculateTrend(stats)).toBe(TREND.ICONS.DOWN);
  });

  it('should return downward trend for ratio exactly at threshold', () => {
    const stats = { avg: 30, max: 100 };
    expect(calculateTrend(stats)).toBe(TREND.ICONS.NEUTRAL);
  });

  it('should handle decimal ratios correctly', () => {
    const stats1 = { avg: 75.5, max: 100 };
    expect(calculateTrend(stats1)).toBe(TREND.ICONS.UP);

    const stats2 = { avg: 25.5, max: 100 };
    expect(calculateTrend(stats2)).toBe(TREND.ICONS.DOWN);
  });

  it('should handle non-100 max values', () => {
    const stats1 = { avg: 71, max: 100 };
    expect(calculateTrend(stats1)).toBe(TREND.ICONS.UP);

    const stats2 = { avg: 800, max: 1000 };
    expect(calculateTrend(stats2)).toBe(TREND.ICONS.UP);

    const stats3 = { avg: 15, max: 50 };
    expect(calculateTrend(stats3)).toBe(TREND.ICONS.DOWN);
  });

  it('should handle edge case where avg equals max', () => {
    const stats = { avg: 100, max: 100 };
    expect(calculateTrend(stats)).toBe(TREND.ICONS.UP);
  });

  it('should handle edge case where avg is zero', () => {
    const stats = { avg: 0, max: 100 };
    expect(calculateTrend(stats)).toBe(TREND.ICONS.DOWN);
  });
});

describe('Integration: formatNumber with calculateTrend', () => {
  it('should work together for realistic data', () => {
    const stats = {
      min: 100,
      max: 10000,
      avg: 7500,
      sum: 75000,
      count: 10
    };

    const formattedSum = formatNumber(stats.sum);
    const trend = calculateTrend(stats);

    expect(formattedSum).toBe('75.0K');
    expect(trend).toBe(TREND.ICONS.UP); // 7500/10000 = 0.75 > 0.7
  });
});
