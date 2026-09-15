import { useAuth } from "../context/useAuth";

function Dashboard() {
  const { user } = useAuth();

  console.log(user, "user");

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Welcome, {user?.name} 👋</h1>

      <p className="mt-2 text-gray-600">
        You are successfully logged in to TaskFlow.
      </p>
    </div>
  );
}

export default Dashboard;
