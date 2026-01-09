import { NavLink, Outlet, useParams } from "react-router-dom";
import { authors } from "../../data/mockAuthors";
import "./AuthorProfile.css";
import { ROUTES } from "../../utils/constants";

function AuthorProfile() {
  const { id } = useParams();
  const author = authors.find((a) => a.id == id);

  if (!author) return <p>Автора не знайдено</p>;

  return (
    <div className="author-layout">
      <div className="container">
        <div className="author-info">
          <img
            className="author-avatar"
            src={author.avatar}
            alt="Author avatar"
          />
          <div className="author-info-details">
            <h3 className="author-name">{author.name}</h3>
            <p className="author-email">{author.email}</p>

            {author.bio && <p className="author-bio">{author.bio}</p>}

            <div className="author-stats">
              <div className="stat">
                <span className="stat-number">{author.followers}</span>
                <span className="stat-label">Підписники</span>
              </div>
              <div className="stat">
                <span className="stat-number">{author.postsCount}</span>
                <span className="stat-label">Статті</span>
              </div>
              <div className="stat">
                <span className="stat-number">{author.commentsCount}</span>
                <span className="stat-label">Коментарі</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="author-nav">
          <NavLink
            to={ROUTES.AUTHORS.POSTS(author.id)}
            className={({ isActive }) =>
              isActive ? "author-link active" : "author-link"
            }
          >
            Статті
          </NavLink>

          <NavLink
            to={ROUTES.AUTHORS.ABOUT(author.id)}
            className={({ isActive }) =>
              isActive ? "author-link active" : "author-link"
            }
          >
            Про автора
          </NavLink>
        </nav>

        <Outlet context={{ author }} />
      </div>
    </div>
  );
}

export default AuthorProfile;
