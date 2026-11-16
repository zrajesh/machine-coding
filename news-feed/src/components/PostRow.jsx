// One row of the list.
// `style` comes from react-window. It places the row at the right position. Always pass it on.
export default function PostRow({ index, style, data }) {
  const { posts, hasMore, error, onRetry } = data;

  // The extra row after the last post shows loading / error / end message
  if (index >= posts.length) {
    return (
      <div style={style} className="row-message">
        {error ? (
          <>
            <span className="error">{error}</span>
            <button onClick={onRetry}>Retry</button>
          </>
        ) : hasMore ? (
          "Loading more..."
        ) : (
          "You have reached the end 🎉"
        )}
      </div>
    );
  }

  const { id, author, text } = posts[index];

  return (
    <div style={style}>
      <div className="post">
        <h3>
          #{id} {author}
        </h3>
        <p>{text}</p>
      </div>
    </div>
  );
}
