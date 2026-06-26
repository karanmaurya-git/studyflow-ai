import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

function Notes() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      setNotes(res.data.notes || []);
    } catch (error) {
      console.log("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchNotes();
    }
  }, [user?.token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    try {
      await API.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      fetchNotes();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold">Loading Notes...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Notes</h1>

          <button
            onClick={() => navigate("/notes/add")}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
          >
            + Add Note
          </button>
        </div>

        {notes.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6">
            <p>No notes found.</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-xl shadow p-5"
              >
                <h2 className="text-xl font-bold">
                  {note.title}
                </h2>

                <p className="text-gray-500 mt-1">
                  {note.subject?.name}
                </p>

                <p className="mt-4 whitespace-pre-wrap">
                  {note.content}
                </p>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => navigate(`/notes/edit/${note._id}`)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(note._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Notes;