# Caixa Pix — front-end

Terminal de cobranças Pix que consome o backend Flask deste repositório.

React + Vite + TypeScript, seguindo os padrões definidos em
[frontend-guide.md](./frontend-guide.md).

---

## Como rodar

### 1. Backend (Flask)

```bash
docker compose up -d          # MySQL, a partir da raiz do repositório
cd backend
source venv/bin/activate
python app.py                 # http://127.0.0.1:5000
```

### 2. Front-end

```bash
cd frontend
cp .env.example .env
npm install
npm run dev                   # http://localhost:5173
```

### Sobre CORS

O backend ainda não habilita CORS. Enquanto isso, o `vite.config.ts` faz proxy de
`/api/*` para `http://127.0.0.1:5000`, então o browser enxerga API e front na
mesma origem — nenhuma alteração no projeto Python é necessária para desenvolver.

O proxy é uma conveniência de desenvolvimento, não uma dependência. Quando o
`flask-cors` estiver ligado no `create_app()`, aponte o axios direto para o
Flask trocando uma linha do `.env`:

```diff
- VITE_API_BASE_URL=/api
+ VITE_API_BASE_URL=http://127.0.0.1:5000
```

Só o `config/env.ts` lê essa variável, então nenhum service, hook ou componente
muda — e o bloco `server.proxy` do `vite.config.ts` pode ser apagado.

> **macOS:** o AirPlay Receiver ocupa a porta 5000 em IPv6, o que faz
> `localhost:5000` responder `403 Forbidden` mesmo com o Flask no ar. Prefira
> `127.0.0.1` nos dois casos — no proxy e na URL direta.

---

## Scripts

| Script                 | O que faz                                  |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Servidor de desenvolvimento com proxy      |
| `npm run build`        | Type-check completo + build de produção    |
| `npm run preview`      | Serve o build                              |
| `npm run lint`         | ESLint (inclui Prettier como regra)        |
| `npm run lint:fix`     | ESLint com autofix                         |
| `npm run format`       | Prettier em `src/`                         |
| `npm run type-check`   | Apenas o TypeScript                        |

---

## Rotas do front

| Rota                         | Tela                                    |
| ---------------------------- | --------------------------------------- |
| `/`                          | Caixa: abre uma nova cobrança           |
| `/pagamentos/pix/:paymentId` | Comprovante com QR Code e status        |
| `*`                          | Cobrança não encontrada (404)           |

---

## Endpoints consumidos

| Método | Rota                            | Situação no backend                                   |
| ------ | ------------------------------- | ----------------------------------------------------- |
| `POST` | `/payments/pix`                 | ✅ Completo — devolve o pagamento inteiro              |
| `GET`  | `/payments/pix/<uuid>`          | ⚠️ Stub — devolve só `{ message, payment_id }`         |
| `POST` | `/payments/pix/confirmation`    | ⚠️ Stub — responde uma mensagem, não persiste nada     |

### Detalhes que valem lembrar

- **`value` chega como string.** O Pydantic serializa `Decimal` como `"287.90"`
  em `model_dump(mode="json")`. O contrato bruto aceita `string | number` e
  `payment.mapper.ts` normaliza para `number` antes de a UI ver o dado.
- **404 vem do conversor de rota.** Um `payment_id` que não seja um UUID válido
  nunca chega à view: o Flask responde 404 e o front mostra a tela de
  cobrança não encontrada.

---

## Os dois pontos onde o backend ainda amarra o front

### 1. `GET /payments/pix/<uuid>` não devolve o pagamento

Enquanto a rota for stub, o comprovante não teria QR Code nem valor após um
reload. A ponte temporária é `services/payments/payment-snapshot.utils.ts`:
o `POST` guarda o pagamento no `sessionStorage` e o `GET` só confirma que ele
existe.

**Para remover a gambiarra**, faça a rota devolver o pagamento:

```python
@pix_bp.route("/payments/pix/<uuid:payment_id>", methods=["GET"])
def payment_pix_page(payment_id: UUID):
    payment = db.session.get(Payment, payment_id)

    if not payment:
        return jsonify({"error": "Payment not found"}), 404

    return jsonify({
        "message": "pix payment",
        "payment_id": str(payment_id),
        "payment": CreatePaymentResponse
            .model_validate(payment)
            .model_dump(mode="json"),
    }), 200
```

