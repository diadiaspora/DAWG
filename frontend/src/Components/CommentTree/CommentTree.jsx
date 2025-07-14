function CommentTree(comments) {
  const map = {};
  const roots = [];

  comments.forEach((comment) => {
    map[comment._id] = { ...comment, replies: [] };
  });

  comments.forEach((comment) => {
    if (comment.parentId) {
      map[comment.parentId]?.replies.push(map[comment._id]);
    } else {
      roots.push(map[comment._id]);
    }
  });

  return roots;
}

export default CommentTree;