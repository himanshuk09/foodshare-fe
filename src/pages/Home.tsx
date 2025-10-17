import { Heart, Truck, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const navigate = useNavigate();

	return (
		<div className="space-y-12">
			<div className="text-center py-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl text-white">
				<h1 className="text-5xl font-bold mb-4">
					Share Food, Share Hope
				</h1>
				<p className="text-xl mb-8">
					Connect donors with NGOs to eliminate food waste and feed
					the hungry
				</p>
				<button
					onClick={() => navigate("register")}
					className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
				>
					Get Started
				</button>
			</div>

			<div className="grid md:grid-cols-3 gap-8">
				<div className="bg-white p-6 rounded-xl shadow-lg">
					<Users className="text-green-600 mb-4" size={48} />
					<h3 className="text-2xl font-bold mb-2">For Donors</h3>
					<p className="text-gray-600">
						Share your extra food with those in need. Every meal
						counts in fighting hunger.
					</p>
				</div>
				<div className="bg-white p-6 rounded-xl shadow-lg">
					<Heart className="text-blue-600 mb-4" size={48} />
					<h3 className="text-2xl font-bold mb-2">For NGOs</h3>
					<p className="text-gray-600">
						Receive food donations and coordinate with volunteers
						for efficient distribution.
					</p>
				</div>
				<div className="bg-white p-6 rounded-xl shadow-lg">
					<Truck className="text-purple-600 mb-4" size={48} />
					<h3 className="text-2xl font-bold mb-2">For Volunteers</h3>
					<p className="text-gray-600">
						Be the bridge between donors and NGOs. Help deliver hope
						to communities.
					</p>
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-8">
				<img
					src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500"
					alt="Food donation"
					className="rounded-xl shadow-lg"
				/>
				<div className="flex flex-col justify-center">
					<h2 className="text-3xl font-bold mb-4">Our Mission</h2>
					<p className="text-gray-700 mb-4">
						FoodShare connects individuals and businesses with
						surplus food to NGOs and communities in need. We believe
						that no food should go to waste when there are people
						who need it.
					</p>
					<p className="text-gray-700">
						Our platform makes it easy to donate, coordinate pickups
						through volunteers, and track the impact of your
						contributions. Together, we can build a world without
						hunger.
					</p>
				</div>
			</div>
		</div>
	);
}
