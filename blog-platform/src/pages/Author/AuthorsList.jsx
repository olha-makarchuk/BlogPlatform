import { useState } from "react";
import "./AuthorsList.css";
import { authors } from "../../data/mockAuthors";
import Pagination from "../../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

const ITEMS_PER_PAGE = 10;

function AuthorsList() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("posts");
  const [sortOrder, setSortOrder] = useState("desc");

  const sortedAuthors = [...authors].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

    return sortOrder === "asc"
      ? a.postsCount - b.postsCount
      : b.postsCount - a.postsCount;
  });

  const totalPages = Math.ceil(sortedAuthors.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedAuthors = sortedAuthors.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="authors">
      <h2>Автори</h2>

      <div className="authors__sort">
        <label>Сортувати:</label>

        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
        >
          <option value="posts">За кількістю статей</option>
          <option value="name">За алфавітом</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setPage(1);
          }}
        >
          <option value="desc">За спаданням</option>
          <option value="asc">За зростанням</option>
        </select>
      </div>

      <ul className="authors__list">
        {paginatedAuthors.map((author) => (
          <li key={author.id} className="authors__item">
            <Link to={ROUTES.AUTHORS.DETAIL(author.id)} className="authors__link">
              <span>{author.name}</span>
              <span className="author-postsCount">
                {author.postsCount} статей
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

export default AuthorsList;
