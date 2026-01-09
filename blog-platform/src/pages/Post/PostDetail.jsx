import { posts } from "../../data/mockPosts";
import { categories } from "../../data/mockCategories";
import { Link, useParams, useNavigate } from "react-router-dom";
import { authors } from "../../data/mockAuthors";
import "./PostDetail.css";
import CommentsList from "../../components/Comments/CommentsList";
import { useAuth } from "../../hooks/useAuth";
import BackButton from "../../components/common/BackButton";

function PostDetail() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id == id);
  if (!post) return <p>Стаття не знайдена</p>;

  const category = categories.find((c) => c.id === post.categoryId);
  const author = authors.find((a) => a.id === post.authorId);

  const isAuthor = isAuthenticated && user?.id === post.authorId;

  const recommendedPosts = posts
    .filter((p) => p.id !== post.id)
    .filter(
      (p) =>
        p.categoryId === post.categoryId ||
        (post.tags && p.tags && p.tags.some((tag) => post.tags.includes(tag))) 
    )
    .slice(0, 4);

  return (
    <div className="post-container">
      <BackButton />

      <div className="post-edit-wrapper">
        {isAuthor && (
          <button
            className="post-edit-btn"
            onClick={() => navigate(`/posts/${post.id}/edit`)}
          >
            Редагувати
          </button>
        )}
      </div>

      <div className="post-category">
        <Link to={`/categories/${category.slug}`}>
          <span style={{ backgroundColor: category?.color }}>
            {category?.icon} {category?.name}
          </span>
        </Link>
      </div>

      <h1 className="post-title">{post.title}</h1>

      <div className="post-meta">
        <Link to={`/authors/${author.id}`} className="post-author">
          {author.name}
        </Link>
        <span>•</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span>•</span>
        <span>{post.views} переглядів</span>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map((tag) => (
            <button
              key={tag}
              className="post-tag"
              onClick={(e) => e.preventDefault()}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {post.imageUrl && (
        <img className="post-image" src={post.imageUrl} alt={post.title} />
      )}

      <div className="post-content">{post.content}</div>

      <div className="post-comments">
        <h2 className="comments-title">Коментарі</h2>
        <CommentsList postId={post.id} />
      </div>

      {recommendedPosts.length > 0 && (
        <div className="recommended-posts">
          <h2>Рекомендовані статті</h2>
          <div className="recommended-grid">
            {recommendedPosts.map((rec) => {
              const recCategory = categories.find((c) => c.id === rec.categoryId);
              return (
                <Link key={rec.id} to={`/posts/${rec.id}`} className="recommended-card">
                  {rec.imageUrl && <img src={rec.imageUrl} alt={rec.title} />}
                  <div className="recommended-info">
                    <span
                      className="recommended-category"
                      style={{ backgroundColor: recCategory?.color }}
                    >
                      {recCategory?.name}
                    </span>
                    <h3>{rec.title}</h3>
                    <p>{new Date(rec.createdAt).toLocaleDateString()}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
