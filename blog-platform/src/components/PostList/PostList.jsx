import PostCard from "../PostCard/PostCard";
import "./PostList.css";

function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
