import { useState } from "react";
import { ChevronLeft, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { useStore } from "@/src/store";
import { cn } from "@/src/lib/utils";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/src/firebase";
import { generateRoutine } from "@/src/lib/routineGenerator";

export default function GenerateRoutine() {
  const navigate = useNavigate();
  const { level, equipment, goal } = useStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const user = auth.currentUser;
    if (!user) {
      setIsGenerating(false);
      return;
    }

    try {
      const routineData = generateRoutine({ level, equipment, goal });
      const newRoutine = {
        title: String(routineData.title || `Entrenamiento de ${goal || "Fuerza"}`).substring(0, 100),
        time: String(routineData.time || "45 min").substring(0, 50),
        level: String(routineData.level || level || "Intermedio").substring(0, 50),
        exercises: Array.isArray(routineData.exercises) ? routineData.exercises.slice(0, 20) : [],
        userId: user.uid,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, "users", user.uid, "routines"), newRoutine);
      navigate(`/routine/${docRef.id}`);
    } catch (e: any) {
      console.error("Error saving routine:", e);
      const message = String(e?.message || e || "Error desconocido");
      const permissionIssue = /permission|permiso|insufficient|denied/i.test(message);
      alert(permissionIssue
        ? "No tienes permisos para guardar la rutina. Asegúrate de estar autenticado y de usar el proyecto Firebase correcto."
        : `Hubo un error: ${message}`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col p-6 space-y-6">
      <header className="flex items-center pb-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft className="h-6 w-6 stroke-[2.5px]" />
        </button>
        <h1 className="text-xl font-black uppercase tracking-tight ml-2">GENERADOR DE RUTINA</h1>
      </header>

      <Card variant="black" className="rounded-3xl p-6 shadow-none border-[3px]">
        <h2 className="text-lg font-bold text-white">Tu Perfil Actual</h2>
        
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
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center opacity-80 overflow-hidden relative">
          <RefreshCcw className={cn("h-10 w-10 text-[#ff0000] stroke-[2.5px] relative z-10", isGenerating && "animate-spin")} />
          {isGenerating && <div className="absolute inset-0 bg-red-200 animate-pulse"></div>}
        </div>
        
        <div className="text-center space-y-3 px-4">
          <h3 className="text-2xl font-black tracking-tight">
            {isGenerating ? "Generando y guardando tu rutina..." : "¿Listo para empezar?"}
          </h3>
          <p className="text-gray-600 font-medium leading-relaxed">
            {isGenerating 
              ? "El sistema de FitApp está creando tu rutina según tu perfil y equipo disponible..."
              : "Usa el sistema de FitApp para crear y guardar una rutina perfecta."}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-4">
        <Button 
          className={cn(
            "w-full text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none translate-y-0 active:translate-y-[6px] active:translate-x-[6px] transition-all",
            isGenerating && "bg-gray-400 cursor-not-allowed border-gray-600 text-gray-700 shadow-none hover:shadow-none"
          )}
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? "ESPERA..." : "CREAR NUEVA RUTINA"}
        </Button>
      </div>
    </div>
  );
}
