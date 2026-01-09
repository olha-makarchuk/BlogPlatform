import { useMemo } from "react";
import { posts as mockPosts } from "../data/mockPosts";

const POSTS_PER_PAGE = 9;

export const usePosts = ({
  categoryIds = [],
  authorId,
  sort = "date",
  page = 1,
  searchQuery = "",
} = {}) => {
  const data = useMemo(() => {
    let result = [...mockPosts];

    if (categoryIds.length > 0) {
      result = result.filter((post) => categoryIds.includes(post.categoryId));
    }

    if (authorId) {
      result = result.filter((post) => post.authorId === Number(authorId));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
      );
    }

    switch (sort) {
      case "date":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "views":
        result.sort((a, b) => b.views - a.views);
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    const total = result.length;
    const totalPages = Math.ceil(total / POSTS_PER_PAGE);

    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const paginatedPosts = result.slice(
      startIndex,
      startIndex + POSTS_PER_PAGE
    );

    return { posts: paginatedPosts, total, totalPages };
  }, [categoryIds, authorId, sort, page, searchQuery]);

  return data;
};
