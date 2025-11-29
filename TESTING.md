# Testing Guide

## Overview

This project uses **Vitest** for unit testing with **jsdom** for DOM simulation. Tests are located in the `tests/` directory.

---

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Run Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

---

## 📁 Test Structure

```
tests/
├── setup.js                 # Global test setup
├── constants.test.js        # Constants validation
├── tile-renderer.test.js    # Tile rendering utilities
└── ... (more tests)
```

---

## ✅ Current Test Coverage

### Implemented Tests

#### 1. **constants.test.js** (8 test suites, 25+ tests)
- ✅ Route paths validation
- ✅ Color hex codes validation
- ✅ Timing values validation
- ✅ File upload configuration
- ✅ Number formatting thresholds
- ✅ Trend calculation thresholds
- ✅ Message strings validation
- ✅ Icons validation

#### 2. **tile-renderer.test.js** (3 test suites, 20+ tests)
- ✅ Number formatting (millions, thousands, small numbers)
- ✅ Trend calculation (upward, neutral, downward)
- ✅ Edge cases and integration tests

---

## 📝 Writing Tests

### Example Test

```javascript
import { describe, it, expect } from 'vitest';
import { formatNumber } from '../js/utils/tile-renderer.js';

describe('formatNumber', () => {
  it('should format millions correctly', () => {
    expect(formatNumber(1500000)).toBe('1.5M');
  });

  it('should format thousands correctly', () => {
    expect(formatNumber(2500)).toBe('2.5K');
  });
});
```

### Test Best Practices

1. **Descriptive names**: Use clear test descriptions
2. **One assertion per test**: Focus on single behavior
3. **Arrange-Act-Assert**: Follow AAA pattern
4. **Edge cases**: Test boundary conditions
5. **Integration**: Test functions working together

---

## 🎯 Test Categories

### Unit Tests
Test individual functions in isolation:
- `formatNumber()` - Number formatting
- `calculateTrend()` - Trend calculation
- Constants validation

### Integration Tests
Test multiple components working together:
- Tile rendering with data
- Toast notifications with routing
- State management with views

### Future: E2E Tests
End-to-end testing with Playwright (not yet implemented):
- File upload flow
- Navigation between views
- Chart rendering
- Data export

---

## 📊 Coverage Goals

| Component | Target | Current |
|-----------|--------|---------|
| **Utils** | 80%+ | 🎯 High |
| **Constants** | 100% | ✅ 100% |
| **Views** | 60%+ | ⏳ Pending |
| **Overall** | 70%+ | ⏳ In Progress |

---

## 🔧 Test Configuration

### vitest.config.js

```javascript
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
});
```

### Environment
- **Runtime**: Node.js
- **DOM**: jsdom (simulated browser environment)
- **Globals**: `describe`, `it`, `expect` auto-imported

---

## 🧪 Test Scenarios

### 1. Number Formatting Tests

```javascript
formatNumber(1000000)  →  '1.0M'  ✅
formatNumber(2500)     →  '2.5K'  ✅
formatNumber(450)      →  '450'   ✅
```

### 2. Trend Calculation Tests

```javascript
calculateTrend({ avg: 80, max: 100 })  →  '📈'  ✅  // High
calculateTrend({ avg: 50, max: 100 })  →  '📊'  ✅  // Neutral
calculateTrend({ avg: 20, max: 100 })  →  '📉'  ✅  // Low
```

### 3. Constants Validation

```javascript
ROUTES.HOME === '/'                              ✅
SAP_COLORS.BLUE === '#0854a0'                   ✅
TIMING.SLIDE_ROTATION === 3000                  ✅
FILE_UPLOAD.MAX_SIZE === 10 * 1024 * 1024      ✅
```

---

## 🐛 Debugging Tests

### Run Single Test File

```bash
npx vitest tests/tile-renderer.test.js
```

### Run Specific Test

```bash
npx vitest -t "should format millions"
```

### Watch Mode

```bash
npm test
# Tests re-run automatically on file changes
```

### UI Mode (Visual Test Runner)

```bash
npm run test:ui
# Opens browser with interactive test UI
```

---

## 📈 Coverage Reports

### Generate Coverage

```bash
npm run test:coverage
```

### View Coverage Report

```bash
# Text summary in terminal
# HTML report in: coverage/index.html
open coverage/index.html  # macOS
```

### Coverage Output

```
File                        | % Stmts | % Branch | % Funcs | % Lines
----------------------------|---------|----------|---------|--------
js/constants.js             |   100.0 |    100.0 |   100.0 |   100.0
js/utils/tile-renderer.js   |    85.7 |     80.0 |    90.0 |    85.7
```

---

## 🔄 Continuous Integration

### GitHub Actions (Future)

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run test:run
      - run: npm run test:coverage
```

---

## 📚 Testing Utilities

### Mocking

```javascript
import { vi } from 'vitest';

// Mock function
const mockFn = vi.fn();

// Mock module
vi.mock('../js/utils/excel-handler.js', () => ({
  exportToExcel: vi.fn(() => true)
}));
```

### DOM Testing

```javascript
import { describe, it, expect } from 'vitest';

it('should create toast element', () => {
  const toast = document.createElement('div');
  toast.className = 'toast';
  expect(toast.classList).toContain('toast');
});
```

---

## 🎓 Learning Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Test-Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html)

---

## ✨ Next Steps

### Priority 1: Expand Coverage
- [ ] Add tests for `toast.js`
- [ ] Add tests for `data-processor.js`
- [ ] Add tests for view rendering

### Priority 2: Integration Tests
- [ ] Test router navigation
- [ ] Test state management
- [ ] Test Excel import/export

### Priority 3: E2E Tests
- [ ] Set up Playwright
- [ ] Test complete user flows
- [ ] Test file upload to export

---

## 🤝 Contributing Tests

### Before Submitting
1. Run all tests: `npm test:run`
2. Check coverage: `npm run test:coverage`
3. Ensure coverage doesn't drop
4. Add tests for new features
5. Update this README if needed

### Test Naming Convention
```javascript
describe('ComponentName or FunctionName', () => {
  it('should do specific thing when condition', () => {
    // Test implementation
  });
});
```

---

## 🎯 Summary

- ✅ **Setup Complete**: Vitest configured with jsdom
- ✅ **Basic Tests**: Constants and tile-renderer covered
- ✅ **Coverage Ready**: HTML reports available
- ✅ **CI Ready**: Easy to integrate with GitHub Actions
- ⏳ **Expanding**: More tests being added

**Current Status**: Foundation established, actively expanding test coverage!
