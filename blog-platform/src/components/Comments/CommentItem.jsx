import CommentForm from "./CommentForm";
import { useState } from "react";
import "./CommentItem.css";

function CommentItem({ comment, replies = [], onReply }) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div className="comment">
      <img src={comment.authorAvatar} alt={comment.authorName} className="comment-avatar" />
      <div className="comment-body">
        <div className="comment-header">
          <strong>{comment.authorName}</strong>
          <span className="comment-date">
            {new Date(comment.createdAt).toLocaleDateString("uk-UA", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <p>{comment.content}</p>
        <button
          className="reply-button"
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          Відповісти
        </button>

        {showReplyForm && (
          <CommentForm
            placeholder="Ваша відповідь..."
            parentId={comment.id}
            onSubmit={(replyData) => {
              onReply(comment.id, replyData);
              setShowReplyForm(false);
            }}
          />
        )}

        {replies.length > 0 && (
          <div className="comment-replies">
            {replies.map((r) => (
              <CommentItem
                key={r.id}
                comment={r}
                replies={r.replies || []}
                onReply={onReply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentItem;
