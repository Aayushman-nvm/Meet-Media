import { useState } from "react";
import {
  Search,
  DarkMode,
  LightMode,
  Menu,
  Close,
  /*Notifications,
  Help,
  Message,*/
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../state/slice.js";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const fullname = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`;

  return (
    <nav className={`fixed top-0 left-0 w-full z-30 flex items-center justify-between px-4 py-3 border-b ${mode === "light" ? "border-gray-300 bg-white" : "border-gray-700 bg-gray-900"}`}>
      {/* Logo */}
      <h1
        onClick={() => navigate("/home")}
        className="text-xl font-bold cursor-pointer text-blue-600 hover:text-blue-300 transition-colors"
      >
        Meet Media
      </h1>

      {/* Desktop Search + Icons */}
      <div className="hidden md:flex items-center space-x-4">
        <div className={user ? "relative" : "hidden"}>
          <input
            placeholder="Search"
            className={`px-4 py-1 rounded-full border ${mode === "light" ? "text-gray-700 border-gray-400 focus:ring-blue-400" : "text-gray-200 border-gray-600 focus:ring-blue-600"} focus:outline-none focus:ring bg-transparent`}
          />
          <button className={`${mode === "light" ? "text-gray-700" : "text-gray-200"} absolute right-2 top-1`}>
            <Search />
          </button>
        </div>

        <button onClick={() => dispatch(setMode())} className={`${mode === "light" ? "text-black" : "text-white"} hover:text-blue-500 transition`}>
          {mode === "light" ? <DarkMode /> : <LightMode />}
        </button>

        {/*<button className="hover:text-blue-500 transition">
          <Message />
        </button>
        <button className="hover:text-blue-500 transition">
          <Notifications />
        </button>
        <button className="hover:text-blue-500 transition">
          <Help />
        </button>*/}

        <div className="flex items-center space-x-2">
          <p className={`${mode === "light" ? "text-black" : "text-white"} font-medium`}>{fullname}</p>
          <button
            onClick={() => dispatch(setLogout())}
            className={user ? "px-2 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600" : "hidden"}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`md:hidden ${mode === "light" ? "text-gray-700" : "text-gray-200"}`}
      >
        {menuOpen ? <Close /> : <Menu />}
      </button>

      {/* Mobile Slide Menu */}
      {menuOpen && (
        <div className={`absolute top-16 left-0 w-full ${mode === "light" ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"} border-t flex flex-col items-start p-4 space-y-4 md:hidden z-50 shadow-lg transition-all duration-300`}>
          <input
            placeholder="Search"
            className={user ? `w-full px-4 py-2 rounded border focus:outline-none focus:ring ${mode === "light" ? "text-gray-700 border-gray-400 focus:ring-blue-400" : "text-gray-200 border-gray-600 focus:ring-blue-600"} bg-transparent` : "hidden"}
          />
          <button
            onClick={() => dispatch(setMode())}
            className={`${mode === "light" ? "text-black" : "text-white"} w-full flex items-center space-x-2 hover:text-blue-500`}
          >
            {mode === "light" ? <DarkMode /> : <LightMode />}
            <span>Toggle Mode</span>
          </button>
          {/*<button className="w-full flex items-center space-x-2 hover:text-blue-500">
            <Message />
            <span>Messages</span>
          </button>
          <button className="w-full flex items-center space-x-2 hover:text-blue-500">
            <Notifications />
            <span>Notifications</span>
          </button>
          <button className="w-full flex items-center space-x-2 hover:text-blue-500">
            <Help />
            <span>Help</span>
          </button>*/}
          <div className="w-full flex justify-between items-center">
            <p className={mode === "light" ? "text-black" : "text-white"}>{fullname}</p>
            <button
              onClick={() => dispatch(setLogout())}
              className={user ? "px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600" : "hidden"}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
