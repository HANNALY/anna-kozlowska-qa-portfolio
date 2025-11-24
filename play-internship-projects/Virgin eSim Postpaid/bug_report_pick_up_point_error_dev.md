# Bug Report – Pickup Point Selection Not Available in Checkout Step 2 (DEV)

- Severity: Major
- Priority: High
- Status: Reproducible
- Environment: DEV
- Module: Checkout – Delivery Methods
- Component: Frontend (UI) / Delivery widget

1️⃣ Summary

During the checkout process (Step 2: Delivery Methods), the “Pickup Point” option does not allow selecting or changing the pickup location. The “Change point” link is missing, and the system does not assign a default location automatically. The issue fully blocks users from completing orders requiring pickup point selection.

2️⃣ Pre-conditions

Cart created on DEV environment using the following request:

curl -X POST \
  'https://sklep-dev.play.pl/api/cart/' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
        "cartItems": [
          {
            "itemType": "SOLO",
            "offerItems": [
              {
                "offerId": 4025680619,
                "offerType": "MOBILE",
                "simType": "SIM"
              }
            ]
          }
        ]
      }'


OrderId: 20c3f0b5-fab3-43f3-9359-b3178ebc93c7
Product: Mobile offer with physical SIM

3️⃣ Steps to Reproduce

1. Create a cart using orderId above

2. Proceed to checkout.

3. Reach Step 2 – Delivery Methods.

4. Select Pickup Point as delivery option.

4️⃣ Actual Result

The “Edit point” link is not displayed. No default pickup point is automatically generated. User cannot select or modify any pickup location.

5️⃣ Expected Result

System displays a preselected default pickup point (random or nearest).

The UI shows the “Change point” link allowing manual modification.

Customer can proceed to the next checkout step after selecting a point.

6️⃣ Business Impact

❌ Blocks orders requiring pickup point delivery
❌ Breaks user flow at Step 2 → checkout cannot be completed
❌ Impacts front-end delivery component for all offers requiring physical SIM pickup
❌ Risk of increased checkout abandonment

7️⃣ Classification

Severity: Major – UI missing critical component
Priority: High – blocks checkout for affected delivery type
Type: Frontend logic/UI rendering defect
Status: Reproducible
