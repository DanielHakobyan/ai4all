// src/pages/VerifyEmail.tsx
import { useState } from "react";
import { Button } from "../components/ui/button";
import axios from "axios";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify", {
        token,
      });
      setMessage(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 shadow rounded-xl bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Verify Your Email</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your verification code"
          className="w-full border rounded px-3 py-2"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}
        <Button type="submit" className="w-full">
          Verify
        </Button>
      </form>
    </div>
  );
}
