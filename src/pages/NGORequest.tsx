import { useEffect, useState } from "react";

export default function NGORequests() {
	const [posts, setPosts] = useState<any>([]);
	const [volunteer, setVolunteer] = useState("");
	const user = JSON.parse(localStorage.getItem("user") ?? "");

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("posts") || "[]");
		const filtered = data.filter(
			(p: any) => p.ngo === user.name || p.ngo === user?.ngo
		);
		setPosts(filtered);
	}, []);

	const handleAssignVolunteer = (index: any) => {
		if (!volunteer) return alert("Please enter volunteer name or email");
		const updated = [...posts];
		updated[index].status = "Assigned";
		updated[index].volunteer = volunteer;

		// Update localStorage
		const allPosts = JSON.parse(localStorage.getItem("posts") || "[]").map(
			(p: any) => (p.title === updated[index].title ? updated[index] : p)
		);
		localStorage.setItem("posts", JSON.stringify(allPosts));
		setPosts(updated);
		setVolunteer("");
		alert("Volunteer assigned successfully!");
	};

	return (
		<div className="max-w-4xl mx-auto">
			<h2 className="text-2xl font-semibold mb-4 text-center">
				NGO Food Requests
			</h2>

			{posts.length === 0 ? (
				<p className="text-center text-gray-500">
					No food donations available for your NGO.
				</p>
			) : (
				posts.map((post: any, i: any) => (
					<div
						key={i}
						className="bg-white p-4 shadow-md mb-4 rounded-lg border border-gray-200"
					>
						{post.image && (
							<img
								src={post.image}
								className="rounded-lg mb-2 max-h-60 object-cover w-full"
								alt="food"
							/>
						)}
						<h3 className="text-xl font-bold">{post.title}</h3>
						<p className="text-gray-600">{post.description}</p>
						<p>
							<strong>Donor:</strong> {post.donor} (
							{post.donorEmail})
						</p>
						<p>
							<strong>Quantity:</strong> {post.quantity}
						</p>
						<p>
							<strong>Status:</strong>{" "}
							<span
								className={`${
									post.status === "Delivered"
										? "text-green-600"
										: post.status === "Assigned"
										? "text-blue-600"
										: "text-yellow-600"
								}`}
							>
								{post.status}
							</span>
						</p>

						{post.status === "Pending" && (
							<div className="mt-3 flex flex-col sm:flex-row gap-2">
								<input
									placeholder="Enter volunteer name or email"
									value={volunteer}
									onChange={(e) =>
										setVolunteer(e.target.value)
									}
									className="input flex-1"
								/>
								<button
									onClick={() => handleAssignVolunteer(i)}
									className="btn bg-green-600 text-white"
								>
									Assign
								</button>
							</div>
						)}

						{post.status === "Assigned" && (
							<p className="mt-2 text-sm text-gray-600">
								Assigned to: <strong>{post.volunteer}</strong>
							</p>
						)}
					</div>
				))
			)}
		</div>
	);
}
