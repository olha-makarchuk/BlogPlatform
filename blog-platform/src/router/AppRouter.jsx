import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import PostDetail from "../pages/Post/PostDetail";
import AuthorProfile from "../pages/Author/AuthorProfile";
import AuthorAbout from "../pages/Author/AuthorAbout";
import AuthorPosts from "../pages/Author/AuthorPosts";
import Login from "../pages/Auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import PostCreate from "../pages/Post/PostCreate";
import PostEdit from "../pages/Post/PostEdit";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import SearchResults from "../pages/Search/SearchResults";
import About from "../pages/About/About";
import CategoryDetail from "../pages/Categories/CategoryDetail";
import CategoriesList from "../pages/Categories/CategoriesList";
import DashboardLayout from "../layouts/DashboardLayout";
import MyPosts from "../pages/Dashboard/MyPosts";
import Settings from "../pages/Dashboard/Settings";
import NotFound from "../pages/NotFound/NotFound";
import AuthorsList from "../pages/Author/AuthorsList";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { ROUTES } from "../utils/constants";

const Home = lazy(() => import("../pages/Home/Home"));

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path={ROUTES.HOME} element={<MainLayout />}>
            <Route index element={<Home />} />

            <Route path={`${ROUTES.POSTS.ROOT}/:id`} element={<PostDetail />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SEARCH} element={<SearchResults />} />
            <Route path={ROUTES.ABOUT} element={<About />} />

            <Route path={ROUTES.AUTHORS.ROOT} element={<AuthorsList />} />
            <Route
              path={`${ROUTES.AUTHORS.ROOT}/:id`}
              element={<AuthorProfile />}
            >
              <Route index element={<AuthorPosts />} />
              <Route path="posts" element={<AuthorPosts />} />
              <Route path="about" element={<AuthorAbout />} />
            </Route>

            <Route path={ROUTES.CATEGORIES.ROOT} element={<CategoriesList />} />
            <Route
              path={`${ROUTES.CATEGORIES.ROOT}/:slug`}
              element={<CategoryDetail />}
            />

            <Route
              path={ROUTES.POSTS.NEW}
              element={
                <ProtectedRoute>
                  <PostCreate />
                </ProtectedRoute>
              }
            />

            <Route
              path={`${ROUTES.POSTS.ROOT}/:id/edit`}
              element={
                <ProtectedRoute>
                  <PostEdit />
                </ProtectedRoute>
              }
            />

            <Route
              path={ROUTES.DASHBOARD.ROOT}
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="my-posts" element={<MyPosts />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
