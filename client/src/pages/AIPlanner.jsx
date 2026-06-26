import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function AIPlanner() {
  const { user } = useAuth();

  const [syllabus, setSyllabus] = useState("");
  const [examDate, setExamDate] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");

  const [studyPlan, setStudyPlan] = useState("");
  const [savedPlans, setSavedPlans] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoadingPlans(true);

      const res = await API.get("/ai/plans", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      setSavedPlans(res.data.plans);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPlans(false);
    }
  };

  const generatePlan = async (e) => {
    e.preventDefault();

    if (!syllabus || !examDate || !hoursPerDay) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post(
        "/ai/generate-plan",
        {
          syllabus,
          examDate,
          hoursPerDay,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      setStudyPlan(res.data.studyPlan.studyPlan);

      fetchPlans();

    } catch (err) {
      console.error(err);
      alert("Failed to generate study plan.");
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this study plan?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/ai/plans/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      setSavedPlans((prev) =>
        prev.filter((plan) => plan._id !== id)
      );

      if (
        studyPlan &&
        savedPlans.find((p) => p._id === id)?.studyPlan ===
          studyPlan
      ) {
        setStudyPlan("");
      }

      alert("Study plan deleted.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete plan.");
    }
  };

  const copyPlan = (plan) => {
    navigator.clipboard.writeText(plan);
    alert("Study plan copied!");
  };

  const viewPlan = (plan) => {
    setStudyPlan(plan);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl p-8 shadow-lg mb-8">

          <h1 className="text-4xl font-bold">
            🤖 AI Study Planner
          </h1>

          <p className="mt-2 text-purple-100">
            Generate a personalized study schedule using Gemini AI.
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={generatePlan}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
        >

          <div>
            <label className="block font-semibold mb-2">
              Syllabus
            </label>

            <textarea
              rows={6}
              className="w-full border rounded-xl p-3"
              placeholder="Enter your syllabus..."
              value={syllabus}
              onChange={(e) =>
                setSyllabus(e.target.value)
              }
            />
          </div>

          <div>

            <label className="block font-semibold mb-2">
              Exam Date
            </label>

            <input
              type="date"
              className="w-full border rounded-xl p-3"
              value={examDate}
              onChange={(e) =>
                setExamDate(e.target.value)
              }
            />

          </div>

          <div>

            <label className="block font-semibold mb-2">
              Study Hours Per Day
            </label>

            <input
              type="number"
              className="w-full border rounded-xl p-3"
              placeholder="4"
              value={hoursPerDay}
              onChange={(e) =>
                setHoursPerDay(e.target.value)
              }
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold"
          >
            {loading
              ? "Generating Study Plan..."
              : "Generate Study Plan"}
          </button>

        </form>

        {/* Current Plan */}

        {studyPlan && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

            <h2 className="text-2xl font-bold mb-4">
              📚 Study Plan
            </h2>

            <pre className="whitespace-pre-wrap font-sans text-gray-700">
              {studyPlan}
            </pre>

            <button
              onClick={() => copyPlan(studyPlan)}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
            >
              📋 Copy Study Plan
            </button>

          </div>
        )}

        {/* Saved Plans */}

        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6">
            📚 Saved Study Plans
          </h2>

          {loadingPlans ? (
            <div className="bg-white rounded-xl p-6 shadow">
              Loading saved plans...
            </div>
          ) : savedPlans.length === 0 ? (
            <div className="bg-white rounded-xl p-6 shadow text-gray-500">
              No saved study plans yet.
            </div>
          ) : (
            <div className="space-y-5">

              {savedPlans.map((plan) => (

                <div
                  key={plan._id}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >

                  <h3 className="text-xl font-bold">
                    {plan.syllabus}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    📅 Exam:{" "}
                    {new Date(
                      plan.examDate
                    ).toLocaleDateString()}
                  </p>

                  <p className="text-gray-600">
                    ⏰ {plan.hoursPerDay} hour(s)/day
                  </p>

                  <div className="flex gap-3 mt-5 flex-wrap">

                    <button
                      onClick={() =>
                        viewPlan(plan.studyPlan)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                    >
                      👁 View
                    </button>

                    <button
                      onClick={() =>
                        copyPlan(plan.studyPlan)
                      }
                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                    >
                      📋 Copy
                    </button>

                    <button
                      onClick={() =>
                        deletePlan(plan._id)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default AIPlanner;