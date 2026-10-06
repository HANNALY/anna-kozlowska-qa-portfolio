# ☕ Coffee Cart – Playwright E2E Test Automation

## 📌 Project Overview

This project is an **end-to-end test automation framework** for the [Coffee Cart](https://coffee-cart.app/) web application.

The main goal of the project is to demonstrate practical skills in **UI test automation with Playwright and TypeScript**, including:

- Page Object Model (POM)
- reusable Playwright fixtures
- test data management
- functional and regression testing
- positive and negative test scenarios
- assertions and web element interactions
- test organization and maintainable automation code
- Playwright test reports: http://localhost:9323/#?q=s:passed

The project is continuously extended with new test scenarios and automation improvements.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Playwright** | End-to-end test automation |
| **TypeScript** | Programming language |
| **Node.js** | Runtime environment |
| **Page Object Model** | Test architecture |
| **Playwright Fixtures** | Reusable test setup |
| **Git / GitHub** | Version control |
| **VS Code** | Development environment |

## 🧪 Test Coverage

The automation suite currently covers key shopping cart and menu functionalities.

🛒 Add to Cart
Add Cappuccino to the cart
Add Espresso to the cart
Verify the selected product is displayed in the cart
Verify product information and quantity
🛍️ Cart Management
Update product quantity
Remove products from the cart
Refresh the page and verify cart state
Verify an empty cart
Verify cart totals
☕ Menu
Verify available products
Select products from the menu
Verify product information
🎟️ Promotions
Apply promotional codes
Verify discount behaviour
Verify cart price after applying a promotion
🔄 Regression Scenarios

The test suite also contains scenarios designed to verify that existing cart functionality continues to work after changes.

## 🏗️ Project Structure

```text
qa_pw_coffee_cart_pom/
│
├── src/
│   ├── pages/
│   │   ├── CartPage.ts
│   │   └── MenuPage.ts
│   │
│   ├── fixtures/
│   │   └── fixtures.ts
│   │
│   └── data/
│       └── testData.ts
│
├── tests/
│   ├── addToCart/
│   │   ├── cappuccinoAddedToCart.spec.ts
│   │   └── espressoAddedToCart.spec.ts
│   │
│   ├── emptyCart/
│   │   └── emptyCartShowsMessage.spec.ts
│   │
│   ├── menu/
│   ├── promo/
│   ├── refreshCart/
│   ├── removeFromCart/
│   └── updateCart/
│
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── .gitignore




