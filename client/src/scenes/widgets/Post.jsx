import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  //ShareOutlined,
} from "@mui/icons-material";
import Friend from "../../components/Friend";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPost } from "../../state/slice";

function Post({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) {
  const [isComments, setIsComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[userId]);
  const likeCount = Object.keys(likes).length;
  const mode = useSelector((state) => state.mode);

  async function patchLike() {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  if (loading) {
    return <p>Loading please wait...</p>
  }

  return (
    <div className={`${mode === "light" ? "bg-gray-200" : "bg-gray-800"} p-4 rounded shadow space-y-4`}>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />

      <p className={mode === "light" ? "text-gray-700" : "text-gray-300"}>{description}</p>

      {picturePath && (
        <img
          src={`http://localhost:5000/assets/${picturePath}`}
          alt="Post"
          className="w-full rounded-lg object-cover"
        />
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={patchLike} className="text-red-500 hover:scale-110 transition">
            {isLiked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
          </button>
          <span className={mode === "light" ? "text-gray-700" : "text-gray-300"}>{likeCount}</span>

          <button
            onClick={() => setIsComments(!isComments)}
            className={`${mode === "light" ? "text-gray-600" : "text-gray-300"} hover:scale-110 transition`}
          >
            <ChatBubbleOutlineOutlined />
          </button>
          <span className={mode === "light" ? "text-gray-700" : "text-gray-300"}>{comments.length}</span>
        </div>

        {/*<button className="text-gray-600 dark:text-gray-300 hover:scale-110 transition">
          <ShareOutlined />
        </button>*/}
      </div>

      {isComments && (
        <div className={`mt-4 border-t ${mode === "light" ? "border-gray-300" : "border-gray-600"} pt-2 space-y-2`}>
          {comments.map((comment, i) => (
            <p key={`${name}-${i}`} className={`text-sm ${mode === "light" ? "text-gray-600" : "text-gray-400"}`}>
              {comment}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
