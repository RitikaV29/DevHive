// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// import api from "../api/axios";
// import { API_ENDPOINTS } from "../constants/apiEndpoints";

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     loginId: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (
//     e: React.FormEvent<HTMLFormElement>,
//   ) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const response = await api.post(
//         API_ENDPOINTS.AUTH.LOGIN,
//         formData,
//       );

//       // save token
//       localStorage.setItem(
//         "token",
//         response.data.token,
//       );

//       // save user
//       localStorage.setItem(
//         "user",
//         JSON.stringify(response.data.user),
//       );

//       toast.success(response.data.message);
//       console.log(response.data.user);

//       navigate("/");
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message ||
//           "Login Failed",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-xl shadow-md w-[400px] flex flex-col gap-4"
//       >
//         <h1 className="text-3xl font-bold text-center">
//           Login
//         </h1>

//         <input
//           type="text"
//           name="loginId"
//           placeholder="Email or Username"
//           value={formData.loginId}
//           onChange={handleChange}
//           className="border p-3 rounded-md outline-none"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Enter Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="border p-3 rounded-md outline-none"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-black text-white p-3 rounded-md hover:bg-gray-800 transition"
//         >
//           {loading ? "Loading..." : "Login"}
//         </button>

//         <p className="text-center">
//           Don't have an account?{" "}
//           <Link
//             to="/register"
//             className="text-blue-500"
//           >
//             Register
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaLock } from "react-icons/fa";

import api from "../api/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { useAuth } from "./AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

    await login(formData);
       
      
    toast.success("Login successful");

  navigate("/userDashboard");
      
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">

        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-teal-400 to-teal-600 text-white p-12">
          <h2 className="text-5xl font-bold mb-6">
            Hello, Friend!
          </h2>

          <p className="text-center text-lg mb-8 opacity-90">
            Enter your personal details and start
            your journey with us
          </p>

          <Link
            to="/register"
            className="border-2 border-white px-10 py-3 rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300"
          >
            SIGN UP
          </Link>
        </div>

        {/* Right Panel */}
        <div className="p-8 md:p-14">
          <h1 className="text-4xl font-bold text-center text-teal-500 mb-10">
            Sign In
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                name="loginId"
                placeholder="Email or Username"
                value={formData.loginId}
                onChange={handleChange}
                className="w-full bg-gray-100 pl-12 pr-4 py-4 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-100 pl-12 pr-4 py-4 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold hover:scale-[1.02] transition-all"
            >
              {loading ? "Loading..." : "SIGN IN"}
            </button>

            <p className="text-center text-gray-600">
              Don't have an account?
              <Link
                to="/register"
                className="ml-2 text-teal-500 font-semibold"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;