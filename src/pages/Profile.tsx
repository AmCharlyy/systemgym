import { Settings as SettingsIcon, User, Layers, Target, Dumbbell, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/src/components/ui/button";
import { useStore } from "@/src/store";
import { motion } from "motion/react";

export default function Profile() {
  const navigate = useNavigate();
  const { level, equipment, goal, logout } = useStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      initial="hidden" animate="show"
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
      className="flex flex-col p-6 space-y-8"
    >
      <header className="flex justify-between items-start">
        <motion.h1 variants={itemVariants} className="text-3xl font-black uppercase tracking-tight">MI PERFIL</motion.h1>
        <motion.div variants={{ hidden: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1 } }}>
          <Link to="/settings" className="block p-2 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">
            <SettingsIcon className="h-6 w-6 stroke-[2.5px]" />
          </Link>
        </motion.div>
      </header>

      <motion.div variants={itemVariants} className="flex items-center gap-6">
        <motion.div 
          whileHover={{ scale: 1.05, rotate: -5 }}
          className="w-24 h-24 rounded-full border-[4px] border-black flex items-center justify-center bg-gray-100 flex-shrink-0 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform duration-300"
        >
          <User className="h-10 w-10 text-gray-500" strokeWidth={2.5} />
        </motion.div>
        <div>
          <h2 className="text-2xl font-black">Usuario Test</h2>
          <p className="text-gray-600 font-bold mb-2">test@test.com</p>
          <div className="inline-flex items-center gap-1.5 bg-red-100 px-3 py-1 border-[1.5px] border-red-300 shadow-[2px_2px_0px_0px_#ff0000]">
            <span className="w-2 h-2 rounded-full bg-[#ff0000] animate-pulse"></span>
            <span className="text-[#ff0000] text-xs font-black uppercase">Pro Activo</span>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4 pt-4">
        <motion.h3 variants={itemVariants} className="font-black text-lg">Preferencias de Entrenamiento</motion.h3>
        
        <div className="space-y-0">
          <motion.div variants={itemVariants} className="bg-black text-white p-4 flex items-center border-[3px] border-black border-b-0 cursor-pointer hover:bg-gray-900 transition-colors group">
            <div className="w-10 h-10 bg-white flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <Layers className="h-5 w-5 text-[#ff0000]" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg group-hover:text-[#ff0000] transition-colors">Nivel</h4>
              <p className="text-gray-400 text-sm font-bold">{level || "Intermedio"}</p>
            </div>
            <ChevronRight className="h-6 w-6 text-gray-500 group-hover:translate-x-1 transition-transform" />
          </motion.div>

          <motion.div variants={itemVariants} className="bg-black text-white p-4 flex items-center border-[3px] border-black border-b-0 cursor-pointer hover:bg-gray-900 transition-colors group">
            <div className="w-10 h-10 bg-white flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <Target className="h-5 w-5 text-[#ff0000]" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg group-hover:text-[#ff0000] transition-colors">Objetivo</h4>
              <p className="text-gray-400 text-sm font-bold truncate max-w-[200px]">{goal || "Fuerza y Tonificación"}</p>
            </div>
            <ChevronRight className="h-6 w-6 text-gray-500 group-hover:translate-x-1 transition-transform" />
          </motion.div>

          <motion.div variants={itemVariants} className="bg-black text-white p-4 flex items-center border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer relative z-10 hover:bg-gray-900 transition-colors group">
            <div className="w-10 h-10 bg-white flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <Dumbbell className="h-5 w-5 text-[#ff0000]" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-lg group-hover:text-[#ff0000] transition-colors">Equipo</h4>
              <p className="text-gray-400 text-sm font-bold truncate">{equipment || "Mancuernas"}</p>
            </div>
            <ChevronRight className="h-6 w-6 text-gray-500 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </div>
      </div>

      <motion.div variants={itemVariants} className="pt-8 mb-4">
        <div className="h-[2px] w-full bg-black mb-6"></div>
        <Button 
          variant="outline" 
          className="w-full text-lg border-[3px] border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
          onClick={handleLogout}
        >
          CERRAR SESIÓN
        </Button>
      </motion.div>
    </motion.div>
  );
}
