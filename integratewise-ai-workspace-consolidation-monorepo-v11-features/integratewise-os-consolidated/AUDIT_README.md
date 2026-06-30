# System Audit Guide

This directory contains comprehensive Playwright-based system audit tests.

## 📋 Overview

The audit system tests:
- ✅ All major pages load correctly
- ✅ API endpoints respond properly
- ✅ Navigation works
- ✅ Error handling is proper
- ✅ Performance is acceptable
- ✅ No critical console errors

## 🚀 Running Audits

### Quick Audit
```bash
npm run test:audit
```

### Full Test Suite
```bash
npm test
```

### Interactive Mode
```bash
npm run test:ui
```

### Manual Run
```bash
# Run specific audit suite
npx playwright test e2e/system-audit.spec.ts
npx playwright test e2e/api-audit.spec.ts
npx playwright test e2e/page-audit.spec.ts

# Run all audits
npx playwright test e2e/*-audit.spec.ts
```

### With Custom URL
```bash
TEST_BASE_URL=https://os.integratewise.online npm run test:audit
```

## 📊 Test Suites

### 1. System Audit (`e2e/system-audit.spec.ts`)
Comprehensive system-wide tests:
- Core pages loading
- Authentication pages
- Public pages
- API endpoints
- Navigation
- Error handling
- Performance
- Accessibility

### 2. API Audit (`e2e/api-audit.spec.ts`)
API endpoint testing:
- Health endpoints (`/api/health`, `/api/readiness`, etc.)
- Core functionality APIs
- Webhook endpoints
- Error handling
- Response times

### 3. Page Audit (`e2e/page-audit.spec.ts`)
Page-by-page testing:
- Public pages (/, /login, /pricing, etc.)
- Application pages (/dashboard, /settings, etc.)
- Business pages (/clients, /pipeline, etc.)
- CS pages (/cs/accounts, etc.)
- Admin pages (/admin, etc.)

## 📈 Viewing Results

### HTML Report (Recommended)
```bash
npx playwright show-report
```
Opens an interactive HTML report with:
- Test results
- Screenshots
- Video recordings
- Trace files

### JSON Results
Results are saved in `test-results/results.json`

### Console Output
All test output is logged to the console

## 🔧 Configuration

### Base URL
Set the base URL via environment variable:
```bash
TEST_BASE_URL=http://localhost:3333 npm test
```

Default: `http://localhost:3333` or configured in `playwright.config.ts`

### Browser
Currently configured for:
- Chromium (Desktop)
- Mobile (iPhone 13)

### Timeouts
- Test timeout: 30 seconds
- Expect timeout: 10 seconds
- Page load timeout: 10 seconds

## 📝 Test Structure

### Test Organization
```
e2e/
├── system-audit.spec.ts    # Comprehensive system tests
├── api-audit.spec.ts       # API endpoint tests
├── page-audit.spec.ts      # Page-by-page tests
├── login-debug.spec.ts     # Login page debugging
└── autonoma.spec.ts        # Autonoma-specific tests
```

### Writing New Tests

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/path');
    await expect(page.locator('selector')).toBeVisible();
  });
});
```

## 🐛 Troubleshooting

### Tests Fail with Timeout
- Ensure the application is running
- Check the base URL is correct
- Verify network connectivity

### Tests Fail with 404
- Some pages may not exist (expected)
- Tests are designed to log errors, not fail on missing pages

### Authentication Required
- Some pages require authentication
- Tests handle 401/403 responses gracefully

### Playwright Not Installed
```bash
npx playwright install --with-deps chromium
```

## 📊 Audit Reports

Audit results are saved in:
- `playwright-report/` - HTML reports
- `test-results/` - JSON results and artifacts
- `audit-results/` - Summary reports (if using audit script)

## 🔄 CI/CD Integration

### GitHub Actions
```yaml
- name: Run System Audit
  run: npm run test:audit
```

### Bitbucket Pipelines
```yaml
- step:
    script:
      - npm run test:audit
```

## 📚 Best Practices

1. **Run audits before deployment**
2. **Review HTML reports for visual debugging**
3. **Check console output for warnings**
4. **Update tests when adding new pages**
5. **Keep base URL configurable**

---

**Last Updated:** 2026-01-21
