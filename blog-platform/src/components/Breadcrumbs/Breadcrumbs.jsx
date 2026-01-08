import { Link, useLocation } from "react-router-dom";
import { posts } from "../../data/mockPosts";
import { authors } from "../../data/mockAuthors";
import { categories } from "../../data/mockCategories";
import "./Breadcrumbs.css";

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  if (pathnames.length === 0) return null;

  function getBreadcrumbLabel(segment, index) {
    const prev = pathnames[index - 1];

    if (prev === "posts") {
      const post = posts.find((p) => String(p.id) === segment);
      if (post) return post.title;
      return null;
    }

    if (prev === "authors") {
      const author = authors.find(
        (a) => String(a.id) === segment || a.slug === segment
      );
      if (author) return author.name;
      return null; 
    }

    if (prev === "categories") {
      const category = categories.find((c) => c.slug === segment);
      if (category) return category.name;
      return null;
    }

    const map = {
      posts: "Статті",
      authors: "Автори",
      categories: "Категорії",
      dashboard: "Кабінет",
      "my-posts": "Мої статті",
      settings: "Налаштування",
      login: "Вхід",
      search: "Пошук",
      about: "Про сайт",
      new: "Нова стаття",
    };

    if (map[segment]) return map[segment];

    return null;
  }

  const breadcrumbs = pathnames
    .map((segment, index) => {
      if (segment === "posts") return null; 
      const label = getBreadcrumbLabel(segment, index);
      if (!label) return null; 
      const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
      const isLast = index === pathnames.length - 1;

      return (
        <li className="breadcrumb-item" key={routeTo}>
          <span className="breadcrumb-separator">›</span>
          {isLast ? (
            <span className="breadcrumb-current" aria-current="page">
              {label}
            </span>
          ) : (
            <Link to={routeTo} className="breadcrumb-link">
              {label}
            </Link>
          )}
        </li>
      );
    })
    .filter(Boolean); 

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        <li>
          <Link to="/" className="breadcrumb-link">
            Головна
          </Link>
        </li>
        {breadcrumbs}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
