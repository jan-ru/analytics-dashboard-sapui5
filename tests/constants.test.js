/**
 * Unit Tests for Constants - Deno Test
 */

import { assertEquals, assert } from "https://deno.land/std@0.224.0/assert/mod.ts";
import {
  ROUTES,
  SAP_COLORS,
  TIMING,
  FILE_UPLOAD,
  NUMBER_FORMAT,
  TREND,
  MESSAGES,
  ICONS
} from '../js/constants.js';

// ROUTES Tests
Deno.test("ROUTES - should have all required route paths", () => {
  assertEquals(ROUTES.HOME, '/');
  assertEquals(ROUTES.UPLOAD, '/upload');
  assertEquals(ROUTES.DASHBOARD, '/dashboard');
  assertEquals(ROUTES.GRAPHS, '/graphs');
  assertEquals(ROUTES.TILES, '/tiles');
  assertEquals(ROUTES.DATA, '/data');
  assertEquals(ROUTES.ABOUT, '/about');
});

Deno.test("ROUTES - should have unique route values", () => {
  const values = Object.values(ROUTES);
  const uniqueValues = new Set(values);
  assertEquals(values.length, uniqueValues.size);
});

// SAP_COLORS Tests
Deno.test("SAP_COLORS - should have valid hex color codes", () => {
  const hexPattern = /^#[0-9a-f]{6}$/i;

  assert(hexPattern.test(SAP_COLORS.BLUE));
  assert(hexPattern.test(SAP_COLORS.GREEN));
  assert(hexPattern.test(SAP_COLORS.ORANGE));
  assert(hexPattern.test(SAP_COLORS.RED));
  assert(hexPattern.test(SAP_COLORS.PURPLE));
});

Deno.test("SAP_COLORS - should have lighter variants for all main colors", () => {
  assert(SAP_COLORS.BLUE_LIGHT !== undefined);
  assert(SAP_COLORS.GREEN_LIGHT !== undefined);
  assert(SAP_COLORS.ORANGE_LIGHT !== undefined);
  assert(SAP_COLORS.RED_LIGHT !== undefined);
  assert(SAP_COLORS.PURPLE_LIGHT !== undefined);
});

// TIMING Tests
Deno.test("TIMING - should have positive millisecond values", () => {
  assert(TIMING.SLIDE_ROTATION > 0);
  assert(TIMING.VIEW_INIT_DELAY > 0);
  assert(TIMING.TOAST_DURATION > 0);
  assert(TIMING.TOAST_FADE_DURATION > 0);
});

Deno.test("TIMING - should have reasonable timing values", () => {
  assertEquals(TIMING.SLIDE_ROTATION, 3000); // 3 seconds
  assertEquals(TIMING.VIEW_INIT_DELAY, 100); // 100ms
  assertEquals(TIMING.TOAST_DURATION, 3000); // 3 seconds
  assertEquals(TIMING.TOAST_FADE_DURATION, 300); // 300ms
});

// FILE_UPLOAD Tests
Deno.test("FILE_UPLOAD - should have valid file size limit", () => {
  assertEquals(FILE_UPLOAD.MAX_SIZE, 10 * 1024 * 1024); // 10MB
  assert(FILE_UPLOAD.MAX_SIZE > 0);
});

Deno.test("FILE_UPLOAD - should have allowed Excel extensions", () => {
  assert(FILE_UPLOAD.ALLOWED_EXTENSIONS.includes('.xlsx'));
  assert(FILE_UPLOAD.ALLOWED_EXTENSIONS.includes('.xls'));
});

Deno.test("FILE_UPLOAD - should have corresponding MIME types", () => {
  assert(FILE_UPLOAD.ALLOWED_MIME_TYPES.length > 0);
  assert(FILE_UPLOAD.ALLOWED_MIME_TYPES.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'));
});

// NUMBER_FORMAT Tests
Deno.test("NUMBER_FORMAT - should have valid threshold values", () => {
  assertEquals(NUMBER_FORMAT.MILLION_THRESHOLD, 1000000);
  assertEquals(NUMBER_FORMAT.THOUSAND_THRESHOLD, 1000);
  assert(NUMBER_FORMAT.MILLION_THRESHOLD > NUMBER_FORMAT.THOUSAND_THRESHOLD);
});

Deno.test("NUMBER_FORMAT - should have valid suffixes", () => {
  assertEquals(NUMBER_FORMAT.MILLION_SUFFIX, 'M');
  assertEquals(NUMBER_FORMAT.THOUSAND_SUFFIX, 'K');
});

Deno.test("NUMBER_FORMAT - should have valid decimal places", () => {
  assertEquals(NUMBER_FORMAT.DECIMAL_PLACES, 1);
  assert(NUMBER_FORMAT.DECIMAL_PLACES >= 0);
});

// TREND Tests
Deno.test("TREND - should have valid threshold values", () => {
  assertEquals(TREND.HIGH_THRESHOLD, 0.7);
  assertEquals(TREND.LOW_THRESHOLD, 0.3);
  assert(TREND.HIGH_THRESHOLD > TREND.LOW_THRESHOLD);
});

Deno.test("TREND - should have trend icons defined", () => {
  assert(TREND.ICONS.UP !== undefined);
  assert(TREND.ICONS.NEUTRAL !== undefined);
  assert(TREND.ICONS.DOWN !== undefined);
});

// MESSAGES Tests
Deno.test("MESSAGES - should have all required messages", () => {
  assert(MESSAGES.NO_DATA !== undefined);
  assert(MESSAGES.UPLOAD_REQUIRED !== undefined);
  assert(MESSAGES.EXPORT_SUCCESS !== undefined);
  assert(MESSAGES.EXPORT_FAILED !== undefined);
});

Deno.test("MESSAGES - should have non-empty message strings", () => {
  Object.values(MESSAGES).forEach(message => {
    assert(message);
    assertEquals(typeof message, 'string');
    assert(message.length > 0);
  });
});

// ICONS Tests
Deno.test("ICONS - should have all commonly used icons", () => {
  assert(ICONS.UPLOAD !== undefined);
  assert(ICONS.DOWNLOAD !== undefined);
  assert(ICONS.CHART !== undefined);
  assert(ICONS.DATA !== undefined);
});

Deno.test("ICONS - should have emoji or string values", () => {
  Object.values(ICONS).forEach(icon => {
    assertEquals(typeof icon, 'string');
    assert(icon.length > 0);
  });
});
