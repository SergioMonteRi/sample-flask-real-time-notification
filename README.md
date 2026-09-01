# Pix Payments with Real-Time Notification

A Pix checkout built end to end: a Flask API that issues the charge, a fake bank that
notifies it through a webhook, and a React front end that learns the payment was confirmed
over a Socket.IO channel — without polling for it.

![Python](https://img.shields.io/badge/Python-3.14-3776AB?logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.1-000000?logo=flask&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4-010101?logo=socketdotio&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-D71F00?logo=sqlalchemy&logoColor=white)
![Pydantic](https://img.shields.io/badge/Pydantic-2-E92063?logo=pydantic&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-latest-4479A1?logo=mysql&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

> **Study project.** This repository is part of my Python learning track. The goal is to
> exercise the parts of Flask that only show up once an external actor enters the picture —
> WebSockets, inbound webhooks, and an integration boundary behind an interface — in a
> scenario close to a real payment flow. No real bank is involved and nothing here is
> hardened for production; see [Roadmap](#roadmap) for what is missing.

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Architecture](#architecture)
- [The payment flow](#the-payment-flow)
- [Data model](#data-model)
- [Getting started](#getting-started)
- [API reference](#api-reference)
- [Real-time channel](#real-time-channel)
- [Front end](#front-end)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

The exercise: build the full Pix charge lifecycle. A customer enters an amount, the API
creates the charge and returns a scannable Pix payload, and the charge sits pending until
the bank says otherwise. When the bank confirms, the browser showing that QR Code updates
on its own.

The interesting part is not the CRUD — it is that **the confirmation never travels on the
response of the request that caused it.** Whoever pays (the bank app) is not whoever is
watching the screen (the browser). The bank calls `POST /webhooks/pix`, and the browser
finds out through a Socket.IO room dedicated to that charge. Modeling those two
disconnected halves — and keeping HTTP polling only as a safety net — was the point of the
exercise.

## Features

- **Pix charge issuance** — creates the payment, sets a 30-minute expiry, and returns the
  Pix payload ready to be rendered as a QR Code.
- **Real BR Code payload** — the EMV/TLV string is assembled locally, CRC16-CCITT included,
  so the QR Code has the shape a bank app expects, with no external service.
- **Bank webhook** — `POST /webhooks/pix` confirms the charge by the bank's identifier and
  is idempotent: a second notification changes nothing and re-notifies no one.
- **Confirmation over WebSocket** — the server emits `payment-confirmed` into the
  `payment:<id>` room, so only the client watching that charge is woken up.
- **Provider behind an interface** — `PixProvider` is an ABC; `FakePixProvider` is the only
  implementation today, and it is chosen in a single factory function.
- **Validation on both ends** — Pydantic guards the API borders, Zod guards the front end's,
  including what arrives over the socket.
- **Adaptive polling** — the front end polls every 5s while the channel is down and backs
  off to 30s once it is connected. The channel is the notification; the query is insurance.
- **Test bench in the UI** — a panel on the payment screen plays the bank, firing the
  webhook so the real notification path can be watched end to end.
- **Time-sortable UUID keys** — UUIDv7 primary keys via a custom SQLAlchemy type.
- **Containerized database** — MySQL through Docker Compose, no local install required.

## Tech stack

### Backend

| Layer | Tool |
| --- | --- |
| Language | Python 3.14 |
| Web framework | Flask 3.1 |
| Real time | Flask-SocketIO 5.6 |
| ORM | SQLAlchemy 2.0 + Flask-SQLAlchemy 3.1 |
| Database | MySQL (via Docker Compose) |
| Driver | PyMySQL |
| Validation | Pydantic 2 |
| CORS | Flask-Cors |
| Configuration | python-dotenv |

### Front end

| Layer | Tool |
| --- | --- |
| Language | TypeScript 6 |
| UI | React 19 |
| Build | Vite 8 |
| Server state | TanStack Query 5 |
| Real time | socket.io-client 4 |
| HTTP | Axios |
| Validation | Zod 4 + React Hook Form |
| Styling | styled-components 6 |
| i18n | i18next (pt-BR, en-US) |
| QR Code | qrcode.react |
| Routing | React Router 7 |

## Architecture

### Project structure

```text
sample-flask-real-time-notification/
├── docker-compose.yml            # MySQL service for local development
├── backend/
│   ├── app.py                    # entry point: application factory, CORS, blueprints
│   ├── extensions.py             # SocketIO instance, created outside the app
│   ├── requirements.txt
│   ├── custom_types/
│   │   └── uuid.py               # TypeDecorator: UUID <-> String(36)
│   ├── repository/
│   │   └── database.py           # DeclarativeBase + the SQLAlchemy instance
│   ├── models/
│   │   └── payment.py            # the single mapped entity
│   ├── schemas/                  # request and response contracts (Pydantic)
│   │   ├── create_payment.py
│   │   ├── get_payment_response.py
│   │   ├── pix_payment_provider_response.py
│   │   └── pix_webhook.py
│   ├── routes/                   # blueprints, one per API domain
│   │   ├── pix.py                # POST /payments/pix, GET /payments/pix/<id>
│   │   └── webhooks.py           # POST /webhooks/pix
│   ├── sockets/
│   │   └── payment.py            # the `join-payment` handler
│   ├── services/
│   │   ├── payment_service.py    # every business rule of the flow
│   │   └── factories.py          # wires the service to its dependencies
│   └── integrations/payments/
│       ├── pix_provider.py       # the abstract interface
│       └── fake_bank/pix/
│           ├── provider.py       # the fake bank
│           └── payload.py        # BR Code: TLV fields + CRC16-CCITT
└── frontend/
    ├── index.html
    ├── frontend-guide.md         # the front-end conventions this app follows
    └── src/
        ├── components/           # atoms, molecules, organisms
        ├── pages/                # checkout, pix-payment, not-found
        ├── services/
        │   ├── http/             # axios client + error normalization
        │   ├── payments/         # schemas, queries, mutations, hooks
        │   └── realtime/         # the shared Socket.IO connection
        ├── i18n/locales/         # pt-BR and en-US
        └── styles/               # theme, mixins, global styles
```

The separation follows one rule: **`routes` translate HTTP, `services` hold the rules, and
`integrations` talk to the outside world.** A route never touches the database directly, and
the service never knows a request exists.

### Design decisions

**Application factory, and a `socketio` that lives outside it.** The app is built inside
`create_app()`, but the `SocketIO` instance is created at module scope in `extensions.py` and
only bound to the app with `init_app`. That matters more here than in a plain REST app:
`PaymentService` needs to emit events, and if the emitter only existed inside the factory the
service would have to import the app to reach it. With the instance in a neutral module, the
arrow always points the same way — services import `socketio`, never `app`.

**The bank is behind an interface.** `PixProvider` declares `create_payment`; `FakePixProvider`
implements it by minting an identifier and building a BR Code locally. `PaymentService`
receives the provider through its constructor, and `create_payment_service()` is the only
place that names a concrete implementation. Swapping the fake bank for a real PSP is a
one-file change, and the service stays testable without any network.

**The Pix payload is assembled, not faked.** `payload.py` writes the EMV `id + length + value`
fields of the BR Code spec and closes with CRC16-CCITT over the payload — the same checksum a
bank app validates. The string encodes a fake merchant, so nothing can be paid, but its
*shape* is real, which is what makes the QR Code on screen actually scan.

**The confirmation is not a response.** `POST /webhooks/pix` answers only `{"status": "ok"}` —
it acknowledges the notification, it does not report the payment. What tells the world the
charge is settled is the `payment-confirmed` event, emitted after the commit. This is the
whole reason the project exists: the caller who confirms and the client who is waiting are
two different actors, and conflating them would hide the flow.

**One room per charge.** The browser emits `join-payment` and lands in `payment:<id>`; the
service emits to that room only. No broadcast, so a charge never leaks its status to whoever
happens to be connected — and the client re-joins on every reconnect, because a new
connection means a new session id.

**Two identifiers, on purpose.** `id` is ours and appears in the URL; `bank_payment_id` is the
bank's and is what the webhook carries. The bank has no reason to know our primary key, so
confirmation looks the payment up by *its* identifier — which is also why the front end's
test bench has to send `bank_payment_id`, not the id in the address bar.

**Idempotent confirmation.** A payment that is already `is_paid` returns early: no second
commit, no second event. Payment providers retry webhooks, and a retry should be a no-op, not
a duplicate notification.

**UUIDv7 primary keys.** Identifiers use `uuid.uuid7()` (available from Python 3.14). Unlike
UUIDv4, it embeds a millisecond timestamp in its most significant bits, so it is sortable by
creation time — keeping the benefit of not exposing sequential counters without the index
fragmentation UUIDv4 causes. MySQL has no native UUID column, so a `TypeDecorator` translates
`UUID` ↔ `String(36)` on the way in and out; the application sees `UUID` end to end.

## The payment flow

```text
  browser                      Flask API                    fake bank
     │                             │                             │
     │  POST /payments/pix         │                             │
     ├────────────────────────────>│   create_payment(value)     │
     │                             ├────────────────────────────>│
     │                             │<─ bank_payment_id, payload ─┤
     │<── 201 { payment }          │  (row committed, is_paid=0) │
     │                             │                             │
     │  socket: join-payment       │                             │
     ├────────────────────────────>│  joins room payment:<id>    │
     │                             │                             │
     │           ( QR Code on screen, countdown running )        │
     │                             │                             │
     │                             │   POST /webhooks/pix        │
     │                             │<────────────────────────────┤
     │                             │   { bank_payment_id }       │
     │                             ├─ is_paid = 1, commit        │
     │<── socket: payment-confirmed┤                             │
     │    { payment_id }           ├── 200 { "status": "ok" } ──>│
     │                             │                             │
     └─ cache updated, revalidated with GET /payments/pix/<id>
```

The last step is what keeps the UI honest: the socket event marks the charge as paid in the
TanStack Query cache *and* invalidates it, so the screen's state always ends up coming from
the server.

## Data model

**`payment`**

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `String(36)` | UUIDv7, primary key |
| `value` | `Numeric(10, 2)` | required; up to 99,999,999.99 |
| `is_paid` | `Boolean` | defaults to `false` |
| `bank_payment_id` | `String(36)` | UUID returned by the provider; nullable |
| `pix_payload` | `Text` | the BR Code string; nullable |
| `expiration_date` | `DateTime` | required; declared `timezone=True`, but `DATETIME` stores no offset |

A single table by design: there is no user, no order, and no ledger here — the exercise is
the notification path, not the accounting around it.

## Getting started

### Prerequisites

- Python 3.14 or newer (UUIDv7 requires it)
- Node.js 20 or newer
- Docker and Docker Compose

### 1. Database

From the repository root:

```bash
docker compose up -d
```

### 2. Backend

```bash
cd backend

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
pip install pydantic          # imported by the schemas, not yet pinned — see Roadmap

cp .env.example .env          # then fill it in, see Configuration below
```

Create the schema on first run:

```bash
python -c "from app import app; from repository.database import db; app.app_context().push(); db.create_all()"
```

Start the API — through `socketio.run`, not `flask run`, so the WebSocket transport is served:

```bash
python app.py
```

The API listens on `http://127.0.0.1:5000`.

### 3. Front end

```bash
cd frontend

npm install
cp .env.example .env

npm run dev
```

The app opens at `http://localhost:5173`. The port is fixed (`strictPort`) on purpose: it is
hardcoded in the backend's allow-lists, so falling back to 5174 would break CORS and the
socket handshake at once, with an error that points nowhere near the port.

### Configuration

**`backend/.env`**

```env
SECRET_KEY="my_secret_key"
SQLALCHEMY_DATABASE_URI="mysql+pymysql://root:admin123@127.0.0.1:3306/sample-flask-real-time-notification"
```

The credentials and database name match `docker-compose.yml`, so these values work out of the
box for local development.

**`frontend/.env`**

```env
VITE_API_BASE_URL=http://127.0.0.1:5000
VITE_SOCKET_URL=http://127.0.0.1:5000
VITE_SOCKET_PATH=/socket.io
VITE_APP_ENV=development
```

The front end talks to Flask directly — there is no Vite proxy. That means the origin
`http://localhost:5173` has to be allowed in **two** places, and they are separate settings:

- `CORS(app, origins=[...])` in [backend/app.py](backend/app.py) — for the REST calls
- `cors_allowed_origins` in [backend/extensions.py](backend/extensions.py) — for the Socket.IO handshake

### Quick start

The whole flow from the command line, no browser needed:

```bash
# 1. create a charge — keep both ids from the response
curl -X POST http://127.0.0.1:5000/payments/pix \
  -H 'Content-Type: application/json' \
  -d '{"value": "129.90"}'

# 2. read it back (id from the response above)
curl http://127.0.0.1:5000/payments/pix/0198f2b1-4c7e-7a10-9b2f-3d5e6f7a8b9c

# 3. play the bank — bank_payment_id, not id
curl -X POST http://127.0.0.1:5000/webhooks/pix \
  -H 'Content-Type: application/json' \
  -d '{"bank_payment_id": "0198f2b1-9a3d-7bb2-8c41-1e2f3a4b5c6d"}'

# 4. the charge is now paid
curl http://127.0.0.1:5000/payments/pix/0198f2b1-4c7e-7a10-9b2f-3d5e6f7a8b9c
```

Step 3 is exactly what the **Test bench** panel on the payment screen does — with the browser
open, the confirmation lands on screen through the socket before the `curl` returns.

## API reference

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/payments/pix` | Create a Pix charge |
| `GET` | `/payments/pix/<id>` | Retrieve a charge |
| `POST` | `/webhooks/pix` | Bank notification: confirm a charge |

`<id>` is validated at routing time by Flask's `<uuid:payment_id>` converter: a malformed
identifier returns `404` before reaching the view.

### Error format

Validation failures return `400` with the raw output of Pydantic's `ValidationError.errors()`
under `details`, so a client can map each failure back to its form field:

```json
{
  "error": "Invalid pix payment creation data",
  "details": [
    {
      "type": "greater_than",
      "loc": ["value"],
      "msg": "Input should be greater than 0",
      "input": "0",
      "ctx": { "gt": 0 },
      "url": "https://errors.pydantic.dev/2.13/v/greater_than"
    }
  ]
}
```

A charge that does not exist returns `404`:

```json
{ "error": "Payment not found" }
```

---

#### `POST /payments/pix`

Creates a charge, asks the provider for a Pix payload, and stores it as unpaid with a
30-minute expiry.

```json
{
  "value": "129.90"
}
```

**Fields** — `value` (decimal, required, greater than 0, max 10 digits with 2 decimal places).

**Returns** `201 Created`

```json
{
  "message": "The payment has been created",
  "payment": {
    "id": "0198f2b1-4c7e-7a10-9b2f-3d5e6f7a8b9c",
    "value": "129.90",
    "is_paid": false,
    "bank_payment_id": "0198f2b1-9a3d-7bb2-8c41-1e2f3a4b5c6d",
    "pix_payload": "00020126...6304ABCD",
    "expiration_date": "2026-09-01T15:12:44.187000"
  }
}
```

> **`value` comes back as a string.** Pydantic serializes `Decimal` as a string under
> `model_dump(mode="json")`, which keeps the exact decimal instead of rounding it into a
> float. Clients should parse it, not assume a number — the front end does this with
> `z.coerce.number()`.

**Errors** — `400` invalid payload.

---

#### `GET /payments/pix/<id>`

Retrieves a charge. This is the endpoint the front end polls, and the one it re-reads after a
socket event to confirm the status against the server.

**Returns** `200 OK`

```json
{
  "id": "0198f2b1-4c7e-7a10-9b2f-3d5e6f7a8b9c",
  "value": "129.90",
  "is_paid": true,
  "bank_payment_id": "0198f2b1-9a3d-7bb2-8c41-1e2f3a4b5c6d",
  "pix_payload": "00020126...6304ABCD",
  "expiration_date": "2026-09-01T15:12:44.187000"
}
```

> **`expiration_date` carries no offset.** The service stores it as UTC, but the column is a
> `DATETIME`, which drops the timezone, so the serialized value has no `Z` — a client that
> parses it naively reads it as local time. Normalizing this is on the [Roadmap](#roadmap).

**Errors** — `404` no charge with that id.

---

#### `POST /webhooks/pix`

The bank's notification endpoint. Looks the charge up **by the bank's identifier**, marks it
paid, and emits `payment-confirmed` to that charge's room.

```json
{
  "bank_payment_id": "0198f2b1-9a3d-7bb2-8c41-1e2f3a4b5c6d"
}
```

**Fields** — `bank_payment_id` (UUID, required).

**Returns** `200 OK`

```json
{ "status": "ok" }
```

The response says the notification was accepted — nothing more. The payment status travels
over the socket.

Calling it twice is safe: an already-paid charge returns `200` without committing again and
without emitting a second event.

**Errors** — `400` invalid payload; `404` no charge with that `bank_payment_id`.

> **Unauthenticated, by omission.** Any caller who knows a `bank_payment_id` can settle a
> charge. A real integration would verify a provider signature; see the
> [Roadmap](#roadmap).

## Real-time channel

Socket.IO is served by Flask itself, at `/socket.io`.

| Direction | Event | Payload | Meaning |
| --- | --- | --- | --- |
| client → server | `join-payment` | `{ "payment_id": "<uuid>" }` | Subscribe to one charge's room |
| server → client | `payment-confirmed` | `{ "payment_id": "<uuid>" }` | The bank settled this charge |

Rooms are named `payment:<payment_id>`. The event is emitted only to that room, and only
after the database commit — so a client is never told about a state the database has not
accepted yet.

Joining is the client's responsibility on **every** connection, not just the first: a
reconnect gets a fresh session id, which belongs to no room.

## Front end

A two-screen app: the checkout that creates the charge, and the payment screen that waits for
it.

**Checkout** (`/`) — a masked currency field validated with Zod through React Hook Form, plus
quick-amount buttons. On success it navigates to the payment screen, seeding the cache with
the payment it already received so the next screen renders without a round trip.

**Payment** (`/pagamentos/pix/:paymentId`) — renders the QR Code from `pix_payload`, a copy
and paste field, a countdown to expiry, a live console showing whether the channel is
connected, and the test bench that fires the webhook.

Three decisions worth calling out:

**The socket writes to the cache, not to the screen.** When `payment-confirmed` arrives, the
handler updates the TanStack Query key the whole app already observes and invalidates it. The
UI never learns where the data came from, so an HTTP refetch and a bank notification produce
exactly the same render path.

**Polling is the fallback, not the mechanism.** `refetchInterval` reads the channel's state:
5s while disconnected, 30s once connected, and off entirely when the charge is paid or
expired. If the socket drops mid-payment, the interval tightens on its own.

**One shared, reference-counted socket.** `acquireSocket`/`releaseSocket` keep a single
connection for the app and close it only when the last subscriber leaves, so a screen
unmounting cannot pull the channel out from under another that is still listening.

The component layout — `index.tsx` for UI, `use-*.ts` for logic, `styles.ts` for styling, and
the atoms/molecules/organisms split — follows the conventions written down in
[frontend/frontend-guide.md](frontend/frontend-guide.md).

Available scripts:

```bash
npm run dev           # dev server on 5173
npm run build         # type-check and build
npm run lint          # eslint
npm run format        # prettier
npm run type-check    # tsc, no emit
```

## Roadmap

- [x] `Payment` modeling with a custom UUIDv7 column type
- [x] Pix provider behind an ABC, with a fake bank implementation
- [x] BR Code payload built locally, CRC16 included
- [x] Charge creation and retrieval endpoints
- [x] Bank webhook confirming the charge
- [x] Confirmation pushed over Socket.IO, scoped to one room per charge
- [x] React front end with QR Code, countdown, and a webhook test bench
- [ ] Pin `pydantic` in `requirements.txt` — it is imported but never declared — and drop the
      unused `qrcode` entry, since the QR Code is rendered client-side
- [ ] Automated tests: route integration tests on the backend, hook tests on the front end
- [ ] Replace `db.create_all()` with Alembic migrations
- [ ] Normalize `expiration_date` on write, or return it with an offset — the column drops the
      timezone and the browser reads the value as local time
- [ ] Authenticate the webhook with a shared secret or signature
- [ ] Enforce expiry server-side: an expired charge can still be confirmed today, because only
      the UI checks the deadline
- [ ] Read the allowed origins from the environment instead of hardcoding `localhost:5173` in
      two files

## License

Released under the MIT License.
