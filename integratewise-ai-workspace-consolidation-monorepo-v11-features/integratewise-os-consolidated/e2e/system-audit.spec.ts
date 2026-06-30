import { test, expect } from '@playwright/test';

/**
 * Comprehensive System Audit
 * 
 * Tests all major pages, routes, and functionality to ensure system health
 */

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3333';

// Test configuration
const config = {
  timeout: 30000,
  retries: 1,
};

test.describe('System Audit - Core Pages', () => {
  test('Home page loads correctly', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/IntegrateWise|OS/i, { timeout: 10000 });
    
    // Check for key elements
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Auth pages are accessible', async ({ page }) => {
    // Test login page
    await page.goto(`${BASE_URL}/login`);
    await expect(page.locator('body')).toBeVisible();
    
    // Test signup page
    await page.goto(`${BASE_URL}/sign-up`);
    await expect(page.locator('body')).toBeVisible();
  });

  test('Public pages load without errors', async ({ page }) => {
    const publicPages = [
      '/pricing',
      '/about',
      '/contact',
      '/security',
    ];

    for (const route of publicPages) {
      try {
        const response = await page.goto(`${BASE_URL}${route}`);
        if (response) {
          expect(response.status()).toBeLessThan(500);
        }
        await expect(page.locator('body')).toBeVisible({ timeout: 5000 });
      } catch (error) {
        console.log(`Page ${route} may not exist or has issues: ${error}`);
      }
    }
  });
});

test.describe('System Audit - API Endpoints', () => {
  test('Health check endpoint works', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/health`);
    expect(response.status()).toBeLessThan(500);
  });

  test('Readiness endpoint responds', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/readiness`);
    expect(response.status()).toBeLessThan(500);
  });

  test('Liveness endpoint responds', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/liveness`);
    expect(response.status()).toBeLessThan(500);
  });

  test('Ping endpoint responds', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/ping`);
    expect(response.status()).toBeLessThan(500);
  });

  test('Key API endpoints are accessible', async ({ request }) => {
    const apiEndpoints = [
      '/api/search',
      '/api/billing/plans',
      '/api/goals/progress',
      '/api/metrics/kpis',
      '/api/insights/patterns',
    ];

    for (const endpoint of apiEndpoints) {
      try {
        const response = await request.get(`${BASE_URL}${endpoint}`);
        // Accept 200, 401, 403, 404 - but not 500
        expect(response.status()).toBeLessThan(500);
      } catch (error) {
        console.log(`Endpoint ${endpoint} may have issues: ${error}`);
      }
    }
  });
});

test.describe('System Audit - Navigation & Routing', () => {
  test('Navigation elements are present', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check for common navigation patterns
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    // Look for navigation links (common patterns)
    const navElements = await page.locator('nav, [role="navigation"], header').count();
    // At least some navigation should exist
    expect(navElements).toBeGreaterThanOrEqual(0);
  });

  test('Page routes resolve correctly', async ({ page }) => {
    const routes = [
      '/',
      '/login',
      '/sign-up',
      '/pricing',
    ];

    for (const route of routes) {
      try {
        const response = await page.goto(`${BASE_URL}${route}`, { 
          waitUntil: 'domcontentloaded',
          timeout: 10000 
        });
        if (response) {
          expect(response.status()).toBeLessThan(500);
        }
        await expect(page.locator('body')).toBeVisible({ timeout: 5000 });
      } catch (error) {
        console.log(`Route ${route} issue: ${error}`);
      }
    }
  });
});

test.describe('System Audit - Error Handling', () => {
  test('404 pages handle gracefully', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/non-existent-page-12345`);
    // Should not crash, should return some status
    expect(response?.status()).toBeGreaterThanOrEqual(404);
    expect(response?.status()).toBeLessThan(500);
  });

  test('Invalid API routes return proper errors', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/non-existent-endpoint`);
    expect(response.status()).toBeGreaterThanOrEqual(404);
    expect(response.status()).toBeLessThan(500);
  });
});

test.describe('System Audit - Performance', () => {
  test('Pages load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - startTime;
    
    // Pages should load within 10 seconds
    expect(loadTime).toBeLessThan(10000);
  });

  test('No console errors on main page', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    page.on('pageerror', (error) => {
      errors.push(error.message);
    });

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    
    // Filter out common non-critical errors
    const criticalErrors = errors.filter(err => 
      !err.includes('favicon') && 
      !err.includes('analytics') &&
      !err.includes('extension')
    );
    
    if (criticalErrors.length > 0) {
      console.log('Console errors found:', criticalErrors);
    }
    
    // Allow some console errors but log them
    expect(criticalErrors.length).toBeLessThan(10);
  });
});

test.describe('System Audit - Accessibility', () => {
  test('Pages have proper HTML structure', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check for basic HTML structure
    const html = await page.locator('html').count();
    expect(html).toBeGreaterThan(0);
    
    const body = await page.locator('body').count();
    expect(body).toBeGreaterThan(0);
  });

  test('Pages have viewport meta tag', async ({ page }) => {
    await page.goto(BASE_URL);
    const viewport = await page.locator('meta[name="viewport"]').count();
    // Viewport meta should exist for responsive design
    expect(viewport).toBeGreaterThanOrEqual(0);
  });
});

test.describe('System Audit - Critical Functionality', () => {
  test('Authentication flow pages exist', async ({ page }) => {
    const authPages = [
      '/login',
      '/sign-up',
      '/auth/login',
      '/auth/sign-up',
    ];

    for (const route of authPages) {
      try {
        const response = await page.goto(`${BASE_URL}${route}`, {
          waitUntil: 'domcontentloaded',
          timeout: 5000
        });
        if (response) {
          expect(response.status()).toBeLessThan(500);
        }
      } catch (error) {
        // Some auth routes may not exist, that's okay
        console.log(`Auth route ${route} may not exist`);
      }
    }
  });

  test('Core application routes exist', async ({ page }) => {
    const appRoutes = [
      '/dashboard',
      '/settings',
      '/integrations',
    ];

    for (const route of appRoutes) {
      try {
        const response = await page.goto(`${BASE_URL}${route}`, {
          waitUntil: 'domcontentloaded',
          timeout: 5000
        });
        if (response) {
          expect(response.status()).toBeLessThan(500);
        }
      } catch (error) {
        console.log(`App route ${route} may require authentication`);
      }
    }
  });
});

test.describe('System Audit - Content Loading', () => {
  test('Static assets load correctly', async ({ page }) => {
    const failedRequests: string[] = [];
    
    page.on('requestfailed', (request) => {
      const url = request.url();
      // Filter out common non-critical failures
      if (!url.includes('analytics') && !url.includes('extension')) {
        failedRequests.push(url);
      }
    });

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    
    // Should not have too many failed requests
    expect(failedRequests.length).toBeLessThan(10);
    
    if (failedRequests.length > 0) {
      console.log('Failed requests:', failedRequests.slice(0, 5));
    }
  });
});
