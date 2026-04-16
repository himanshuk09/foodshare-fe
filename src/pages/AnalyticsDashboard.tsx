/* eslint-disable @typescript-eslint/no-explicit-any */
import Chart from "react-apexcharts";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { getAllPost } from "../services/post.service";
import { getAllUsers } from "../services/user.service";
import { HandHeart, Building2, Users, UserCheck } from "lucide-react";

export default function AnalyticsDashboard() {
	const { user } = useAuth();
	const { t } = useTranslation();

	const [posts, setPosts] = useState<any[]>([]);
	const [users, setUsers] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedYear, setSelectedYear] = useState<number>(
		new Date().getFullYear(),
	);

	//  Fetch Data
	const fetchData = async () => {
		try {
			setLoading(true);

			const [postRes, userRes] = await Promise.all([
				getAllPost(),
				getAllUsers(),
			]);

			const postData = postRes.posts || postRes;
			const userData = userRes.users || userRes;

			setPosts(postData);
			setUsers(userData);

			// Set latest year
			const yearsData = postData.map((p: any) =>
				new Date(p.createdAt).getFullYear(),
			);

			if (yearsData.length > 0) {
				setSelectedYear(Math.max(...yearsData));
			}
		} catch (err) {
			console.error("Error fetching analytics:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [user]);

	//  Helper for Mongo ID
	const getId = (id: any) => id?.$oid || id;

	//  Role Counts
	const ngoCount = users.filter((u) => u.role === "ngo").length;
	const donorCount = users.filter((u) => u.role === "donor").length;
	const volunteerCount = users.filter((u) => u.role === "volunteer").length;

	//  NGO Map
	const ngoMap: Record<string, string> = {};
	users.forEach((u) => {
		if (u.role === "ngo") {
			ngoMap[getId(u._id)] = u.organizationName || u.name;
		}
	});

	//  Years
	const years = useMemo(() => {
		return [
			...new Set(posts.map((p) => new Date(p.createdAt).getFullYear())),
		].sort((a: any, b: any) => b - a);
	}, [posts]);

	//  Filter Posts
	const filteredPosts = useMemo(() => {
		return posts.filter(
			(p) => new Date(p.createdAt).getFullYear() === selectedYear,
		);
	}, [posts, selectedYear]);

	//  Group by Month
	const groupByMonth = (data: any[]) => {
		const result: Record<string, number> = {};

		data.forEach((item) => {
			const month = new Date(item.createdAt).toLocaleString("default", {
				month: "short",
			});

			result[month] = (result[month] || 0) + 1;
		});

		return result;
	};

	const months = [
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

	const monthlyGrouped = groupByMonth(filteredPosts);
	const monthlyValues: number[] = months.map((m) => monthlyGrouped[m] || 0);

	//  NGO-wise grouping (FIXED)
	const groupByNgo = (data: any[]) => {
		const result: Record<string, number> = {};

		data.forEach((item) => {
			const ngoId = getId(item.assignedNGOId);
			const ngoName = ngoMap[ngoId?._id] || "";

			result[ngoName] = (result[ngoName] || 0) + 1;
		});

		return result;
	};
	const ngoGrouped = groupByNgo(filteredPosts);
	console.log(ngoGrouped, filteredPosts);
	const ngoLabels = Object.keys(ngoGrouped);
	const ngoValues: number[] = Object.values(ngoGrouped);

	//  Loading
	if (loading) {
		return (
			<div className="flex justify-center items-center py-20">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
			</div>
		);
	}

	return (
		<div className="space-y-8 p-6">
			{/*  Header */}
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">
					{t("Analytics Dashboard")}
				</h1>

				<select
					value={selectedYear}
					onChange={(e) => setSelectedYear(Number(e.target.value))}
					className="border px-4 py-2 rounded-lg"
				>
					{years.map((y) => (
						<option key={y}>{y}</option>
					))}
				</select>
			</div>

			{/*  Stats */}
			<div className="grid md:grid-cols-4 gap-6">
				{/* Total Donations */}
				<div className="p-6 bg-green-100 rounded-2xl shadow flex justify-between items-center">
					<div>
						<h3>{t("Total Donations")}</h3>
						<p className="text-3xl font-bold">
							{filteredPosts.length}
						</p>
					</div>
					<HandHeart className="w-10 h-10 text-green-600 opacity-80" />
				</div>

				{/* NGOs */}
				<div className="p-6 bg-blue-100 rounded-2xl shadow flex justify-between items-center">
					<div>
						<h3>{t("NGOs")}</h3>
						<p className="text-3xl font-bold">{ngoCount}</p>
					</div>
					<Building2 className="w-10 h-10 text-blue-600 opacity-80" />
				</div>

				{/* Donors */}
				<div className="p-6 bg-yellow-100 rounded-2xl shadow flex justify-between items-center">
					<div>
						<h3>{t("Donors")}</h3>
						<p className="text-3xl font-bold">{donorCount}</p>
					</div>
					<Users className="w-10 h-10 text-yellow-600 opacity-80" />
				</div>

				{/* Volunteers */}
				<div className="p-6 bg-purple-100 rounded-2xl shadow flex justify-between items-center">
					<div>
						<h3>{t("Volunteers")}</h3>
						<p className="text-3xl font-bold">{volunteerCount}</p>
					</div>
					<UserCheck className="w-10 h-10 text-purple-600 opacity-80" />
				</div>
			</div>

			{/*  Monthly Chart */}
			<div>
				<div className="bg-white p-6 rounded-2xl  bg-gradient-to-tr from-green-600 to-blue-600 text-white shadow-xl">
					<h2 className="text-xl font-bold mb-4">
						{t("Monthly Donations")}
					</h2>

					<Chart
						type="bar"
						height={350}
						options={{
							chart: {
								type: "bar",
								background: "transparent",
								toolbar: {
									show: true,
									tools: {
										download: true, //  enable download
										selection: false,
										zoom: false,
										zoomin: false,
										zoomout: false,
										pan: false,
										reset: false,
									},
									export: {
										csv: {
											filename: "analytics-data",
										},
										svg: {
											filename: "analytics-chart",
										},
										png: {
											filename: "analytics-chart",
										},
									},
								},
							},

							xaxis: {
								categories: months,
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

							//  CLEAN SINGLE COLOR (BEST)
							colors: ["#ffffff"],

							tooltip: {
								theme: "dark",
							},
						}}
						series={[
							{
								name: "Donations",
								data: monthlyValues,
							},
						]}
					/>
				</div>
			</div>

			{/*  NGO Pie Chart */}
			<div className="p-6 rounded-3xl bg-gradient-to-tr from-green-600 to-blue-600 text-white  backdrop-blur-md shadow-xl">
				<h2 className="text-xl font-bold mb-6">
					{t("NGO-wise Distribution")}
				</h2>

				<Chart
					type="donut"
					height={320}
					series={ngoValues}
					options={{
						labels: ngoLabels,

						chart: {
							background: "transparent",
							toolbar: {
								show: true,
								tools: {
									download: true, //  enable download
									selection: false,
									zoom: false,
									zoomin: false,
									zoomout: false,
									pan: false,
									reset: false,
								},
								export: {
									csv: {
										filename: "ngo-data",
									},
									svg: {
										filename: "ngo-chart",
									},
									png: {
										filename: "ngo-chart",
									},
								},
							},
						},

						legend: {
							position: "right",
							labels: {
								colors: "#ffffff",
							},
							markers: {
								shape: "sparkle",
								size: 8,
								offsetX: -5,
							},
						},

						dataLabels: {
							style: {
								colors: ["#ffffff"],
							},
						},

						stroke: {
							colors: ["transparent"], // dark border
						},

						plotOptions: {
							pie: {
								donut: {
									size: "60%",
									labels: {
										show: true,
										total: {
											show: true,
											label: "Total",
											color: "#ffffff",
											fontSize: "16px",
											formatter: () =>
												ngoValues
													.reduce((a, b) => a + b, 0)
													.toString(),
										},
									},
								},
							},
						},

						tooltip: {
							theme: "dark",
						},

						//  Gradient-like color palette
						colors: [
							"#f97316", // orange (strong contrast)
							"#eab308", // yellow (bright & visible)
							"#ec4899", // pink (vibrant)
							"#8b5cf6", // purple (still works but adjusted)
							"#f43f5e", // rose red (better than plain red)
							"#22d3ee", // cyan (lighter than bg blue)
						],

						fill: {
							type: "gradient",
							gradient: {
								shade: "dark",
								type: "diagonal1",
								shadeIntensity: 0.4,
								gradientToColors: [
									"#fb923c",
									"#fde047",
									"#f472b6",
									"#a78bfa",
									"#fb7185",
									"#67e8f9",
								],
								opacityFrom: 1,
								opacityTo: 1,
								stops: [0, 100],
							},
						},
					}}
				/>
			</div>
		</div>
	);
}
