import { dummyTasks } from "../data/dummyTasks";

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TaskFormData {
  title: string;
  description: string;
}

// Store tasks in memory for local state management
let tasks = [...dummyTasks];
let nextId = Math.max(...tasks.map((task) => task.id)) + 1;

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTasks = async (): Promise<Task[]> => {
  await delay(600); // Simulate network delay
  return [...tasks];
};

export const createTask = async (taskData: TaskFormData): Promise<Task> => {
  await delay(600);
  const newTask: Task = {
    id: nextId++,
    ...taskData,
    completed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  tasks = [newTask, ...tasks];
  return newTask;
};

export const updateTask = async (
  id: number,
  taskData: TaskFormData
): Promise<Task> => {
  await delay(600);
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    throw new Error("Task not found");
  }

  const updatedTask: Task = {
    ...tasks[taskIndex],
    ...taskData,
    updated_at: new Date().toISOString(),
  };

  tasks = [
    ...tasks.slice(0, taskIndex),
    updatedTask,
    ...tasks.slice(taskIndex + 1),
  ];

  return updatedTask;
};

export const deleteTask = async (id: number): Promise<void> => {
  await delay(600);
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    throw new Error("Task not found");
  }

  tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
};

export const toggleTaskCompletion = async (
  id: number,
  completed: boolean
): Promise<Task> => {
  await delay(600);
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    throw new Error("Task not found");
  }

  const updatedTask: Task = {
    ...tasks[taskIndex],
    completed,
    updated_at: new Date().toISOString(),
  };

  tasks = [
    ...tasks.slice(0, taskIndex),
    updatedTask,
    ...tasks.slice(taskIndex + 1),
  ];

  return updatedTask;
};

export const getTaskById = async (id: number): Promise<Task> => {
  await delay(600);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    throw new Error("Task not found");
  }

  return { ...task };
};
