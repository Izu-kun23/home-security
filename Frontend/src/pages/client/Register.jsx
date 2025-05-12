import React, { useState } from "react";
import { registerUser } from "../../../../Server/fire.js";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUser(email, password, fullName, phoneNumber);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] mt-[-40px] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>

        {success && <p className="text-green-500 text-center mb-4">User registered successfully!</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-1 text-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-1 text-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-1 text-black"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-1 text-black"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-9 text-sm text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-1 text-black"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-9 text-sm text-gray-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;