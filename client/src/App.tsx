import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./auth/Register";
import Login from "./auth/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import CreatePost from "./components/post/CreatePost";
import ProtectedRoute from "./auth/ProtectedRoute";
import UserFeed from "./pages/UserFeed";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute/>}>
        <Route path="/userDashboard" element={<UserDashboard />}>
          <Route index element={<Navigate to="feed" replace />} />
    <Route path="feed" element={<UserFeed />} />
          <Route path="createPost" element={<CreatePost />} />
        </Route>
        </Route>
        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
