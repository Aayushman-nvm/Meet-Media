import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function User({ userId, picturePath }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const mode = useSelector((state) => state.mode);

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    getUser();
  }, [userId, token]);

  if (loading) return <p className="text-center">Loading user...</p>;
  if (!user) return null;

  const { firstName, lastName, location, occupation, friends } = user;

  return (
    <div className={`${mode === "light" ? "bg-gray-200" : "bg-gray-800"} p-4 rounded shadow space-y-4`}>
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <img
          src={`http://localhost:5000/assets/${picturePath}`}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className={`font-bold text-lg ${mode === "light" ? "text-black" : "text-white"}`}>{firstName} {lastName}</h2>
          <p className={`text-sm ${mode === "light" ? "text-gray-500" : "text-gray-400"}`}>
            {friends.length} friends
          </p>
        </div>
        <ManageAccountsOutlined className={`ml-auto ${mode === "light" ? "text-gray-600" : "text-gray-300"}`} />
      </div>

      <div className={`flex items-center ${mode === "light" ? "text-gray-600" : "text-gray-300"}`}>
        <LocationOnOutlined className="mr-2" />
        <span>{location}</span>
      </div>
      <div className={`flex items-center ${mode === "light" ? "text-gray-600" : "text-gray-300"}`}>
        <WorkOutlineOutlined className="mr-2" />
        <span>{occupation}</span>
      </div>

      <div className="flex space-x-4">
        <a href="#" className="text-blue-600 hover:underline">Twitter</a>
        <a href="#" className="text-blue-600 hover:underline">LinkedIn</a>
      </div>
    </div>
  );
}

export default User;
