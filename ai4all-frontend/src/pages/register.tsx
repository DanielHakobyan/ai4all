// src/pages/Register.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/verify-email");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 shadow rounded-xl bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </div>
  );
}
