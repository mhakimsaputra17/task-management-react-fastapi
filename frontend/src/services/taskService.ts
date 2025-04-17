const API_URL = "http://localhost:8000";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TaskFormData {
  title: string;
}

// Error handler
const handleError = (error: any) => {
  console.error("API Error:", error);
  // Check if error is a response object
  if (error.response) {
    throw new Error(
      `API Error: ${error.response.status} - ${error.response.statusText}`
    );
  } else if (error.request) {
    throw new Error("Network Error: Server did not respond");
  } else {
    throw new Error(`Error: ${error.message}`);
  }
};

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(`${API_URL}/tasks/`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const createTask = async (taskData: TaskFormData): Promise<Task> => {
  try {
    const response = await fetch(`${API_URL}/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateTask = async (
  id: number,
  taskData: TaskFormData
): Promise<Task> => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const toggleTaskCompletion = async (
  id: number,
  completed: boolean
): Promise<Task> => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}/toggle`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getTaskById = async (id: number): Promise<Task> => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    handleError(error);
    throw error;
  }
};
