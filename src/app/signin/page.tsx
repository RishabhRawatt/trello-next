"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { cookies } from "next/headers";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(process.env.NEXT_PUBLIC_BACKEND)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signin`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const token = response.data.data.accessToken;
        document.cookie = `accessToken=${token}; path=/; max-age=${
          7 * 24 * 60 * 60
        }`;

        toast.success("Signin successful!");
        router.push("/dashboard");
      } else {
        toast.error(`Signin failed. Please try again.`);
      }
    } catch (error: any) {
      toast.error(
        `An error occurred. Please try again. ${
          error.response?.data?.error || error.message
        }`
      );
    }
  };

  return (
    <div className="text-black min-h-screen bg-gradient-to-b from-purple-200 to-purple-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">
          Welcome to <span className="text-purple-600">Workflo</span>!
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-6 relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account? create a{" "}
          <Link href="/signup" className="text-purple-600 hover:underline">
            new Account
          </Link>
          .
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default SignInPage;
