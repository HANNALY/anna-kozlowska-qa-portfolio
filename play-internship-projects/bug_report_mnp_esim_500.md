# Bug Report – 500 Internal Server Error during MNP/Transfer (eSIM)

- Severity: Critical
- Priority: Blocker
- Status: Reproducible
- Environment: TEST
- Module: MNP / Number Transfer
- Component: msisdn-service

Summary

During the MNP/Transfer process for a Mobile + eSIM offer, the backend returns a 500 Internal Server Error when calling the POST /msisdn/cases endpoint.

1️⃣ Request – Cart Creation (curl)
_ curl -X 'POST' \
  'https://sklep-test.play.pl/api/cart/' \
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
            "simType": "ESIM"
          }
        ]
      }
    ]
  }' _


Cart OrderId: f7b3fc64-ed64-403d-950a-7c6166f1f3d7
Offer: MNP → Mobile → eSIM

The payload is generated correctly on the cart side — the issue appears on the backend.

2️⃣ Error Response
{
  "errorUuid": "db8765d6-450c-471b-96fe-3156d06a4b9d",
  "reasons": [
    "InternalException: 500 Internal Server Error from POST http://msisdn-service.neweshop-test.svc.cluster.local:8080/msisdn/cases"
  ]
}

3️⃣ Expected Result

The system should successfully create an MNP case in msisdn-service, allowing the user to proceed to the next step of the eSIM activation process.

4️⃣ Actual Result

The backend returns HTTP 500, which stops the process and prevents finishing the MNP/eSIM order.

5️⃣ Bug Classification

Severity: Critical — backend exception

Priority: Blocker — business-critical flow is blocked

Type: Backend exception / integration failure

Status: Reproducible

6️⃣ Business Impact

❌ Unable to perform number transfer (MNP)
❌ Unable to complete eSIM activation/order
❌ Broken integration with msisdn-service
❌ Potential sales downtime for all MNP + eSIM orders
