// utils/solar-calculations.ts

export type SizingData = {
  monthlyKwh: number;
  panelWatt: number;
  performanceRatio: number;
  autonomyDays: number;
  batteryType: string;
  bankVoltage: number;
  batteryUnitAh: number;
};

export type Results = {
  avgPeakSunHours: number;
  dailyConsumptionKwh: number;
  dailyWithLosses: number;
  panelDailyProductionKwh: number;
  panelsNeeded: number;
  batteryCapacityKwh: number;
  batteryCapacityAh: number;
  unitsNeeded: number;
  chosenSpecs: { dod: number; eff: number; label: string; minLevel: number };
  avgRaw: number;
  config: SizingData;
};

// Características de Descarga (DoD) e Eficiência (Eff) da Bateria
// DoD significa a profundidade máxima de descarga recomendada
const BATTERY_SPECS: Record<
  string,
  { dod: number; eff: number; label: string; minLevel: number }
> = {
  lifepo4: { dod: 0.8, eff: 0.95, minLevel: 20, label: "LiFePO4" },
  lead_acid_stationary: { dod: 0.7, eff: 0.85, minLevel: 30, label: "Chumbo-ácido (Estacionária)" },
  lead_acid_automotive: { dod: 0.2, eff: 0.8, minLevel: 80, label: "Chumbo-ácido (Automotiva)" },
};

/**
 * Funções para obter dados da API (pode ser movida para cá, mas mantive na página
 * para simplificar o "use client" inicial).
 * * Se quiser mover o fetch para cá, mude o arquivo para .ts, remova 'use client'
 * e chame esta função dentro de um Server Component ou API Route.
 */
export async function fetchIrradianceClimatology(
  lat: number,
  lon: number
): Promise<number[]> {
  const url = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&latitude=${encodeURIComponent(
    lat
  )}&longitude=${encodeURIComponent(lon)}&format=JSON`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Falha ao obter dados de radiação (NASA POWER)");
  const body = await res.json();

  const monthsObj = body.properties?.parameter?.ALLSKY_SFC_SW_DWN;
  if (!monthsObj) throw new Error("Resposta inesperada da API");

  const monthKeys = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const monthly: number[] = monthKeys.map((k) => {
    const v = monthsObj[k];
    const num = Number(v);
    // ALLSKY_SFC_SW_DWN é retornado em kWh/m²/dia
    return Number.isFinite(num) ? num : 0;
  });

  return monthly;
}

/**
 * Função principal que realiza todos os cálculos de dimensionamento.
 * @param data Os dados de entrada do usuário.
 * @param monthlyIrradiance Valores mensais de irradiação (kWh/m²/dia).
 * @returns Os resultados do dimensionamento.
 */
export function calculateSystemSizing(
  data: SizingData,
  monthlyIrradiance: number[]
): Results {
  const {
    monthlyKwh,
    panelWatt,
    performanceRatio,
    autonomyDays,
    batteryType,
    bankVoltage,
    batteryUnitAh,
  } = data;

  if (monthlyIrradiance.length === 0) {
    throw new Error("Dados de irradiação solar ausentes.");
  }

  // --- 1. DADOS DE RADIAÇÃO E CONSUMO ---
  // A média dos dados mensais é usada como Hora de Sol Pico (HSP) médio.
  const avgRaw =
    monthlyIrradiance.reduce((s, v) => s + v, 0) / monthlyIrradiance.length;
  const avgPeakSunHours = avgRaw;

  const dailyConsumptionKwh = monthlyKwh / 30;
  // +20% para compensar perdas (inversor/cabos/temp)
  const dailyWithLosses = dailyConsumptionKwh * 1.2;

  // --- 2. DIMENSIONAMENTO DOS PAINÉIS ---
  const panelKw = panelWatt / 1000;

  // Produção diária por painel = Potência do Painel (kWp) * HSP * PR
  const panelDailyProductionKwh = panelKw * avgPeakSunHours * performanceRatio;

  // Painéis necessários = Consumo Diário com Perdas / Produção Diária por Painel
  const panelsNeeded =
    panelDailyProductionKwh > 0
      ? Math.ceil(dailyWithLosses / panelDailyProductionKwh)
      : 0;

  // --- 3. DIMENSIONAMENTO DO BANCO DE BATERIAS ---
  const specs = BATTERY_SPECS[batteryType] || BATTERY_SPECS["lifepo4"]; // Fallback
  const usableNeededKwh = dailyWithLosses * autonomyDays;

  // Capacidade Nominal Total (kWh) = (Energia Necessária) / (DoD * Eficiência)
  // DoD é o tanto que ela PODE descarregar.
  const batteryCapacityKwh = usableNeededKwh / (specs.dod * specs.eff);

  // Capacidade em Ah do Banco (considerando a tensão selecionada pelo usuário)
  // Atenção: um banco de 48V precisará de menos Ah totais *no banco* do que um de 12V.
  const batteryCapacityAh = (batteryCapacityKwh * 1000) / bankVoltage;

  // Assumindo que a unidade de bateria adquirida (ex: rack LiFePO4 ou bloco chumbo)
  // corresponde à tensão do banco (ex: módulo de 48V 100Ah para banco de 48V):
  // O número total de baterias necessárias será apenas a demanda em Ah dividida pele capacidade da unidade.
  const unitsNeeded = Math.ceil(batteryCapacityAh / batteryUnitAh);

  return {
    avgPeakSunHours,
    dailyConsumptionKwh,
    dailyWithLosses,
    panelDailyProductionKwh,
    panelsNeeded,
    batteryCapacityKwh,
    batteryCapacityAh,
    unitsNeeded,
    chosenSpecs: specs,
    avgRaw: avgRaw,
    config: data,
  };
}

// Exporta as especificações para uso no frontend (para mostrar o DoD/Eff)
export const getBatterySpecs = (type: string) => BATTERY_SPECS[type];
export const allBatteryTypes = BATTERY_SPECS;
