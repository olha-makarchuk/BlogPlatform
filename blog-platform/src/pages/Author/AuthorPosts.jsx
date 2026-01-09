import { useOutletContext, useSearchParams } from "react-router-dom";
import PostList from "../../components/PostList/PostList";
import Pagination from "../../components/Pagination/Pagination";
import { usePosts } from "../../hooks/usePosts";

function AuthorPosts() {
  const { author } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const { posts, totalPages } = usePosts({
    authorId: author.id,
    page,
  });

  if (posts.length === 0) {
    return <p>Немає статей</p>;
  }

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <>
      <PostList posts={posts} />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default AuthorPosts;
