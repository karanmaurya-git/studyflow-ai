import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

function MyAIPlans() {
  const { user } = useAuth();

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      const res = await API.get("/ai/plans", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      setPlans(res.data.plans);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const deletePlan = async (id) => {
    if (!window.confirm("Delete this study plan?")) return;

    try {
      await API.delete(`/ai/plans/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      setPlans((prev) => prev.filter((plan) => plan._id !== id));

      if (selectedPlan?._id === id) {
        setSelectedPlan(null);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to delete study plan.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold">Loading Study Plans...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl p-8 mb-8 shadow-lg">
          <h1 className="text-4xl font-bold">
            🤖 My AI Study Plans
          </h1>

          <p className="mt-2 text-purple-100">
            View all your saved AI-generated study plans.
          </p>
        </div>

        {plans.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <h2 className="text-2xl font-semibold">
              No Study Plans Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Generate your first AI study plan.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            <div className="space-y-4">

              {plans.map((plan) => (

                <div
                  key={plan._id}
                  className="bg-white rounded-2xl shadow p-5"
                >

                  <h2 className="font-bold text-lg">
                    📚 Study Plan
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Exam Date:
                  </p>

                  <p>
                    {new Date(plan.examDate).toLocaleDateString()}
                  </p>

                  <p className="text-gray-500 mt-2">
                    Hours / Day:
                  </p>

                  <p>{plan.hoursPerDay}</p>

                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() => setSelectedPlan(plan)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(plan.studyPlan)
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Copy
                    </button>

                    <button
                      onClick={() => deletePlan(plan._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

            <div>

              {selectedPlan ? (

                <div className="bg-white rounded-2xl shadow p-6">

                  <h2 className="text-2xl font-bold mb-5">
                    📄 Study Plan
                  </h2>

                  <pre className="whitespace-pre-wrap font-sans">
                    {selectedPlan.studyPlan}
                  </pre>

                </div>

              ) : (

                <div className="bg-white rounded-2xl shadow p-10 text-center">

                  <h2 className="text-xl font-semibold">
                    Select a Study Plan
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Click View to open a saved plan.
                  </p>

                </div>

              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default MyAIPlans;