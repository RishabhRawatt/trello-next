"use client";

import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

interface TaskColumnProps {
  title: string;
  tasks: Array<{
    id: string;
    title: string;
    description: string;
    priority: string;
    updatedAt: string;
    status: string;
  }>;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-1/4 px-2">
      <h2 className="text-black text-2xl font-bold mb-4">{title}</h2>
      <Droppable droppableId={title}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-[200px]"
          >
            {tasks
              .filter((task) => task.status === title)
              .map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button
        className="mt-4 w-full py-2 bg-black hover:bg-gray-700 rounded-md text-sm"
        onClick={handleOpenModal}
      >
        Add new +
      </button>
      <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} />
      {/* Render TaskModal */}
    </div>
  );
};

export default TaskColumn;
