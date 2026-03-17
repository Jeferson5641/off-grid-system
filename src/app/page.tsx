import SolarSizingCalculator from "@/(page)/solarpage/page";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans relative overflow-hidden transition-colors duration-500">
      {/* Premium Background Glowing Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-chart-2/20 blur-[120px] pointer-events-none" />
      
      <main className="relative z-10 flex min-h-screen w-full max-w-5xl flex-col items-center justify-start py-12 px-4 sm:px-8">
        <SolarSizingCalculator />
      </main>
    </div>
  );
}
