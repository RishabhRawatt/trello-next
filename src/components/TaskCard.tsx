import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { getPriorityColor, formatDate } from "./Util";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    priority: string;
    updatedAt: string;
  };
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-lg shadow-md mb-2 overflow-hidden"
        >
          <div className="p-3">
            <h3 className="text-black text-sm font-semibold mb-2">{task.title}</h3>
            <p className="text-xs text-gray-500 mb-2">{task.description}</p>
            <div
              className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {formatDate(task.updatedAt)}
            </p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
