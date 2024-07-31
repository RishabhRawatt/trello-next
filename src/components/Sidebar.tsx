"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { jwtDecode } from "jwt-decode";
import {
  House,
  SquareKanban,
  Settings,
  User,
  ChartSpline,
  CirclePlus,
  ArrowDownToLine,
  BellDot,
  CircleDotDashed,
  ChevronsRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import NewTaskButton from "./NewTaskButton";

const Sidebar: React.FC = () => {
  const [fullName, setFullName] = useState("");

  const router = useRouter();
  // Function to get the value of a cookie
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getCookie("accessToken");
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const fullName = decodedToken.fullName;
          setFullName(fullName);
        } else {
          console.error("No access token found");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    document.cookie = `accessToken=; path=/; max-age=0`;
    router.push("/signin");
  };

  return (
    <aside className="text-black bg-white w-64 h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">{fullName}</h2>

        <div className=" flex justify-between">
          <div className="flex gap-4 mt-2">
            <Link href={"#"}>
              <BellDot size={20} />
            </Link>
            <Link href={"#"}>
              <CircleDotDashed size={20} />
            </Link>
            <Link href={"#"}>
              <ChevronsRight size={20} />
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="bg-gray-200 py-1 px-2 rounded-md hover:bg-gray-500 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="p-2">
          <li>
            <Link
              href="/"
              className="flex py-2 px-4 text-gray-700 hover:bg-gray-200 gap-2"
            >
              <House size={20} />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/boards"
              className="flex py-2 px-4 text-gray-700 hover:bg-gray-200 gap-2"
            >
              <SquareKanban />
              Boards
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="flex py-2 px-4 text-gray-700 hover:bg-gray-200 gap-2"
            >
              <Settings />
              Settings
            </Link>
          </li>
          <li>
            <Link
              href="/teams"
              className="flex py-2 px-4 text-gray-700 hover:bg-gray-200 gap-2"
            >
              <User />
              Teams
            </Link>
          </li>
          <li>
            <Link
              href="/analytics"
              className="flex py-2 px-4 text-gray-700 hover:bg-gray-200 gap-2"
            >
              <ChartSpline />
              Analytics
            </Link>
          </li>
        </ul>
        <div className="p-4 border-t">
          <button className=" gap-3 flex w-full bg-indigo-600 text-white py-2 px-4 rounded justify-center">
            Create new task
            <CirclePlus />
          </button>
        </div>
      </nav>
      <div className="p-4 border-t">
        <button className="flex justify-center gap-3 w-full bg-gray-300 text-gray-800 py-2 px-4 rounded">
          <ArrowDownToLine />
          <div>Download the app</div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
