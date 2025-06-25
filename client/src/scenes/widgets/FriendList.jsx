import Friend from "../../components/Friend";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriend } from "../../state/slice";

function FriendList({ userId }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const mode = useSelector((state) => state.mode);
  const [loading, setLoading] = useState(false);

  async function getFriends() {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/users/${userId}/friends`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setFriend({ friends: data }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    getFriends();
  }, [userId, token, dispatch]);

  if (loading) {
    return <p>Loading please wait...</p>
  }

  return (
    <div className={`${mode === "light" ? "bg-gray-200" : "bg-gray-800"} p-4 rounded shadow space-y-4`}>
      <h3 className={`font-bold text-lg ${mode === "light" ? "text-gray-700" : "text-gray-300"}`}>Friends</h3>
      <div className="space-y-2">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </div>
    </div>
  );
}

export default FriendList;
