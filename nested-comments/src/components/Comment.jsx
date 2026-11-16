import { useState } from "react";
import CommentInput from "./CommentInput";

// Shows one comment and, inside it, a <Comment /> for every reply.
// A component rendering itself is how nesting goes any number of levels deep.
export default function Comment({ comment, onReply, onEdit, onDelete, onLike }) {
  const { id, text, likes, replies } = comment;

  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="comment">
      {isEditing ? (
        <CommentInput
          initialText={text}
          buttonLabel="Save"
          onSubmit={(newText) => {
            onEdit(id, newText);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <p>{text}</p>
      )}

      <div className="actions">
        <button onClick={() => onLike(id)}>👍 {likes}</button>
        <button onClick={() => setIsReplying(!isReplying)}>Reply</button>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>

      {isReplying && (
        <CommentInput
          buttonLabel="Reply"
          onSubmit={(replyText) => {
            onReply(id, replyText);
            setIsReplying(false);
          }}
          onCancel={() => setIsReplying(false)}
        />
      )}

      {replies.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
          onReply={onReply}
          onEdit={onEdit}
          onDelete={onDelete}
          onLike={onLike}
        />
      ))}
    </div>
  );
}
