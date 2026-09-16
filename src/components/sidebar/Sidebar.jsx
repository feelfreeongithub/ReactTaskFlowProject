import { authService } from "../../services/appwrite";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { Clipboard, LayoutDashboard, LogOut, Settings } from "lucide-react";

function Sidebar() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

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
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-gray-200 bg-white md:flex md:flex-col">
      <div className="border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Task<span className="text-indigo-600">Flow</span>
        </h1>

        <p className="text-xs text-gray-500">Manage your work simply</p>
      </div>

      <nav className="flex-1 space-y-2 p-3">
        <button className="flex w-full items-center gap-3 rounded-lg bg-indigo-50 px-4 py-3 text-left text-sm font-medium text-indigo-700">
          <span>
            <LayoutDashboard className="h-5 w-5" />
          </span>
          Dashboard
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-600 transition hover:bg-gray-50">
          <span>
            <Clipboard className="h-5 w-5" />
          </span>
          My Tasks
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-600 transition hover:bg-gray-50">
          <span>
            <Settings className="h-5 w-5" />
          </span>
          Settings
        </button>
      </nav>

      <div className="border-t border-gray-200 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <span>
            <LogOut className="h-4 w-4" />
          </span>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
