import { test, expect } from '@playwright/test';

test('AI Agent should detect an intentional assertion failure', async () => {
  expect(1).toBe(2);
});