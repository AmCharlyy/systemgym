import { Search, Trash2, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/src/components/ui/button";
import { motion } from "motion/react";

const routines = [
  { id: 1, title: "Día de Pierna", time: "50 min", level: "Avanzado", ago: "Hace 2 días" },
  { id: 2, title: "Core Express", time: "15 min", level: "Principiante", ago: "Hace 1 semana" },
  { id: 3, title: "Tren Superior", time: "45 min", level: "Intermedio", ago: "Hace 2 semanas" },
];

export default function RoutinesList() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial="hidden" animate="show" 
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
      className="flex flex-col p-6 space-y-6"
    >
      <header className="space-y-2">
        <motion.h1 variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} className="text-3xl font-black uppercase tracking-tight">MIS RUTINAS</motion.h1>
        <motion.p variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} className="text-xs font-bold uppercase tracking-widest text-gray-500">TUS ENTRENAMIENTOS FAVORITOS GUARDADOS</motion.p>
      </header>

      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-[#ff0000] transition-colors z-10">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#ff0000] rotate-0 group-focus-within:rotate-90 transition-transform duration-300" />
        </div>
        <input 
          type="text" 
          placeholder="Buscar rutinas..." 
          className="w-full bg-black text-white p-4 pl-12 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none placeholder:text-gray-500 focus:outline-none focus:border-[#ff0000] focus:shadow-[6px_6px_0px_0px_rgba(255,0,0,1)] focus:-translate-y-1 focus:-translate-x-1 transition-all"
        />
      </motion.div>

      <div className="space-y-6 pb-4">
        {routines.map((r) => (
          <motion.div 
            key={r.id} 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="bg-black text-white p-5 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(255,0,0,1)] hover:-translate-y-2 hover:-translate-x-1 transition-all duration-300 relative group"
          >
            <button className="absolute top-4 right-4 text-gray-500 hover:text-[#ff0000] hover:scale-110 active:scale-95 transition-all">
              <Trash2 className="h-5 w-5" />
            </button>
            <div className="mb-4 pr-8">
              <h3 className="text-xl font-bold group-hover:text-[#ff0000] transition-colors">{r.title}</h3>
              <p className="text-sm font-bold text-gray-400 mt-1">{r.time} • {r.level}</p>
              <p className="text-xs font-bold text-gray-500 mt-2">{r.ago}</p>
            </div>
            <Button 
              className="w-full bg-[#ff0000] border-[3px] border-black shadow-none text-white hover:bg-white hover:text-black group-hover:border-white transition-colors"
              onClick={() => navigate(`/routine/${r.id}`)}
            >
              <Play className="h-4 w-4 mr-2 fill-current" /> INICIAR
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
