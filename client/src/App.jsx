import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";
import AddNote from "./pages/AddNote";
import EditNote from "./pages/EditNote";
import Analytics from "./pages/Analytics";
import AIPlanner from "./pages/AIPlanner";
import MyAIPlans from "./pages/MyAIPlans";

import Layout from "./components/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            Public Routes
        ========================== */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* =========================
            Protected Routes
        ========================== */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Subjects */}
          <Route path="/subjects" element={<Subjects />} />

          {/* Tasks */}
          <Route path="/tasks" element={<Tasks />} />

          {/* Notes */}
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/add" element={<AddNote />} />
          <Route path="/notes/edit/:id" element={<EditNote />} />

          {/* Analytics */}
          <Route path="/analytics" element={<Analytics />} />
          {/* AI Planner */}
          <Route path="/ai-planner" element={<AIPlanner />} />
          <Route path="/ai-plans" element={<MyAIPlans />} />
        </Route>

        {/* =========================
            404 Page
        ========================== */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <h1 className="text-4xl font-bold text-gray-700">
                404 | Page Not Found
              </h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;