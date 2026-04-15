import React from "react";
import { useTranslation } from "react-i18next";
import { useLoading } from "../context/LoadingContext";

const Loader: React.FC = () => {
	const { t } = useTranslation();
	const { loading } = useLoading();

	if (!loading) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-white/85 bg-opacity-40 z-50">
			<div className="loader border-t-4 border-black rounded-full w-12 h-12 animate-spin"></div>
			<p className="text-black text-lg ml-3">{t("Loading...")}</p>
		</div>
	);
};

export default Loader;
