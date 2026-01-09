import { useParams, useNavigate, Navigate } from "react-router-dom";
import { posts } from "../../data/mockPosts";
import { useAuth } from "../../hooks/useAuth";
import PostForm from "../../components/PostCard/PostForm";
import { ROUTES } from "../../utils/constants";

function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const post = posts.find((p) => p.id === +id);

  if (!post) return <p>Статтю не знайдено</p>;

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;

  if (post.authorId !== user.id) return <Navigate to="/403" replace />;

  const handleSubmit = (data) => {
    const index = posts.findIndex((p) => p.id === post.id);

    posts[index] = {
      ...posts[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    navigate(ROUTES.POSTS.DETAIL(post.id));
  };

  return <PostForm initialValues={post} onSubmit={handleSubmit} mode="edit" />;
}

export default PostEdit;
