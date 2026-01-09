import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PostList from "../../components/PostList/PostList";
import Pagination from "../../components/Pagination/Pagination";
import FilterSidebar from "../../components/Sidebar/FilterSidebar";
import { usePosts } from "../../hooks/usePosts";
import "./Home.css";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState(() =>
    searchParams.get("category")
      ? searchParams.get("category").split(",").map(Number)
      : []
  );

  const [selectedAuthor, setSelectedAuthor] = useState(() =>
    searchParams.get("author") ? searchParams.get("author") : null
  );

  const [sortBy, setSortBy] = useState(
    () => searchParams.get("sort") || "date"
  );

  const [page, setPage] = useState(() =>
    searchParams.get("page") ? searchParams.get("page") : 1
  );

  useEffect(() => {
    const params = {};
    if (selectedCategories.length > 0)
      params.category = selectedCategories.join(",");
    if (selectedAuthor) params.author = selectedAuthor;
    if (sortBy) params.sort = sortBy;
    if (page) params.page = page;

    setSearchParams(params);
  }, [selectedCategories, selectedAuthor, sortBy, page, setSearchParams]);

  const { posts, totalPages } = usePosts({
    categoryIds: selectedCategories,
    authorId: selectedAuthor,
    sort: sortBy,
    page,
  });

  const handleCategoryChange = (categoryId, checked) => {
    setPage(1);
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    }
  };

  const handleAuthorChange = (authorId) => {
    setPage(1);
    setSelectedAuthor(authorId);
  };

  const handleSortChange = (sort) => {
    setPage(1);
    setSortBy(sort);
  };

  return (
    <div className="home-page">
      <FilterSidebar
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        selectedAuthor={selectedAuthor}
        onAuthorChange={handleAuthorChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />

      <div className="home-content">
        <PostList posts={posts} />

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default Home;
