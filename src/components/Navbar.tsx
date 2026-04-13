import { HeartHandshake, ChevronDown } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Flag from "react-flagkit";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Navbar() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { logout, user } = useAuth();

	const { i18n, t } = useTranslation();
	const isActive = (path: string) =>
		pathname === path ? "text-green-600 font-semibold" : "text-gray-700";
	const [langOpen, setLangOpen] = useState(false);
	const changeLanguage = (lang: string) => {
		i18n.changeLanguage(lang);
		setLangOpen(false);
	};
	return (
		<nav className="bg-white shadow-md">
			<div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
				<div className="flex items-center gap-2">
					<HeartHandshake className="text-green-600" size={32} />
					<span className="text-2xl font-bold text-green-600">
						ShareABite
					</span>
				</div>
				<div className="flex gap-4">
					<button
						onClick={() => navigate("/")}
						className={`${isActive("/")} hover:text-green-600`}
					>
						{t("home")}
					</button>
					{user ? (
						<>
							<button
								onClick={() => navigate("/feed")}
								className={`${isActive("/feed")} hover:text-green-600`}
							>
								{t("feed")}
							</button>

							<button
								onClick={() => navigate("/ngo-list")}
								className={`${isActive("/ngo-list")} hover:text-green-600`}
							>
								{t("NGOs")}
							</button>

							{user?.user?.role === "donor" && (
								<button
									onClick={() => navigate("/add-post")}
									className={`${isActive("/add-post")} hover:text-green-600`}
								>
									{t("Donate")}
								</button>
							)}

							{user?.user?.role === "ngo" && (
								<button
									onClick={() => navigate("/ngo-requests")}
									className={`${isActive("/ngo-requests")} hover:text-green-600`}
								>
									{t("Dashboard")}
								</button>
							)}

							{user?.user?.role === "volunteer" && (
								<button
									onClick={() => navigate("/volunteer-task")}
									className={`${isActive("/volunteer-task")} hover:text-green-600`}
								>
									{t("My Tasks")}
								</button>
							)}

							<button
								onClick={() => navigate("/profile")}
								className={`${isActive("/profile")} hover:text-green-600`}
							>
								{t("Profile")}
							</button>

							<button
								onClick={() => {
									logout();
									navigate("/login");
								}}
								className="text-red-600 hover:text-red-700"
							>
								{t("Logout")}
							</button>
						</>
					) : (
						<>
							<button
								onClick={() => navigate("/login")}
								className={`${isActive("/login")} hover:text-green-600`}
							>
								{t("Login")}
							</button>
							<button
								onClick={() => navigate("/register")}
								className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 ${
									pathname === "/register"
										? "ring-2 ring-green-500"
										: ""
								}`}
							>
								{t("Register")}
							</button>
						</>
					)}

					{/* 🌍 Language Dropdown */}
					<div className="relative">
						<button
							onClick={() => setLangOpen(!langOpen)}
							className="flex items-center gap-2 px-3 py-1 border rounded-md hover:bg-gray-100"
						>
							<Flag
								country={i18n.language === "en" ? "US" : "IN"}
							/>
							{i18n.language === "en"
								? "English"
								: i18n.language === "hi"
									? "हिन्दी"
									: "मराठी"}
							<ChevronDown size={16} />
						</button>

						{langOpen && (
							<div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-md z-50">
								<button
									onClick={() => changeLanguage("en")}
									className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100"
								>
									<Flag country="US" />
									English
								</button>

								<button
									onClick={() => changeLanguage("hi")}
									className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100"
								>
									<Flag country="IN" />
									हिन्दी
								</button>

								<button
									onClick={() => changeLanguage("mr")}
									className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100"
								>
									<Flag country="IN" />
									मराठी
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
