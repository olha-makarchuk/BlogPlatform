import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { categories } from "../../data/mockCategories";
import PostList from "../../components/PostList/PostList";
import Pagination from "../../components/Pagination/Pagination";
import { usePosts } from "../../hooks/usePosts";
import "./CategoryDetail.css";

function CategoryDetail() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const initialSearch = searchParams.get("q") || "";
  const initialSort = searchParams.get("sort") || "date";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState(initialSort);

  const category = categories.find((c) => c.slug === slug);

  useEffect(() => {
    setSearchParams({ page: 1, q: searchQuery, sort: sortBy });
  }, [slug, searchQuery, sortBy, setSearchParams]);

  const { posts, totalPages } = usePosts({
    categoryIds: category?.id ? [category.id] : [],
    page,
    searchQuery,
    sort: sortBy,
  });

  if (!category) {
    return <p>Категорію не знайдено</p>;
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchParams({ page: 1, sort: sortBy, q: searchQuery });
    }
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, q: searchQuery, sort: sortBy });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div>
      <div className="category-block">
        Пости категорії {category.name}
        <span className="category-icon">{category.icon}</span>
      </div>

      <div className="category-filters">
        <input
          type="text"
          placeholder="Пошук у категорії..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
        />

        <select value={sortBy} onChange={handleSortChange}>
          <option value="date">За датою</option>
          <option value="views">За переглядами</option>
          <option value="title">За назвою</option>
        </select>
      </div>

      {posts.length === 0 ? (
        <p>Немає статей</p>
      ) : (
        <>
          <PostList posts={posts} />

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default CategoryDetail;
