# Sale of an eSIM for a voice plan to a new client, including online EID activation with email delivery.

## Preconditions
- The user has valid access to the eShop environment (DEV/TEST via Swagger).  
- The user selects “New Client” from the Abonaments (Subscriptions) section on the website.  
- The chosen offer exists in the Product Catalog (PC) and is returned correctly by the backend.  
- A valid PESEL number is generated for the test user, representing a person aged 100+, and it passes system validation rules.  

## Test Steps

| **Step** | **Action** | **Input / Data** | **Expected Result** |
|----------|------------|-----------------|-------------------|
| 1 | The user opens the offer page in the UI or generates the cart via Swagger. | N/A | The system loads the initial (zero) cart page. The following elements are visible: disclaimer, selected offer (content fetched from table), a new phone number (editable), order value (package fee + delivery fee), and a documents modal. |
| 2 | The user fills in personal and identification data. | Email: `p4.testy.new@gmail.com`<br>Phone: `+48 796 672 218`<br>First name: Jan<br>Last name: ECOMMERCETEST<br>Citizenship: Poland<br>PESEL: generated (age > 100)<br>ID card number: generated<br>ID expiry date: any valid date<br>Correspondence address: same as home address | The system validates the input and redirects the user to Step 1 of the checkout process (personal details). |
| 3 | The user clicks “Continue” to proceed to delivery selection. | N/A | The system redirects the user to Step 2 – Delivery Method. |
| 4 | The user selects email delivery. | Delivery via email (eSIM activation QR via email) | The selected delivery option is highlighted and saved in the current order state. |
| 5 | The user selects the quick activation service. | N/A | The system saves the “Quick activation” option and highlights it as selected. |
| 6 | The user clicks “Continue” to proceed to the order summary. | N/A | The system redirects the user to Step 3 – Order Summary. |
| 7 | The user reviews the order details. | N/A | The system correctly displays all data submitted in previous steps. All price, delivery, and customer data fields are correct. The system successfully sends the order data for verification. |
| 8 | The user accepts all required consents. | Consents: e-invoice, marketing, profiling | All checkboxes are marked, and the system registers all selected consents in the order payload. |
| 9 | The user confirms the order by clicking "Order Now" / "Zamawiam". | N/A | The system successfully submits the order to the backend. The user is redirected to the TYP page (order confirmation page). |

✔ Final Expected Outcome

The entire eSIM purchase flow completes successfully and the order is created with:

delivery type = email

activation = quick activation

identification = EID

nationality = Poland

offer type = Voice / Mobile
