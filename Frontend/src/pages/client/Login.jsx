import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate
import { loginUser } from "../../../../Server/fire.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await loginUser(email, password);
      console.log("Logged in successfully:", user);
      navigate("/"); // Navigate to home page on success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] mt-[-40px] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-1 text-black"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-1 text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account? <a href="/register" className="text-blue-600">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;