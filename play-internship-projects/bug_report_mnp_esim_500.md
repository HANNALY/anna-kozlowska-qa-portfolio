# Bug Report – 500 Internal Server Error w procesie MNP/Transfer (eSIM)

Severity: Critical
Priority: Blocker
Status: Reproducible
Środowisko: TEST
Moduł: MNP / Transfer numeru
Komponent: msisdn-service

- Opis błędu

Podczas procesu MNP/Transfer numeru dla oferty Mobile + eSIM backend zwraca błąd 500 Internal Server Error przy wywołaniu endpointu POST /msisdn/cases, co blokuje dalszy proces i uniemożliwia dokończenie zamówienia.

Request – utworzenie koszyka (curl)
curl -X 'POST' \
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
  }'

Response:         
OrderId koszyka: f7b3fc64-ed64-403d-950a-7c6166f1f3d7
Oferta: MNP → Mobile → eSIM

Payload generowany poprawnie po stronie koszyka – błąd pojawia się w backendzie.

3️⃣ Odpowiedź z błędem (response)
{
  "errorUuid": "db8765d6-450c-471b-96fe-3156d06a4b9d",
  "reasons": [
    "InternalException: 500 Internal Server Error from POST http://msisdn-service.neweshop-test.svc.cluster.local:8080/msisdn/cases"
  ]
}

4️⃣ Oczekiwany rezultat

System poprawnie tworzy case MNP w msisdn-service, umożliwiając przejście do kolejnego kroku aktywacji eSIM.

5️⃣ Rzeczywisty rezultat

Backend zwraca HTTP 500 → proces zostaje przerwany → zamówienia MNP/eSIM nie można dokończyć.

7️⃣ Klasyfikacja błędu

Severity: Critical – błąd backendu

Priority: Blocker – blokuje proces biznesowy

Typ błędu: Backend exception / integration failure

Status: Reproducible

8️⃣ Impact na proces biznesowy

❌ brak możliwości wykonania transferu numeru (MNP)
❌ brak możliwości finalizacji zamówienia eSIM
❌ niedziałająca integracja z msisdn-service
❌ ryzyko zatrzymania sprzedaży dla całego wariantu oferty
