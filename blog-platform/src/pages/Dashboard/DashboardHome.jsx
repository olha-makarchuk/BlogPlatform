import { useAuth } from "../../hooks/useAuth";
import "./DashboardHome.css";
import { posts } from "../../data/mockPosts";
import { comments } from "../../data/mockComments";

function DashboardHome() {
  const { user } = useAuth();

  const filteredPosts = posts.filter((p) => p.authorId === user.id);
  const postIds = filteredPosts.map((p) => p.id);

  const totalViews = filteredPosts.reduce((sum, post) => sum + post.views, 0);
  const totalComments = filteredPosts.reduce(
    (sum, post) => sum + post.commentsCount,
    0
  );

  const filteredComments = comments
    .filter((c) => postIds.includes(c.postId))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="dashboard-container">
      <h2>Особистий кабінет</h2>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-number">{filteredPosts.length}</div>
          <div className="stat-label">Статей</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalViews}</div>
          <div className="stat-label">Переглядів</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalComments}</div>
          <div className="stat-label">Коментарів</div>
        </div>
      </div>

      <div className="recent-comments">
        <h3>Останні коментарі</h3>
        {filteredComments.length === 0 ? (
          <p>Немає коментарів</p>
        ) : (
          <ul>
            {filteredComments.map((c) => (
              <li key={c.id} className="comment-item">
                <img
                  src={c.authorAvatar}
                  alt={c.authorName}
                  className="comment-avatar"
                />
                <div className="comment-content">
                  <strong>{c.authorName}</strong>
                  <p>{c.content}</p>
                  <span className="comment-date">
                    {new Date(c.createdAt).toLocaleDateString("uk-UA", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DashboardHome;
