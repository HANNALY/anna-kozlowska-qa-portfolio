Test Case: eSIM Sales – VOICE – Polish Citizen – EID Online (Email Delivery)

Test ID: TC-ESIM-VOICE-PL-EID-EMAIL
Module: Checkout / eSIM Activation
Type: End-to-End
Priority: High
Preconditions:

User has access to the eShop environment (DEV/TEST).

Offer is available in the product catalog.

Email address and ID data prepared for testing.

PESEL number generated for a person aged 100+.

1️⃣ Step 1 – User opens the offer page or loads a cart via Swagger

Actions:

User opens the offer via the UI or generates the cart using Swagger.

Expected Result:

System loads the initial (zero) cart page.

Elements visible:

Disclaimer

Selected offer (content fetched from table)

New phone number (editable)

Order value (package fee + delivery fee)

Documents modal

2️⃣ Step 2 – User fills in personal and identification data

Input Data:

Email: p4.testy.new@gmail.com

Phone: +48 796 672 218

First name: Jan

Last name: ECOMMERCETEST

Citizenship: Poland

PESEL: generated (age > 100)

ID card number: generated

ID expiry date: any valid date

Correspondence address = home address

Expected Result:

System validates input.

User is redirected to Step 1 (personal details) of the checkout.

3️⃣ Step 3 – User proceeds to delivery selection

Actions:

User clicks “Continue”.

Expected Result:

System redirects to Step 2 – delivery method.

4️⃣ Step 4 – User selects email delivery

Actions:

User selects “Delivery via email (eSIM activation QR via email)”.

Expected Result:

The selected option is highlighted and stored in the current order state.

5️⃣ Step 5 – User selects quick service activation

Expected Result:

System saves the “Quick activation” option and highlights it.

6️⃣ Step 6 – User proceeds to summary

Actions:

User clicks “Continue”.

Expected Result:

System redirects to Step 3 – order summary.

7️⃣ Step 7 – User reviews order details

Expected Result:

System correctly displays all data submitted in previous steps.

All price, delivery, and customer data fields are correct.

System successfully sends the order data for verification.

8️⃣ Step 8 – User accepts all consents

Consents selected:

e-invoice

marketing

profiling

Expected Result:

All checkboxes marked

System registers all selected consents in the order payload

9️⃣ Step 9 – User confirms the order

Actions:

User clicks "Order Now" / "Zamawiam"

Expected Result:

System successfully submits order to backend.

User is redirected to TYP page (order confirmation page).

✔ Final Expected Outcome

The entire eSIM purchase flow completes successfully and the order is created with:

delivery type = email

activation = quick activation

identification = EID

nationality = Poland

offer type = Voice / Mobile
