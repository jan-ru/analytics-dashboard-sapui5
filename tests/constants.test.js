/**
 * Unit Tests for Constants
 */

import { describe, it, expect } from 'vitest';
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

describe('ROUTES', () => {
  it('should have all required route paths', () => {
    expect(ROUTES.HOME).toBe('/');
    expect(ROUTES.UPLOAD).toBe('/upload');
    expect(ROUTES.DASHBOARD).toBe('/dashboard');
    expect(ROUTES.GRAPHS).toBe('/graphs');
    expect(ROUTES.TILES).toBe('/tiles');
    expect(ROUTES.DATA).toBe('/data');
    expect(ROUTES.ABOUT).toBe('/about');
  });

  it('should have unique route values', () => {
    const values = Object.values(ROUTES);
    const uniqueValues = new Set(values);
    expect(values.length).toBe(uniqueValues.size);
  });
});

describe('SAP_COLORS', () => {
  it('should have valid hex color codes', () => {
    const hexPattern = /^#[0-9a-f]{6}$/i;

    expect(SAP_COLORS.BLUE).toMatch(hexPattern);
    expect(SAP_COLORS.GREEN).toMatch(hexPattern);
    expect(SAP_COLORS.ORANGE).toMatch(hexPattern);
    expect(SAP_COLORS.RED).toMatch(hexPattern);
    expect(SAP_COLORS.PURPLE).toMatch(hexPattern);
  });

  it('should have lighter variants for all main colors', () => {
    expect(SAP_COLORS.BLUE_LIGHT).toBeDefined();
    expect(SAP_COLORS.GREEN_LIGHT).toBeDefined();
    expect(SAP_COLORS.ORANGE_LIGHT).toBeDefined();
    expect(SAP_COLORS.RED_LIGHT).toBeDefined();
    expect(SAP_COLORS.PURPLE_LIGHT).toBeDefined();
  });
});

describe('TIMING', () => {
  it('should have positive millisecond values', () => {
    expect(TIMING.SLIDE_ROTATION).toBeGreaterThan(0);
    expect(TIMING.VIEW_INIT_DELAY).toBeGreaterThan(0);
    expect(TIMING.TOAST_DURATION).toBeGreaterThan(0);
    expect(TIMING.TOAST_FADE_DURATION).toBeGreaterThan(0);
  });

  it('should have reasonable timing values', () => {
    expect(TIMING.SLIDE_ROTATION).toBe(3000); // 3 seconds
    expect(TIMING.VIEW_INIT_DELAY).toBe(100); // 100ms
    expect(TIMING.TOAST_DURATION).toBe(3000); // 3 seconds
    expect(TIMING.TOAST_FADE_DURATION).toBe(300); // 300ms
  });
});

describe('FILE_UPLOAD', () => {
  it('should have valid file size limit', () => {
    expect(FILE_UPLOAD.MAX_SIZE).toBe(10 * 1024 * 1024); // 10MB
    expect(FILE_UPLOAD.MAX_SIZE).toBeGreaterThan(0);
  });

  it('should have allowed Excel extensions', () => {
    expect(FILE_UPLOAD.ALLOWED_EXTENSIONS).toContain('.xlsx');
    expect(FILE_UPLOAD.ALLOWED_EXTENSIONS).toContain('.xls');
  });

  it('should have corresponding MIME types', () => {
    expect(FILE_UPLOAD.ALLOWED_MIME_TYPES.length).toBeGreaterThan(0);
    expect(FILE_UPLOAD.ALLOWED_MIME_TYPES).toContain('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  });
});

describe('NUMBER_FORMAT', () => {
  it('should have valid threshold values', () => {
    expect(NUMBER_FORMAT.MILLION_THRESHOLD).toBe(1000000);
    expect(NUMBER_FORMAT.THOUSAND_THRESHOLD).toBe(1000);
    expect(NUMBER_FORMAT.MILLION_THRESHOLD).toBeGreaterThan(NUMBER_FORMAT.THOUSAND_THRESHOLD);
  });

  it('should have valid suffixes', () => {
    expect(NUMBER_FORMAT.MILLION_SUFFIX).toBe('M');
    expect(NUMBER_FORMAT.THOUSAND_SUFFIX).toBe('K');
  });

  it('should have valid decimal places', () => {
    expect(NUMBER_FORMAT.DECIMAL_PLACES).toBe(1);
    expect(NUMBER_FORMAT.DECIMAL_PLACES).toBeGreaterThanOrEqual(0);
  });
});

describe('TREND', () => {
  it('should have valid threshold values', () => {
    expect(TREND.HIGH_THRESHOLD).toBe(0.7);
    expect(TREND.LOW_THRESHOLD).toBe(0.3);
    expect(TREND.HIGH_THRESHOLD).toBeGreaterThan(TREND.LOW_THRESHOLD);
  });

  it('should have trend icons defined', () => {
    expect(TREND.ICONS.UP).toBeDefined();
    expect(TREND.ICONS.NEUTRAL).toBeDefined();
    expect(TREND.ICONS.DOWN).toBeDefined();
  });
});

describe('MESSAGES', () => {
  it('should have all required messages', () => {
    expect(MESSAGES.NO_DATA).toBeDefined();
    expect(MESSAGES.UPLOAD_REQUIRED).toBeDefined();
    expect(MESSAGES.EXPORT_SUCCESS).toBeDefined();
    expect(MESSAGES.EXPORT_FAILED).toBeDefined();
  });

  it('should have non-empty message strings', () => {
    Object.values(MESSAGES).forEach(message => {
      expect(message).toBeTruthy();
      expect(typeof message).toBe('string');
      expect(message.length).toBeGreaterThan(0);
    });
  });
});

describe('ICONS', () => {
  it('should have all commonly used icons', () => {
    expect(ICONS.UPLOAD).toBeDefined();
    expect(ICONS.DOWNLOAD).toBeDefined();
    expect(ICONS.CHART).toBeDefined();
    expect(ICONS.DATA).toBeDefined();
  });

  it('should have emoji or string values', () => {
    Object.values(ICONS).forEach(icon => {
      expect(typeof icon).toBe('string');
      expect(icon.length).toBeGreaterThan(0);
    });
  });
});
