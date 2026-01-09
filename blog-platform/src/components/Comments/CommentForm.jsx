import { useState } from "react";
import "./CommentForm.css";

function CommentForm({ onSubmit, parentId = null, placeholder }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onSubmit({
      content: text,
      parentId,
    });

    setText("");
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        placeholder={placeholder || "Ваш коментар..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" disabled={!text.trim()}>
        Відправити
      </button>
    </form>
  );
}

export default CommentForm;
