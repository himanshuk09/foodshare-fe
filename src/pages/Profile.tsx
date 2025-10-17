import { Camera, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
	const navigate = useNavigate();
	const { logout, user } = useAuth();
	const [editing, setEditing] = useState(false);
	const [profile, setProfile] = useState(user || {});
	const [previewImage, setPreviewImage] = useState<any>(null);

	const handleImageUpload = (e: any) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewImage(reader.result);
				setProfile({ ...profile, profileImage: reader.result });
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSave = () => {
		// setuser(profile);
		// const userIndex = mockData.users.findIndex(
		// 	(u: any) => u.id === profile.id
		// );
		// if (userIndex !== -1) {
		// 	mockData.users[userIndex] = profile;
		// }
		// setEditing(false);
		// alert("Profile updated successfully!");
	};

	if (!user) {
		return (
			<div className="text-center py-12">
				Please login to view profile
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-3xl font-bold text-gray-800">Profile</h2>
				<button
					onClick={() => (editing ? handleSave() : setEditing(true))}
					className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
				>
					{editing ? "Save Changes" : "Edit Profile"}
				</button>
			</div>

			<div className="space-y-6">
				<div className="flex items-center gap-6">
					<div className="relative">
						<div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
							{previewImage || profile.profileImage ? (
								<img
									src={previewImage || profile.profileImage}
									alt="Profile"
									className="w-full h-full object-cover"
								/>
							) : (
								<User size={64} className="text-gray-400" />
							)}
						</div>
						{editing && (
							<label className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full cursor-pointer hover:bg-green-700">
								<Camera size={20} className="text-white" />
								<input
									type="file"
									accept="image/*"
									onChange={handleImageUpload}
									className="hidden"
								/>
							</label>
						)}
					</div>
					<div>
						<h3 className="text-2xl font-bold">{profile.name}</h3>
						<p className="text-gray-600 capitalize">
							{profile.role}
						</p>
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Name
						</label>
						<input
							type="text"
							value={profile.name}
							onChange={(e) =>
								setProfile({ ...profile, name: e.target.value })
							}
							disabled={!editing}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Email
						</label>
						<input
							type="email"
							value={profile.email}
							onChange={(e) =>
								setProfile({
									...profile,
									email: e.target.value,
								})
							}
							disabled={!editing}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Phone
						</label>
						<input
							type="tel"
							value={profile.phone || ""}
							onChange={(e) =>
								setProfile({
									...profile,
									phone: e.target.value,
								})
							}
							disabled={!editing}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Location
						</label>
						<input
							type="text"
							value={profile.location || ""}
							onChange={(e) =>
								setProfile({
									...profile,
									location: e.target.value,
								})
							}
							disabled={!editing}
							placeholder="City, State"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Latitude
						</label>
						<input
							type="number"
							step="any"
							value={profile.latitude || ""}
							onChange={(e) =>
								setProfile({
									...profile,
									latitude: parseFloat(e.target.value),
								})
							}
							disabled={!editing}
							placeholder="21.1458"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Longitude
						</label>
						<input
							type="number"
							step="any"
							value={profile.longitude || ""}
							onChange={(e) =>
								setProfile({
									...profile,
									longitude: parseFloat(e.target.value),
								})
							}
							disabled={!editing}
							placeholder="79.0882"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
						/>
					</div>

					{profile.role === "ngo" && (
						<>
							<div className="md:col-span-2">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Organization Name
								</label>
								<input
									type="text"
									value={profile.orgName || ""}
									onChange={(e) =>
										setProfile({
											...profile,
											orgName: e.target.value,
										})
									}
									disabled={!editing}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
								/>
							</div>
							<div className="md:col-span-2">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									About Organization
								</label>
								<textarea
									value={profile.about || ""}
									onChange={(e) =>
										setProfile({
											...profile,
											about: e.target.value,
										})
									}
									disabled={!editing}
									rows={4}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
								/>
							</div>
						</>
					)}

					{profile.role === "volunteer" && (
						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Availability
							</label>
							<input
								type="text"
								value={profile.availability || ""}
								onChange={(e) =>
									setProfile({
										...profile,
										availability: e.target.value,
									})
								}
								disabled={!editing}
								placeholder="e.g., Weekends, Evenings"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
