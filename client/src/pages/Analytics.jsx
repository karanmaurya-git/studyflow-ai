import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Analytics() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    subjects: 0,
    tasks: 0,
    completed: 0,
    pending: 0,
    notes: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${user?.token}`,
        };

        const [subjectsRes, tasksRes, notesRes] = await Promise.all([
          API.get("/subjects", { headers }),
          API.get("/tasks", { headers }),
          API.get("/notes", { headers }),
        ]);

        const tasks = tasksRes.data.tasks || [];

        setStats({
          subjects: subjectsRes.data.subjects?.length || 0,
          tasks: tasks.length,
          completed: tasks.filter(
            (task) => task.status === "completed"
          ).length,
          pending: tasks.filter(
            (task) => task.status === "pending"
          ).length,
          notes: notesRes.data.notes?.length || 0,
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (user?.token) {
      fetchAnalytics();
    }
  }, [user?.token]);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Subjects</p>
          <h2 className="text-4xl font-bold mt-2 text-blue-600">
            {stats.subjects}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Total Tasks</p>
          <h2 className="text-4xl font-bold mt-2 text-indigo-600">
            {stats.tasks}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Completed</p>
          <h2 className="text-4xl font-bold mt-2 text-green-600">
            {stats.completed}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-4xl font-bold mt-2 text-yellow-600">
            {stats.pending}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Notes</p>
          <h2 className="text-4xl font-bold mt-2 text-purple-600">
            {stats.notes}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow mt-8 p-8">
        <h2 className="text-2xl font-semibold mb-4">
          Study Progress
        </h2>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span>Task Completion</span>
              <span>
                {stats.tasks === 0
                  ? "0%"
                  : `${Math.round(
                      (stats.completed / stats.tasks) * 100
                    )}%`}
              </span>
            </div>

            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{
                  width:
                    stats.tasks === 0
                      ? "0%"
                      : `${(stats.completed / stats.tasks) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;