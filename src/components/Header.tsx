import {
  Calendar,
  Filter,
  Plus,
  Search,
  Sparkles,
  Share2Icon,
} from "lucide-react";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-100 text-black p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Good morning, Joe!</h1>
        <button className="text-sm text-gray-600 hover:text-gray-800">
          Help & feedback
        </button>
      </div>

      <div className="flex space-x-8">
        <div className="flex-1 flex space-x-8">
          <Feature
            title="Introducing tags"
            description="Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient."
          />
          <Feature
            title="Share Notes Instantly"
            description="Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options."
          />
          <Feature
            title="Access Anywhere"
            description="Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer."
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-md"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-200 rounded-md flex gap-2">
            <p>Calendar view</p>
            <Calendar size={20} />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-md flex gap-2">
            <p>Automation</p>
            <Sparkles size={20} />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-md flex gap-2">
            <p>Filter</p>
            <Filter size={20} />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-md flex gap-2">
            <p>Share</p>
            <Share2Icon size={20} />
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center space-x-2">
            <Plus size={20} />
            <span>Create new</span>
          </button>
        </div>
      </div>
    </header>
  );
};

const Feature: React.FC<{
  //   icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ title, description }) => (
  <div className="flex items-start space-x-3">
    {/* {icon} */}
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default Header;
