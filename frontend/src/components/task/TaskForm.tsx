import { useState, useEffect } from "react";
import {
  createTask,
  updateTask,
  TaskFormData,
  Task,
} from "../../services/taskService";
import Button from "../common/Button";

interface TaskFormProps {
  onTaskAdded: () => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
}

const TaskForm = ({
  onTaskAdded,
  editingTask,
  setEditingTask,
}: TaskFormProps) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
      });
    } else {
      setFormData({
        title: "",
      });
    }
  }, [editingTask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      setIsSubmitting(true);

      if (editingTask) {
        await updateTask(editingTask.id, formData);
        setEditingTask(null);
      } else {
        await createTask(formData);
      }

      setFormData({ title: "" });
      setError(null);
      onTaskAdded();
    } catch (err) {
      setError(
        editingTask
          ? "Failed to update task. Please try again."
          : "Failed to create task. Please try again."
      );
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditingTask(null);
    setFormData({ title: "" });
  };

  return (
    <div className="mb-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block text-lg mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-black rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex justify-center mb-8">
          {editingTask ? (
            <div className="flex space-x-4">
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="text-base"
                bgColor="bg-[#FFB46F] hover:bg-[#ffa347]"
              >
                Update Task
              </Button>
              <Button
                type="button"
                className="text-base"
                bgColor="bg-[#FF6F6F] hover:bg-[#ff5252]"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="text-base"
            >
              Add Task
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
