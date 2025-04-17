# ✅ TaskMaster Pro: Modern Task Management Application

<div align="center">
  
  ![Task Management](https://img.shields.io/badge/Task_Management-Application-brightgreen?style=for-the-badge)
  ![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
  ![React](https://img.shields.io/badge/Frontend-React_TS-61DAFB?style=for-the-badge&logo=react)
  ![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql)
  ![Docker](https://img.shields.io/badge/Deployment-Docker-2496ED?style=for-the-badge&logo=docker)
  
  <p align="center">
    <img src="https://github.com/mhakimsaputra17/task-management-react-fastapi/assets/YOUR_ASSET_ID/task-management-logo.png" alt="TaskMaster Pro Logo" width="300"/>
  </p>
  
  <h3>📝 Streamline your workflow with a modern task management solution</h3>
  <p><i>Last updated: 2025-04-17 | Developed by <a href="https://github.com/mhakimsaputra17">@mhakimsaputra17</a></i></p>

</div>

## 📚 Table of Contents

- [✨ Overview](#-overview)
- [🚀 Features](#-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🏗️ Architecture](#️-architecture)
- [📦 Installation & Setup](#-installation--setup)
- [🔌 API Documentation](#-api-documentation)
- [📱 Frontend Structure](#-frontend-structure)
- [🖼️ Screenshots](#️-screenshots)
- [📝 Usage Examples](#-usage-examples)
- [🧩 Advanced Features](#-advanced-features)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

## ✨ Overview

**TaskMaster Pro** is a full-stack web application built with modern technologies that helps users manage their tasks efficiently. With a clean, intuitive interface and powerful backend, this application allows you to create, update, delete, and track the status of your tasks in real-time.

The application features a responsive design that works seamlessly across desktop and mobile devices, with a focus on user experience and performance. The robust backend API ensures data persistence and reliability, while the modern React frontend provides a smooth and interactive user experience.

## 🚀 Features

### Core Features

- ✅ **Task Management**: Create, view, update, and delete tasks
- 🔄 **Task Status**: Toggle between completed and ongoing tasks
- 🔍 **Visual Differentiation**: Clear visual distinction between completed and pending tasks
- ⏱️ **Timestamps**: Automatic tracking of task creation time

### User Experience

- 🎨 **Modern UI**: Clean interface with intuitive controls using TailwindCSS
- 📱 **Responsive Design**: Works on devices of all sizes
- ⚡ **Fast Performance**: Optimized for speed and responsiveness
- 🔔 **Confirmations**: Modal confirmations for important actions like deletion

### Technical Features

- 🔒 **Data Persistence**: Tasks stored in PostgreSQL database
- 🔄 **Real-time Updates**: UI updates immediately after actions
- 🛡️ **Error Handling**: User-friendly error messages
- 📊 **Loading States**: Visual feedback during API operations

## 🛠️ Technology Stack

### Frontend

- **React 19.0**: Modern UI library with latest features
- **TypeScript 5.7**: For type-safe code
- **React Router 7**: Client-side routing
- **TailwindCSS 4.1**: Utility-first CSS framework
- **Lucide React**: Beautiful SVG icons
- **Vite 6.3**: Next-gen frontend build tool

### Backend

- **FastAPI**: High-performance Python web framework
- **SQLAlchemy**: SQL toolkit and ORM
- **Pydantic**: Data validation
- **PostgreSQL**: Reliable relational database
- **Uvicorn**: ASGI server implementation
- **Python 3.11**: Modern Python runtime

### DevOps & Deployment

- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Web server for frontend
- **Environment Configuration**: Separate .env files for frontend and backend
- **Logging**: Structured logging for backend operations

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  React Frontend │────▶│  FastAPI Backend│────▶│   PostgreSQL    │
│  (TypeScript)   │◀────│  (Python)       │◀────│   Database      │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        ▲                       ▲                      ▲
        │                       │                      │
        └───────────┬───────────┘                      │
                    │                                  │
                    │                                  │
                    ▼                                  │
         ┌────────────────────┐                        │
         │                    │                        │
         │  Docker Compose    │────────────────────────┘
         │                    │
         └────────────────────┘
```

The application follows a typical three-tier architecture:

1. **Frontend**: React application handling the UI
2. **Backend**: FastAPI service providing RESTful API
3. **Database**: PostgreSQL storing task data

All components are containerized using Docker and orchestrated with Docker Compose for easy deployment.

## 📦 Installation & Setup

### Prerequisites

- Docker and Docker Compose
- Node.js v18+ (for local development only)
- Python 3.11+ (for local development only)

### Quick Start with Docker

1. **Clone the repository**

```bash
git clone https://github.com/mhakimsaputra17/task-management-react-fastapi.git
cd task-management-react-fastapi
```

2. **Configure environment variables**

```bash
# Backend configuration
cp backend/.env.example backend/.env

# Frontend configuration
cp frontend/.env.example frontend/.env
```

3. **Build and run with Docker Compose**

```bash
docker-compose up -d
```

4. **Access the application**

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

### Manual Setup (Development Mode)

#### Backend Setup

1. **Create a virtual environment and install dependencies**

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. **Configure environment variables**

```bash
cp .env.example .env
# Edit .env file to set DATABASE_URL
```

3. **Run the FastAPI server**

```bash
uvicorn main:app --reload
```

#### Frontend Setup

1. **Install dependencies**

```bash
cd frontend
npm install
```

2. **Configure environment variables**

```bash
cp .env.example .env
```

3. **Run the development server**

```bash
npm run dev
```

## 🔌 API Documentation

The backend provides a RESTful API for task management with the following endpoints:

### Task Endpoints

| Method | Endpoint                  | Description              | Request Body                  | Response              |
| ------ | ------------------------- | ------------------------ | ----------------------------- | --------------------- |
| GET    | `/tasks`                  | Get all tasks            | -                             | Array of task objects |
| POST   | `/tasks`                  | Create a new task        | `{ "title": "..." }`          | Created task object   |
| GET    | `/tasks/{task_id}`        | Get a specific task      | -                             | Task object           |
| PUT    | `/tasks/{task_id}`        | Update a task            | `{ "title": "..." }`          | Updated task object   |
| PATCH  | `/tasks/{task_id}/toggle` | Toggle completion status | `{ "completed": true/false }` | Updated task object   |
| DELETE | `/tasks/{task_id}`        | Delete a task            | -                             | No content (204)      |

### Task Object Schema

```json
{
  "id": 1,
  "title": "Sample task",
  "completed": false,
  "created_at": "2025-04-17T07:09:23",
  "updated_at": "2025-04-17T07:09:23"
}
```

### Error Responses

API errors follow a standard format:

```json
{
  "detail": "Error message"
}
```

## 📱 Frontend Structure

The frontend is organized with a clean component structure:

```
frontend/
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Shared components (Button, etc.)
│   │   └── task/        # Task-specific components
│   ├── pages/           # Page components
│   ├── services/        # API integration
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Dependencies
└── vite.config.ts       # Vite configuration
```

### Key Components

- **TaskForm**: Form for creating and editing tasks
- **TaskItem**: Individual task display with toggle and delete functionality
- **Button**: Reusable button component with variants
- **Home**: Main page displaying task lists with filtering

## 🖼️ Screenshots

<div align="center">
  <p><i>Replace these placeholders with actual screenshots of your application</i></p>
  
  <table>
    <tr>
      <td align="center">
        <img src="https://via.placeholder.com/400x250?text=Task+Management+Dashboard" alt="Dashboard" width="400"/>
        <br/>
        <em>Main Dashboard</em>
      </td>
      <td align="center">
        <img src="https://via.placeholder.com/400x250?text=Adding+New+Task" alt="Add Task" width="400"/>
        <br/>
        <em>Adding a New Task</em>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://via.placeholder.com/400x250?text=Task+Management+Mobile" alt="Mobile View" width="400"/>
        <br/>
        <em>Mobile Responsive View</em>
      </td>
      <td align="center">
        <img src="https://via.placeholder.com/400x250?text=Delete+Confirmation" alt="Delete Confirmation" width="400"/>
        <br/>
        <em>Delete Confirmation</em>
      </td>
    </tr>
  </table>
</div>

## 📝 Usage Examples

### Creating a New Task

1. Navigate to the main page
2. Enter the task title in the input field
3. Click "Add Task" button
4. The new task appears in the "Ongoing Tasks" section

### Completing a Task

1. Find the task in the "Ongoing Tasks" section
2. Click the circle icon next to the task
3. The task moves to the "Completed Tasks" section

### Editing a Task

1. Find the task you want to edit
2. Click the pencil (edit) icon
3. The task details appear in the form at the top
4. Make your changes and click "Update Task"
5. Click "Cancel" to discard changes

### Deleting a Task

1. Find the task you want to delete
2. Click the X (delete) icon
3. Confirm deletion in the modal dialog

## 🧩 Advanced Features

### 1. Task Filtering and Sorting

The application automatically sorts and filters tasks:

- **Ongoing Tasks**: Sorted by creation date (oldest first)
- **Completed Tasks**: Sorted by completion date (newest first)

### 2. Error Handling

The application implements comprehensive error handling:

- Connection issues display appropriate error messages
- Form validation ensures data integrity
- Failed API operations provide clear feedback

### 3. Loading States

Loading indicators are displayed during API operations:

- Initial data loading shows a spinning loader
- Form submission displays a loading state on buttons
- Prevents multiple submissions of the same data

### 4. Responsive Design

The UI adapts to different screen sizes:

- Desktop: Full layout with side-by-side elements
- Tablet: Slightly condensed layout
- Mobile: Stacked layout with optimized touch targets

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. **Fork the repository**

2. **Create a feature branch**

   ```
   git checkout -b feature/amazing-feature
   ```

3. **Commit your changes**

   ```
   git commit -m 'Add some amazing feature'
   ```

4. **Push to the branch**

   ```
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add appropriate tests for new features
- Update documentation as needed
- Be respectful and collaborative in discussions

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/mhakimsaputra17">mhakimsaputra17</a></p>
  <p>
    <a href="https://github.com/mhakimsaputra17/task-management-react-fastapi/stargazers">⭐ Star this repository</a> if you find it useful!
  </p>
</div>
