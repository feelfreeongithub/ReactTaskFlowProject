import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { authService } from "../services/appwrite";

function Dashboard() {
  const { user, setUser } = useAuth();
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
    <div className="min-h-screen p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name} 👋</h1>

          <p className="mt-2 text-gray-600">
            You are successfully logged in to TaskFlow.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
