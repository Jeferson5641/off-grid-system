"use client";
import {
  Results,
  SizingData,
  allBatteryTypes,
  calculateSystemSizing,
  fetchIrradianceClimatology,
} from "@/(page)/calc/calc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Zap, Sun, Activity, BatteryFull, CalendarDays, Loader2, Calculator, Settings, Compass, HelpCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "Erro ao buscar dados de radiação.";
      setError(errorMessage || "Erro ao buscar dados de radiação.");
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResults(null);

    // Permitir cálculo se os dados da NASA já foram buscados
    if (!irradianceMonthly || irradianceMonthly.length === 0) {
      setError(t("calculator.pleaseSearchRadiation"));
      return;
    }

    try {
      const res = calculateSystemSizing(formData, irradianceMonthly);
      setResults(res);
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : t("calculator.calculationError");
      setError(errorMessage || t("calculator.calculationError"));
    }
  };

  // Auto-calcular quando os dados do formulário mudarem
  useEffect(() => {
    if (irradianceMonthly && irradianceMonthly.length > 0) {
      try {
        const res = calculateSystemSizing(formData, irradianceMonthly);
        setResults(res);
        setError(null);
      } catch (e) {
        // Silêncio no auto-calc
      }
    }
  }, [formData, irradianceMonthly]);

  const batterySpecs = allBatteryTypes[formData.batteryType];

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* --- HEADER --- */}
      <div className="text-center space-y-3 mb-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-chart-2 inline-block pb-2">
          {t("common.title")}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t("common.description") || "Dimensionamento inteligente de sistemas solares off-grid com dados da NASA."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* --- FORM COLUMN --- */}
        <form onSubmit={handleCalculate} className="col-span-1 lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* 1. Localização e Consumo */}
            <Card className="border-border/60 shadow-md bg-card/60 backdrop-blur-md overflow-hidden transition-all hover:shadow-lg">
              <div className="h-1 w-full bg-linear-to-r from-blue-500 to-cyan-400" />
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl flex items-center gap-2 text-foreground">
                <MapPin className="h-6 w-6 text-blue-500" />
                {t("calculator.section1")}
              </CardTitle>
              <CardDescription>
                Informe as coordenadas do local e seu consumo mensal
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/80 flex items-center gap-1">
                  <Compass className="h-4 w-4" />
                  {t("calculator.latitude")}
                </label>
                <Input
                  type="number"
                  step="0.0001"
                  value={latitude}
                  onChange={(e) => setLatitude(Number(e.target.value))}
                  className="bg-background focus:ring-blue-500 transition-all font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/80 flex items-center gap-1">
                  <Compass className="h-4 w-4" />
                  {t("calculator.longitude")}
                </label>
                <Input
                  type="number"
                  step="0.0001"
                  value={longitude}
                  onChange={(e) => setLongitude(Number(e.target.value))}
                  className="bg-background focus:ring-blue-500 transition-all font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/80 flex items-center gap-1">
                  <Zap className="h-4 w-4 text-amber-500" />
                  {t("calculator.monthlyConsumption")}
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    min={0}
                    name="monthlyKwh"
                    value={formData.monthlyKwh}
                    onChange={handleInputChange}
                    className="bg-background focus:ring-amber-500 transition-all font-mono pr-12"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium pointer-events-none">
                    kWh
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {t("calculator.dailyConsumption")}: <span className="font-semibold text-foreground">{(formData.monthlyKwh / 30).toFixed(2)} kWh</span>
                </div>
              </div>
            </CardContent>
          </Card>

            {/* 2. Componentes e Configurações */}
            <Card className="border-border/60 shadow-md bg-card/60 backdrop-blur-md overflow-hidden transition-all hover:shadow-lg">
              <div className="h-1 w-full bg-linear-to-r from-amber-400 to-orange-500" />
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl flex items-center gap-2 text-foreground">
                <Sun className="h-6 w-6 text-amber-500" />
                {t("calculator.section2")}
              </CardTitle>
              <CardDescription>
                Parâmetros dos painéis solares e do banco de baterias
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/80 flex justify-between">
                  {t("calculator.panelWattage")} <span className="text-muted-foreground text-xs font-normal">Wp</span>
                </label>
                <Input
                  type="number"
                  min={50}
                  name="panelWatt"
                  value={formData.panelWatt}
                  onChange={handleInputChange}
                  className="bg-background focus:ring-amber-500 transition-all font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/80 flex items-center gap-1 group relative">
                  {t("calculator.performanceRatio")}
                  <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 w-48 p-2 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-10 text-center border border-border">
                    {t("calculator.lossFactorLabel")}
                  </span>
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min={0.5}
                  max={0.95}
                  name="performanceRatio"
                  value={formData.performanceRatio}
                  onChange={handleInputChange}
                  className="bg-background focus:ring-amber-500 transition-all font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/80 flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  {t("calculator.autonomyDays")}
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    min={1}
                    name="autonomyDays"
                    value={formData.autonomyDays}
                    onChange={handleInputChange}
                    className="bg-background focus:ring-amber-500 transition-all font-mono pr-12"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                    dias
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/80 flex justify-between">
                  {t("calculator.bankVoltage")} <span className="text-muted-foreground text-xs font-normal">V</span>
                </label>
                <select
                  name="bankVoltage"
                  value={formData.bankVoltage}
                  onChange={handleInputChange}
                  className="w-full flex h-9 md:h-10 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-all focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value={12}>12 V</option>
                  <option value={24}>24 V</option>
                  <option value={48}>48 V</option>
                </select>
              </div>
            </CardContent>
          </Card>

            {/* 3. Configuração da Bateria */}
            <Card className="border-border/60 shadow-md bg-card/60 backdrop-blur-md overflow-hidden transition-all hover:shadow-lg">
              <div className="h-1 w-full bg-linear-to-r from-emerald-400 to-teal-500" />
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl flex items-center gap-2 text-foreground">
                <BatteryFull className="h-6 w-6 text-emerald-500" />
                {t("calculator.batteryTypeLabel") || "Configuração da Bateria"}
              </CardTitle>
              <CardDescription>
                Escolha a química e a capacidade unitária das baterias
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/80">
                  {t("calculator.batteryTypeLabel")}
                </label>
                <select
                  name="batteryType"
                  value={formData.batteryType}
                  onChange={handleInputChange}
                  className="w-full flex h-9 md:h-10 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {Object.entries(allBatteryTypes).map(([key]) => (
                    <option key={key} value={key}>
                      {t(`batteryTypes.${key}`)}
                    </option>
                  ))}
                </select>
                <div className="text-xs text-muted-foreground mt-2 flex justify-between bg-emerald-500/10 p-2 rounded-md border border-emerald-500/20">
                  <span>{t("calculator.doD")}: <strong className="text-foreground">{batterySpecs.dod * 100}%</strong></span>
                  <span>{t("calculator.eff")}: <strong className="text-foreground">{Math.round(batterySpecs.eff * 100)}%</strong></span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/80 flex justify-between">
                  {t("calculator.batteryUnitCapacity")} <span className="text-muted-foreground text-xs font-normal">Ah</span>
                </label>
                <Input
                  type="number"
                  min={1}
                  name="batteryUnitAh"
                  value={formData.batteryUnitAh}
                  onChange={handleInputChange}
                  className="bg-background focus:ring-emerald-500 transition-all font-mono"
                />
              </div>
            </CardContent>
          </Card>
          </div>

          {/* --- SIDE PANEL (ACTIONS & RESULTS) --- */}
          <div className="flex flex-col gap-6 lg:col-span-1 lg:sticky lg:top-8">
            
           {/* ACTION BUTTONS */}
          <Card className="border-border/50 shadow-lg bg-card/80 backdrop-blur-xl shrink-0">
            <CardContent className="p-6 flex flex-col gap-4">
              <h3 className="font-semibold text-lg flex items-center gap-2 mb-2 text-foreground">
                <Settings className="h-5 w-5 text-primary" />
                Painel de Controle
              </h3>
              
              <Button
                type="button"
                variant="outline"
                className="w-full justify-center h-12 text-md border-primary text-primary hover:bg-primary/10 transition-all font-semibold rounded-xl"
                onClick={handleFetchHSP}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sun className="mr-2 h-5 w-5" />}
                {loading ? t("calculator.consulting") : t("calculator.fetchRadiation")}
              </Button>
              
              <Button
                type="submit"
                className="w-full justify-center h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-md shadow-primary/20 font-bold rounded-xl"
                disabled={loading || !irradianceMonthly}
              >
                <Calculator className="mr-2 h-6 w-6" />
                {t("calculator.calculateSystem")}
              </Button>

              {/* Error Alert */}
              {error && (
                <div className="mt-2 p-3 bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-md animate-in fade-in slide-in-from-top-2 flex items-start gap-2">
                  <Activity className="h-5 w-5 shrink-0" />
                  <div><span className="font-bold">{t("calculator.error")}:</span> {error}</div>
                </div>
              )}

              {/* Radiation Data Summary */}
              {irradianceMonthly && (
                <div className="mt-2 bg-chart-2/10 p-4 rounded-lg border border-chart-2/20 animate-in fade-in transition-all">
                  <h4 className="font-semibold text-sm text-chart-2 flex items-center gap-2">
                    <Sun className="h-4 w-4" /> {t("calculator.radiationData")}
                  </h4>
                  <div className="mt-3 text-xs text-muted-foreground flex justify-between items-center bg-background/60 p-2 rounded-md border border-border">
                    <span className="font-medium">{t("calculator.average")} (HSP):</span>
                    <strong className="text-foreground text-sm font-mono text-chart-2">
                      {(irradianceMonthly.reduce((s, v) => s + v, 0) / irradianceMonthly.length).toFixed(2)}
                      <span className="text-[10px] ml-1 text-muted-foreground font-sans">kWh/m²</span>
                    </strong>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* RESULTS DASHBOARD */}
          {results && (
            <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-4 fade-in duration-500">
              
              {/* Card Painéis */}
              <div className="relative overflow-hidden p-6 rounded-xl bg-card border border-border shadow-lg flex flex-col group hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                  <Sun className="h-20 w-20 text-amber-500" />
                </div>
                <div className="h-1 w-1/3 bg-amber-500 absolute top-0 left-0 rounded-br-full" />
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">
                  {t("calculator.panelsNeeded")}
                </h4>
                <div className="text-5xl font-black text-amber-500 mt-2 mb-2 flex items-baseline gap-2">
                  {results.panelsNeeded} <span className="text-xl font-bold text-muted-foreground uppercase tracking-wider">Un.</span>
                </div>
                <div className="text-sm text-muted-foreground mt-auto flex items-center gap-2 pt-2 border-t border-border/50">
                  <Activity className="h-4 w-4 text-amber-500" />
                  {t("calculator.totalInstalledPower")}: <span className="font-bold text-foreground">{Math.ceil((results.panelsNeeded * formData.panelWatt) / 1000)} kWp</span>
                </div>
              </div>

              {/* Card Capacidade */}
              <div className="relative overflow-hidden p-6 rounded-xl bg-card border border-border shadow-lg flex flex-col group hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                  <Zap className="h-20 w-20 text-blue-500" />
                </div>
                <div className="h-1 w-1/3 bg-blue-500 absolute top-0 left-0 rounded-br-full" />
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">
                  Capacidade Necessária
                </h4>
                <div className="text-5xl font-black text-blue-500 mt-2 mb-2 flex items-baseline gap-2">
                  {results.batteryCapacityAh.toFixed(0)} <span className="text-xl font-bold text-muted-foreground uppercase tracking-wider">Ah</span>
                </div>
                <div className="text-sm text-muted-foreground mt-auto flex justify-between items-center pt-2 border-t border-border/50">
                  <span className="font-medium bg-secondary px-2 py-0.5 rounded text-secondary-foreground">{results.config.bankVoltage}V</span>
                  <span><span className="font-bold text-foreground">{results.batteryCapacityKwh.toFixed(1)}</span> kWh</span>
                </div>
              </div>

              {/* Card Baterias Unidades */}
              <div className="relative overflow-hidden p-6 rounded-xl bg-card border border-border shadow-lg flex flex-col group hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                  <BatteryFull className="h-20 w-20 text-emerald-500" />
                </div>
                <div className="h-1 w-1/3 bg-emerald-500 absolute top-0 left-0 rounded-br-full" />
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">
                  {t("calculator.batteryUnits")}
                </h4>
                <div className="text-5xl font-black text-emerald-500 mt-2 mb-2 flex items-baseline gap-2">
                  {results.unitsNeeded} <span className="text-xl font-bold text-muted-foreground uppercase tracking-wider">Un.</span>
                </div>
                <div className="text-sm text-muted-foreground mt-auto pt-2 border-t border-border/50 font-medium">
                  De {results.config.batteryUnitAh} Ah ({t(`batteryTypes.${results.config.batteryType}`)})
                </div>
              </div>

            </div>
          )}

        </div>
      </form>
    </div>
    </div>
  );
}
