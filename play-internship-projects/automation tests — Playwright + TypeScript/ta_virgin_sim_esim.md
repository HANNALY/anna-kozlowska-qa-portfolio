This file contains end-to-end automated tests for **Virgin** offers in the VirginMobile.pl via the play.pl web service, prepared in an Agile environment.

---

## Test Coverage
- **VOICE_STANDARD** scenarios (subscription without device)  
- Various delivery types:  
  - Courier to Address  
  - Pickup Point  
  - Email (eSIM)  
  - Offline Courier with Contract  
- Validation of business logic and payment processes (Card)  
- E2E UI tests and backend integration tests  
- Automated test creation, refactoring, and optimization  
- Jira tags for traceability (`@ITANESH-6076`, `@ITANESH-6077`, etc.)

---

## 📂 Repository Structure
automation_tests/
 │
 ├─ tests/
 │   └─ virgin/
│       ├─ voice_standard.spec.ts      # VOICE_STANDARD scenarios
│       └─ e2e_purchase.spec.ts        # Additional E2E cases
│
├─ src/
│   ├─ processes/
│   │   └─ order.process.ts
│   ├─ fixtures/
│   │   └─ shop.fixture.ts
│   ├─ pages/
│   │   └─ order.cart.page.ts
│   └─ enums/
│       ├─ customer.types.ts
│       ├─ delivery.ts
│       ├─ payment.ts
│       └─ process.types.ts
│
├─ test-data/
│   └─ offers/
│       └─ offers.virgin.data.ts       # Test data for Virgin offers
│
├─ visual/                             # Visual regression tests
│   └─ virgin/
│
├─ playwright.config.ts                # Playwright configuration
└─ README.md
---

## 🔧 Running the Tests

**Run all Virgin tests:**

```bash
npx playwright test --project=Virgin
Run a single test:

bash
Skopiuj kod
npx playwright test tests/virgin/voice_standard.spec.ts
Run tests on Mobile Chrome:

bash
Skopiuj kod
npx playwright test --project=Mobile_Chrome
 Example Test (VOICE_STANDARD - Pickup Point)

test.describe('@voice_standard @virgin without device', () => {
  test.beforeEach(async ({ cartSetup }) => {
    await cartSetup(VOICE_STANDARD_VIRGIN);
  });

test(
    'PL - pickup point',
    { tag: ['@ITANESH-6077'] },
    async ({ orderProcess }) => {
      await orderProcess.completeFullProcess({
        processType: ProcessType.VOICE_STANDARD,
        customerType: CustomerType.POLISH,
        deliveryType: DeliveryType.PICKUP_POINT,
        paymentType: PaymentType.CARD,
      });
    },
  );

Test Purpose:
Verifies the full order process for VOICE_STANDARD for a Polish customer using pickup point delivery, ensuring correct backend integration, pricing logic, and order assignment.

 Example Visual Test (VOICE_STANDARD)
test.describe('[visual] @voice_standard @sim', () => {
  test.beforeEach(async ({ cartSetup }) => {
    await cartSetup(VOICE_STANDARD_VIRGIN);
  });

  test(
    'without device - order flow',
    { tag: ['@ITANESH-6084', '@visual'] },
    async ({
      cartPage,
      orderPage,
      addressesPage,
      summaryPage,
      thankYouPage,
    }) => {
      await cartPage.expectScreenshotToMatch({
        mask: [cartPage.textNewPhoneNumber],
      });
      await cartPage.goToOrderPage();

      await orderPage.expectScreenshotToMatch({
        mask: [cartPage.textNewPhoneNumber],
      });
      await orderPage.fillDefaultOrderData({
        processType: ProcessType.VOICE_STANDARD,
        customerType: CustomerType.POLISH,
      });
      await orderPage.goToAddressesPage();

      await addressesPage.expectScreenshotToMatch({
        mask: [addressesPage.textNewPhoneNumber],
      });
      await addressesPage.enableQuickService();
      await addressesPage.goToSummaryPage();

      await summaryPage.expectScreenshotToMatch({
        mask: [summaryPage.textNewPhoneNumber],
      });
      await summaryPage.enableMarkAllConsents();
      await summaryPage.goToThankYouPage();

      await thankYouPage.expectScreenshotToMatch({
        mask: [thankYouPage.textInvoiceNumber],
      });
    },
  );
});

test.describe('[visual] @voice_standard @e-sim', () => {
  test.beforeEach(async ({ cartSetup }) => {
    await cartSetup(VOICE_STANDARD_VIRGIN);
  });

  test(
    'without device - order flow',
    { tag: ['@ITANESH-6921', '@visual'] },
    async ({
      cartPage,
      orderPage,
      addressesPage,
      summaryPage,
      thankYouPage,
    }) => {
      await cartPage.expectScreenshotToMatch({
        mask: [cartPage.textNewPhoneNumber],
      });

      await ElementHelper.enableCheckbox(cartPage.checkboxESIMCard);
      await cartPage.verifyEsimMessageHidden();
      await cartPage.goToOrderPage();
      await orderPage.fillDefaultOrderData({
        processType: ProcessType.VOICE_STANDARD,
        customerType: CustomerType.POLISH,
      });
      await orderPage.goToAddressesPage();

      await addressesPage.expectScreenshotToMatch({
        mask: [addressesPage.textNewPhoneNumber],
      });
      await addressesPage.enableQuickService();
      await addressesPage.goToSummaryPage();

      await summaryPage.expectScreenshotToMatch({
        mask: [summaryPage.textNewPhoneNumber],
      });
      await summaryPage.enableMarkAllConsents();
      await summaryPage.goToThankYouPage();

      await thankYouPage.expectScreenshotToMatch({
        mask: [thankYouPage.textInvoiceNumber],
      });
    },
  );
});

Test Purpose:
Verify the visual correctness of the full VOICE_STANDARD order flow for Virgin offers, both with physical SIM and eSIM, ensuring that the UI renders consistently at each step of the process.


