"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: "pt", name: "PT", flag: "/pt-br.png" },
    { code: "en", name: "EN", flag: "/uk-us.png" },
    { code: "es", name: "ES", flag: "/esp.png" },
  ];

  return (
    <div className="fixed top-4 right-4 flex gap-2 z-50">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition ${
            i18n.language === lang.code
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          title={`Mudar para ${lang.name}`}
        >
          <Image
            src={lang.flag}
            alt={`${lang.name} flag`}
            width={20}
            height={15}
            className="rounded"
          />
          <span>{lang.name}</span>
        </button>
      ))}
    </div>
  );
}
