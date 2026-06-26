// src/pages/LoginPage.jsx
// Simple login form for the admin panel. Uses the AuthContext.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(username, password);
    if (ok) {
      navigate("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-cream-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-serif text-mocha-400 mb-6 text-center">
          Admin Login
        </h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block text-xs font-sans uppercase text-mocha-400 mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-sand-200 p-2 text-sm"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-xs font-sans uppercase text-mocha-400 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-sand-200 p-2 text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-mocha-300 text-cream-50 py-2 uppercase font-sans tracking-widest hover:bg-mocha-400"
        >
          Sign In
        </button>
      </form>
    </section>
  );
}
