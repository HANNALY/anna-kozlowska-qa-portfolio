
import { test, expect } from '../src/fixtures/fixtures';
import { registrationData } from '../src/test-data/registerFormData';
import { mockRegistrationSuccess } from '../src/mocks/registrationMock';

test('should handle mocked registration response', async ({ page, registerPage }) => {
  await mockRegistrationSuccess(page);
  await page.goto('/parabank/register.htm');

  await registerPage.fillRegistrationForm(registrationData);
  await registerPage.clickRegisterButton();

  await expect(page.locator('#rightPanel')).toContainText(
    'Your account was created successfully!'
  );
});


































