import { HeartHandshake } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* <Heart className="text-green-600" size={32} /> */}
          <HeartHandshake className="text-green-600" size={32} />
          <span className="text-2xl font-bold text-green-600">FoodShare</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-gray-700 hover:text-green-600"
          >
            Home
          </button>
          {user ? (
            <>
              <button
                onClick={() => navigate("feed")}
                className="text-gray-700 hover:text-green-600"
              >
                Feed
              </button>
              <button
                onClick={() => navigate("ngo-list")}
                className="text-gray-700 hover:text-green-600"
              >
                NGOs
              </button>
              {user.user.role === "donor" && (
                <button
                  onClick={() => navigate("add-post")}
                  className="text-gray-700 hover:text-green-600"
                >
                  Donate
                </button>
              )}
              {user.user.role === "ngo" && (
                <button
                  onClick={() => navigate("/ngo-requests")}
                  className="text-gray-700 hover:text-green-600"
                >
                  Dashboard
                </button>
              )}
              {user.user.role === "volunteer" && (
                <button
                  onClick={() => navigate("volunteer-dashboard")}
                  className="text-gray-700 hover:text-green-600"
                >
                  My Tasks
                </button>
              )}
              <button
                onClick={() => navigate("profile")}
                className="text-gray-700 hover:text-green-600"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("login")}
                className="text-gray-700 hover:text-green-600"
              >
                Login
              </button>
              <button
                onClick={() => navigate("register")}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
