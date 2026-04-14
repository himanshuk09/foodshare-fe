import { HeartHandshake, ChevronDown, Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { useTranslation } from "react-i18next";
import { useState } from "react";
export default function Navbar() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { logout, user } = useAuth();
	const { i18n, t } = useTranslation();

	const [menuOpen, setMenuOpen] = useState(false);
	const [langOpen, setLangOpen] = useState(false);

	const isActive = (path: string) =>
		pathname === path ? "text-green-600 font-semibold" : "text-gray-700";

	const changeLanguage = (lang: string) => {
		i18n.changeLanguage(lang);
		setLangOpen(false);
	};

	const handleNavigate = (path: string) => {
		navigate(path);
		setMenuOpen(false); //  close menu on click
	};

	return (
		<nav className="bg-white shadow-md">
			<div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
				{/* Logo */}
				<div className="flex items-center gap-2">
					<HeartHandshake className="text-green-600" size={28} />
					<span className="text-xl font-bold text-green-600">
						ShareABite
					</span>
				</div>

				{/* Desktop Menu */}
				<div className="hidden md:flex gap-4 items-center">
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
								<>
									{" "}
									<button
										onClick={() => navigate("/add-post")}
										className={`${isActive("/add-post")} hover:text-green-600`}
									>
										{t("Donate")}
									</button>
									<button
										onClick={() =>
											handleNavigate("/donation-history")
										}
										className={`${isActive("/donation-history")} hover:text-green-600 `}
									>
										{t("History")}
									</button>
								</>
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
								className="bg-green-600 text-white px-4 py-2 rounded-lg"
							>
								{t("Register")}
							</button>
						</>
					)}

					{/* Language */}
					<div className="relative">
						<button
							onClick={() => setLangOpen(!langOpen)}
							className="flex items-center gap-2 px-3 py-1 border rounded-md"
						>
							{i18n.language.toUpperCase()}
							<ChevronDown size={16} />
						</button>

						{langOpen && (
							<div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-md z-50">
								<button
									onClick={() => changeLanguage("en")}
									className="block w-full px-3 py-2 hover:bg-gray-100"
								>
									English
								</button>
								<button
									onClick={() => changeLanguage("hi")}
									className="block w-full px-3 py-2 hover:bg-gray-100"
								>
									हिन्दी
								</button>
								<button
									onClick={() => changeLanguage("mr")}
									className="block w-full px-3 py-2 hover:bg-gray-100"
								>
									मराठी
								</button>
							</div>
						)}
					</div>
				</div>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden"
					onClick={() => setMenuOpen(!menuOpen)}
				>
					{menuOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</div>

			{/* Mobile Menu */}
			{menuOpen && (
				<div className="md:hidden px-4 pb-6 pt-4 space-y-3 border-t bg-white">
					{/* Menu Items */}
					<div className="flex flex-col gap-3">
						<button
							onClick={() => handleNavigate("/")}
							className="text-left px-4 py-3 rounded-xl hover:bg-gray-100"
						>
							{t("home")}
						</button>

						{user ? (
							<>
								<button
									onClick={() => handleNavigate("/feed")}
									className="text-left px-4 py-3 rounded-xl hover:bg-gray-100"
								>
									{t("feed")}
								</button>

								<button
									onClick={() => handleNavigate("/ngo-list")}
									className="text-left px-4 py-3 rounded-xl hover:bg-gray-100"
								>
									{t("NGOs")}
								</button>

								{user?.user?.role === "donor" && (
									<>
										<button
											onClick={() =>
												handleNavigate("/add-post")
											}
											className="text-left px-4 py-3 rounded-xl hover:bg-gray-100"
										>
											{t("Donate")}
										</button>
										<button
											onClick={() =>
												handleNavigate(
													"/donation-history",
												)
											}
											className="text-left px-4 py-3 rounded-xl hover:bg-gray-100"
										>
											{t("History")}
										</button>
									</>
								)}

								{user?.user?.role === "ngo" && (
									<button
										onClick={() =>
											handleNavigate("/ngo-requests")
										}
										className="text-left px-4 py-3 rounded-xl hover:bg-gray-100"
									>
										{t("Dashboard")}
									</button>
								)}

								{user?.user?.role === "volunteer" && (
									<button
										onClick={() =>
											handleNavigate("/volunteer-task")
										}
										className="text-left px-4 py-3 rounded-xl hover:bg-gray-100"
									>
										{t("My Tasks")}
									</button>
								)}

								<button
									onClick={() => handleNavigate("/profile")}
									className="text-left px-4 py-3 rounded-xl hover:bg-gray-100"
								>
									{t("Profile")}
								</button>

								<button
									onClick={() => {
										logout();
										navigate("/login");
									}}
									className="text-left px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
								>
									{t("Logout")}
								</button>
							</>
						) : (
							<>
								<button
									onClick={() => handleNavigate("/login")}
									className="text-left px-4 py-3 rounded-xl hover:bg-gray-100"
								>
									{t("Login")}
								</button>

								<button
									onClick={() => handleNavigate("/register")}
									className="text-left px-4 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700"
								>
									{t("Register")}
								</button>
							</>
						)}
					</div>

					{/* Language Section */}
					<div className="pt-4 mt-4 border-t">
						<p className="text-sm text-gray-500 mb-2 px-2">
							Language
						</p>
						<div className="flex gap-3 px-2">
							<button
								className="px-3 py-2 rounded-lg bg-gray-100"
								onClick={() => changeLanguage("en")}
							>
								EN
							</button>
							<button
								className="px-3 py-2 rounded-lg bg-gray-100"
								onClick={() => changeLanguage("hi")}
							>
								हिं
							</button>
							<button
								className="px-3 py-2 rounded-lg bg-gray-100"
								onClick={() => changeLanguage("mr")}
							>
								मर
							</button>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}
// export default function Navbar() {
// 	const { pathname } = useLocation();
// 	const navigate = useNavigate();
// 	const { logout, user } = useAuth();

// 	const { i18n, t } = useTranslation();
// 	const isActive = (path: string) =>
// 		pathname === path ? "text-green-600 font-semibold" : "text-gray-700";
// 	const [langOpen, setLangOpen] = useState(false);
// 	const changeLanguage = (lang: string) => {
// 		i18n.changeLanguage(lang);
// 		setLangOpen(false);
// 	};
// 	return (
// 		<nav className="bg-white shadow-md">
// 			<div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
// 				<div className="flex items-center gap-2">
// 					<HeartHandshake className="text-green-600" size={32} />
// 					<span className="text-2xl font-bold text-green-600">
// 						ShareABite
// 					</span>
// 				</div>
// 				<div className="flex gap-4">
// 					<button
// 						onClick={() => navigate("/")}
// 						className={`${isActive("/")} hover:text-green-600`}
// 					>
// 						{t("home")}
// 					</button>
// 					{user ? (
// 						<>
// 							<button
// 								onClick={() => navigate("/feed")}
// 								className={`${isActive("/feed")} hover:text-green-600`}
// 							>
// 								{t("feed")}
// 							</button>

// 							<button
// 								onClick={() => navigate("/ngo-list")}
// 								className={`${isActive("/ngo-list")} hover:text-green-600`}
// 							>
// 								{t("NGOs")}
// 							</button>

// 							{user?.user?.role === "donor" && (
// 								<button
// 									onClick={() => navigate("/add-post")}
// 									className={`${isActive("/add-post")} hover:text-green-600`}
// 								>
// 									{t("Donate")}
// 								</button>
// 							)}

// 							{user?.user?.role === "ngo" && (
// 								<button
// 									onClick={() => navigate("/ngo-requests")}
// 									className={`${isActive("/ngo-requests")} hover:text-green-600`}
// 								>
// 									{t("Dashboard")}
// 								</button>
// 							)}

// 							{user?.user?.role === "volunteer" && (
// 								<button
// 									onClick={() => navigate("/volunteer-task")}
// 									className={`${isActive("/volunteer-task")} hover:text-green-600`}
// 								>
// 									{t("My Tasks")}
// 								</button>
// 							)}

// 							<button
// 								onClick={() => navigate("/profile")}
// 								className={`${isActive("/profile")} hover:text-green-600`}
// 							>
// 								{t("Profile")}
// 							</button>

// 							<button
// 								onClick={() => {
// 									logout();
// 									navigate("/login");
// 								}}
// 								className="text-red-600 hover:text-red-700"
// 							>
// 								{t("Logout")}
// 							</button>
// 						</>
// 					) : (
// 						<>
// 							<button
// 								onClick={() => navigate("/login")}
// 								className={`${isActive("/login")} hover:text-green-600`}
// 							>
// 								{t("Login")}
// 							</button>
// 							<button
// 								onClick={() => navigate("/register")}
// 								className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 ${
// 									pathname === "/register"
// 										? "ring-2 ring-green-500"
// 										: ""
// 								}`}
// 							>
// 								{t("Register")}
// 							</button>
// 						</>
// 					)}

// 					{/* 🌍 Language Dropdown */}
// 					<div className="relative">
// 						<button
// 							onClick={() => setLangOpen(!langOpen)}
// 							className="flex items-center gap-2 px-3 py-1 border rounded-md hover:bg-gray-100"
// 						>
// 							<Flag
// 								country={i18n.language === "en" ? "US" : "IN"}
// 							/>
// 							{i18n.language === "en"
// 								? "English"
// 								: i18n.language === "hi"
// 									? "हिन्दी"
// 									: "मराठी"}
// 							<ChevronDown size={16} />
// 						</button>

// 						{langOpen && (
// 							<div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-md z-50">
// 								<button
// 									onClick={() => changeLanguage("en")}
// 									className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100"
// 								>
// 									<Flag country="US" />
// 									English
// 								</button>

// 								<button
// 									onClick={() => changeLanguage("hi")}
// 									className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100"
// 								>
// 									<Flag country="IN" />
// 									हिन्दी
// 								</button>

// 								<button
// 									onClick={() => changeLanguage("mr")}
// 									className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100"
// 								>
// 									<Flag country="IN" />
// 									मराठी
// 								</button>
// 							</div>
// 						)}
// 					</div>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// }
