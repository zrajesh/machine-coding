// A comment looks like this:
// { id: 1, text: "Hello", likes: 0, replies: [ ...more comments like this ] }
//
// Every function below walks through the comments (and their replies)
// and returns a NEW array, so React sees the change.

// Add a new reply inside the comment that has id = parentId
export function addReply(comments, parentId, newComment) {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return { ...comment, replies: [...comment.replies, newComment] };
    }
    return { ...comment, replies: addReply(comment.replies, parentId, newComment) };
  });
}

// Remove the comment with this id (its replies go away with it)
export function deleteComment(comments, id) {
  return comments
    .filter((comment) => comment.id !== id)
    .map((comment) => ({ ...comment, replies: deleteComment(comment.replies, id) }));
}

// Change the text of the comment with this id
export function editComment(comments, id, newText) {
  return comments.map((comment) => {
    if (comment.id === id) {
      return { ...comment, text: newText };
    }
    return { ...comment, replies: editComment(comment.replies, id, newText) };
  });
}

// Add 1 like to the comment with this id
export function likeComment(comments, id) {
  return comments.map((comment) => {
    if (comment.id === id) {
      return { ...comment, likes: comment.likes + 1 };
    }
    return { ...comment, replies: likeComment(comment.replies, id) };
  });
}
