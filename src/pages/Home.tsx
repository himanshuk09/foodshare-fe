/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heart, Truck, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getAllPost } from "../services/post.service";
import { useAuth } from "../context/AuthContext";
import Chart from "react-apexcharts";

export default function Home() {
	const [posts, setPosts] = useState<any>([]);
	const [loading, setLoading] = useState(true);
	const [selectedYear, setSelectedYear] = useState<number | null>(null);
	const navigate = useNavigate();
	const { user } = useAuth();
	const { t } = useTranslation();

	const fetchPost = async () => {
		try {
			setLoading(true);
			const res = await getAllPost();
			const data = res.posts || res;
			setPosts(data);

			//  set default year (latest)
			const yearsData = data
				.filter(
					(p: any) =>
						p.createdAt && !isNaN(new Date(p.createdAt).getTime()),
				)
				.map((p: any) => new Date(p.createdAt).getFullYear());

			if (yearsData.length > 0) {
				setSelectedYear(Math.max(...yearsData));
			}
		} catch (error) {
			console.error("Unable to get posts", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPost();
	}, [user]);
	//  Get unique years
	const years = Array.from(
		new Set(
			posts
				.filter(
					(p: any) =>
						p.createdAt &&
						!Number.isNaN(new Date(p.createdAt).getTime()),
				) //  filter invalid
				.map((p: any) => new Date(p.createdAt).getFullYear()),
		),
	).sort((a: any, b: any) => b - a);

	//  Filter by selected year
	const filteredPosts = posts.filter((p: any) =>
		selectedYear
			? new Date(p.createdAt).getFullYear() === selectedYear
			: true,
	);

	//  Group by month
	const groupByMonth = (data: any[]) => {
		const result: any = {};

		data.forEach((item) => {
			if (!item.createdAt) return;

			const date = new Date(item.createdAt);
			const month = date.toLocaleString("default", { month: "short" });

			result[month] = (result[month] || 0) + 1;
		});

		return result;
	};

	const prepareChartData = (data: any[]) => {
		const grouped = groupByMonth(data);

		const monthsOrder = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];

		const categories: string[] = [];
		const values: number[] = [];

		monthsOrder.forEach((month) => {
			categories.push(month);
			values.push(grouped[month] || 0);
		});

		return { categories, values };
	};

	const { categories, values } = prepareChartData(filteredPosts);

	const chart = (
		<div className="p-6 rounded-3xl bg-gradient-to-tr from-green-600 to-blue-600 text-white shadow-xl">
			{/* Header */}
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold">
					{t("Monthly Donation Analytics")}
				</h2>

				<select
					value={selectedYear || ""}
					onChange={(e) => setSelectedYear(Number(e.target.value))}
					className="bg-white text-black px-3 py-2 rounded-xl"
				>
					{years.map((year: any) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>
			</div>

			<Chart
				options={{
					chart: {
						type: "bar",
						toolbar: { show: false },
						background: "transparent",
					},

					xaxis: {
						categories,
						labels: {
							style: { colors: "#ffffff" }, // white text
						},
					},

					yaxis: {
						labels: {
							style: { colors: "#ffffff" },
						},
					},

					grid: {
						borderColor: "rgba(255,255,255,0.2)",
					},

					plotOptions: {
						bar: {
							borderRadius: 8,
							columnWidth: "40%",
						},
					},

					dataLabels: {
						enabled: false,
					},

					// 🔥 CLEAN SINGLE COLOR (BEST)
					colors: ["#ffffff"],

					tooltip: {
						theme: "dark",
					},
				}}
				series={[
					{
						name: "Donations",
						data: values,
					},
				]}
				type="bar"
				height={350}
			/>
		</div>
	);
	return (
		<div className="space-y-12">
			<div className="text-center py-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl text-white">
				<h1 className="text-5xl font-bold mb-4">
					{t("Share Food, Share Hope")}
				</h1>
				<p className="text-xl mb-8">
					{t(
						"Connect donors with NGOs to eliminate food waste and feed the hungry",
					)}
				</p>
				<button
					onClick={() => navigate("register")}
					className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
					disabled={!!user}
				>
					{t("Get Started")}
				</button>
			</div>

			<div className="grid md:grid-cols-3 gap-8">
				<div className="bg-white p-6 rounded-xl shadow-lg">
					<Users className="text-green-600 mb-4" size={48} />
					<h3 className="text-2xl font-bold mb-2">
						{t("For Donors")}
					</h3>
					<p className="text-gray-600">
						{t(
							"Share your extra food with those in need. Every meal counts in fighting hunger.",
						)}
					</p>
				</div>
				<div className="bg-white p-6 rounded-xl shadow-lg">
					<Heart className="text-blue-600 mb-4" size={48} />
					<h3 className="text-2xl font-bold mb-2">{t("For NGOs")}</h3>
					<p className="text-gray-600">
						{t(
							"Receive food donations and coordinate with volunteers for efficient distribution.",
						)}
					</p>
				</div>
				<div className="bg-white p-6 rounded-xl shadow-lg">
					<Truck className="text-purple-600 mb-4" size={48} />
					<h3 className="text-2xl font-bold mb-2">
						{t("For Volunteers")}
					</h3>
					<p className="text-gray-600">
						{t(
							"Be the bridge between donors and NGOs. Help deliver hope to communities.",
						)}
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
					<h2 className="text-3xl font-bold mb-4">
						{t("Our Mission")}
					</h2>
					<p className="text-gray-700 mb-4">
						{t(
							"FoodShare connects individuals and businesses with surplus food to NGOs and communities in need. We believe that no food should go to waste when there are people who need it.",
						)}
					</p>
					<p className="text-gray-700">
						{t(
							"Our platform makes it easy to donate, coordinate pickups through volunteers, and track the impact of your contributions. Together, we can build a world without hunger.",
						)}
					</p>
				</div>
			</div>
			{/* LOADER / CHART */}
			{loading ? (
				<div className="flex justify-center items-center py-20">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
				</div>
			) : user && filteredPosts.length > 0 ? (
				chart
			) : null}
		</div>
	);
}
