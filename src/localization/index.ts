import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import resources from "./resources";

/**
 * List of languages your app officially supports.
 * Using `as const` makes this a readonly tuple for better TypeScript safety.
 *
 * Example:
 * - "en" → English
 * - "de" → German
 */
const SUPPORTED_LANGS = ["en", "hi", "mr"] as const;

/**
 * Initialize i18next with:
 * 1. Language detector (auto detects browser language)
 * 2. React integration (so hooks like `useTranslation()` work)
 */
i18n.use(detector)
	.use(initReactI18next)
	.init({
		/**
		 * Translation resources object.
		 * This contains all language JSON files in one structure.
		 *
		 * Example:
		 * {
		 *   en: { translation: {...} },
		 *   de: { translation: {...} }
		 * }
		 */
		resources,

		/**
		 * Default fallback language.
		 * If detection fails OR translation key is missing,
		 * i18next will use English.
		 */
		fallbackLng: "en",

		/**
		 * Interpolation config.
		 * escapeValue = false is recommended for React because
		 * React already protects against XSS automatically.
		 */
		interpolation: {
			escapeValue: false,
		},

		/**
		 * Restrict languages to only those supported.
		 * Prevents i18next from loading unexpected languages.
		 */
		supportedLngs: SUPPORTED_LANGS,

		/**
		 * Allows matching of non-explicit locales.
		 *
		 * Example:
		 * - "en-US" → will match "en"
		 * - "de-AT" → will match "de"
		 */
		nonExplicitSupportedLngs: true,

		/**
		 * If you want to force a fixed language always, enable this:
		 *
		 * lng: "en",
		 *
		 * But if you want automatic detection, leave it commented out.
		 */
	});

/**
 * Export configured i18n instance
 * so it can be imported across the app.
 */
export { i18n };
