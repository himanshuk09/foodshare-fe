import { MapPin, Package, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const mockData = {
	users: [
		{ id: 1, name: "Alice Johnson", role: "Donor" },
		{
			id: 2,
			name: "Helping Hands NGO",
			role: "NGO",
			orgName: "Helping Hands",
		},
		{ id: 3, name: "Bob Smith", role: "Volunteer" },
		{ id: 4, name: "Charlie Brown", role: "Donor" },
		{
			id: 5,
			name: "Care & Share NGO",
			role: "NGO",
			orgName: "Care & Share",
		},
		{ id: 6, name: "Diana Prince", role: "Volunteer" },
	],

	posts: [
		{
			id: 101,
			donorId: 1,
			assignedNGO: 2,
			foodType: "Vegetable Curry",
			description:
				"Freshly cooked vegetable curry, enough for 10 people.",
			quantity: "3 kg",
			meals: 10,
			location: "123 Main St, Cityville",
			status: "pending",
			image: "https://images.unsplash.com/photo-1604908177526-6d52f8df8d3d?auto=format&fit=crop&w=800&q=80",
		},
		{
			id: 102,
			donorId: 4,
			assignedNGO: 5,
			foodType: "Rice & Lentils",
			description: "Cooked rice with lentils, vegetarian meals.",
			quantity: "5 kg",
			meals: 20,
			location: "456 Oak Ave, Townsville",
			status: "assigned",
			image: "https://images.unsplash.com/photo-1603074609086-3e7e1d4d17a1?auto=format&fit=crop&w=800&q=80",
		},
		{
			id: 103,
			donorId: 1,
			assignedNGO: 2,
			foodType: "Fruit Pack",
			description: "Assorted fruits, 10 packs.",
			quantity: "10 packs",
			meals: 10,
			location: "123 Main St, Cityville",
			status: "picked",
			image: "https://images.unsplash.com/photo-1587049352838-c4a4f3c8c1f7?auto=format&fit=crop&w=800&q=80",
		},
	],

	assignments: [
		{ postId: 101, volunteerId: 3 },
		{ postId: 102, volunteerId: 6 },
	],
};
export default function Feed() {
	const posts = mockData.posts;

	const navigate = useNavigate();
	const { logout, user } = useAuth();
	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold text-gray-800">
				Food Donation Feed
			</h2>

			{posts.length === 0 ? (
				<div className="text-center py-12 bg-white rounded-2xl shadow-lg">
					<Package className="mx-auto text-gray-400 mb-4" size={64} />
					<p className="text-gray-600 text-lg">
						No donations posted yet
					</p>
					{user?.role === "donor" && (
						<button
							onClick={() => navigate("add-post")}
							className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
						>
							Post Your First Donation
						</button>
					)}
				</div>
			) : (
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{posts.map((post: any) => {
						const donor = mockData.users.find(
							(u: any) => u.id === post.donorId
						);
						const ngo = mockData.users.find(
							(u: any) => u.id === post.assignedNGO
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
								className="bg-white rounded-xl shadow-lg overflow-hidden"
							>
								{post.image && (
									<img
										src={post.image}
										alt="Food"
										className="w-full h-48 object-cover"
									/>
								)}
								<div className="p-4 space-y-2">
									<h3 className="text-xl font-bold text-gray-800">
										{post.foodType}
									</h3>
									<p className="text-gray-600">
										{post.description}
									</p>

									<div className="flex items-center gap-2 text-sm text-gray-600">
										<Package size={16} />
										<span>Quantity: {post.quantity}</span>
									</div>

									<div className="flex items-center gap-2 text-sm text-gray-600">
										<Users size={16} />
										<span>Meals: {post.meals}</span>
									</div>

									<div className="flex items-center gap-2 text-sm text-gray-600">
										<MapPin size={16} />
										<span>{post.location}</span>
									</div>

									<div className="pt-2 border-t">
										<p className="text-sm text-gray-600">
											Donor:{" "}
											<span className="font-semibold">
												{donor?.name}
											</span>
										</p>
										{ngo && (
											<p className="text-sm text-gray-600">
												NGO:{" "}
												<span className="font-semibold">
													{ngo.orgName || ngo.name}
												</span>
											</p>
										)}
										{volunteer && (
											<p className="text-sm text-gray-600">
												Volunteer:{" "}
												<span className="font-semibold">
													{volunteer.name}
												</span>
											</p>
										)}
									</div>

									<div className="pt-2">
										<span
											className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
												post.status === "pending"
													? "bg-yellow-100 text-yellow-800"
													: post.status === "assigned"
													? "bg-blue-100 text-blue-800"
													: post.status === "picked"
													? "bg-purple-100 text-purple-800"
													: "bg-green-100 text-green-800"
											}`}
										>
											{post.status
												.charAt(0)
												.toUpperCase() +
												post.status.slice(1)}
										</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
