import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";
import { useStore } from "@/src/store";
import { motion, AnimatePresence } from "motion/react";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<Record<number, string>>({});
  const setPreferences = useStore(state => state.setPreferences);

  const handleSelect = (optionTitle: string) => {
    setSelections({ ...selections, [step]: optionTitle });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setPreferences(
        selections[1] || "Intermedio",
        selections[2] || "Mancuernas",
        selections[3] || "Fuerza"
      );
      navigate("/dashboard");
    }
  };

  const stepsData = [
    {
      title: "¿CUÁL ES TU NIVEL?",
      subtitle: "ESTO NOS AYUDARÁ A AJUSTAR LA INTENSIDAD DE TUS RUTINAS.",
      options: [
        { title: "Principiante", desc: "Recién empiezo o llevo poco tiempo entrenando." },
        { title: "Intermedio", desc: "Entreno regularmente hace meses." },
        { title: "Avanzado", desc: "Entreno intensamente y busco desafíos." },
      ]
    },
    {
      title: "¿QUÉ EQUIPO TIENES?",
      subtitle: "SELECCIONA EL EQUIPO AL QUE TIENES ACCESO.",
      options: [
        { title: "SIN EQUIPO (PESO CORPORAL)" },
        { title: "MANCUERNAS" },
        { title: "LIGAS DE RESISTENCIA" },
        { title: "BARRA Y DISCOS" },
        { title: "MÁQUINAS DE GIMNASIO" },
      ]
    },
    {
      title: "¿CUÁL ES TU OBJETIVO?",
      subtitle: "DEFINIREMOS LAS RUTINAS BASADAS EN ESTO.",
      options: [
        { title: "Fuerza" },
        { title: "Cardio" },
        { title: "Tonificación" },
        { title: "Pérdida de peso" },
      ]
    }
  ];

  const currentStepData = stepsData[step - 1];

  return (
    <div className="flex min-h-screen flex-col p-6 overflow-hidden">
      <header className="flex items-center justify-between py-4 relative z-10">
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : navigate("/")} 
          className="p-2 -ml-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="font-bold text-gray-500">Paso {step} de 3</span>
        <div className="w-10"></div>
        {/* Progress Bar under header */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-200 rounded-full overflow-hidden">
           <motion.div 
             className="h-full bg-[#ff0000]"
             initial={{ width: `${((step - 1)/3)*100}%` }}
             animate={{ width: `${(step/3)*100}%` }}
           />
        </div>
      </header>

      <div className="mt-6 flex-1 flex flex-col relative w-full">
        <AnimatePresence mode="wait">
          <motion.div 
            key={step} 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 w-full"
          >
            <div>
              <h1 className="text-2xl font-black uppercase">{currentStepData.title}</h1>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-gray-500">
                {currentStepData.subtitle}
              </p>
            </div>

            <div className="space-y-4">
              {currentStepData.options.map((opt, i) => {
                const isSelected = selections[step] === opt.title;
                return (
                  <motion.div
                    key={opt.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card 
                      variant={isSelected ? "default" : "black"}
                      className={cn(
                        "cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1",
                        isSelected ? "bg-[#ff0000] text-white border-black scale-[1.02] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:border-[#ff0000]"
                      )}
                      onClick={() => handleSelect(opt.title)}
                    >
                      <div className="p-5">
                        <h3 className={cn("font-bold text-lg transition-transform", !opt.desc && "uppercase text-center", isSelected && "scale-105 transform origin-left")}>
                          {opt.title}
                        </h3>
                        {opt.desc && (
                          <p className="mt-1 text-sm opacity-80 font-medium">
                            {opt.desc}
                          </p>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="py-6 mt-auto">
        <Button 
          className={cn(
            "w-full text-lg transition-all",
            !selections[step] 
              ? "opacity-50 pointer-events-none bg-gray-400 border-gray-500 shadow-none" 
              : "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          )}
          onClick={handleNext}
        >
          {step === 3 ? "FINALIZAR CONFIGURACIÓN" : "SIGUIENTE"}
          {step < 3 && <ChevronRight className="ml-2 h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
}
