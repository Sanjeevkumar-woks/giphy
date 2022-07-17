import "./Feed.css";
import Post from "./Post";

function Feed({ posts }) {
  // to keep track of the post

  return (
    <div className="feed">
      {/* Post */}
      {[...posts].reverse().map((post) => (
        <Post
          key={post.id}
          profilePic={post.profilePic}
          message={post.message}
          timestamp={post.timestamp}
          username={post.username}
          image={post.image}
          gif={post.gif}
        />
      ))}
    </div>
  );
}

export default Feed;
