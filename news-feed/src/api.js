// Pretend server. It has 200 posts and gives them out 10 at a time.
// Swap getPosts with a real fetch like fetch(`/posts?page=${page}&limit=10`) when you have an API.
export const PAGE_SIZE = 10;
const TOTAL_POSTS = 200;

export function getPosts(page) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = page * PAGE_SIZE;
      const posts = [];

      for (let i = start; i < start + PAGE_SIZE && i < TOTAL_POSTS; i++) {
        posts.push({
          id: i + 1,
          author: `User ${i + 1}`,
          text: `This is news post number ${i + 1}. Scroll down to load more posts.`,
        });
      }

      resolve({ posts, hasMore: start + PAGE_SIZE < TOTAL_POSTS });
    }, 700);
  });
}
