import { Task } from "../../services/taskService";
import TaskItem from "./TaskItem";
import { FileQuestion } from "lucide-react";

interface PendingTaskListProps {
  tasks: Task[];
  onTasksChanged: () => void;
  onEdit: (task: Task) => void;
}

const PendingTaskList = ({
  tasks,
  onTasksChanged,
  onEdit,
}: PendingTaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500 bg-gray-50 rounded-lg">
        <FileQuestion size={48} className="mb-2 text-gray-400" />
        <p>No pending tasks</p>
        <p className="text-sm">Add a new task to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onTaskChanged={onTasksChanged}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default PendingTaskList;
