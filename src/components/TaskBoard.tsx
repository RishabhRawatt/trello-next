"use client";
import React, { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import axios from "axios";
import TaskColumn from "./TaskColumn";
import Cookies from "js-cookie";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  updatedAt: string;
  status: string;
}
const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = Cookies.get("accessToken");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTasks(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const columns = ["To do", "In Progress", "Under Review", "Finished"];

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedTasks = Array.from(tasks);
    const [reorderedTask] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, reorderedTask);

    const updatedTask = {
      ...reorderedTask,
      status: destination.droppableId,
    };

    setTasks(
      updatedTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );

    try {
      await axios.put(`/api/tasks/${updatedTask.id}`, updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex">
        {columns.map((column) => (
          <TaskColumn key={column} title={column} tasks={tasks} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
