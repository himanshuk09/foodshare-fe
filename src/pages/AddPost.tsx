import { Upload } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AddPost() {
	const [postData, setPostData] = useState({
		foodType: "",
		quantity: "",
		meals: "",
		description: "",
		location: "",
		latitude: "",
		longitude: "",
		assignedNGO: "",
		image: null,
	});
	const [previewImage, setPreviewImage] = useState(null);
	const navigate = useNavigate();
	const { logout, user } = useAuth();
	let ngos: any = [];

	const handleImageUpload = (e: any) => {
		const file = e.target.files[0];
		if (file) {
			const reader: any = new FileReader();
			reader.onloadend = () => {
				setPreviewImage(reader.result);
				setPostData({ ...postData, image: reader.result });
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = (e: any) => {
		// e.preventDefault();
		// const newPost = {
		// 	id: Date.now(),
		// 	...postData,
		// 	donorId: user.id,
		// 	donorName: user.name,
		// 	status: "pending",
		// 	createdAt: new Date().toISOString(),
		// };
		// mockData.posts.push(newPost);
		// alert(
		// 	"Food donation posted successfully! NGO will be notified via email."
		// );
		// navigate("feed");
	};

	if (user?.role !== "donor") {
		return (
			<div className="text-center py-12">
				Only donors can create posts
			</div>
		);
	}

	return (
		<div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
			<h2 className="text-3xl font-bold text-gray-800 mb-6">
				Donate Food
			</h2>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Upload Food Image
					</label>
					<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
						{previewImage ? (
							<img
								src={previewImage}
								alt="Preview"
								className="max-h-64 mx-auto rounded-lg"
							/>
						) : (
							<div className="space-y-2">
								<Upload
									className="mx-auto text-gray-400"
									size={48}
								/>
								<p className="text-gray-600">
									Click to upload food image
								</p>
							</div>
						)}
						<input
							type="file"
							accept="image/*"
							onChange={handleImageUpload}
							className="hidden"
							id="food-image"
							required
						/>
						<label
							htmlFor="food-image"
							className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-green-700"
						>
							Choose Image
						</label>
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Food Type
						</label>
						<input
							type="text"
							value={postData.foodType}
							onChange={(e) =>
								setPostData({
									...postData,
									foodType: e.target.value,
								})
							}
							placeholder="e.g., Cooked meals, Fruits, Vegetables"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Quantity
						</label>
						<input
							type="text"
							value={postData.quantity}
							onChange={(e) =>
								setPostData({
									...postData,
									quantity: e.target.value,
								})
							}
							placeholder="e.g., 10 kg, 5 boxes"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Number of Meals
						</label>
						<input
							type="number"
							value={postData.meals}
							onChange={(e) =>
								setPostData({
									...postData,
									meals: e.target.value,
								})
							}
							placeholder="Approximate number"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Assign to NGO
						</label>
						<select
							value={postData.assignedNGO}
							onChange={(e) =>
								setPostData({
									...postData,
									assignedNGO: e.target.value,
								})
							}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
							required
						>
							<option value="">Select NGO</option>
							{ngos.map((ngo: any) => (
								<option key={ngo.id} value={ngo.id}>
									{ngo.orgName || ngo.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Pickup Location
						</label>
						<input
							type="text"
							value={postData.location}
							onChange={(e) =>
								setPostData({
									...postData,
									location: e.target.value,
								})
							}
							placeholder="Full address"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Latitude
						</label>
						<input
							type="number"
							step="any"
							value={postData.latitude}
							onChange={(e) =>
								setPostData({
									...postData,
									latitude: e.target.value,
								})
							}
							placeholder="21.1458"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Longitude
						</label>
						<input
							type="number"
							step="any"
							value={postData.longitude}
							onChange={(e) =>
								setPostData({
									...postData,
									longitude: e.target.value,
								})
							}
							placeholder="79.0882"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
							required
						/>
					</div>

					<div className="md:col-span-2">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Description
						</label>
						<textarea
							value={postData.description}
							onChange={(e) =>
								setPostData({
									...postData,
									description: e.target.value,
								})
							}
							placeholder="Additional details about the food..."
							rows={4}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
							required
						/>
					</div>
				</div>

				<button
					type="submit"
					className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold"
				>
					Post Donation
				</button>
			</form>
		</div>
	);
}
