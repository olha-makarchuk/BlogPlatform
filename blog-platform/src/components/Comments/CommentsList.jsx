import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { useState } from "react";
import { comments as mockComments } from "../../data/mockComments";
import "./CommentsList.css";
import { useAuth } from "../../hooks/useAuth";
import { authors } from "../../data/mockAuthors";

function CommentsList({ postId }) {
  const [comments, setComments] = useState(
    mockComments.filter((c) => c.postId === postId)
  );

  const { user, isAuthenticated } = useAuth();
  const author = authors.find((a) => a.id === user?.id);

  const handleAddComment = (parentId, newComment) => {
    if (!author) return;

    const comment = {
      id: Date.now(),
      postId,
      parentId: parentId || null,
      authorName: author.name,
      authorAvatar: author.avatar,
      content: newComment.content,
      createdAt: new Date().toISOString(),
    };
    setComments([...comments, comment]);
  };

  const buildTree = (parentId = null) =>
    comments
      .filter((c) => c.parentId === parentId)
      .map((c) => ({ ...c, replies: buildTree(c.id) }));

  const commentTree = buildTree();

  return (
    <div className="comments">
      <h3>Коментарі ({comments.length})</h3>

      {isAuthenticated ? (
        <CommentForm onSubmit={(data) => handleAddComment(null, data)} />
      ) : (
        <p className="comments-login">
          Щоб залишити коментар, <a href="/login">увійдіть в акаунт</a>
        </p>
      )}

      {commentTree.length === 0 ? (
        <p className="comments-empty">Поки що немає коментарів</p>
      ) : (
        <div className="comments-list">
          {commentTree.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              replies={c.replies}
              onReply={handleAddComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentsList;
