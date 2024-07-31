import React, { useState } from "react";
import { X, Share, Star, Clock, Flag, AlignLeft, Plus } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !status) {
      alert("Title and Status are mandatory fields.");
      return;
    }

    const token = Cookies.get("accessToken");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/`,
        { title, description, status, priority, deadline },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error("Error posting task:", error);
    }
  };

  return (
    <div
      className={`text-black fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex space-x-2">
            <button type="button" onClick={onClose}>
              <X size={20} />
            </button>
            <button type="button">
              <Share size={20} />
            </button>
          </div>
          <div>
            <button type="button">
              <Star size={20} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full text-2xl font-semibold mb-4 outline-none"
            required
          />
          <div className="space-y-4">
            <TaskProperty
              icon={<Clock size={20} />}
              label="Status"
              value={
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="outline-none bg-gray-100 p-2 rounded"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="To do">To do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Finished">Finished</option>
                </select>
              }
            />
            <TaskProperty
              icon={<Flag size={20} />}
              label="Priority"
              value={
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="outline-none bg-gray-100 p-2 rounded"
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              }
            />
            <TaskProperty
              icon={<Clock size={20} />}
              label="Deadline"
              value={
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="outline-none bg-gray-100 p-2 rounded w-full"
                />
              }
            />
            <TaskProperty
              icon={<AlignLeft size={20} />}
              label="Description"
              value={
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="description for task"
                  className="text-gray-500 w-full h-[50px] outline-none bg-gray-100 p-2 rounded"
                />
              }
            />
          </div>

          <button
            type="button"
            className="flex items-center space-x-2 mt-4 text-gray-600"
          >
            <Plus size={20} />
            <span>Add custom property</span>
          </button>
        </div>

        <div className="bottom-0 left-0 right-0 p-4 border-t">
          <textarea
            className="text-gray-500 w-[350px] h-[100px] outline-none"
            placeholder="Start writing, or drag your own files here."
          ></textarea>
        </div>

        <div className="flex justify-end p-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
};

const TaskProperty: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2">
    {icon}
    <span className="text-gray-600">{label}</span>
    <span className="text-gray-400 ml-auto">{value}</span>
  </div>
);

export default TaskModal;
