import { type Page } from '@playwright/test';

export async function mockRegistrationSuccess(page: Page) {
  await page.route('**/register.htm**', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: `
          <html>
            <body>
              <div id="rightPanel">
                <h1>Welcome</h1>
                <p>Your account was created successfully!</p>
              </div>
            </body>
          </html>
        `,
      });
    } else {
      await route.continue();
    }
  });
}