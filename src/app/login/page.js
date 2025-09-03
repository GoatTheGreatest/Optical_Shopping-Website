"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (e) {
      setError("Network error");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img
              src="/Images/opticofynav.png"
              alt="logo"
              className="w-10 h-10"
            />
            <h1 className="text-2xl font-semibold text-gray-800">OPTICOFY</h1>
          </div>
          <div className="pt-6">
            <svg viewBox="0 0 600 400" className="w-full max-w-md">
              <g fill="none" fillRule="evenodd">
                <rect width="100%" height="100%" fill="#fff" />
                <path
                  d="M120 260c40-60 160-60 200-10 40 50 120 60 160 10"
                  fill="#e6fff2"
                />
                <circle
                  cx="170"
                  cy="130"
                  r="80"
                  fill="#0f9d58"
                  opacity="0.08"
                />
              </g>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Empower Your Optical Business Management!
          </h2>
          <p className="text-gray-600">All In One Tool</p>
        </div>

        <div>
          <div className="bg-white shadow-md rounded-lg p-8 border border-gray-100">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">
              Sign In
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Email"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-gray-600">Remember Me</span>
                </label>
                <a className="text-sm text-green-600 hover:underline" href="#">
                  Forgot Password
                </a>
              </div>
              {error && <div className="text-sm text-red-600">{error}</div>}
              <button
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white py-3 rounded-md"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>
            <div className="mt-4 text-center text-sm">
              Or{" "}
              <Link className="text-green-600 hover:underline" href="/signup">
                Register Now!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
