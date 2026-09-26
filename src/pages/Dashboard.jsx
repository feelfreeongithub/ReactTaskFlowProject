import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { authService, taskService } from "../services/appwrite";
import TaskCard from "../components/tasks/TaskCard";
import TaskForm from "../components/tasks/TaskForm";

function Dashboard() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;

    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  const loadTasks = async () => {
    if (!user?.$id) return;

    try {
      setLoading(true);
      setError("");

      const response = await taskService.getTasks(user.$id);
      setTasks(response.rows);
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [user?.$id]);

  const handleCreateTask = async (taskData) => {
    try {
      setCreating(true);
      setError("");

      const newTask = await taskService.createTask({
        ...taskData,
        userId: user.$id,
      });

      setTasks((prev) => [newTask, ...prev]);
      setShowTaskForm(false);
    } catch (err) {
      console.error(err);
      setError("Failed to create task.");
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      setCreating(true);
      setError("");

      const updatedTask = await taskService.updateTask(
        editingTask.$id,
        taskData,
      );

      setTasks((prev) =>
        prev.map((task) => (task.$id === editingTask.$id ? updatedTask : task)),
      );

      setEditingTask(null);
    } catch (err) {
      console.error(err);
      setError("Failed to update task.");
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) return;

    try {
      setError("");

      await taskService.deleteTask(taskId);

      setTasks((prev) => prev.filter((task) => task.$id !== taskId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete task.");
    }
  };

  const stats = {
    total: tasks.length,
    inProgress: tasks.filter((task) => task.status === "in-progress").length,
    completed: tasks.filter((task) => task.status === "completed").length,
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-gray-200 bg-white md:flex md:flex-col">
        <div className="flex h-16 items-center border-b border-gray-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
              T
            </div>
            <span className="text-lg font-bold">TaskFlow</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-700">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Dashboard
          </div>

          <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-500">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            My Tasks
          </div>
        </nav>

        <div className="border-t border-gray-100 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
              <path d="M21 19V5a2 2 0 0 0-2-2h-5" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="md:pl-64">
        {/* Mobile Header */}
        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur md:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                T
              </div>
              <span className="font-bold">TaskFlow</span>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
              aria-label="Logout"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10 17l5-5-5-5" />
                <path d="M15 12H3" />
                <path d="M21 19V5a2 2 0 0 0-2-2h-5" />
              </svg>
            </button>
          </div>
        </header>

        {/* Top Bar */}
        <header className="hidden h-16 items-center justify-end border-b border-gray-200 bg-white px-8 md:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
              {user?.name?.charAt(0)?.toUpperCase() ||
                user?.email?.charAt(0)?.toUpperCase()}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Welcome */}
          <section className="mb-8">
            <p className="text-sm font-medium text-indigo-600">Welcome back</p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {user?.name ? `Hello, ${user.name}` : "Your Dashboard"}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your tasks and keep your work organized.
            </p>
          </section>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Stats */}
          <section className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Tasks</p>
                  <p className="mt-2 text-2xl font-bold">{stats.total}</p>
                </div>

                <div className="rounded-lg bg-indigo-50 p-3 text-indigo-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M8 6h13M8 12h13M8 18h13" />
                    <path d="M3 6h.01M3 12h.01M3 18h.01" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">In Progress</p>
                  <p className="mt-2 text-2xl font-bold">{stats.inProgress}</p>
                </div>

                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="mt-2 text-2xl font-bold">{stats.completed}</p>
                </div>

                <div className="rounded-lg bg-green-50 p-3 text-green-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* Tasks Header */}
          <section>
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  My Tasks
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Keep track of your work.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingTask(null);
                  setShowTaskForm(true);
                }}
                className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
              >
                + Add Task
              </button>
            </div>

            {/* Filters */}
            <div className="mb-5 flex flex-wrap gap-2">
              {[
                { value: "all", label: "All" },
                { value: "todo", label: "To Do" },
                { value: "in-progress", label: "In Progress" },
                { value: "completed", label: "Completed" },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setFilter(item.value)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    filter === item.value
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Loading */}
            {loading ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-xl border border-gray-200 bg-white p-5"
                  >
                    <div className="h-5 w-2/3 rounded bg-gray-200" />
                    <div className="mt-3 h-4 w-full rounded bg-gray-100" />
                    <div className="mt-2 h-4 w-1/2 rounded bg-gray-100" />
                    <div className="mt-6 h-4 w-1/3 rounded bg-gray-100" />
                  </div>
                ))}
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>

                <h3 className="mt-4 font-semibold text-gray-900">
                  No tasks found
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Create a task to start organizing your work.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.$id}
                    task={task}
                    onEdit={(task) => {
                      setShowTaskForm(false);
                      setEditingTask(task);
                    }}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Task Modal */}
      {(showTaskForm || editingTask) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingTask ? "Edit Task" : "Create Task"}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {editingTask
                    ? "Update the details of your task."
                    : "Add a new task to your workspace."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowTaskForm(false);
                  setEditingTask(null);
                }}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <TaskForm
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={() => {
                setShowTaskForm(false);
                setEditingTask(null);
              }}
              loading={creating}
              initialTask={editingTask}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
