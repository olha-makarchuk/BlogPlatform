import { Link } from "react-router-dom";
import { authors } from "../../data/mockAuthors";
import { categories } from "../../data/mockCategories";
import "./PostCard.css";

function PostCard({ post }) {
  const author = authors.find((a) => a.id === post.authorId);
  const category = categories.find((c) => c.id === post.categoryId);

  return (
    <div className="post-row">
      {post.imageUrl && (
        <img className="postcard-image" src={post.imageUrl} alt={post.title} />
      )}

      <div className="post-row_content">
        <div className="post-row_text">
          {category && (
            <Link
              to={`/categories/${category.slug}`}
              className="post-row_category"
              style={{ backgroundColor: category.color }}
            >
              {category.icon} {category.name}
            </Link>
          )}

          <Link to={`/posts/${post.id}`}>
            <h3 className="post-row_title">{post.title}</h3>
          </Link>

          <p className="post-row_excerpt">{post.excerpt}</p>
        </div>

        <div className="post-row_meta">
          <Link className="post-row_author" to={`/authors/${post.authorId}`}>
            👤 {author?.name}
          </Link>

          <span>📅 {new Date(post.createdAt).toLocaleDateString("uk-UA", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}</span>

          <span>👁 {post.views}</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
