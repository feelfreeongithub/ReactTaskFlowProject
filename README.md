# TaskFlow

A simple and responsive task management application built with React and Appwrite. Users can create an account, manage their tasks, update task status, and delete tasks from a protected dashboard.

## Features

* User signup and login
* Protected dashboard
* Create tasks
* View tasks
* Edit tasks
* Delete tasks
* Filter tasks by status
* Task statistics
* User-specific tasks
* Responsive dashboard UI
* Appwrite authentication and database
* Loading and error states

## Tech Stack

* **React**
* **JavaScript**
* **React Router**
* **Tailwind CSS**
* **Appwrite**
* **Vite**

## Appwrite

TaskFlow uses Appwrite for:

* User authentication
* Database storage
* Task CRUD operations
* User-specific task permissions

Each task contains:

* Title
* Description
* Status
* User ID

## Project Structure

```text
src/
├── components/
│   └── tasks/
│       ├── TaskCard.jsx
│       └── TaskForm.jsx
├── context/
│   ├── AuthContext.js
│   ├── AuthProvider.jsx
│   └── useAuth.js
├── hooks/
├── pages/
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── Dashboard.jsx
├── services/
│   └── appwrite.js
├── utils/
├── App.jsx
└── main.jsx
```

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ReactTaskFlowProject
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_APPWRITE_ENDPOINT=''
VITE_APPWRITE_PROJECT_ID=''
VITE_APPWRITE_DATABASE_ID=''
VITE_APPWRITE_TASKS_TABLE_ID='
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Application Flow

```text
Signup / Login
       ↓
Protected Dashboard
       ↓
Load User Tasks
       ↓
Create / Edit / Delete Tasks
       ↓
Appwrite Database
       ↓
Updated Dashboard
```

## What I Practiced

This project helped me practice:

* React component-based architecture
* React Hooks
* Context API
* Protected routes
* Form handling
* API/service separation
* CRUD operations
* Appwrite authentication
* Appwrite database integration
* User-specific data
* Responsive UI with Tailwind CSS
* Loading and error handling

## Future Improvements

Possible future improvements include:

* Task search
* Drag-and-drop task management
* Pagination
* Dark mode
* More advanced task filtering

## Author

**Sonam Charak**

Frontend Developer | React.js | JavaScript | Next.js | Tailwind CSS
