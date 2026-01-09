import { useSearchParams, Link } from "react-router-dom";
import { posts } from "../../data/mockPosts";
import { authors } from "../../data/mockAuthors";
import { categories } from "../../data/mockCategories";
import "./SearchResults.css";
import { ROUTES } from "../../utils/constants";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q")?.toLowerCase();

  if (!q) {
    return <div>Введіть запит</div>;
  }

  const foundPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q)
  );

  const foundAuthors = authors.filter((a) => a.name.toLowerCase().includes(q));

  const foundCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(q)
  );

  const nothingFound =
    foundPosts.length === 0 &&
    foundAuthors.length === 0 &&
    foundCategories.length === 0;

  if (nothingFound) {
    return <div className="search-block">Нічого не знайдено за запитом «{q}»</div>;
  }

  return (
    <div className="search-block">
      <p>Результати пошуку: «{q}»</p>

      {foundPosts.length > 0 && (
        <section>
          <h2>Статті ({foundPosts.length})</h2>
          <ul>
            {foundPosts.map((post) => (
              <li key={post.id}>
                <Link to={ROUTES.POSTS.DETAIL(post.id)}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {foundAuthors.length > 0 && (
        <section>
          <h2>Автори ({foundAuthors.length})</h2>
          <ul>
            {foundAuthors.map((author) => (
              <li key={author.id}>
                <Link to={ROUTES.AUTHORS.DETAIL(author.id)}>{author.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {foundCategories.length > 0 && (
        <section>
          <h2>Категорії ({foundCategories.length})</h2>
          <ul>
            {foundCategories.map((category) => (
              <li key={category.id}>
                <Link to={ROUTES.CATEGORIES.DETAIL(category.slug)}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default SearchResults;
