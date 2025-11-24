Test Case: eSIM Sales – VOICE – Polish Citizen – EID Online (Email Delivery)

- Module: Checkout / eSIM Sales
- Type: End-to-End
- Priority: High

# Test Case: eSIM Sale - VOICE - New Client - EID Online (Email Delivery)

| **Preconditions** | User has valid access to the eShop environment (DEV/TEST via Swagger).<br>User selects “New Client” from Abonaments section.<br>Chosen offer exists in Product Catalog (PC) and backend returns it correctly.<br>Valid PESEL number generated for test user (age 100+). |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

| **Step** | **Action** | **Input / Data** | **Expected Result** |
|----------|------------|-----------------|-------------------|
| 1 | User opens offer page or cart via Swagger | N/A | System loads initial (zero) cart page. Elements visible: disclaimer, selected offer, new phone number (editable), order value (package + delivery), documents modal |
| 2 | User fills in personal and identification data | Email: `p4.testy.new@gmail.com`<br>Phone: `+48 796 672 218`<br>First name: Jan<br>Last name: ECOMMERCETEST<br>Citizenship: Poland<br>PESEL: generated (age > 100)<br>ID card: generated<br>ID expiry: any valid date<br>Correspondence address = home address | System validates input.<br>User redirected to Step 1 of checkout (personal details) |
| 3 | User clicks “Continue” | N/A | System redirects to Step 2 – delivery method |
| 4 | User selects email delivery | "Delivery via email (eSIM QR via email)" | Selected option is highlighted and saved in current order state |
| 5 | User selects quick service activation | N/A | System saves "Quick activation" option and highlights it |
| 6 | User clicks “Continue” to proceed | N/A | System redirects to Step 3 – order summary |
| 7 | User reviews order details | N/A | System displays all previously submitted data correctly.<br>All price, delivery, and customer data are correct.<br>System successfully sends order data for verification |
| 8 | User accepts all consents | e-invoice, marketing, profiling | All checkboxes marked.<br>System registers all selected consents in the order payload |
| 9 | User confirms the order | Click "Order Now" / "Zamawiam" | System successfully submits order to backend.<br>User redirected to TYP page (order confirmation) |

✔ Final Expected Outcome

The entire eSIM purchase flow completes successfully and the order is created with:

delivery type = email

activation = quick activation

identification = EID

nationality = Poland

offer type = Voice / Mobile
