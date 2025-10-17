import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
	const stored = localStorage.getItem("user");
	const user = stored ? JSON.parse(stored) : null;
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("user");
		navigate("/login");
	};

	return (
		<nav className="bg-white shadow-md p-4 flex justify-between items-center">
			<Link to="/" className="font-bold text-lg text-green-600">
				FoodShare
			</Link>
			<div className="space-x-4">
				{!user ? (
					<>
						<Link to="/login">Login</Link>
						<Link to="/register">Register</Link>
					</>
				) : (
					<>
						<Link to="/feed">Feed</Link>
						{user.role === "Donor" && (
							<Link to="/add-post">Add Post</Link>
						)}
						{user.role === "NGO" && (
							<Link to="/ngo-requests">Requests</Link>
						)}
						{user.role === "Volunteer" && (
							<Link to="/volunteer-dashboard">Volunteer</Link>
						)}
						<Link to="/profile">Profile</Link>
						<button onClick={handleLogout} className="text-red-600">
							Logout
						</button>
					</>
				)}
			</div>
		</nav>
	);
}
