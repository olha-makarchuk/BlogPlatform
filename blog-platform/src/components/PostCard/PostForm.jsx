import { useState, useEffect } from "react";
import { categories } from "../../data/mockCategories";
import "./PostForm.css";

function PostForm({ initialValues, onSubmit, mode = "create" }) {
  const [postForm, setPostForm] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPostForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setHasChanges(true);
  };

  const handleTagChange = (index, value) => {
    const updatedTags = [...postForm.tags];
    updatedTags[index] = value;

    setPostForm((prev) => ({
      ...prev,
      tags: updatedTags,
    }));

    setHasChanges(true);
  };

  const addTagField = () => {
    if (postForm.tags.length >= 5) return;
    setPostForm((prev) => ({
      ...prev,
      tags: [...prev.tags, ""],
    }));
  };

  const removeTagField = (index) => {
    const updatedTags = postForm.tags.filter((_, i) => i !== index);
    setPostForm((prev) => ({
      ...prev,
      tags: updatedTags,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!postForm.title.trim()) newErrors.title = "Заголовок обов'язковий";
    if (!postForm.excerpt.trim())
      newErrors.excerpt = "Короткий опис обов'язковий";
    if (!postForm.content.trim()) newErrors.content = "Контент обов'язковий";
    if (!postForm.categoryId) newErrors.categoryId = "Оберіть категорію";

    return newErrors;
  };

  const handleSubmit = (e, status) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (status === "published" && Object.keys(validationErrors).length > 0)
      return;

    onSubmit({
      ...postForm,
      status,
      tags: postForm.tags.filter((t) => t.trim() !== ""),
    });

    setHasChanges(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!hasChanges) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasChanges]);

  return (
    <form className="form-block">
      <h2>
        {mode === "edit" ? "Редагування статті" : "Створення статті"}
      </h2>

      <input
        name="title"
        placeholder="Заголовок"
        value={postForm.title}
        onChange={handleChange}
      />
      {errors.title && <div className="error">{errors.title}</div>}

      <input
        name="excerpt"
        placeholder="Опис"
        value={postForm.excerpt}
        onChange={handleChange}
      />
      {errors.excerpt && <div className="error">{errors.excerpt}</div>}

      <textarea
        name="content"
        placeholder="Текст статті"
        value={postForm.content}
        onChange={handleChange}
      />
      {errors.content && <div className="error">{errors.content}</div>}

      <input
        name="imageUrl"
        placeholder="URL зображення"
        value={postForm.imageUrl}
        onChange={handleChange}
      />

      <select
        name="categoryId"
        value={postForm.categoryId}
        onChange={handleChange}
      >
        <option value="">Категорія</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      {errors.categoryId && <div className="error">{errors.categoryId}</div>}

      <div className="tags-wrapper">
        <label>Теги</label>

        {postForm.tags.map((tag, index) => (
          <div key={index} className="tag-row">
            <input
              type="text"
              value={tag}
              placeholder="Введіть тег"
              onChange={(e) => handleTagChange(index, e.target.value)}
            />

            {postForm.tags.length > 1 && (
              <button type="button" onClick={() => removeTagField(index)}>
                ❌
              </button>
            )}
          </div>
        ))}

        {postForm.tags.length < 5 && (
          <button type="button" onClick={addTagField}>
            ➕ Додати тег
          </button>
        )}
      </div>

      <div className="actions">
        <button onClick={(e) => handleSubmit(e, "published")}>
          Опублікувати
        </button>

        <button onClick={(e) => handleSubmit(e, "draft")}>
          Зберегти чернетку
        </button>
      </div>
    </form>
  );
}

export default PostForm;
