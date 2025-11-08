// SolarSizingCalculator.tsx (ou .js)

"use client";
import React, { useState } from "react";
import {
  SizingData,
  Results,
  calculateSystemSizing,
  fetchIrradianceClimatology,
  allBatteryTypes,
} from "@/(page)/calc/calc"; // Ajuste o path conforme sua estrutura

// Estado inicial do formulário
const initialFormData: SizingData = {
  monthlyKwh: 300,
  panelWatt: 550,
  performanceRatio: 0.75,
  autonomyDays: 3,
  batteryType: "lifepo4",
  bankVoltage: 48,
  batteryUnitAh: 100,
};

export default function SolarSizingCalculator() {
  const [formData, setFormData] = useState(initialFormData);
  const [latitude, setLatitude] = useState(-15.7797);
  const [longitude, setLongitude] = useState(-47.9297);
  const [irradianceMonthly, setIrradianceMonthly] = useState<number[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Results | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    // Converte para número se o tipo do input for 'number', senão mantém string
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleFetchHSP = async () => {
    setLoading(true);
    setError(null);
    setIrradianceMonthly(null);
    try {
      const monthlyData = await fetchIrradianceClimatology(latitude, longitude);
      setIrradianceMonthly(monthlyData);
    } catch (e: any) {
      setError(e.message || "Erro ao buscar dados de radiação.");
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResults(null);

    if (!irradianceMonthly || irradianceMonthly.length === 0) {
      setError("Por favor, **busque a radiação solar** primeiro.");
      return;
    }

    try {
      const res = calculateSystemSizing(formData, irradianceMonthly);
      setResults(res);
    } catch (e: any) {
      setError(e.message || "Erro durante o cálculo do dimensionamento.");
    }
  };

  const batterySpecs = allBatteryTypes[formData.batteryType];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        ☀️ Calculadora Off-Grid Solar
      </h1>

      <form onSubmit={handleCalculate} className="grid grid-cols-1 gap-6">
        {/* --- 1. Localização e Consumo --- */}
        <h2 className="text-xl font-semibold border-b pb-2 text-indigo-600">
          1. Localização e Consumo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="block">
            <div className="text-sm font-medium text-black">Latitude</div>
            <input
              type="number"
              step="0.0001"
              value={latitude}
              onChange={(e) => setLatitude(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            />
          </label>
          <label className="block">
            <div className="text-sm font-medium text-black">Longitude</div>
            <input
              type="number"
              step="0.0001"
              value={longitude}
              onChange={(e) => setLongitude(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            />
          </label>
          <label className="block">
            <div className="text-sm font-medium text-black">
              Consumo médio/mês (kWh)
            </div>
            <input
              type="number"
              min={0}
              name="monthlyKwh"
              value={formData.monthlyKwh}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            />
            <div className="text-xs text-gray-500 mt-1">
              Consumo diário: {(formData.monthlyKwh / 30).toFixed(2)} kWh
            </div>
          </label>
        </div>

        {/* --- 2. Componentes e Configurações --- */}
        <h2 className="text-xl font-semibold border-b pb-2 mt-4 text-indigo-600">
          2. Componentes e Configurações
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <label className="block">
            <div className="text-sm font-medium text-black">
              Potência do Painel (Wp)
            </div>
            <input
              type="number"
              min={50}
              name="panelWatt"
              value={formData.panelWatt}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            />
          </label>
          <label className="block">
            <div className="text-sm font-medium text-black">
              Performance Ratio (0-1)
            </div>
            <input
              type="number"
              step="0.01"
              min={0.5}
              max={0.95}
              name="performanceRatio"
              value={formData.performanceRatio}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            />
            <div className="text-xs text-gray-500 mt-1">
              Fator de perdas (~0.75)
            </div>
          </label>
          <label className="block">
            <div className="text-sm font-medium text-black">
              Dias de Autonomia
            </div>
            <input
              type="number"
              min={1}
              name="autonomyDays"
              value={formData.autonomyDays}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            />
          </label>
          <label className="block">
            <div className="text-sm font-medium text-black">
              Tensão do Banco (V)
            </div>
            <select
              name="bankVoltage"
              value={formData.bankVoltage}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            >
              <option value={12}>12 V</option>
              <option value={24}>24 V</option>
              <option value={48}>48 V</option>
            </select>
          </label>
        </div>

        {/* --- 3. Configuração da Bateria --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="block">
            <div className="text-sm font-medium text-black">
              Tipo de Bateria
            </div>
            <select
              name="batteryType"
              value={formData.batteryType}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            >
              {Object.entries(allBatteryTypes).map(([key, spec]) => (
                <option key={key} value={key}>
                  {spec.label}
                </option>
              ))}
            </select>
            <div className="text-xs text-gray-500 mt-1">
              DoD: {batterySpecs.dod * 100}% | Eff:{" "}
              {Math.round(batterySpecs.eff * 100)}%
            </div>
          </label>
          <label className="block md:col-span-2">
            <div className="text-sm font-medium text-black">
              Capacidade da Unidade de Bateria (Ah)
            </div>
            <input
              type="number"
              min={1}
              name="batteryUnitAh"
              value={formData.batteryUnitAh}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            />
          </label>
        </div>

        {/* --- Botões de Ação --- */}
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            type="button"
            onClick={handleFetchHSP}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Consultando..." : "Buscar Radiação (NASA POWER)"}
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition ml-auto"
            disabled={loading || !irradianceMonthly}
          >
            Calcular Sistema
          </button>
        </div>
      </form>

      {/* --- Exibição de Resultados (A ser criado como um componente separado para maior clareza!) --- */}
      {error && (
        <div className="mt-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          Erro: {error}
        </div>
      )}

      {/* Exibição da Radiação Buscada */}
      {irradianceMonthly && (
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-4">
          <h2 className="font-semibold text-blue-800">
            Dados de Radiação Solar (HSP média)
          </h2>
          <div className="mt-3 text-xs text-gray-600">
            **HSP Média (Total):**{" "}
            {irradianceMonthly.reduce((s, v) => s + v, 0) /
              irradianceMonthly.length}{" "}
            kWh/m²/dia.
          </div>
        </div>
      )}

      {/* Exibição dos Resultados do Cálculo */}
      {results && (
        <div className="mt-6 bg-green-50 p-6 rounded-lg border-2 border-green-300">
          <h2 className="text-xl font-bold mb-4 text-green-800">
            ✅ Resultados do Dimensionamento
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Painéis */}
            <div className="p-4 rounded-md bg-white shadow-md border-l-4 border-yellow-600">
              <div className="text-sm text-gray-600">
                Painéis Necessários ({formData.panelWatt} Wp)
              </div>
              <div className="text-3xl font-extrabold text-yellow-700">
                {results.panelsNeeded}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Potência Total Instalada: **
                {Math.ceil(
                  (results.panelsNeeded * formData.panelWatt) / 1000
                )}{" "}
                kWp**
              </div>
            </div>

            {/* Baterias (Ah) */}
            <div className="p-4 rounded-md bg-white shadow-md border-l-4 border-blue-600">
              <div className="text-sm text-gray-600">
                Capacidade Total Necessária
              </div>
              <div className="text-3xl font-extrabold text-blue-700">
                {results.batteryCapacityAh.toFixed(0)} Ah
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Voltagem: **{formData.bankVoltage} V**
                <br />
                Capacidade Total: **{results.batteryCapacityKwh.toFixed(2)}{" "}
                kWh**
              </div>
            </div>

            {/* Unidades de Bateria */}
            <div className="p-4 rounded-md bg-white shadow-md border-l-4 border-purple-600">
              <div className="text-sm text-gray-600">
                Unidades de Bateria ({formData.batteryUnitAh} Ah)
              </div>
              <div className="text-3xl font-extrabold text-purple-700">
                {results.unitsNeeded}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Autonomia: **{formData.autonomyDays} dias**
                <br />
                Tipo: **{results.chosenSpecs.label}** (DoD{" "}
                {results.chosenSpecs.dod * 100}%)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
