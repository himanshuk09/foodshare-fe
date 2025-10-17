import { Heart, Mail, Phone, Users } from "lucide-react";

export default function NGOList() {
	const ngos = [
		{
			name: "Helping Hands NGO",
			location: "Pune",
			contact: "helpinghands@ngo.com",
			phone: "9998887770",
		},
		{
			name: "Food Relief Org",
			location: "Mumbai",
			contact: "info@foodrelief.org",
			phone: "8887776665",
		},
		{
			name: "ShareMeal Foundation",
			location: "Delhi",
			contact: "contact@sharemeal.org",
			phone: "7776665554",
		},
	];

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold text-gray-800">
				Registered NGOs
			</h2>

			{ngos.length === 0 ? (
				<div className="text-center py-12 bg-white rounded-2xl shadow-lg">
					<Users className="mx-auto text-gray-400 mb-4" size={64} />
					<p className="text-gray-600 text-lg">
						No NGOs registered yet
					</p>
				</div>
			) : (
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{ngos.map((ngo: any) => (
						<div
							key={ngo.id}
							className="bg-white rounded-xl shadow-lg p-6 space-y-4"
						>
							<div className="flex items-center gap-4">
								<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
									{ngo.profileImage ? (
										<img
											src={ngo.profileImage}
											alt={ngo.name}
											className="w-full h-full object-cover rounded-full"
										/>
									) : (
										<Heart
											className="text-green-600"
											size={32}
										/>
									)}
								</div>
								<div>
									<h3 className="text-xl font-bold text-gray-800">
										{ngo.orgName || ngo.name}
									</h3>
									<p className="text-sm text-gray-600">
										{ngo.location || "Location not set"}
									</p>
								</div>
							</div>

							{ngo.about && (
								<p className="text-gray-600 text-sm">
									{ngo.about}
								</p>
							)}

							<div className="flex items-center gap-2 text-sm text-gray-600">
								<Mail size={16} />
								<span>{ngo.email}</span>
							</div>

							{ngo.phone && (
								<div className="flex items-center gap-2 text-sm text-gray-600">
									<Phone size={16} />
									<span>{ngo.phone}</span>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
