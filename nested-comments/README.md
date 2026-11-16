# Nested Comments

Reddit / YouTube style comments where replies can go any number of levels deep.

Features: add comment, reply, edit, delete (with its replies) and like.

Run: `npm install && npm run dev`

## How it works (good to explain in the interview)

- Each comment is `{ id, text, likes, replies: [] }`. `replies` holds more comments of the same shape.
- `components/Comment.jsx` renders one comment and then renders `<Comment />` for each reply (recursion).
- `commentTree.js` has one small recursive function per action. Each returns a new array so React re-renders.
- All state lives in `App.jsx`; handlers are passed down as props.

## Ideas to extend if the interviewer asks

- Collapse / expand a thread
- Sort by likes or newest
- Toggle like (like / unlike) instead of only adding
- Store a flat list with `parentId` instead of nested `replies`
