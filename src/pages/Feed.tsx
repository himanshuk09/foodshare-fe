import { useEffect, useState } from "react";

export default function Feed() {
	const [posts, setPosts] = useState<any>([]);

	useEffect(() => {
		setPosts(JSON.parse(localStorage.getItem("posts") || "[]"));
	}, []);

	return (
		<div className="max-w-4xl mx-auto">
			<h2 className="text-2xl font-semibold mb-4 text-center">
				Donation Feed
			</h2>
			{posts.length === 0 ? (
				<p className="text-center text-gray-500">No donations yet.</p>
			) : (
				posts.map((post: any, i: any) => (
					<div
						key={i}
						className="bg-white p-4 shadow-md mb-4 rounded-lg"
					>
						{post.image && (
							<img
								src={post.image}
								className="rounded-lg mb-2 max-h-60 object-cover w-full"
							/>
						)}
						<h3 className="text-xl font-semibold">{post.title}</h3>
						<p className="text-gray-600">{post.description}</p>
						<p className="text-sm mt-1">
							<strong>Donor:</strong> {post.donor} (
							{post.donorEmail})
						</p>
						<p className="text-sm">
							<strong>NGO:</strong> {post.ngo || "Not assigned"}
						</p>
						<p className="text-sm">
							<strong>Status:</strong>{" "}
							<span
								className={`${
									post.status === "Delivered"
										? "text-green-600"
										: "text-yellow-600"
								}`}
							>
								{post.status}
							</span>
						</p>
					</div>
				))
			)}
		</div>
	);
}
