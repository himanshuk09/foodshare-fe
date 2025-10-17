// import { useState } from "react";
// import "./App.css";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

// function App() {
// 	const [count, setCount] = useState(0);

// 	return (
// 		<>
// 			<div>
// 				<a href="https://vite.dev" target="_blank">
// 					<img src={viteLogo} className="logo" alt="Vite logo" />
// 				</a>
// 				<a href="https://react.dev" target="_blank">
// 					<img
// 						src={reactLogo}
// 						className="logo react"
// 						alt="React logo"
// 					/>
// 				</a>
// 			</div>
// 			<h1>Vite + React</h1>
// 			<div className="card">
// 				<button onClick={() => setCount((count) => count + 1)}>
// 					count is {count}
// 				</button>
// 				<p>
// 					Edit <code>src/App.tsx</code> and save to test HMR
// 				</p>
// 			</div>
// 			<p className="read-the-docs">
// 				Click on the Vite and React logos to learn more
// 			</p>
// 			<h1 className="text-3xl font-bold underline text-green-600">
// 				Hello world!
// 			</h1>
// 		</>
// 	);
// }

// export default App;
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import AddPost from "./pages/AddPost";
import Feed from "./pages/Feed";
import Home from "./pages/Home";
import Login from "./pages/Login";
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
