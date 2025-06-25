import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FriendList from "./widgets/FriendList";
import PostBlock from "./widgets/PostBlock";
import AllPosts from "./widgets/AllPosts";
import User from "./widgets/User";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);

  async function getUser() {
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  }

  useEffect(() => {
    getUser();
  }, [userId, token]);

  if (!user) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">Loading profile...</p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
      <div className="space-y-6">
        <User userId={userId} picturePath={user.picturePath} />
        <FriendList userId={userId} />
      </div>

      <div className="lg:col-span-2 space-y-6">
        <PostBlock picturePath={user.picturePath} />
        <AllPosts userId={userId} isProfile={true} />
      </div>
    </div>
  );
}

export default ProfilePage;
