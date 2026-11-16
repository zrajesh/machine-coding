import { useState } from "react";
import { addReply, deleteComment, editComment, likeComment } from "./commentTree";
import CommentInput from "./components/CommentInput";
import Comment from "./components/Comment";

const startingComments = [
  {
    id: 1,
    text: "Great food delivery app!",
    likes: 2,
    replies: [
      {
        id: 2,
        text: "Agreed, delivery is super fast.",
        likes: 1,
        replies: [{ id: 3, text: "Same here in Bangalore.", likes: 0, replies: [] }],
      },
    ],
  },
  { id: 4, text: "Please add more offers.", likes: 0, replies: [] },
];

export default function App() {
  const [comments, setComments] = useState(startingComments);

  const handleAddComment = (text) => {
    const newComment = { id: Date.now(), text, likes: 0, replies: [] };
    setComments([...comments, newComment]);
  };

  const handleReply = (parentId, text) => {
    const newComment = { id: Date.now(), text, likes: 0, replies: [] };
    setComments(addReply(comments, parentId, newComment));
  };

  const handleEdit = (id, newText) => setComments(editComment(comments, id, newText));
  const handleDelete = (id) => setComments(deleteComment(comments, id));
  const handleLike = (id) => setComments(likeComment(comments, id));

  return (
    <div className="app">
      <h1>Comments</h1>

      <CommentInput buttonLabel="Comment" onSubmit={handleAddComment} />

      {comments.length === 0 && <p className="empty">No comments yet. Be the first!</p>}

      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onReply={handleReply}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onLike={handleLike}
        />
      ))}
    </div>
  );
}
