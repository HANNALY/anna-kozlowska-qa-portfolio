# Sale of Voice STANDARD - No Device - Owner: eSIM, Member: SIM - EID Email / EID Courier

| Step | Action | Input / Data | Expected Result |
|------|--------|--------------|----------------|
| 1 | The user opens the offer page from the input section or generates the cart via Swagger. | Request body:<br>```json {
  "cartItems": [
    {
      "itemType": "SOLO",
      "offerItems": [
        {
          "offerId": 4025681019,
          "offerType": "MOBILE",
          "simType": "SIM"
        }
      ]
    },
    {
      "itemType": "SOLO",
      "offerItems": [
        {
          "offerId": 4025681169,
          "offerType": "MOBILE",
          "simType": "SIM"
        }
      ]
    }
  ]
}```<br>Link: sklep-dev/test-virginmobile.pl | The system loads the initial (zero) cart page. Visible elements include: disclaimer, selected offer (content fetched from the table), at least 2 numbers (owner + members), each new number editable, SIM card type selection, optional F-Secure add-on, order value (package fee + delivery fee), documents modal, and discount terms. |
| 2 | The user selects the main number (owner) with a physical SIM and the second number (member) with eSIM. | N/A | The system highlights the selected delivery option. In the “Order Value” section, delivery options are displayed: email delivery and courier delivery for 19.99 PLN. |
| 3 | The user fills in personal and identification data on the first page of the cart. | Email: `p4.testy.new@gmail.com`<br>Phone: `+48 796 672 218`<br>First Name: Jan<br>Last Name: ECOMMERCETEST<br>Citizenship: Poland<br>PESEL: generated (age > 100)<br>ID card number: generated<br>ID expiry date: any valid date<br>Correspondence address = home address | The system validates the input and displays Step 1 – Personal Details of the cart. |
| 4 | The user selects the delivery method from the input section. | Courier to the specified address | The system highlights the selected delivery option. |
| 5 | The user selects the quick activation option. | N/A | The system highlights the “Quick activation” option as selected. |
| 6 | The user proceeds to the order summary. | N/A | The system redirects to Step 3 – Order Summary and displays all details. |
| 7 | The user accepts all required consents. | Consents: e-invoice, marketing, profiling | All checkboxes are marked, and the system registers all selected consents in the order payload. |
| 8 | The user reviews the order and clicks “Order Now” / “Zamawiam”. | N/A | The system successfully submits the order to the backend. |
| 9 | The user verifies the order status in CRM. | N/A | Status: Service active. |
