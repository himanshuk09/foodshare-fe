import { AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
			<div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md w-full">
				<AlertCircle
					className="mx-auto text-amber-600 mb-6"
					size={64}
				/>
				<h1 className="text-4xl font-bold text-gray-800 mb-4">
					{t("404")}
				</h1>
				<p className="text-gray-600 mb-6">
					{t("Oops! The page you are looking for does not exist.")}
				</p>
				<button
					onClick={() => navigate("/")}
					className="bg-amber-600 text-white py-2 px-6 rounded-lg hover:bg-amber-700 font-semibold"
				>
					{t("Go to Home")}
				</button>
			</div>
		</div>
	);
}
