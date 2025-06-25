import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import NavBar from "./scenes/navBar";

function App() {
  const mode = useSelector((state) => state.mode);
  const isToken = Boolean(useSelector((state) => state.token));

  return (
    <div className={`app ${mode === "light" ? "bg-white min-h-screen" : "bg-gray-900 min-h-screen"}`}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={isToken ? <HomePage /> : <Navigate to="/" />} />
          <Route path="/profile/:userId" element={isToken ? <ProfilePage /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
