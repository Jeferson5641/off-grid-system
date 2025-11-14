// Configuração de internacionalização (i18n)

export type Language = "pt-BR" | "en-US";

export const languages: Record<Language, { name: string; flag: string }> = {
  "pt-BR": { name: "Português", flag: "🇧🇷" },
  "en-US": { name: "English", flag: "🇺🇸" },
};

export const translations = {
  "pt-BR": {
    menu: {
      readmeTitle: "Documentação",
      readmeLabel: "Ver README em",
      language: "Idioma",
    },
    solar: {
      title: "☀️ Calculadora Off-Grid Solar",
      section1: "1. Localização e Consumo",
      section2: "2. Componentes e Configurações",
      section3: "3. Configuração da Bateria",
      latitude: "Latitude",
      longitude: "Longitude",
      monthlyConsumption: "Consumo médio/mês (kWh)",
      dailyConsumption: "Consumo diário",
      panelPower: "Potência do Painel (Wp)",
      performanceRatio: "Performance Ratio (0-1)",
      lossesRatio: "Fator de perdas (~0.75)",
      autonomyDays: "Dias de Autonomia",
      bankVoltage: "Tensão do Banco (V)",
      batteryType: "Tipo de Bateria",
      batteryCapacity: "Capacidade da Unidade de Bateria (Ah)",
      dod: "DoD",
      efficiency: "Eff",
      fetchRadiation: "Buscar Radiação (NASA POWER)",
      fetching: "Consultando...",
      calculateSystem: "Calcular Sistema",
      error: "Erro",
      results: "✅ Resultados do Dimensionamento",
      panelsNeeded: "Painéis Necessários",
      totalPower: "Potência Total Instalada",
      batteryCapacityNeeded: "Capacidade Total Necessária",
      batteryUnits: "Unidades de Bateria",
      autonomy: "Autonomia",
      type: "Tipo",
      solarRadiation: "Dados de Radiação Solar (HSP média)",
      solarRadiationAvg: "HSP Média (Total)",
      pleaseFetchRadiation: "Por favor, busque a radiação solar primeiro.",
      radiationError: "Erro ao buscar dados de radiação.",
      calculationError: "Erro durante o cálculo do dimensionamento.",
    },
  },
  "en-US": {
    menu: {
      readmeTitle: "Documentation",
      readmeLabel: "View README in",
      language: "Language",
    },
    solar: {
      title: "☀️ Off-Grid Solar Calculator",
      section1: "1. Location and Consumption",
      section2: "2. Components and Settings",
      section3: "3. Battery Configuration",
      latitude: "Latitude",
      longitude: "Longitude",
      monthlyConsumption: "Average monthly consumption (kWh)",
      dailyConsumption: "Daily consumption",
      panelPower: "Panel Power (Wp)",
      performanceRatio: "Performance Ratio (0-1)",
      lossesRatio: "Loss factor (~0.75)",
      autonomyDays: "Autonomy Days",
      bankVoltage: "Bank Voltage (V)",
      batteryType: "Battery Type",
      batteryCapacity: "Battery Unit Capacity (Ah)",
      dod: "DoD",
      efficiency: "Eff",
      fetchRadiation: "Fetch Radiation (NASA POWER)",
      fetching: "Fetching...",
      calculateSystem: "Calculate System",
      error: "Error",
      results: "✅ Sizing Results",
      panelsNeeded: "Panels Needed",
      totalPower: "Total Installed Power",
      batteryCapacityNeeded: "Total Capacity Needed",
      batteryUnits: "Battery Units",
      autonomy: "Autonomy",
      type: "Type",
      solarRadiation: "Solar Radiation Data (Average HSP)",
      solarRadiationAvg: "Average HSP (Total)",
      pleaseFetchRadiation: "Please fetch solar radiation first.",
      radiationError: "Error fetching radiation data.",
      calculationError: "Error during system sizing calculation.",
    },
  },
};

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split(".");
  let value: unknown = translations[lang];

  for (const k of keys) {
    value = (value as Record<string, unknown>)?.[k];
  }

  return typeof value === "string" ? value : key;
}
