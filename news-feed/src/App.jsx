import { useEffect, useState } from "react";
import { FixedSizeList } from "react-window";
import { getPosts } from "./api";
import PostRow from "./components/PostRow";

const ROW_HEIGHT = 110;
const LIST_HEIGHT = 600;

export default function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0); // next page to load
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadMore = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getPosts(page);
      setPosts([...posts, ...data.posts]);
      setHasMore(data.hasMore);
      setPage(page + 1);
    } catch (err) {
      setError("Could not load posts.");
    } finally {
      setLoading(false);
    }
  };

  // load the first page
  useEffect(() => {
    loadMore();
  }, []);

  // react-window tells us which rows are on screen.
  // When the user is close to the last post, load the next page.
  const handleItemsRendered = ({ visibleStopIndex }) => {
    const nearTheEnd = visibleStopIndex >= posts.length - 3;
    if (nearTheEnd && hasMore && !loading && !error) {
      loadMore();
    }
  };

  const isFirstLoad = posts.length === 0 && loading;
  const isEmpty = posts.length === 0 && !loading && !error && !hasMore;
  const isFirstError = posts.length === 0 && error;

  return (
    <div className="app">
      <h1>News Feed</h1>

      {isFirstLoad && <p className="message">Loading...</p>}

      {isFirstError && (
        <p className="message">
          <span className="error">{error}</span> <button onClick={loadMore}>Retry</button>
        </p>
      )}

      {isEmpty && <p className="message">No posts yet.</p>}

      {posts.length > 0 && (
        <FixedSizeList
          height={LIST_HEIGHT}
          width="100%"
          itemCount={posts.length + 1} // +1 for the loading / error / end row
          itemSize={ROW_HEIGHT}
          itemData={{ posts, hasMore, error, onRetry: loadMore }}
          onItemsRendered={handleItemsRendered}
        >
          {PostRow}
        </FixedSizeList>
      )}
    </div>
  );
}
