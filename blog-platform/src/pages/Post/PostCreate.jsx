import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { posts } from "../../data/mockPosts";
import PostForm from "../../components/PostCard/PostForm";
import { ROUTES } from "../../utils/constants";

function PostCreate() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const initialValues = {
    title: "",
    excerpt: "",
    content: "",
    categoryId: "",
    tags: [""],
    imageUrl: "",
  };

  const handleSubmit = (data) => {
    const newPost = {
      id: Date.now(),
      ...data,
      authorId: user.id,
      createdAt: new Date().toISOString(),
      views: 0,
      commentsCount: 0,
    };

    posts.push(newPost);
    navigate(ROUTES.POSTS.DETAIL(newPost.id));
  };

  return <PostForm initialValues={initialValues} onSubmit={handleSubmit} />;
}

export default PostCreate;
