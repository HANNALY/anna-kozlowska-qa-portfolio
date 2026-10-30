import { test, expect } from '@playwright/test';

test('GET /posts/1 returns a valid post', async ({ request }) => {
  const response = await request.get('/posts/1');

  expect(response.status()).toBe(200);

  const post = await response.json();

  expect(post).toHaveProperty('userId');
  expect(post).toHaveProperty('id', 1);
  expect(post.title).toBeTruthy();
  expect(post.body).toBeTruthy();
});
