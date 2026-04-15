import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import AddPost from "./pages/DonateForm";
import Feed from "./pages/PostFeed";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NGOList from "./pages/NGOList";
import NGORequests from "./pages/NGORequest";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Loader from "./components/Loader";
import { LoadingProvider } from "./context/LoadingContext";
import VolunteerDashboard from "./pages/VolunteerTask";
import MainLayout from "./pages/MainLayout";
import { ToastContainer } from "react-toastify";
import DonationHistory from "./pages/DonationHistory";
import PublicRoute from "./components/PublicRoute";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";

export default function App() {
	return (
		<AuthProvider>
			<LoadingProvider>
				<Loader />
				<Router>
					<Routes>
						{/* Layout routes */}
						<Route element={<MainLayout />}>
							<Route path="/" element={<Home />} />
							<Route
								path="/register"
								element={
									<PublicRoute>
										<Register />
									</PublicRoute>
								}
							/>
							<Route
								path="/login"
								element={
									<PublicRoute>
										<Login />
									</PublicRoute>
								}
							/>

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
								path="/donation-history"
								element={
									<ProtectedRoute>
										<DonationHistory />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/analytics"
								element={
									<ProtectedRoute>
										<AnalyticsDashboard />
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
								path="/volunteer-task"
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
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</Router>
				<ToastContainer
					position="top-right"
					closeButton={true}
					autoClose={3000}
					newestOnTop
					pauseOnHover
				/>
			</LoadingProvider>
		</AuthProvider>
	);
}
