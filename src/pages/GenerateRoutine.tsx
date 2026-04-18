import { useState } from "react";
import { ChevronLeft, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { useStore } from "@/src/store";
import { cn } from "@/src/lib/utils";

export default function GenerateRoutine() {
  const navigate = useNavigate();
  const { level, equipment, goal } = useStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      navigate("/routine/1"); // We route to the dummy detail routine in the wireframes
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col p-6 space-y-6">
      <header className="flex items-center pb-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft className="h-6 w-6 stroke-[2.5px]" />
        </button>
        <h1 className="text-xl font-black uppercase tracking-tight ml-2">GENERADOR DE RUTINA</h1>
      </header>

      <Card variant="black" className="rounded-3xl p-6 shadow-none">
        <h2 className="text-lg font-bold">Tu Perfil Actual</h2>
        
        <div className="mt-6 grid grid-cols-2 gap-y-6 gap-x-4">
          <div>
            <p className="text-sm font-bold text-gray-400 mb-2">Nivel</p>
            <span className="bg-white text-black font-bold px-4 py-1.5 rounded-full text-sm inline-block truncate max-w-[120px]">{level || "Intermedio"}</span>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 mb-2">Objetivo</p>
            <span className="bg-white text-black font-bold px-4 py-1.5 rounded-full text-sm inline-block truncate max-w-[120px]">{goal || "Fuerza"}</span>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-bold text-gray-400 mb-2">Equipo Disponible</p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-white text-black font-bold px-4 py-1.5 rounded-full text-sm">{equipment || "Mancuernas"}</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8 py-8">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center opacity-80 overflow-hidden">
          <RefreshCcw className={cn("h-10 w-10 text-[#ff0000] stroke-[2.5px]", isGenerating && "animate-spin")} />
        </div>
        
        <div className="text-center space-y-3 px-4">
          <h3 className="text-2xl font-black tracking-tight">
            {isGenerating ? "Generando..." : "¿Listo para empezar?"}
          </h3>
          <p className="text-gray-600 font-medium leading-relaxed">
            {isGenerating 
              ? "Calculando los mejores ejercicios basados en tu perfil y equipo..."
              : "Usa la inteligencia de FitApp para crear una rutina perfecta para ti hoy."}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-4">
        <Button 
          className="w-full text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none translate-y-0 active:translate-y-[6px] active:translate-x-[6px] disabled:opacity-80"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? "GENERANDO..." : "GENERAR RUTINA"}
        </Button>
      </div>
    </div>
  );
}
