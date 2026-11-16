# Master Machine Coding

Simple React product list with:

1. Data fetching (loading / error / empty states)
2. Debounced search (400ms)
3. Category + price range filters and price sorting (all work together)
4. Add, edit and delete (with confirmation) products

Run: `npm install && npm run dev`

Data comes from `public/products.json` (see `src/api.js`). Since a JSON file can't be
written to, add/edit/delete only update the UI after a fake 500ms server delay.
