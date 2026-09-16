import { Clipboard, Plus } from "lucide-react";
import Sidebar from "../components/sidebar/Sidebar";
import { useAuth } from "../context/useAuth";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="md:ml-64">
        {/* Top bar */}
        <header className="border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between px-2 py-4 sm:px-8">
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
          {/* Welcome section */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Welcome back, {user?.name} 👋
            </h3>

            <p className="mt-2 text-gray-500">
              Here's what's happening with your tasks today.
            </p>
          </section>

          {/* Stats */}
          <section className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Total Tasks</p>

              <p className="mt-3 text-3xl font-bold text-gray-900">0</p>

              <p className="mt-2 text-xs text-gray-400">All your tasks</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">In Progress</p>

              <p className="mt-3 text-3xl font-bold text-indigo-600">0</p>

              <p className="mt-2 text-xs text-gray-400">
                Tasks you're working on
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Completed</p>

              <p className="mt-3 text-3xl font-bold text-green-600">0</p>

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

              <button className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium flex flex-row gap-1 text-white shadow-sm transition hover:bg-indigo-700 cursor-pointer">
                <span>
                  <Plus className="h-5 w-5" />
                </span>{" "}
                Add Task
              </button>
            </div>

            {/* Empty state */}
            <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-2xl text-indigo-600">
                <Clipboard className="h-5 w-5" />
              </div>

              <h4 className="mt-4 text-base font-semibold text-gray-900">
                No tasks yet
              </h4>

              <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                Create your first task and start organizing your work with
                TaskFlow.
              </p>

              <button className="mt-5 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 cursor-pointer">
                Create your first task
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
