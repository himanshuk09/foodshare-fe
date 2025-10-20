import { HeartHandshake } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const isActive = (path: string) =>
    pathname === path ? "text-green-600 font-semibold" : "text-gray-700";
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <HeartHandshake className="text-green-600" size={32} />
          <span className="text-2xl font-bold text-green-600">FoodShare</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
             className={`${isActive("/")} hover:text-green-600`}
          >
            Home
          </button>
          {/* {user ? (
            <>
              <button
                onClick={() => navigate("feed")}
                 className={`${isActive("/feed")} hover:text-green-600`}
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
          )} */}
           {user ? (
              <>
                <button
                  onClick={() => navigate("/feed")}
                  className={`${isActive("/feed")} hover:text-green-600`}
                >
                  Feed
                </button>

                <button
                  onClick={() => navigate("/ngo-list")}
                  className={`${isActive("/ngo-list")} hover:text-green-600`}
                >
                  NGOs
                </button>

                {user?.user?.role === "donor" && (
                  <button
                    onClick={() => navigate("/add-post")}
                    className={`${isActive("/add-post")} hover:text-green-600`}
                  >
                    Donate
                  </button>
                )}

                {user?.user?.role === "ngo" && (
                  <button
                    onClick={() => navigate("/ngo-requests")}
                    className={`${isActive("/ngo-requests")} hover:text-green-600`}
                  >
                    Dashboard
                  </button>
                )}

                {user?.user?.role === "volunteer" && (
                  <button
                    onClick={() => navigate("/volunteer-task")}
                    className={`${isActive("/volunteer-task")} hover:text-green-600`}
                  >
                    My Tasks
                  </button>
                )}

                <button
                  onClick={() => navigate("/profile")}
                  className={`${isActive("/profile")} hover:text-green-600`}
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
                  onClick={() => navigate("/login")}
                  className={`${isActive("/login")} hover:text-green-600`}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 ${
                    pathname === "/register" ? "ring-2 ring-green-500" : ""
                  }`}
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
