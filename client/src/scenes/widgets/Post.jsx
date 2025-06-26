import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
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
  const [commentText, setCommentText] = useState("");
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error updating like:", error);
    }
  }

  async function patchComment(comment) {
    if (!comment.trim()) {
      console.error("Comment cannot be empty");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/posts/${postId}/comment`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: comment.trim() }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setCommentText("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    patchComment(commentText);
  };

  if (loading) {
    return (
      <div className={`${mode === "light" ? "bg-gray-200" : "bg-gray-800"} p-4 rounded shadow`}>
        <p className="text-center">Loading...</p>
      </div>
    );
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
          <button 
            onClick={patchLike} 
            className="text-red-500 hover:scale-110 transition"
            disabled={loading}
          >
            {isLiked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
          </button>
          <span className={mode === "light" ? "text-gray-700" : "text-gray-300"}>{likeCount}</span>

          <button
            onClick={() => setIsComments(!isComments)}
            className={`${mode === "light" ? "text-gray-600" : "text-gray-300"} hover:scale-110 transition`}
          >
            <ChatBubbleOutlineOutlined />
          </button>
          <span className={mode === "light" ? "text-gray-700" : "text-gray-300"}>
            {comments?.length || 0}
          </span>
        </div>
      </div>

      {isComments && (
        <div className={`mt-4 border-t ${mode === "light" ? "border-gray-300" : "border-gray-600"} pt-4 space-y-3`}>
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Write a comment..."
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              className={`flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                mode === "light" 
                  ? "bg-white border-gray-300 text-gray-700" 
                  : "bg-gray-700 border-gray-600 text-gray-300"
              }`}
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded transition"
            >
              Send
            </button>
          </form>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {comments && comments.length > 0 ? (
              comments.map((comment, i) => (
                <div
                  key={`${postId}-comment-${i}`}
                  className={`text-sm p-2 rounded ${
                    mode === "light" 
                      ? "bg-gray-100 text-gray-600" 
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {comment}
                </div>
              ))
            ) : (
              <p className={`text-sm italic ${mode === "light" ? "text-gray-500" : "text-gray-400"}`}>
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;