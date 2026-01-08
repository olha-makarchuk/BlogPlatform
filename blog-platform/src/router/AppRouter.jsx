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

const Home = lazy(() => import("../pages/Home/Home"));

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />

            <Route path="posts/:id" element={<PostDetail />} />
            <Route path="login" element={<Login />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="about" element={<About />} />

            <Route path="authors" element={<AuthorsList />} />
            <Route path="authors/:id" element={<AuthorProfile />}>
              <Route index element={<AuthorPosts />} />
              <Route path="posts" element={<AuthorPosts />} />
              <Route path="about" element={<AuthorAbout />} />
            </Route>

            <Route path="categories">
              <Route index element={<CategoriesList />} />
              <Route path=":slug" element={<CategoryDetail />} />
            </Route>

            <Route path="authors/:authorId" element={<AuthorProfile />} />

            <Route
              path="posts/new"
              element={
                <ProtectedRoute>
                  <PostCreate />
                </ProtectedRoute>
              }
            />

            <Route
              path="posts/:id/edit"
              element={
                <ProtectedRoute>
                  <PostEdit />
                </ProtectedRoute>
              }
            />

            <Route
              path="dashboard"
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

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
