"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import TaskBoard from "@/components/TaskBoard";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

const DashboardPage: React.FC = () => {
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
      router.push("/signin");
    }
  }, [token,router]);


  return (
    <Layout>
      <TaskBoard />
    </Layout>
  );
};

export default DashboardPage;
