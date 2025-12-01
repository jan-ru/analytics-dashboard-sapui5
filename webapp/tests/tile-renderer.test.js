/**
 * Unit Tests for Tile Renderer Utilities - Deno Test
 */

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { formatNumber, calculateTrend } from '../js/utils/tile-renderer.js';
import { NUMBER_FORMAT, TREND } from '../js/constants.js';

// formatNumber Tests
Deno.test("formatNumber - should format numbers in millions with M suffix", () => {
  assertEquals(formatNumber(1000000), '1.0M');
  assertEquals(formatNumber(1500000), '1.5M');
  assertEquals(formatNumber(2345678), '2.3M');
});

Deno.test("formatNumber - should format numbers in thousands with K suffix", () => {
  assertEquals(formatNumber(1000), '1.0K');
  assertEquals(formatNumber(2500), '2.5K');
  assertEquals(formatNumber(45678), '45.7K');
});

Deno.test("formatNumber - should format small numbers without suffix", () => {
  assertEquals(formatNumber(0), '0');
  assertEquals(formatNumber(450), '450');
  assertEquals(formatNumber(999), '999');
});

Deno.test("formatNumber - should handle decimal precision correctly", () => {
  assertEquals(formatNumber(1234567), '1.2M');
  assertEquals(formatNumber(1567), '1.6K');
});

Deno.test("formatNumber - should handle edge cases", () => {
  assertEquals(formatNumber(999999), '1000.0K');
  assertEquals(formatNumber(1000001), '1.0M');
});

// calculateTrend Tests
Deno.test("calculateTrend - should return upward trend for high ratio (> 0.7)", () => {
  const stats = { avg: 80, max: 100 };
  assertEquals(calculateTrend(stats), TREND.ICONS.UP);
});

Deno.test("calculateTrend - should return neutral trend for ratio exactly at 0.7 threshold", () => {
  const stats = { avg: 70, max: 100 };
  assertEquals(calculateTrend(stats), TREND.ICONS.NEUTRAL);
});

Deno.test("calculateTrend - should return neutral trend for medium ratio (0.3 - 0.7)", () => {
  const stats = { avg: 50, max: 100 };
  assertEquals(calculateTrend(stats), TREND.ICONS.NEUTRAL);
});

Deno.test("calculateTrend - should return downward trend for low ratio (< 0.3)", () => {
  const stats = { avg: 20, max: 100 };
  assertEquals(calculateTrend(stats), TREND.ICONS.DOWN);
});

Deno.test("calculateTrend - should return neutral trend for ratio exactly at 0.3 threshold", () => {
  const stats = { avg: 30, max: 100 };
  assertEquals(calculateTrend(stats), TREND.ICONS.NEUTRAL);
});

Deno.test("calculateTrend - should handle decimal ratios correctly", () => {
  const stats1 = { avg: 75.5, max: 100 };
  assertEquals(calculateTrend(stats1), TREND.ICONS.UP);

  const stats2 = { avg: 25.5, max: 100 };
  assertEquals(calculateTrend(stats2), TREND.ICONS.DOWN);
});

Deno.test("calculateTrend - should handle non-100 max values", () => {
  const stats1 = { avg: 71, max: 100 };
  assertEquals(calculateTrend(stats1), TREND.ICONS.UP);

  const stats2 = { avg: 800, max: 1000 };
  assertEquals(calculateTrend(stats2), TREND.ICONS.UP);

  const stats3 = { avg: 15, max: 50 };
  assertEquals(calculateTrend(stats3), TREND.ICONS.DOWN);
});

Deno.test("calculateTrend - should handle edge case where avg equals max", () => {
  const stats = { avg: 100, max: 100 };
  assertEquals(calculateTrend(stats), TREND.ICONS.UP);
});

Deno.test("calculateTrend - should handle edge case where avg is zero", () => {
  const stats = { avg: 0, max: 100 };
  assertEquals(calculateTrend(stats), TREND.ICONS.DOWN);
});

// Integration Tests
Deno.test("Integration - formatNumber with calculateTrend should work together for realistic data", () => {
  const stats = {
    min: 100,
    max: 10000,
    avg: 7500,
    sum: 75000,
    count: 10
  };

  const formattedSum = formatNumber(stats.sum);
  const trend = calculateTrend(stats);

  assertEquals(formattedSum, '75.0K');
  assertEquals(trend, TREND.ICONS.UP); // 7500/10000 = 0.75 > 0.7
});
