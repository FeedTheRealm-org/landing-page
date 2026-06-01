# Gem Store are here

One of the most requested features is finally live: players can now purchase gems directly from inside the game. This update brings a full in-game store, a Stripe-powered checkout flow, and real-time purchase feedback — all wired together end to end.

---

## What's new

The Gem Store is a brand-new scene accessible right from the navigation bar in the main menu. It displays available gem packs, lets players select one, and kicks off a secure checkout session via Stripe. Once the payment is confirmed, the gem balance updates automatically and a toast notification confirms the result — no page refresh, no extra steps.

On the technical side, this required several new pieces working together: a `PaymentService` API layer for all payment-related calls, a dedicated `GemStore` scene with its own UI (UXML + USS), a new `PaymentCallbackServer` to handle events reliably, and a `ToastNotification` system so the UI can react to purchase outcomes in real time.

---

## How the payment flow works

The purchase flow is built around two core mechanisms: a **checkout session** and a **webhook**.

When a player selects a gem pack, the client calls the backend to create a Stripe checkout session. The backend returns a hosted payment URL and the client redirects the player to Stripe's payment page — we never handle card details ourselves.

Once the payment is completed on Stripe's end, Stripe sends a signed webhook event to our backend. The backend verifies the event signature, updates the player's gem balance in the database, and raises an internal event. The client picks up that event, fetches the updated balance, and reflects it in the UI — at which point the toast notification appears confirming the purchase.

```txt
Unity Client                     Backend                    Stripe
      |                             |                          |
      |  1. POST /checkout/         |                          |
      |---------------------------->|                          |
      |                             |  2. Create session       |
      |                             |------------------------->|
      |                             |  3. Return session URL   |
      |                             |<-------------------------|
      |  4. Redirect to Stripe      |                          |
      |<----------------------------|                          |
      |                             |                          |
      |  5. User completes payment  |                          |
      |------------------------------------------------------->|
      |                             |  6. Webhook event        |
      |                             |<-------------------------|
      |                             |  7. Verify + update      |
      |                             |    gem balance           |
      |  8. Raise event             |                          |
      |<----------------------------|                          |
      |                             |                          |
      |  9. GET /balance/           |                          |
      |---------------------------->|                          |
      |  10. Return gem balance     |                          |
      |<----------------------------|                          |
      |  11. Update balance UI      |                          |
      |                             |                          |
```

This design keeps the critical path entirely server-side: the gem balance is only updated after the backend has independently verified the payment with Stripe. The client never self-reports a successful purchase.
