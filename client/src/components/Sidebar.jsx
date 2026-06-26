import {
  LayoutDashboard,
  BookOpen,
  CheckSquare,
  StickyNote,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
      isActive
        ? "bg-blue-600 text-white shadow-lg"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <aside className="w-72 bg-gray-900 text-white min-h-screen flex flex-col justify-between sticky top-0">
      <div>
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-3xl font-extrabold text-blue-400">
            StudyFlow AI
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Smart Student Dashboard
          </p>
        </div>

        {/* Navigation */}
        <nav className="p-5 space-y-2">
          <NavLink to="/dashboard" className={linkStyle}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/subjects" className={linkStyle}>
            <BookOpen size={20} />
            Subjects
          </NavLink>

          <NavLink to="/tasks" className={linkStyle}>
            <CheckSquare size={20} />
            Tasks
          </NavLink>

          <NavLink to="/notes" className={linkStyle}>
            <StickyNote size={20} />
            Notes
          </NavLink>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 p-5">
        <div className="mb-4">
          <p className="text-xs text-gray-400">Logged in as</p>

          <h3 className="font-semibold text-white">
            {user?.name || "Student"}
          </h3>

          <p className="text-sm text-gray-400">
            {user?.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-xl"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;