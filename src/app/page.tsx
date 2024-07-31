"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const token = Cookies.get("accessToken");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setUser(null);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    if (user === null) {
      router.push("/signin");
    } else if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return <></>;
}
