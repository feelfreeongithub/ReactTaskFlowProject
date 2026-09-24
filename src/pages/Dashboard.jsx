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

  const loadTasks = async () => {
    if (!user?.$id) return;

    try {
      setLoading(true);
      setError("");

      const response = await taskService.getTasks(user.$id);

      setTasks(response.rows);
    } catch (error) {
      console.error("Failed to load tasks:", error);
      setError("Unable to load your tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [user?.$id]);

  const handleCreateTask = async (taskData) => {
    if (!user?.$id) return;

    try {
      setCreating(true);
      setError("");

      const newTask = await taskService.createTask({
        ...taskData,
        userId: user.$id,
      });

      setTasks((previousTasks) => [newTask, ...previousTasks]);
      setShowTaskForm(false);
    } catch (error) {
      console.error("Failed to create task:", error);
      setError("Unable to create the task. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.$id !== taskId),
      );
    } catch (error) {
      console.error("Failed to delete task:", error);
      setError("Unable to delete the task. Please try again.");
    }
  };

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      inProgress: tasks.filter((task) => task.status === "in-progress").length,
      completed: tasks.filter((task) => task.status === "completed").length,
    };
  }, [tasks]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-gray-200 bg-white md:flex md:flex-col">
        <div className="border-b border-gray-100 px-6 py-5">
          <h1 className="text-2xl font-bold text-gray-900">
            Task<span className="text-indigo-600">Flow</span>
          </h1>

          <p className="mt-1 text-xs text-gray-500">Manage your work simply</p>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          <button className="flex w-full items-center gap-3 rounded-lg bg-indigo-50 px-4 py-3 text-left text-sm font-medium text-indigo-700">
            <span>▦</span>
            Dashboard
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-600 transition hover:bg-gray-50">
            <span>✓</span>
            My Tasks
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-600 transition hover:bg-gray-50">
            <span>⚙</span>
            Settings
          </button>
        </nav>

        <div className="border-t border-gray-100 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="md:ml-64">
        {/* Top bar */}
        <header className="border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>

              <p className="text-sm text-gray-500">Overview of your tasks</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>

                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard body */}
        <div className="px-5 py-8 sm:px-8">
          {/* Welcome */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Welcome back, {user?.name} 👋
            </h3>

            <p className="mt-2 text-gray-500">
              Here's what's happening with your tasks today.
            </p>
          </section>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Stats */}
          <section className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Total Tasks</p>

              <p className="mt-3 text-3xl font-bold text-gray-900">
                {stats.total}
              </p>

              <p className="mt-2 text-xs text-gray-400">All your tasks</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">In Progress</p>

              <p className="mt-3 text-3xl font-bold text-indigo-600">
                {stats.inProgress}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Tasks you're working on
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Completed</p>

              <p className="mt-3 text-3xl font-bold text-green-600">
                {stats.completed}
              </p>

              <p className="mt-2 text-xs text-gray-400">Finished tasks</p>
            </div>
          </section>

          {/* Tasks */}
          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  My Tasks
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Keep track of your current work.
                </p>
              </div>

              <button
                onClick={() => setShowTaskForm(true)}
                className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
              >
                + Add Task
              </button>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="rounded-xl border border-gray-200 bg-white px-6 py-14 text-center">
                <p className="text-sm text-gray-500">Loading your tasks...</p>
              </div>
            ) : tasks.length === 0 ? (
              /* Empty state */
              <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-2xl text-indigo-600">
                  ✓
                </div>

                <h4 className="mt-4 text-base font-semibold text-gray-900">
                  No tasks yet
                </h4>

                <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                  Create your first task and start organizing your work with
                  TaskFlow.
                </p>

                <button
                  onClick={() => setShowTaskForm(true)}
                  className="mt-5 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Create your first task
                </button>
              </div>
            ) : (
              /* Task list */
              <div className="grid gap-4 lg:grid-cols-2">
                {tasks.map((task) => (
                  <TaskCard
                    key={task.$id}
                    task={task}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Create Task Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Create a new task
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Add the details of your task below.
              </p>
            </div>

            <TaskForm
              onSubmit={handleCreateTask}
              onCancel={() => setShowTaskForm(false)}
              loading={creating}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
