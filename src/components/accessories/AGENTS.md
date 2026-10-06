# `src/components/accessories/` instructions
- Components here implement accessories browsing and product actions.
- Catalog data comes from `lib/constants/accessories`; cart mutations go through the cart context/hook.
- Keep search/filter/sort state local to the catalog component unless it must be reflected in the URL.
- Maintain accessible controls and stable product IDs.
