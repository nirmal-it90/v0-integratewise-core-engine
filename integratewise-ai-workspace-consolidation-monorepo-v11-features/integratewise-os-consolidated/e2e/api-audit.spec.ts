import { test, expect } from '@playwright/test';

/**
 * API Endpoint Audit
 * 
 * Comprehensive testing of all API endpoints
 */

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3333';

test.describe('API Audit - Health & Status Endpoints', () => {
  test('Health endpoint', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/health`);
    expect(response.status()).toBeLessThan(500);
  });

  test('Readiness endpoint', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/readiness`);
    expect(response.status()).toBeLessThan(500);
  });

  test('Liveness endpoint', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/liveness`);
    expect(response.status()).toBeLessThan(500);
  });

  test('Ping endpoint', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/ping`);
    expect(response.status()).toBeLessThan(500);
  });
});

test.describe('API Audit - Core Functionality', () => {
  test('Billing API endpoints', async ({ request }) => {
    const endpoints = [
      '/api/billing/plans',
      '/api/billing/subscription',
      '/api/billing/entitlements',
    ];

    for (const endpoint of endpoints) {
      const response = await request.get(`${BASE_URL}${endpoint}`);
      expect(response.status()).toBeLessThan(500);
    }
  });

  test('Search endpoint', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/search`, {
      params: { q: 'test' }
    });
    expect(response.status()).toBeLessThan(500);
  });

  test('Metrics endpoints', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/metrics/kpis`);
    expect(response.status()).toBeLessThan(500);
  });

  test('Insights endpoints', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/insights/patterns`);
    expect(response.status()).toBeLessThan(500);
  });
});

test.describe('API Audit - Webhook Endpoints', () => {
  test('Webhook health endpoint', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/webhooks/health`);
    expect(response.status()).toBeLessThan(500);
  });

  test('Webhook providers are accessible', async ({ request }) => {
    const providers = ['slack', 'discord', 'hubspot', 'asana'];
    
    for (const provider of providers) {
      const response = await request.post(`${BASE_URL}/api/webhooks/${provider}`, {
        data: {}
      });
      // Webhooks may return various status codes
      expect(response.status()).toBeLessThan(500);
    }
  });
});

test.describe('API Audit - Error Handling', () => {
  test('Invalid endpoints return proper errors', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/invalid-endpoint-12345`);
    expect(response.status()).toBeGreaterThanOrEqual(404);
    expect(response.status()).toBeLessThan(500);
  });

  test('POST to GET-only endpoints handled', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/health`);
    // Should return method not allowed or similar
    expect(response.status()).toBeLessThan(500);
  });
});

test.describe('API Audit - Response Times', () => {
  test('Health endpoints respond quickly', async ({ request }) => {
    const start = Date.now();
    await request.get(`${BASE_URL}/api/health`);
    const duration = Date.now() - start;
    
    // Health checks should be fast
    expect(duration).toBeLessThan(5000);
  });
});
