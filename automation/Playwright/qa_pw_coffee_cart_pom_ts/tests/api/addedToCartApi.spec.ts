
import { test, expect } from '@playwright/test';

const API_URL = 'https://coffee-cart.app/list.json';

type Ingredient = {
  name: string;
  quantity: number;
};

type Coffee = {
  name: string;
  price: number;
  recipe: Ingredient[];
  discounted?: boolean;
};

test.describe('Coffee Cart API', () => {
  test('GET list.json returns HTTP 200', async ({ request }) => {
    const response = await request.get(API_URL);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
  });

  test('returns a list of coffee products', async ({ request }) => {
    const response = await request.get(API_URL);
    const coffees: Coffee[] = await response.json();

    expect(Array.isArray(coffees)).toBeTruthy();
    expect(coffees.length).toBeGreaterThan(0);
  });

  test('Cappuccino has the expected price and recipe', async ({ request }) => {
    const response = await request.get(API_URL);
    const coffees: Coffee[] = await response.json();

    const cappuccino = coffees.find(
      coffee => coffee.name === 'Cappuccino'
    );

    expect(cappuccino).toBeDefined();
    expect(cappuccino!.price).toBe(19);

    expect(cappuccino!.recipe).toEqual([
      { name: 'espresso', quantity: 30 },
      { name: 'steamed milk', quantity: 20 },
      { name: 'milk foam', quantity: 50 },
    ]);
  });

  test('discounted Mocha has the expected price', async ({ request }) => {
    const response = await request.get(API_URL);
    const coffees: Coffee[] = await response.json();

    const mocha = coffees.find(
      coffee => coffee.name === '(Discounted) Mocha'
    );

    expect(mocha).toBeDefined();
    expect(mocha!.price).toBe(4);
    expect(mocha!.discounted).toBe(true);
  });
});
