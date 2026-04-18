import { ChevronLeft, Clock, Info, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/src/components/ui/button";
import { motion } from "motion/react";

export default function RoutineDetail() {
  const navigate = useNavigate();

  const exercises = [
    { num: 1, title: "Sentadillas libres", sets: "4x12", rest: "Descanso 60s" },
    { num: 2, title: "Flexiones de pecho", sets: "4x10", rest: "Descanso 45s" },
    { num: 3, title: "Remo con mancuernas", sets: "3x12", rest: "Descanso 60s" },
    { num: 4, title: "Plancha abdominal", sets: "3x45s", rest: "Descanso 30s" },
  ];

  return (
    <motion.div 
      initial="hidden" animate="show"
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
      className="flex min-h-[100dvh] flex-col pb-6 bg-[#f5f5f5]"
    >
      <header className="flex items-center p-6 pb-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-200 rounded-full transition-colors active:scale-95">
          <ChevronLeft className="h-6 w-6 stroke-[2.5px]" />
        </button>
        <h1 className="text-xl font-black uppercase tracking-tight ml-2 truncate">RUTINA FUERZA TOTAL</h1>
      </header>

      <div className="px-6 space-y-6">
        <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }} className="bg-black text-white p-6 rounded-3xl relative overflow-hidden group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-[3px] border-black">
          {/* Faux background image / overlay anim */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff0000] rounded-full blur-3xl opacity-20 -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>

          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl font-black tracking-tight leading-none group-hover:text-[#ff0000] transition-colors">Rutina Fuerza Total</h2>
            <div className="flex items-center gap-4 text-sm font-bold text-gray-300">
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> 45 min</span>
              <span className="flex items-center gap-1.5 text-[#ff0000]"><Info className="h-4 w-4" /> Intermedio</span>
            </div>
          </div>
        </motion.div>

        <div>
          <h3 className="text-lg font-black tracking-tight mb-4 flex items-center gap-2">Lista de ejercicios (4)</h3>
          <div className="space-y-3">
            {exercises.map((ex, i) => (
              <motion.div 
                key={ex.num} 
                variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                className="bg-black text-white p-4 border-[3px] border-black flex gap-4 cursor-pointer hover:bg-gray-900 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,0,0,1)] active:scale-[0.98] group"
                onClick={() => navigate(`/exercise/${ex.num}`)}
              >
                <div className="flex-shrink-0 relative overflow-hidden">
                  <div className="w-20 h-20 bg-gray-800 transition-transform group-hover:scale-110"></div> {/* Image placeholder */}
                  <div className="absolute top-1 left-1 bg-[#ff0000] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center shadow-lg">
                    {ex.num}
                  </div>
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <h4 className="font-bold text-lg leading-tight truncate group-hover:text-[#ff0000] transition-colors">{ex.title}</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-white text-black border-2 border-transparent group-hover:border-[#ff0000] text-[10px] font-black uppercase px-2 py-1 transition-colors">{ex.sets}</span>
                    <span className="bg-gray-800 text-gray-300 text-[10px] font-black uppercase px-2 py-1">{ex.rest}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="mt-8 px-6 pb-24">
        <Button 
          className="w-full text-lg h-16 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none translate-y-0 active:translate-y-[6px] active:translate-x-[6px] group"
          onClick={() => navigate("/workout")}
        >
          <Play className="h-6 w-6 mr-2 fill-current group-hover:scale-125 transition-transform" /> INICIAR RUTINA
        </Button>
      </motion.div>
    </motion.div>
  );
}
