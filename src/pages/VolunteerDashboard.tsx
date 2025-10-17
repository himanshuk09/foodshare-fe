import { useEffect, useState } from "react";

export default function VolunteerDashboard() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("posts") || "[]");
		setPosts(data.filter((p: any) => p.status === "Assigned"));
	}, []);

	const updateStatus = (index: any, status: any) => {
		const updated: any = [...posts];
		updated[index].status = status;

		const allPosts = JSON.parse(localStorage.getItem("posts") || "[]");
		const updatedAll = allPosts.map((p: any) =>
			p.title === updated[index].title ? updated[index] : p
		);

		localStorage.setItem("posts", JSON.stringify(updatedAll));
		setPosts(updated);
	};

	return (
		<div className="max-w-3xl mx-auto">
			<h2 className="text-2xl font-semibold mb-4 text-center">
				Volunteer Dashboard
			</h2>

			{posts.length === 0 ? (
				<p className="text-center text-gray-500">
					No assigned deliveries.
				</p>
			) : (
				posts.map((post: any, i: any) => (
					<div
						key={i}
						className="bg-white p-4 shadow-md mb-4 rounded-lg"
					>
						<h3 className="text-xl font-bold">{post?.title}</h3>
						<p className="text-gray-600">{post.description}</p>
						<p>
							<strong>NGO:</strong> {post.ngo}
						</p>
						<p>
							<strong>Status:</strong> {post.status}
						</p>
						<div className="flex gap-2 mt-2">
							<button
								onClick={() => updateStatus(i, "Picked Up")}
								className="btn bg-yellow-500 text-white"
							>
								Picked Up
							</button>
							<button
								onClick={() => updateStatus(i, "Delivered")}
								className="btn bg-green-600 text-white"
							>
								Delivered
							</button>
						</div>
					</div>
				))
			)}
		</div>
	);
}
