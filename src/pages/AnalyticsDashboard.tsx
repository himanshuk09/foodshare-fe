/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Chart from "react-apexcharts";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { getAllPost } from "../services/post.service";
import { getAllUsers } from "../services/user.service";
import { HandHeart, Building2, Users, UserCheck, X } from "lucide-react";
import * as htmlToImage from "html-to-image";

export default function AnalyticsDashboard() {
	const { user } = useAuth();
	const { t, i18n } = useTranslation();

	const [posts, setPosts] = useState<any[]>([]);
	const [users, setUsers] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedYear, setSelectedYear] = useState<number>(
		new Date().getFullYear(),
	);
	//--------------
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [drawerType, setDrawerType] = useState<
		"donations" | "ngos" | "donors" | "volunteers" | null
	>(null);
	const openDrawer = (type: typeof drawerType) => {
		setDrawerType(type);
		setDrawerOpen(true);
	};
	const getDrawerData = () => {
		switch (drawerType) {
			case "donations":
				return filteredPosts;

			case "ngos":
				return users.filter((u) => u.role === "ngo");

			case "donors":
				return users.filter((u) => u.role === "donor");

			case "volunteers":
				return users.filter((u) => u.role === "volunteer");

			default:
				return [];
		}
	};
	//--------------
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
			// const month = new Date(item.createdAt).toLocaleString("default", {
			// 	month: "short",
			// });
			const month = new Date(item.createdAt).toLocaleString("en-US", {
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
	const translatedMonths = months.map((m) => t(m));
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

	const downloadFile = (dataUrl: string, fileName: string) => {
		const link = document.createElement("a");
		link.download = fileName;
		link.href = dataUrl;
		link.click();
	};

	const injectCustomMenu = (chartCtx: any) => {
		const chartEl = chartCtx.el;
		if (!chartEl) return;

		const menu = chartEl.querySelector(".apexcharts-menu");
		if (!menu) return;
		const csvItem = chartEl.querySelector(
			".apexcharts-menu-item.exportCSV",
		);
		if (csvItem) csvItem.textContent = t("Download CSV");
		if (menu.querySelector(".custom-item")) return;

		// Divider
		const divider = document.createElement("div");
		divider.style.borderTop = "1px solid #eee";
		divider.style.margin = "4px 0";
		menu.appendChild(divider);

		const createItem = (label: string, type: string) => {
			const el = document.createElement("div");
			el.className = "apexcharts-menu-item custom-item";
			el.innerText = label;

			el.onclick = async () => {
				try {
					menu.classList.remove("apexcharts-menu-open");

					await new Promise((resolve) => setTimeout(resolve, 300));

					let dataUrl = "";

					if (type === "png") {
						dataUrl = await htmlToImage.toPng(chartEl, {
							pixelRatio: 2,
							style: {
								background:
									"linear-gradient(to top right, #16a34a, #2563eb)",
								borderRadius: "1rem",
							},
						});
					}

					if (type === "jpeg") {
						dataUrl = await htmlToImage.toJpeg(chartEl, {
							pixelRatio: 2,
							style: {
								background:
									"linear-gradient(to top right, #16a34a, #2563eb)",
								borderRadius: "1rem",
							},
						});
					}
					if (type === "svg") {
						dataUrl = await htmlToImage.toSvg(chartEl, {
							style: {
								background:
									"linear-gradient(to top right, #16a34a, #2563eb)",
								borderRadius: "1rem",
							},
						});
					}

					if (type === "blob") {
						const blob = await htmlToImage.toBlob(chartEl);
						dataUrl = URL.createObjectURL(blob!);
					}

					downloadFile(
						dataUrl,
						`donation-analytics-${selectedYear}-${type}.${type}`,
					);
				} catch (err) {
					console.error(err);
				}
			};

			return el;
		};

		menu.appendChild(createItem(t("Download JPEG"), "jpeg"));
		menu.appendChild(createItem(t("Download PNG"), "png"));
		menu.appendChild(createItem(t("Download SVG"), "svg"));
		menu.appendChild(createItem(t("Download Blob"), "blob"));
	};

	const formatNumber = (val: number) => {
		const lang = i18n.language;

		if (lang === "hi" || lang === "mr") {
			return new Intl.NumberFormat(`${lang}-u-nu-deva`).format(val);
		}

		return new Intl.NumberFormat(lang).format(val);
	};
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
					<HandHeart
						onClick={() => openDrawer("donations")}
						className="cursor-pointer w-10 h-10 text-green-600 opacity-80"
					/>
				</div>

				{/* NGOs */}
				<div className="p-6 bg-blue-100 rounded-2xl shadow flex justify-between items-center">
					<div>
						<h3>{t("NGOs")}</h3>
						<p className="text-3xl font-bold">{ngoCount}</p>
					</div>
					<Building2
						onClick={() => openDrawer("ngos")}
						className="cursor-pointer w-10 h-10 text-blue-600 opacity-80"
					/>
				</div>

				{/* Donors */}
				<div className="p-6 bg-yellow-100 rounded-2xl shadow flex justify-between items-center">
					<div>
						<h3>{t("Donors")}</h3>
						<p className="text-3xl font-bold">{donorCount}</p>
					</div>
					<Users
						onClick={() => openDrawer("donors")}
						className="cursor-pointer w-10 h-10 text-yellow-600 opacity-80"
					/>
				</div>

				{/* Volunteers */}
				<div className="p-6 bg-purple-100 rounded-2xl shadow flex justify-between items-center">
					<div>
						<h3>{t("Volunteers")}</h3>
						<p className="text-3xl font-bold">{volunteerCount}</p>
					</div>
					<UserCheck
						onClick={() => openDrawer("volunteers")}
						className="cursor-pointer w-10 h-10 text-purple-600 opacity-80"
					/>
				</div>
			</div>

			{/*  Monthly Chart */}

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
							zoom: {
								enabled: true,
							},
							events: {
								mounted: (chartCtx: any) => {
									injectCustomMenu(chartCtx);
								},
								updated: (chartCtx: any) => {
									injectCustomMenu(chartCtx);
								},
							},
							toolbar: {
								show: true,
								tools: {
									download: true, //  enable download
									selection: true,
									zoom: true,
									zoomin: true,
									zoomout: true,
									pan: true,
									reset: true,
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
							title: {
								text: t("Months"),
							},
							categories: translatedMonths,
							labels: {
								style: { colors: "#ffffff" }, // white text
							},
						},

						yaxis: {
							labels: {
								style: { colors: "#ffffff" },
								formatter: formatNumber,
							},
							title: {
								text: t("No. of Donations"),
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
							y: {
								formatter: (val: number) =>
									`${formatNumber(val)} ${t("Donations")}`,
							},
						},
					}}
					series={[
						{
							name: t("Donations"),
							data: monthlyValues,
						},
					]}
				/>
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
							events: {
								mounted: (chartCtx: any) => {
									const chartEl = chartCtx.el;
									if (!chartEl) return;
									const csvItem = chartEl.querySelector(
										".apexcharts-menu-item.exportCSV",
									);
									if (csvItem)
										csvItem.textContent = t("Download CSV");
								},
								updated: (chartCtx: any) => {
									const chartEl = chartCtx.el;
									if (!chartEl) return;
									const csvItem = chartEl.querySelector(
										".apexcharts-menu-item.exportCSV",
									);
									if (csvItem)
										csvItem.textContent = t("Download CSV");
								},
							},
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
							formatter: (_: number, opts: any) => {
								const value =
									opts.w.config.series[opts.seriesIndex];
								return formatNumber(value);
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
										value: {
											show: true,
											formatter: (val: number) =>
												formatNumber(val),
										},
										total: {
											show: true,
											label: t("Total"),
											color: "#ffffff",
											fontSize: "16px",
											formatter: () =>
												formatNumber(
													ngoValues.reduce(
														(a, b) => a + b,
														0,
													),
												),
										},
									},
								},
							},
						},

						tooltip: {
							theme: "dark",
							y: {
								formatter: (val: number) => formatNumber(val),
							},
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
			{drawerOpen && (
				<div className="fixed inset-0 z-50 flex">
					{/* Overlay */}
					<div
						className="flex-1 bg-black/40 backdrop-blur-sm"
						onClick={() => setDrawerOpen(false)}
					/>

					{/* Drawer */}
					<div className="w-[400px] h-full bg-white shadow-2xl flex flex-col animate-slideInRight">
						{/*  Header */}
						<div className="bg-gradient-to-r from-green-600 to-blue-600 p-5 text-white">
							<div className="flex justify-between items-center">
								<h2 className="text-xl font-semibold capitalize">
									{t(
										drawerType
											? drawerType
													.charAt(0)
													.toUpperCase() +
													drawerType.slice(1)
											: "",
									)}
								</h2>
								<button
									onClick={() => setDrawerOpen(false)}
									className="text-white text-lg cursor-pointer"
								>
									<X size={24} />
								</button>
							</div>

							<p className="text-sm opacity-80 mt-1">
								{getDrawerData().length} {t("items")}
							</p>
						</div>

						{/*  List */}
						<div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
							{getDrawerData().map((item: any) => {
								const name =
									item.name ||
									item.organizationName ||
									item.foodType ||
									"Unknown";

								const avatar =
									item.avatar ||
									item.image ||
									`https://ui-avatars.com/api/?name=${encodeURIComponent(
										name,
									)}&background=16a34a&color=fff`;

								return (
									<div
										key={item?._id}
										className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
									>
										{/* Avatar */}
										<img
											src={avatar}
											alt="avatar"
											className="w-12 h-12 rounded-full object-cover border"
										/>

										{/* Info */}
										<div className="flex-1">
											<p className="font-semibold text-gray-800">
												{name}
											</p>

											{drawerType === "donations" && (
												<p className="text-sm text-gray-500">
													{new Date(
														item.createdAt,
													).toLocaleDateString()}
												</p>
											)}

											{item.email && (
												<p className="text-xs text-gray-400">
													{item.email}
												</p>
											)}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
