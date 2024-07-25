import { message } from "antd";
import axios from "axios";
import React from "react";
import { hideLoading, showLoading } from "../../redux/rootSlice";
import { useDispatch } from "react-redux";

function Login() {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  const login = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/portfolio/admin-login", user);
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", JSON.stringify(response.data)); // Ensure `token` is returned and used
        window.location.href = "/admin";
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("An error occurred during login.");
      dispatch(hideLoading());
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="w-full max-w-md bg-white-600 p-8 rounded-lg shadow-lg border border-gray-300">
        <h1 className="text-3xl font-semibold text-center mb-6 text-white">
          M.S.Prince Admin Login
        </h1>
        <hr className="mb-4 border-gray-300" />
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>
        <button
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
