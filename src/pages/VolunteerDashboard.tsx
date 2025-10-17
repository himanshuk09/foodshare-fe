import { CheckCircle, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockData } from "../contant";
import { useAuth } from "../context/AuthContext";

export default function VolunteerDashboard() {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const user = {
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		role: "donor",
		location: "Pune",
	};
	// if (user?.role !== "volunteer") {
	// 	return (
	// 		<div className="text-center py-12">
	// 			Only volunteers can access this page
	// 		</div>
	// 	);
	// }

	const myAssignments = mockData.assignments.filter(
		(a: any) => a.volunteerId === user.id
	);

	const updateStatus = (assignmentId: any, newStatus: any) => {
		const assignmentIndex = mockData.assignments.findIndex(
			(a: any) => a.id === assignmentId
		);
		if (assignmentIndex !== -1) {
			mockData.assignments[assignmentIndex].status = newStatus;

			const assignment = mockData.assignments[assignmentIndex];
			const postIndex = mockData.posts.findIndex(
				(p: any) => p.id === assignment.postId
			);
			if (postIndex !== -1) {
				mockData.posts[postIndex].status = newStatus;
			}

			alert(`Status updated to: ${newStatus}. Email notification sent.`);
		}
	};

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold text-gray-800">My Tasks</h2>

			{myAssignments.length === 0 ? (
				<div className="text-center py-12 bg-white rounded-2xl shadow-lg">
					<Truck className="mx-auto text-gray-400 mb-4" size={64} />
					<p className="text-gray-600 text-lg">
						No tasks assigned yet
					</p>
				</div>
			) : (
				<div className="space-y-4">
					{myAssignments.map((assignment: any) => {
						const post = mockData.posts.find(
							(p: any) => p.id === assignment.postId
						);
						const donor = post
							? mockData.users.find(
									(u: any) => u.id === post.donorId
							  )
							: null;
						const ngo = post
							? mockData.users.find(
									(u: any) => u.id === post.assignedNGO
							  )
							: null;

						if (!post) return null;

						return (
							<div
								key={assignment.id}
								className="bg-white rounded-xl shadow-lg p-6"
							>
								<div className="flex justify-between items-start mb-4">
									<div>
										<h3 className="text-xl font-bold text-gray-800">
											{post.foodType}
										</h3>
										<p className="text-gray-600">
											{post.description}
										</p>
									</div>
									<span
										className={`px-3 py-1 rounded-full text-sm font-semibold ${
											post.status === "assigned"
												? "bg-blue-100 text-blue-800"
												: post.status === "picked"
												? "bg-purple-100 text-purple-800"
												: "bg-green-100 text-green-800"
										}`}
									>
										{post.status.charAt(0).toUpperCase() +
											post.status.slice(1)}
									</span>
								</div>

								<div className="grid md:grid-cols-2 gap-4 mb-4">
									<div className="space-y-2">
										<h4 className="font-semibold text-gray-700">
											Pickup Details
										</h4>
										<p className="text-sm text-gray-600">
											Donor: {donor?.name}
										</p>
										<p className="text-sm text-gray-600">
											Phone: {donor?.phone || "N/A"}
										</p>
										<p className="text-sm text-gray-600">
											Location: {post.location}
										</p>
										<p className="text-sm text-gray-600">
											Quantity: {post.quantity}
										</p>
									</div>

									<div className="space-y-2">
										<h4 className="font-semibold text-gray-700">
											Delivery Details
										</h4>
										<p className="text-sm text-gray-600">
											NGO: {ngo?.orgName || ngo?.name}
										</p>
										<p className="text-sm text-gray-600">
											Phone: {ngo?.phone || "N/A"}
										</p>
										<p className="text-sm text-gray-600">
											Location: {ngo?.location || "N/A"}
										</p>
									</div>
								</div>

								<div className="flex gap-3">
									{post.status === "assigned" && (
										<button
											onClick={() =>
												updateStatus(
													assignment.id,
													"picked"
												)
											}
											className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
										>
											<Truck size={20} />
											Mark as Picked Up
										</button>
									)}
									{post.status === "picked" && (
										<button
											onClick={() =>
												updateStatus(
													assignment.id,
													"delivered"
												)
											}
											className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
										>
											<CheckCircle size={20} />
											Mark as Delivered
										</button>
									)}
									{post.status === "delivered" && (
										<div className="flex-1 bg-green-100 text-green-800 py-2 rounded-lg flex items-center justify-center gap-2 font-semibold">
											<CheckCircle size={20} />
											Completed
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
