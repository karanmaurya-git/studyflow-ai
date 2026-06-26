import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

function EditNote() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({
    subject: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsRes, notesRes] = await Promise.all([
          API.get("/subjects", {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }),
          API.get("/notes", {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }),
        ]);

        setSubjects(subjectsRes.data.subjects || []);

        const note = notesRes.data.notes.find(
          (n) => n._id === id
        );

        if (note) {
          setForm({
            subject: note.subject?._id || "",
            title: note.title,
            content: note.content,
          });
        }

      } catch (error) {
        console.log(error);
      }
    };

    if (user?.token) {
      fetchData();
    }

  }, [id, user?.token]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.patch(`/notes/${id}`, form, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      navigate("/notes");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">
          Edit Note
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Select Subject</option>

            {subjects.map((subject) => (
              <option
                key={subject._id}
                value={subject._id}
              >
                {subject.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 h-40"
            required
          />

          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            Update Note
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditNote;