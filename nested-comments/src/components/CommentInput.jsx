import { useState } from "react";

// A text box with a button. Used for new comments, replies and edits.
export default function CommentInput({ initialText = "", buttonLabel, onSubmit, onCancel }) {
  const [text, setText] = useState(initialText);

  const handleSubmit = () => {
    if (!text.trim()) return; // ignore empty comments
    onSubmit(text.trim());
    setText("");
  };

  return (
    <div className="input-row">
      <input
        value={text}
        placeholder="Write a comment..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button onClick={handleSubmit}>{buttonLabel}</button>
      {onCancel && <button onClick={onCancel}>Cancel</button>}
    </div>
  );
}
