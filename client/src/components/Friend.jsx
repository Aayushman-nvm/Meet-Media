import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setFriend } from "../state/slice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Friend({ friendId, name, subtitle, userPicturePath }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const mode = useSelector((state) => state.mode);
  const [loading, setLoading] = useState(false);

  const isFriend = friends.find((friend) => friend._id === friendId);

  async function patchFriend() {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/users/${_id}/${friendId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch(setFriend({ friends: data }));
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
    <div className={`flex items-center justify-between ${mode === "light" ? "bg-gray-300" : "bg-gray-700"} p-3 rounded shadow`}>
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => navigate(`/profile/${friendId}`)}
      >
        <img
          src={`http://localhost:5000/assets/${userPicturePath}`}
          alt="Friend"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className={`font-semibold ${mode === "light" ? "text-gray-800" : "text-gray-200"}`}>{name}</p>
          <p className={`text-sm ${mode === "light" ? "text-gray-500" : "text-gray-400"}`}>{subtitle}</p>
        </div>
      </div>

      <button
        onClick={patchFriend}
        className={`${mode === "light" ? "text-blue-600" : "text-blue-400"} hover:scale-110 transition`}
      >
        {isFriend ? <PersonRemoveOutlined /> : <PersonAddOutlined />}
      </button>
    </div>
  );
}

export default Friend;
