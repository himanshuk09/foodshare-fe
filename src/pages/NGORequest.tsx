import { MapPin, Package } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// export default function NGORequests() {
// 	const [selectedPost, setSelectedPost] = useState<any>(null);
// 	const [selectedVolunteer, setSelectedVolunteer] = useState("");
// 	const mockData: any = [];
// 	const navigate = useNavigate();
// 	const { logout, user } = useAuth();

// 	const assignedPosts = mockData.posts.filter(
// 		(p: any) => p.assignedNGO === user.id
// 	);
// 	const volunteers = mockData.users.filter(
// 		(u: any) => u.role === "volunteer"
// 	);

// 	const assignVolunteer = () => {
// 		if (!selectedPost || !selectedVolunteer) {
// 			alert("Please select both post and volunteer");
// 			return;
// 		}

// 		const assignment: any = {
// 			id: Date.now(),
// 			postId: selectedPost.id,
// 			volunteerId: parseInt(selectedVolunteer),
// 			status: "assigned",
// 			assignedAt: new Date().toISOString(),
// 		};

// 		mockData.assignments.push(assignment);

// 		const postIndex = mockData.posts.findIndex(
// 			(p: any) => p.id === selectedPost.id
// 		);
// 		if (postIndex !== -1) {
// 			mockData.posts[postIndex].status = "assigned";
// 		}

// 		alert("Volunteer assigned successfully! Email notification sent.");
// 		setSelectedPost(null);
// 		setSelectedVolunteer("");
// 	};
// 	// if (user?.role !== "ngo") {
// 	// 	return (
// 	// 		<div className="text-center py-12">
// 	// 			Only NGOs can access this dashboard
// 	// 		</div>
// 	// 	);
// 	// }
// 	return (
// 		<div className="space-y-6">
// 			<h2 className="text-3xl font-bold text-gray-800">NGO Dashboard</h2>

// 			{assignedPosts.length === 0 ? (
// 				<div className="text-center py-12 bg-white rounded-2xl shadow-lg">
// 					<Package className="mx-auto text-gray-400 mb-4" size={64} />
// 					<p className="text-gray-600 text-lg">
// 						No donations assigned yet
// 					</p>
// 				</div>
// 			) : (
// 				<div className="grid md:grid-cols-2 gap-6">
// 					{assignedPosts.map((post: any) => {
// 						const donor = mockData.users.find(
// 							(u: any) => u.id === post.donorId
// 						);
// 						const assignment = mockData.assignments.find(
// 							(a: any) => a.postId === post.id
// 						);
// 						const volunteer = assignment
// 							? mockData.users.find(
// 									(u: any) => u.id === assignment.volunteerId
// 							  )
// 							: null;

// 						return (
// 							<div
// 								key={post.id}
// 								className="bg-white rounded-xl shadow-lg p-6 space-y-4"
// 							>
// 								{post.image && (
// 									<img
// 										src={post.image}
// 										alt="Food"
// 										className="w-full h-48 object-cover rounded-lg"
// 									/>
// 								)}

// 								<h3 className="text-xl font-bold text-gray-800">
// 									{post.foodType}
// 								</h3>
// 								<p className="text-gray-600">
// 									{post.description}
// 								</p>

// 								<div className="space-y-2">
// 									<div className="flex items-center gap-2 text-sm text-gray-600">
// 										<Package size={16} />
// 										<span>
// 											Quantity: {post.quantity} | Meals:{" "}
// 											{post.meals}
// 										</span>
// 									</div>

// 									<div className="flex items-center gap-2 text-sm text-gray-600">
// 										<MapPin size={16} />
// 										<span>{post.location}</span>
// 									</div>

// 									<p className="text-sm text-gray-600">
// 										Donor:{" "}
// 										<span className="font-semibold">
// 											{donor?.name}
// 										</span>
// 									</p>
// 									<p className="text-sm text-gray-600">
// 										Email:{" "}
// 										<span className="font-semibold">
// 											{donor?.email}
// 										</span>
// 									</p>
// 								</div>