O front já lê `payment` quando ele aparece (`use-pix-payment-query.ts`) e passa a
ignorar o snapshot sozinho. Aí é só apagar `payment-snapshot.utils.ts`, a chave
em `storage.constants.ts` e o campo `isFromLocalSnapshot`.

### 2. Confirmação em tempo real

`POST /payments/pix/confirmation` ainda não marca `is_paid` nem avisa ninguém.
Até lá o front faz **polling** a cada 5s (`APP.paymentPollingIntervalMs`), via
`refetchInterval` do TanStack Query — que só roda enquanto a cobrança está
pendente e dentro do prazo.

O `Flask-SocketIO` já está no `requirements.txt` mas não está ligado no
`create_app()`. Quando estiver emitindo eventos, o caminho é:

1. `npm install socket.io-client`
2. Criar `src/services/payments/use-pix-payment-socket.ts`, que escuta o evento
   e chama `queryClient.setQueryData(paymentQueryKeys.pixDetail(id), ...)`
3. Trocar o `refetchInterval` de `use-pix-payment-query.ts` por `false`

Nenhum componente muda: a UI já reage a qualquer atualização do cache.

O botão **"Simular confirmação do banco"** (visível no comprovante) dispara o
endpoint de confirmação com *optimistic update* — o carimbo de pago aparece na
hora e volta atrás se o servidor recusar. Como o backend ainda não persiste,
a confirmação vale apenas para a sessão atual do navegador.

---

## Arquitetura

```
src/
  components/        # Atomic Design, só o que é realmente reutilizável
    atoms/           # base-button, base-text, base-text-input, base-badge…
    molecules/       # countdown, copy-field, detail-row, status-badge…
    organisms/       # card (Composition Pattern), app-shell, error-fallback
  config/            # env.ts — único ponto que lê import.meta.env
  constants/         # app, routes, storage, regex
  hooks/             # hooks genéricos (use-countdown)
  i18n/              # i18next + locales pt-BR / en-US
  pages/             # checkout, pix-payment, not-found (+ components/ locais)
  providers/         # app-providers (theme, query, router, i18n) e toast
  routes/            # mapa de rotas
  services/
    http/            # api-client (axios) + normalização de erro
    payments/        # service, mapper, query-keys, queries e mutations
  styles/            # theme, global-styles, animations, mixins
  utils/             # date, number, mask, storage, clipboard
```

### Decisões que seguem o guia

- **Três arquivos por componente**: `index.tsx` (UI), `use-*.ts` (lógica),
  `styles.ts` (estilos com styled-components). Nenhum estilo mora no arquivo de UI.
- **Nada de Axios no componente.** A UI fala com hooks; hooks falam com o
  service; o service só faz HTTP e não importa React nem TanStack Query.
- **Nenhum `useEffect` para buscar dados.** Todo estado de servidor é
  TanStack Query.
- **Formulário** com React Hook Form + Zod. O schema
  (`checkout.schema.ts`) guarda *chaves de tradução* como mensagem, então a
  validação é a única fonte de verdade e continua traduzida nos dois idiomas.
- **i18n obrigatório**: nenhum texto visível está hardcoded no JSX.
- **Composition Pattern** em `Card.Root / Header / Section / Divider / Footer`,
  em vez de um componente com uma lista crescente de props.
- **Barrel exports** em cada pasta, com alias `@/` para imports absolutos.

> **Nota sobre `tsconfig.app.json`:** o guia sugere `baseUrl` + `paths`. O
> TypeScript 6 marcou `baseUrl` como deprecada e o build falha com ela. Os
> `paths` são resolvidos a partir do próprio `tsconfig`, então o alias `@/`
> funciona igual — só sem o `baseUrl`.

---

## Direção visual

**"Console claro"** — superfícies brancas sobre um fundo quente quase branco,
hairlines de 1px no lugar de sombras pesadas e muito espaço em branco. A cor só
aparece quando significa alguma coisa: preto para a ação principal, verde para
confirmado, âmbar para aguardando, vermelho para erro.

Tipografia em três funções: *Fraunces* (serifada de peso leve) reservada para os
títulos e o valor da cobrança, *Instrument Sans* para toda a interface e
*DM Mono* para números, ids e o payload do Pix — com `tabular-nums` para as
colunas não dançarem.

O movimento é discreto e curto: entrada com um leve deslocamento vertical, o
selo de confirmado assentando com um overshoot pequeno e o ponto de status
pulsando enquanto o caixa consulta o banco. Tudo respeita
`prefers-reduced-motion`.
