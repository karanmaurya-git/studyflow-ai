import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 📥 FETCH DATA
  const fetchDashboardData = async () => {
    try {
      const [subjectsRes, tasksRes, notesRes] = await Promise.all([
        API.get("/subjects", {
          headers: { Authorization: `Bearer ${user?.token}` },
        }),
        API.get("/tasks", {
          headers: { Authorization: `Bearer ${user?.token}` },
        }),
        API.get("/notes", {
          headers: { Authorization: `Bearer ${user?.token}` },
        }),
      ]);

      setSubjects(subjectsRes.data.subjects || []);
      setTasks(tasksRes.data.tasks || []);
      setNotes(notesRes.data.notes || []);
      setLoading(false);
    } catch (error) {
      console.log("Dashboard fetch error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchDashboardData();
    }
  }, [user?.token]);

  // 🔄 TOGGLE TASK STATUS (DONE / UNDO)
  const updateTaskStatus = async (taskId, currentStatus) => {
    try {
      await API.patch(
        `/tasks/${taskId}`,
        {
          status: currentStatus === "completed" ? "pending" : "completed",
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );

      // update UI without reload
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId
            ? {
                ...task,
                status:
                  task.status === "completed" ? "pending" : "completed",
              }
            : task
        )
      );
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  // 🗑️ DELETE TASK
  const deleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const recentTasks = tasks.slice(0, 5);

  // ⏳ LOADING UI (optional but safe)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-8 shadow-lg mb-8">
          <h1 className="text-4xl font-bold">StudyFlow AI 🚀</h1>
          <p className="mt-3 text-lg">
            Welcome Back, {user?.name} 👋
          </p>
          <p className="text-blue-100">{user?.email}</p>
        </div>

        {/* STATS */}
       {/* STATS */}
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">

   <div className="bg-white rounded-2xl shadow p-6">
    <h3 className="text-gray-500">Subjects</h3>
    <p className="text-3xl font-bold mt-2">{subjects.length}</p>
   </div>

    <div className="bg-white rounded-2xl shadow p-6">
    <h3 className="text-gray-500">Tasks</h3>
    <p className="text-3xl font-bold mt-2">{tasks.length}</p>
    </div>

    <div className="bg-white rounded-2xl shadow p-6">
    <h3 className="text-green-600">Completed</h3>
    <p className="text-3xl font-bold mt-2">{completedTasks}</p>
    </div>

    <div className="bg-white rounded-2xl shadow p-6">
    <h3 className="text-yellow-600">Pending</h3>
    <p className="text-3xl font-bold mt-2">{pendingTasks}</p>
    </div>

   <div className="bg-white rounded-2xl shadow p-6">
    <h3 className="text-blue-600">Notes</h3>
    <p className="text-3xl font-bold mt-2">{notes.length}</p>
    </div>

    </div>

        {/* NAVIGATION */}
        {/* NAVIGATION */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">

   <div
    onClick={() => navigate("/subjects")}
    className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all"
    >
    <h2 className="text-xl font-semibold">📚 Subjects</h2>
    <p className="text-gray-500 mt-2">
      Manage your study subjects.
    </p>
    </div>

    <div
    onClick={() => navigate("/tasks")}
    className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all"
    >
    <h2 className="text-xl font-semibold">✅ Tasks</h2>
    <p className="text-gray-500 mt-2">
      Organize and complete tasks.
    </p>
    </div>

   <div
    onClick={() => navigate("/notes")}
    className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all"
    >
    <h2 className="text-xl font-semibold">📝 Notes</h2>
    <p className="text-gray-500 mt-2">
      View and manage your notes.
    </p>
   </div>

   <div
    onClick={() => navigate("/analytics")}
    className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all"
   >
    <h2 className="text-xl font-semibold">📊 Analytics</h2>
    <p className="text-gray-500 mt-2">
      Track your study progress.
    </p>
   </div>

   <div
    onClick={() => navigate("/ai-planner")}
    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl shadow-lg p-6 cursor-pointer hover:scale-105 transition-all"
   >
    <h2 className="text-xl font-bold">
      🤖 AI Planner
    </h2>

    <p className="mt-2 text-purple-100">
      Generate a personalized study plan using AI.
     </p>
   </div>

   </div>

        {/* RECENT TASKS */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Recent Tasks
          </h2>

          {recentTasks.length === 0 ? (
            <p className="text-gray-500">No tasks found.</p>
          ) : (
            recentTasks.map((task) => (
              <div
                key={task._id}
                className="flex justify-between items-center border-b py-3 last:border-none"
              >
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-500">
                    {task.subject?.name}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      updateTaskStatus(task._id, task.status)
                    }
                    className="text-sm px-3 py-1 rounded bg-green-500 text-white"
                  >
                    {task.status === "completed"
                      ? "Undo"
                      : "Done"}
                  </button>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-sm px-3 py-1 rounded bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Dashboard;