import { Task } from "../services/taskService";

// Generate a date X days ago
const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

export const dummyTasks: Task[] = [
  {
    id: 1,
    title: "Create task form",
    // description: "Design and implement the form for creating new tasks",
    completed: true,
    created_at: daysAgo(5),
    updated_at: daysAgo(4),
  },
  {
    id: 2,
    title: "Create task API",
    // description: "Implement API endpoints for task CRUD operations",
    completed: true,
    created_at: daysAgo(4),
    updated_at: daysAgo(3),
  },
  {
    id: 3,
    title: "Update task form",
    // description: "Create edit form for updating existing tasks",
    completed: false,
    created_at: daysAgo(3),
    updated_at: daysAgo(3),
  },
  {
    id: 4,
    title: "Update task API",
    // description: "Implement update and delete functionality in the backend",
    completed: false,
    created_at: daysAgo(2),
    updated_at: daysAgo(2),
  },
  {
    id: 5,
    title: "Add task filtering",
    // description: "Implement filtering for completed and pending tasks",
    completed: false,
    created_at: daysAgo(1),
    updated_at: daysAgo(1),
  },
  {
    id: 6,
    title: "Add responsive design",
    // description: "Make the UI responsive for mobile devices",
    completed: true,
    created_at: daysAgo(7),
    updated_at: daysAgo(6),
  },
  {
    id: 7,
    title: "Implement dark mode",
    // description: "Add dark mode toggle and styling",
    completed: false,
    created_at: daysAgo(6),
    updated_at: daysAgo(6),
  },
];
