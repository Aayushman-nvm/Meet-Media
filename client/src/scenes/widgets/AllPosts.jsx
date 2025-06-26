import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/slice";
import Post from "./Post";

function AllPosts({ userId, isProfile }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  async function getPosts() {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  }

  async function getUserPosts() {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/posts/${userId}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user posts:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token && userId) {
      isProfile ? getUserPosts() : getPosts();
    }
  }, [userId, token, isProfile]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading posts...</p>;
  }

  if (!posts || posts.length === 0) {
    return (
      <p className="text-center text-gray-500">
        {isProfile ? "No posts from this user yet." : "No posts available."}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <Post
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </div>
  );
}

export default AllPosts;