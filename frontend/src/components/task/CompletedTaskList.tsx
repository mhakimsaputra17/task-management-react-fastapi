import { Task } from "../../services/taskService";
import TaskItem from "./TaskItem";
import { CheckCircle } from "lucide-react";

interface CompletedTaskListProps {
  tasks: Task[];
  onTasksChanged: () => void;
  onEdit: (task: Task) => void;
}

const CompletedTaskList = ({
  tasks,
  onTasksChanged,
  onEdit,
}: CompletedTaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500 bg-gray-50 rounded-lg">
        <CheckCircle size={48} className="mb-2 text-gray-400" />
        <p>No completed tasks</p>
        <p className="text-sm">Your completed tasks will appear here</p>
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

export default CompletedTaskList;