// 								{volunteer ? (
// 									<div className="bg-blue-50 p-4 rounded-lg">
// 										<p className="text-sm font-semibold text-blue-800">
// 											Assigned to: {volunteer.name}
// 										</p>
// 										<p className="text-sm text-blue-600">
// 											{volunteer.email}
// 										</p>
// 										<p className="text-sm text-blue-600">
// 											Status: {post.status}
// 										</p>
// 									</div>
// 								) : (
// 									<div className="space-y-3">
// 										<button
// 											onClick={() =>
// 												setSelectedPost(post)
// 											}
// 											className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
// 										>
// 											Assign Volunteer
// 										</button>
// 									</div>
// 								)}
// 							</div>
// 						);
// 					})}
// 				</div>
// 			)}

// 			{selectedPost && (
// 				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
// 					<div className="bg-white rounded-2xl p-8 max-w-md w-full">
// 						<h3 className="text-2xl font-bold text-gray-800 mb-4">
// 							Assign Volunteer
// 						</h3>
// 						<p className="text-gray-600 mb-4">
// 							Donation: {selectedPost.foodType}
// 						</p>

// 						<div className="space-y-4">
// 							<div>
// 								<label className="block text-sm font-medium text-gray-700 mb-2">
// 									Select Volunteer
// 								</label>
// 								<select
// 									value={selectedVolunteer}
// 									onChange={(e) =>
// 										setSelectedVolunteer(e.target.value)
// 									}
// 									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
// 								>
// 									<option value="">Choose a volunteer</option>
// 									{volunteers.map((vol: any) => (
// 										<option key={vol.id} value={vol.id}>
// 											{vol.name} -{" "}
// 											{vol.location || "Location not set"}
// 										</option>
// 									))}
// 								</select>
// 							</div>

