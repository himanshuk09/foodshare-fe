import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import AddPost from "./pages/AddPost";
import Feed from "./pages/Feed";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import NGOList from "./pages/NGOList";
import NGORequests from "./pages/NGORequest";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import VolunteerDashboard from "./pages/VolunteerDashboard";

export default function App() {
	return (
		<AuthProvider>
			<Router>
				<Navbar />
				<div className="min-h-screen bg-gray-50 p-4">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route
							path="/feed"
							element={
								<ProtectedRoute>
									<Feed />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/add-post"
							element={
								<ProtectedRoute>
									<AddPost />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/ngo-list"
							element={
								<ProtectedRoute>
									<NGOList />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/ngo-requests"
							element={
								<ProtectedRoute>
									<NGORequests />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/volunteer-dashboard"
							element={
								<ProtectedRoute>
									<VolunteerDashboard />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/profile"
							element={
								<ProtectedRoute>
									<Profile />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</div>
			</Router>
		</AuthProvider>
	);
}
