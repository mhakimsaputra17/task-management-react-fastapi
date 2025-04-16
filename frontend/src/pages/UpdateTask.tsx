import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getTaskById, updateTask, TaskFormData } from "../services/taskService";
import { ArrowLeft, AlertCircle, Loader } from "lucide-react";
import Button from "../components/common/Button";

const UpdateTask = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const task = await getTaskById(parseInt(id));
        setFormData({
          title: task.title,
          description: task.description,
        });
        setError(null);
      } catch (err) {
        console.error("Error fetching task:", err);
        setError("Failed to load task. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Task title is required");
      return;
    }

    if (!id) return;

    try {
      setSubmitting(true);
      await updateTask(parseInt(id), formData);
      navigate("/");
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader className="animate-spin text-blue-600 h-8 w-8" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Back to Tasks</span>
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Update Task</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 flex items-center">
            <AlertCircle size={20} className="mr-2" />
            <span>{error}</span>
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
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-lg mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex justify-center space-x-4">
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" isLoading={submitting}>
              Update Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