// 							<div className="flex gap-3">
// 								<button
// 									onClick={assignVolunteer}
// 									className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
// 								>
// 									Assign
// 								</button>
// 								<button
// 									onClick={() => setSelectedPost(null)}
// 									className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
// 								>
// 									Cancel
// 								</button>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// }
const mockData: any = {
	users: [
		{
			id: 1,
			name: "John Doe",
			email: "john@example.com",
			role: "donor",
			location: "Pune",
		},
		{
			id: 2,
			name: "Helping Hands NGO",
			email: "help@ngo.com",
			role: "ngo",
			location: "Pune",
		},
		{
			id: 3,
			name: "Alice Smith",
			email: "alice@example.com",
			role: "volunteer",
			location: "Mumbai",
		},
		{
			id: 4,
			name: "Bob Johnson",
			email: "bob@example.com",
			role: "volunteer",
			location: "Delhi",
		},
	],

	posts: [
		{
			id: 101,
			foodType: "Cooked Meals",
			quantity: "20 Boxes",
			meals: 100,
			description: "Vegetarian meals packed fresh",
			location: "Pune, Maharashtra",
			donorId: 1,
			assignedNGO: 2,
			status: "pending",
			image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600",
		},
		{
			id: 102,
			foodType: "Fruits",
			quantity: "50 kg",
			meals: 150,
			description: "Fresh seasonal fruits",
			location: "Pune, Maharashtra",
			donorId: 1,
			assignedNGO: 1,
			status: "pending",
			image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600",
		},
		{
			id: 103,
			foodType: "Vegetables",
			quantity: "30 kg",
			meals: 120,
			description: "Mixed fresh vegetables",
			location: "Mumbai, Maharashtra",
			donorId: 1,
			assignedNGO: 2,
			status: "assigned",
			image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
		},
	],

	assignments: [
		{
			id: 1001,
			postId: 103,
			volunteerId: 3,
			status: "assigned",
			assignedAt: new Date().toISOString(),
		},
	],
};
export default function NGORequests() {
	const [selectedPost, setSelectedPost] = useState<any>(null);
	const [selectedVolunteer, setSelectedVolunteer] = useState("");
	const navigate = useNavigate();
	const { logout } = useAuth();
	const user = {
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		role: "donor",
		location: "Pune",
	};
	// Dummy mock data

	const assignedPosts = mockData.posts.filter(
		(p: any) => p.assignedNGO === user.id
	);
	const volunteers = mockData.users.filter(
		(u: any) => u.role === "volunteer"
	);

	const assignVolunteer = () => {
		if (!selectedPost || !selectedVolunteer) {
			alert("Please select both post and volunteer");
			return;
		}

		const assignment: any = {
			id: Date.now(),
			postId: selectedPost.id,
			volunteerId: parseInt(selectedVolunteer),
			status: "assigned",
			assignedAt: new Date().toISOString(),
		};

		mockData.assignments.push(assignment);

		const postIndex = mockData.posts.findIndex(
			(p: any) => p.id === selectedPost.id
		);
		if (postIndex !== -1) {
			mockData.posts[postIndex].status = "assigned";
		}

		alert("Volunteer assigned successfully! Email notification sent.");
		setSelectedPost(null);
		setSelectedVolunteer("");
	};

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold text-gray-800">NGO Dashboard</h2>

			{assignedPosts.length === 0 ? (
				<div className="text-center py-12 bg-white rounded-2xl shadow-lg">
					<Package className="mx-auto text-gray-400 mb-4" size={64} />
					<p className="text-gray-600 text-lg">
						No donations assigned yet
					</p>
				</div>
			) : (
				<div className="grid md:grid-cols-4 gap-6">
					{assignedPosts.map((post: any) => {
						const donor = mockData.users.find(
							(u: any) => u.id === post.donorId
						);
						const assignment = mockData.assignments.find(
							(a: any) => a.postId === post.id
						);
						const volunteer = assignment
							? mockData.users.find(
									(u: any) => u.id === assignment.volunteerId
							  )
							: null;

						return (
							<div
								key={post.id}
								className="bg-white rounded-xl shadow-lg p-6 space-y-4"
							>
								{post.image && (
									<img
										src={post.image}
										alt="Food"
										className="w-full h-48 object-cover rounded-lg"
									/>
								)}

								<h3 className="text-xl font-bold text-gray-800">
									{post.foodType}
								</h3>
								<p className="text-gray-600">
									{post.description}
								</p>

								<div className="space-y-2">
									<div className="flex items-center gap-2 text-sm text-gray-600">
										<Package size={16} />
										<span>
											Quantity: {post.quantity} | Meals:{" "}
											{post.meals}
										</span>
									</div>

									<div className="flex items-center gap-2 text-sm text-gray-600">
										<MapPin size={16} />
										<span>{post.location}</span>
									</div>

									<p className="text-sm text-gray-600">
										Donor:{" "}
										<span className="font-semibold">
											{donor?.name}
										</span>
									</p>
									<p className="text-sm text-gray-600">
										Email:{" "}
										<span className="font-semibold">
											{donor?.email}
										</span>
									</p>
								</div>

								{volunteer ? (
									<div className="bg-blue-50 p-4 rounded-lg">
										<p className="text-sm font-semibold text-blue-800">
											Assigned to: {volunteer.name}
										</p>
										<p className="text-sm text-blue-600">
											{volunteer.email}
										</p>
										<p className="text-sm text-blue-600">
											Status: {post.status}
										</p>
									</div>
								) : (
									<div className="space-y-3">
										<button
											onClick={() =>
												setSelectedPost(post)
											}
											className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
										>
											Assign Volunteer
										</button>
									</div>
								)}
							</div>
						);
					})}
				</div>
			)}

			{selectedPost && (
				<div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4">
					<div className="bg-white rounded-2xl p-6 max-w-sm w-full">
						<h3 className="text-xl font-bold text-gray-800 mb-3">
							Assign Volunteer
						</h3>
						<p className="text-gray-600 mb-3">
							Donation: {selectedPost.foodType}
						</p>

						<div className="space-y-3">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Select Volunteer
								</label>
								<select
									value={selectedVolunteer}
									onChange={(e) =>
										setSelectedVolunteer(e.target.value)
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
								>
									<option value="">Choose a volunteer</option>
									{volunteers.map((vol: any) => (
										<option key={vol.id} value={vol.id}>
											{vol.name} -{" "}
											{vol.location || "Location not set"}
										</option>
									))}
								</select>
							</div>

							<div className="flex gap-2">
								<button
									onClick={assignVolunteer}
									className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm"
								>
									Assign
								</button>
								<button
									onClick={() => setSelectedPost(null)}
									className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 text-sm"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
