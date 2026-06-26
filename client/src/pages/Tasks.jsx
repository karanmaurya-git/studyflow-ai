import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toggleTaskStatus } from "../services/taskService";

function Tasks() {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  // FILTER STATE
  const [filter, setFilter] = useState("all");

  // STATS STATE
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
  });

  // =========================
  // SUBJECTS
  // =========================
  const fetchSubjects = async () => {
    try {
      const res = await API.get("/subjects", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      setSubjects(res.data.subjects || []);

      if (res.data.subjects?.length > 0) {
        setSubject(res.data.subjects[0]._id);
      }
    } catch (error) {
      console.log("Subjects error:", error);
    }
  };

  // =========================
  // TASKS
  // =========================
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const data = res.data.tasks || [];

      setTasks(data);
      calculateStats(data);
    } catch (error) {
      console.log("Tasks error:", error);
    }
  };

  // =========================
  // CREATE TASK
  // =========================
  const createTask = async (e) => {
    e.preventDefault();

    try {
      if (!subject || !title) {
        alert("Subject and Title are required");
        return;
      }

      await API.post(
        "/tasks",
        {
          subject,
          title,
          description: "",
          priority,
          dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      setTitle("");
      setPriority("medium");
      setDueDate("");

      await fetchTasks();
    } catch (error) {
      console.log("Create task error:", error);
    }
  };

  // =========================
  // DELETE TASK
  // =========================
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      await fetchTasks();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // =========================
  // TOGGLE TASK
  // =========================

const handleToggle = async (id) => {
  try {
    await toggleTaskStatus(id);
    await fetchTasks();
    } catch (error) {
     console.log("Toggle error:", error);
   }
   };

  // =========================
  // FILTER
  // =========================
  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return task.status === "pending";
    if (filter === "completed") return task.status === "completed";
    return true;
  });

  // =========================
  // STATS
  // =========================
  const calculateStats = (taskList) => {
    setStats({
      total: taskList.length,
      pending: taskList.filter((t) => t.status === "pending").length,
      completed: taskList.filter((t) => t.status === "completed").length,
    });
  };

  useEffect(() => {
    if (user?.token) {
      fetchSubjects();
      fetchTasks();
    }
   }, [user?.token]);

  return (
  <div className="min-h-screen bg-slate-100 p-8">
  <h1 className="text-4xl font-bold text-slate-800 mb-6">
   StudyFlow Tasks
  </h1>
    
    {/* DASHBOARD */}

      {/* DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="text-gray-500 text-sm">Total Tasks</h3>
    <p className="text-3xl font-bold mt-2">{stats.total}</p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="text-yellow-600 text-sm">Pending</h3>
    <p className="text-3xl font-bold mt-2">{stats.pending}</p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="text-green-600 text-sm">Completed</h3>
    <p className="text-3xl font-bold mt-2">{stats.completed}</p>
  </div>
</div>
      {/* FORM */}
     {/* FORM */}
    <form
    onSubmit={createTask}
    className="bg-white rounded-2xl shadow-md p-6 mb-8"
     >
   <h2 className="text-xl font-semibold mb-4">
    Create New Task
   </h2>

   <select
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
    className="w-full border border-gray-300 rounded-lg p-3 mb-4"
  >
    {subjects.map((sub) => (
      <option key={sub._id} value={sub._id}>
        {sub.name}
      </option>
    ))}
  </select>

  <input
    type="text"
    placeholder="Task Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="w-full border border-gray-300 rounded-lg p-3 mb-4"
  />

  <select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
    className="w-full border border-gray-300 rounded-lg p-3 mb-4"
  >
    <option value="low">Low Priority</option>
    <option value="medium">Medium Priority</option>
    <option value="high">High Priority</option>
  </select>

  <input
    type="date"
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
    className="w-full border border-gray-300 rounded-lg p-3 mb-4"
  />

  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
  >
    Create Task
  </button>
</form>

      <hr />

      {/* FILTER */}
      <div className="flex gap-3 mb-6">
  <button
    onClick={() => setFilter("all")}
    className="px-4 py-2 bg-slate-200 rounded-lg"
  >
    All
  </button>

  <button
    onClick={() => setFilter("pending")}
    className="px-4 py-2 bg-yellow-200 rounded-lg"
  >
    Pending
  </button>

  <button
    onClick={() => setFilter("completed")}
    className="px-4 py-2 bg-green-200 rounded-lg"
  >
    Completed
  </button>
</div>

      {/* TASKS */}
      {filteredTasks.length === 0 ? (
        <p>No Tasks Found</p>
      ) : (
        filteredTasks.map((task) => (
          <div
           key={task._id}
           className="bg-white rounded-2xl shadow-md p-6 mb-4"
           >
            <h3 style={{ marginBottom: "8px" }}>{task.title}</h3>

            {/* STATUS BADGE */}
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "12px",
                background:
                  task.status === "completed" ? "#dcfce7" : "#fee2e2",
                color:
                  task.status === "completed" ? "#166534" : "#991b1b",
                marginRight: "8px",
              }}
            >
              {task.status}
            </span>

            {/* PRIORITY BADGE */}
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "12px",
                background:
                  task.priority === "high"
                    ? "#fee2e2"
                    : task.priority === "medium"
                    ? "#fef9c3"
                    : "#dcfce7",
                color:
                  task.priority === "high"
                    ? "#991b1b"
                    : task.priority === "medium"
                    ? "#92400e"
                    : "#166534",
              }}
            >
              {task.priority}
            </span>

            <p style={{ marginTop: "10px" }}>
              Subject: {task.subject?.name}
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                onClick={() => handleToggle(task._id)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#3b82f6",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {task.status === "pending" ? "Complete" : "Reopen"}
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#ef4444",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Tasks;