import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ptJSON from "./locales/pt.json";
import enJSON from "./locales/en.json";
import esJSON from "./locales/es.json";

// Detectar idioma do navegador
const getSystemLanguage = (): string => {
  if (typeof window === "undefined") return "pt";

  const browserLanguage = navigator.language.split("-")[0];

  // Mapear variantes regionais para idiomas principais
  const languageMap: Record<string, string> = {
    pt: "pt", // Portugal, Brasil
    en: "en", // US, UK, etc
    es: "es", // Espanha, América Latina
  };

  return languageMap[browserLanguage] || "pt";
};

const resources = {
  pt: { translation: ptJSON },
  en: { translation: enJSON },
  es: { translation: esJSON },
};

i18next.use(initReactI18next).init({
  resources,
  lng: getSystemLanguage(),
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
