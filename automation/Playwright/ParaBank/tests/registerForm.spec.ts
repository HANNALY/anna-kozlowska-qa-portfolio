
import { test, expect } from '../src/fixtures/fixtures';
import { registrationData } from '../src/test-data/registerFormData';

test('should handle mocked registration response', async ({ page, mockedRegisterPage }) => {
  await mockedRegisterPage.fillRegistrationForm(registrationData);
  await mockedRegisterPage.clickRegisterButton();

  await expect(page.locator('#rightPanel')).toContainText(
    'Your account was created successfully!'
  );
});

































