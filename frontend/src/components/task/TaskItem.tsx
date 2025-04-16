import { useState } from "react";
import {
  Task,
  deleteTask,
  toggleTaskCompletion,
} from "../../services/taskService";
import { Pencil, Loader, CircleX, Circle, CircleCheck } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onTaskChanged: () => void;
  onEdit: (task: Task) => void;
}

const TaskItem = ({ task, onTaskChanged, onEdit }: TaskItemProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formattedDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        setIsLoading(true);
        await deleteTask(task.id);
        onTaskChanged();
      } catch (error) {
        console.error("Failed to delete task:", error);
        alert("Failed to delete task. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleToggleComplete = async () => {
    try {
      setIsLoading(true);
      await toggleTaskCompletion(task.id, !task.completed);
      onTaskChanged();
    } catch (error) {
      console.error("Failed to update task completion status:", error);
      alert("Failed to update task status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    onEdit(task);
  };

  return (
    <div className="bg-neutral-300 rounded-lg p-4 mb-4">
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-2">
        <div className="flex items-center overflow-hidden w-full sm:w-auto">
          <span
            className={`text-base font-normal truncate mr-2 ${
              task.completed ? "line-through" : ""
            }`}
          >
            {task.title}
          </span>
          <button
            className="p-1.5 transition-transform duration-200 ease-in-out transform active:scale-90"
            onClick={handleEdit}
            aria-label="Edit task"
          >
            <Pencil size={18} />
          </button>
        </div>
        <div className="flex items-center">
          {isLoading ? (
            <Loader className="animate-spin h-5 w-5" />
          ) : (
            <>
              <button
                className="p-1.5 mr-2 transition-transform duration-200 ease-in-out transform active:scale-90"
                onClick={handleDelete}
                aria-label="Delete task"
              >
                <CircleX size={22} color="#33363F" />
              </button>
              <button
                className="p-1.5 transition-transform duration-200 ease-in-out transform active:scale-90"
                onClick={handleToggleComplete}
                aria-label={
                  task.completed ? "Mark as incomplete" : "Mark as complete"
                }
              >
                {task.completed ? (
                  <CircleCheck size={22} color="#33363F" />
                ) : (
                  <Circle size={22} color="#000000" />
                )}
              </button>
            </>
          )}
        </div>
      </div>
      <div className="text-xs text-gray-600 mt-2 pl-1">
        {formattedDate(task.created_at)}
      </div>
    </div>
  );
};

export default TaskItem;
