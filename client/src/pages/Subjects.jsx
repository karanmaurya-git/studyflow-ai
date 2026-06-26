
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Subjects() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");

  const fetchSubjects = async () => {
    try {
      const res = await API.get("/subjects", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setSubjects(res.data.subjects || []);
    } catch (error) {
      console.log(error);
    }
  };

  const createSubject = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      await API.post(
        "/subjects",
        { name },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setName("");
      fetchSubjects();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSubject = async (id) => {
    try {
      await API.delete(`/subjects/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      fetchSubjects();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchSubjects();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl p-8 shadow-lg mb-8">
          <h1 className="text-4xl font-bold">
            StudyFlow Subjects 📚
          </h1>

          <p className="mt-2 text-purple-100">
            Organize and manage all your subjects.
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h3 className="text-gray-500 text-sm">
            Total Subjects
          </h3>

          <p className="text-4xl font-bold mt-2">
            {subjects.length}
          </p>
        </div>

        {/* Create Subject */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Add New Subject
          </h2>

          <form onSubmit={createSubject}>
            <input
              type="text"
              placeholder="Subject Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 mb-4"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
            >
              Add Subject
            </button>
          </form>
        </div>

        {/* Subject List */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Your Subjects
          </h2>

          {subjects.length === 0 ? (
            <p className="text-gray-500">
              No subjects added yet.
            </p>
          ) : (
            <div className="space-y-4">
              {subjects.map((subject) => (
                <div
                  key={subject._id}
                  className="flex justify-between items-center border rounded-xl p-4 hover:bg-slate-50"
                >
                  <h3 className="font-semibold text-lg">
                    {subject.name}
                  </h3>

                  <button
                    onClick={() => deleteSubject(subject._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl"
        >
          Back to Dashboard
        </button>

      </div>
    </div>
  );
}

export default Subjects;
