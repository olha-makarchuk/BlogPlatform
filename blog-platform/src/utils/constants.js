export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  ABOUT: "/about",
  SEARCH: "/search",
  
  POSTS: {
    ROOT: "/posts",
    NEW: "/posts/new",
    DETAIL: (id) => `/posts/${id}`,
    EDIT: (id) => `/posts/${id}/edit`,
  },

  CATEGORIES: {
    ROOT: "/categories",
    DETAIL: (slug) => `/categories/${slug}`,
  },

  AUTHORS: {
    ROOT: "/authors",
    DETAIL: (id) => `/authors/${id}`,
    POSTS: (id) => `/authors/${id}/posts`,
    ABOUT: (id) => `/authors/${id}/about`,
  },

  DASHBOARD: {
    ROOT: "/dashboard",
    MY_POSTS: "/dashboard/my-posts",
    SETTINGS: "/dashboard/settings",
  },

  NOT_FOUND: "*",
};
