## Changes

### 1. Update Men's Haircut price
In `src/routes/prices.tsx` (Barbershop category), change:
- `{ name: "Men's Haircut", price: naira(2000) }` → `naira(4000)`

### 2. Remove "Online" and "In-Studio" payment methods
In `src/components/site/PayDepositDialog.tsx`:
- Change `Method` type to just `"transfer"`
- Remove the 3-button method picker grid (only Transfer remains, no need to show selector)
- Remove the `{method === "online"}` and `{method === "instudio"}` blocks
- Remove `onlineMessage` and `instudioMessage` builders
- Simplify the WhatsApp link to always use `transferMessage`
- Remove unused imports (`Wallet`, `Banknote` if no longer needed for the picker — `Banknote` is still used for default trigger, keep it)

No other files affected.