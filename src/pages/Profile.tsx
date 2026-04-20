import { useEffect, useState } from "react";
import { Settings as SettingsIcon, User, Layers, Target, Dumbbell, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/src/components/ui/button";
import { useStore } from "@/src/store";
import { motion } from "motion/react";
import { auth } from "@/src/firebase";

const LEVEL_OPTIONS = ["Principiante", "Intermedio", "Avanzado"];
const EQUIPMENT_OPTIONS = [
  "Sin equipo (peso corporal)",
  "Mancuernas",
  "Ligas de resistencia",
  "Barra y discos",
  "Máquinas de gimnasio"
];
const GOAL_OPTIONS = ["Fuerza", "Cardio", "Tonificación", "Pérdida de peso"];

export default function Profile() {
  const navigate = useNavigate();
  const { level, equipment, goal, setPreferences, reset } = useStore();
  const user = auth.currentUser;
  const [isEditing, setIsEditing] = useState(false);
  const [levelInput, setLevelInput] = useState(level);
  const [equipmentInput, setEquipmentInput] = useState(equipment);
  const [goalInput, setGoalInput] = useState(goal);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLevelInput(level);
    setEquipmentInput(equipment);
    setGoalInput(goal);
  }, [level, equipment, goal]);

  const handleLogout = async () => {
    await auth.signOut();
    reset();
    navigate("/");
  };

  const handleSavePreferences = async () => {
    setSaving(true);
    setStatus("");

    await setPreferences(
      levelInput || "Intermedio",
      equipmentInput || "Mancuernas",
      goalInput || "Fuerza"
    );

    setSaving(false);
    setIsEditing(false);
    setStatus("Preferencias actualizadas correctamente.");
  };

  const hasChanges =
    levelInput !== level ||
    equipmentInput !== equipment ||
    goalInput !== goal;

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
          className="w-24 h-24 rounded-full border-[4px] border-black flex items-center justify-center bg-gray-100 flex-shrink-0 relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform duration-300"
        >
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <User className="h-10 w-10 text-gray-500" strokeWidth={2.5} />
          )}
        </motion.div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-black truncate">{user?.displayName || "Usuario"}</h2>
          <p className="text-gray-600 font-bold mb-2 truncate">{user?.email}</p>
          <div className="inline-flex items-center gap-1.5 bg-red-100 px-3 py-1 border-[1.5px] border-red-300 shadow-[2px_2px_0px_0px_#ff0000]">
            <span className="w-2 h-2 rounded-full bg-[#ff0000] animate-pulse"></span>
            <span className="text-[#ff0000] text-xs font-black uppercase">Pro Activo</span>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4 pt-4">
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="font-black text-lg">Preferencias de Entrenamiento</h3>
          <Button
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? "Cerrar" : "Editar preferencias"}
          </Button>
        </motion.div>

        {isEditing ? (
          <motion.div variants={itemVariants} className="space-y-6 bg-white border-[3px] border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block text-sm font-black uppercase tracking-widest text-gray-700">
                Nivel
                <select
                  value={levelInput}
                  onChange={(e) => setLevelInput(e.target.value)}
                  className="mt-2 w-full border border-gray-300 rounded-md p-3 text-sm font-bold"
                >
                  {LEVEL_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-black uppercase tracking-widest text-gray-700">
                Equipo
                <select
                  value={equipmentInput}
                  onChange={(e) => setEquipmentInput(e.target.value)}
                  className="mt-2 w-full border border-gray-300 rounded-md p-3 text-sm font-bold"
                >
                  {EQUIPMENT_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-black uppercase tracking-widest text-gray-700">
                Objetivo
                <select
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  className="mt-2 w-full border border-gray-300 rounded-md p-3 text-sm font-bold"
                >
                  {GOAL_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <Button
                onClick={handleSavePreferences}
                disabled={!hasChanges || saving}
                className="w-full sm:w-auto text-lg"
              >
                {saving ? "Guardando..." : "Guardar cambios"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setLevelInput(level);
                  setEquipmentInput(equipment);
                  setGoalInput(goal);
                  setStatus("");
                }}
                className="w-full sm:w-auto text-lg border-black text-black hover:bg-black hover:text-white"
              >
                Cancelar
              </Button>
            </div>

            {status && <p className="text-sm font-bold text-green-600">{status}</p>}
          </motion.div>
        ) : (
          <div className="space-y-0">
            <motion.div variants={itemVariants} className="bg-black text-white p-4 flex items-center border-[3px] border-black border-b-0 hover:bg-gray-900 transition-colors group">
              <div className="w-10 h-10 bg-white flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <Layers className="h-5 w-5 text-[#ff0000]" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg group-hover:text-[#ff0000] transition-colors">Nivel</h4>
                <p className="text-gray-400 text-sm font-bold">{level || "Sin definir"}</p>
              </div>
              <ChevronRight className="h-6 w-6 text-gray-500 group-hover:translate-x-1 transition-transform" />
            </motion.div>

            <motion.div variants={itemVariants} className="bg-black text-white p-4 flex items-center border-[3px] border-black border-b-0 hover:bg-gray-900 transition-colors group">
              <div className="w-10 h-10 bg-white flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <Target className="h-5 w-5 text-[#ff0000]" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg group-hover:text-[#ff0000] transition-colors">Objetivo</h4>
                <p className="text-gray-400 text-sm font-bold truncate max-w-[200px]">{goal || "Sin definir"}</p>
              </div>
              <ChevronRight className="h-6 w-6 text-gray-500 group-hover:translate-x-1 transition-transform" />
            </motion.div>

            <motion.div variants={itemVariants} className="bg-black text-white p-4 flex items-center border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-900 transition-colors group">
              <div className="w-10 h-10 bg-white flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <Dumbbell className="h-5 w-5 text-[#ff0000]" strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-lg group-hover:text-[#ff0000] transition-colors">Equipo</h4>
                <p className="text-gray-400 text-sm font-bold truncate">{equipment || "Sin definir"}</p>
              </div>
              <ChevronRight className="h-6 w-6 text-gray-500 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </div>
        )}
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
