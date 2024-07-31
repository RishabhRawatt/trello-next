import React from "react";

interface NewTaskButtonProps {
  onClick: () => void;
}

const NewTaskButton: React.FC<NewTaskButtonProps> = ({ onClick }) => {
  return (
    <button
      className="w-full bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      + Add new
    </button>
  );
};

export default NewTaskButton;
