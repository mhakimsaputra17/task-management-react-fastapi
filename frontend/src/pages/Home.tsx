import { useState, useEffect } from "react";
import TaskForm from "../components/task/TaskForm";
import { Task, fetchTasks } from "../services/taskService";
import { AlertCircle, Loader } from "lucide-react";
import TaskItem from "../components/task/TaskItem";

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError("Failed to load tasks. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    // Scroll to top of the page to show the form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pendingTasks = tasks
    .filter((task) => !task.completed)
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

  const completedTasks = tasks
    .filter((task) => task.completed)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader className="animate-spin text-blue-600 h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center gap-2">
        <AlertCircle size={20} />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div>
      <TaskForm
        onTaskAdded={loadTasks}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Ongoing Task</h2>
        {pendingTasks.length === 0 ? (
          <div className="bg-gray-200 rounded-lg p-8 text-center text-gray-500">
            No pending tasks. Add a new task to get started.
          </div>
        ) : (
          pendingTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskChanged={loadTasks}
              onEdit={handleEditTask}
            />
          ))
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Completed Task</h2>
        {completedTasks.length === 0 ? (
          <div className="bg-gray-200 rounded-lg p-8 text-center text-gray-500">
            No completed tasks.
          </div>
        ) : (
          completedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskChanged={loadTasks}
              onEdit={handleEditTask}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default Home;
