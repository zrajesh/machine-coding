# News Feed (Infinite Scroll + Virtualization)

A feed that loads 10 posts at a time when you scroll near the bottom, and only renders the
rows that are visible (using the `react-window` package), so it stays fast with thousands of posts.

Run: `npm install && npm run dev`

## How it works (good to explain in the interview)

- `api.js` is a fake server: `getPosts(page)` returns 10 posts and `hasMore`.
- `App.jsx` keeps `posts`, `page`, `hasMore`, `loading`, `error`.
- **Infinite scroll:** `FixedSizeList` calls `onItemsRendered` with the last visible row.
  If it is within 3 rows of the end (and we are not already loading), we load the next page.
- **Virtualization:** `react-window` only puts ~6 rows in the DOM at a time, no matter how many posts we have.
  Each row gets a `style` prop (position) that we must pass to the row's outer div.
- One extra row at the end shows "Loading more...", an error with Retry, or "You have reached the end".

## Ideas to extend if the interviewer asks

- Variable height rows (`VariableSizeList`)
- Use `IntersectionObserver` for infinite scroll without a library, and explain why virtualization is still needed
- Pull to refresh, cache pages, cursor based pagination
