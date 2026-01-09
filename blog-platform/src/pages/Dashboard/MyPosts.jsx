import "./MyPosts.css";
import { useAuth } from "../../hooks/useAuth";
import { posts as mockPosts } from "../../data/mockPosts";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import { ROUTES } from "../../utils/constants";

const POSTS_PER_PAGE = 10;

function MyPosts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState(
    mockPosts.filter((p) => p.authorId === user.id)
  );

  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleEdit = (postId) => {
    navigate(ROUTES.POSTS.EDIT(postId));
  };

  const handleDelete = (postId) => {
    const confirmed = window.confirm(
      "Ви впевнені, що хочете видалити пост?"
    );
    if (!confirmed) return;

    setPosts((prev) => prev.filter((p) => p.id !== postId));

    alert("Пост видалено!");
  };

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <>
      {posts.length === 0 ? (
        <p className="no-posts">У вас ще немає статей</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Заголовок</th>
                <th scope="col">Дата</th>
                <th scope="col">Перегляди</th>
                <th scope="col">Коментарі</th>
                <th scope="col">Статус</th>
                <th scope="col">Дії</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((p) => (
                <tr key={p.id}>
                  <th scope="row">
                    <Link to={ROUTES.POSTS.DETAIL(p.id)}>{p.title}</Link>
                  </th>
                  <td>
                    {new Date(p.createdAt).toLocaleDateString("uk-UA", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td>{p.views}</td>
                  <td>{p.commentsCount}</td>
                  <td>
                    {p.status === "published" ? "Опубліковано" : "Чернетка"}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(p.id)}>Редагувати</button>
                    <button onClick={() => handleDelete(p.id)}>Видалити</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      )}
    </>
  );
}

export default MyPosts;
