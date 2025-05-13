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
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[500px]">
        <h2 className="text-3xl font-bold text-center mb-6 text-black">Create an Account</h2>

        {success && <p className="text-green-500 text-center mb-4">User registered successfully!</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister}>
          <div className="mb-5">
            <label className="block text-base font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 text-black"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-base font-medium text-gray-600">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 text-black"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-base font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 text-black"
              required
            />
          </div>

          <div className="mb-5 relative">
            <label className="block text-base font-medium text-gray-600">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 text-black"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-[50%] transform -translate-y-1/2 text-sm text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="mb-5 relative">
            <label className="block text-base font-medium text-gray-600">Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 text-black"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-[50%] transform -translate-y-1/2 text-sm text-gray-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-black">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline font-medium ">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;