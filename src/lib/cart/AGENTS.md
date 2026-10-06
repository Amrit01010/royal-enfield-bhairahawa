# `src/lib/cart/` instructions
- Own cart context/state only; product definitions remain in `lib/constants/accessories`.
- Keep this client-safe because the context is consumed by Client Components.
- Avoid adding checkout/payment persistence here until a defined backend flow exists.
