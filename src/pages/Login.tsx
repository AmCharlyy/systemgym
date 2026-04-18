import React from "react";
import { Dumbbell } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/src/store";
import { motion } from "motion/react";

export default function Login() {
  const navigate = useNavigate();
  const login = useStore(state => state.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate("/onboarding");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex min-h-screen flex-col items-center justify-center p-6 bg-white bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:16px_16px]"
    >
      <motion.div 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }} 
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
        className="mb-8 flex flex-col items-center gap-4"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#ff0000] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-[3px] border-black transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <Dumbbell className="h-10 w-10 text-white" strokeWidth={2.5} />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-black uppercase tracking-tight">FITAPP WIREFRAME</h1>
          <p className="mt-2 text-sm text-gray-500 uppercase tracking-widest font-bold">INICIA SESIÓN PARA CONTINUAR</p>
        </div>
      </motion.div>

      <form onSubmit={handleLogin} className="w-full space-y-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <label className="text-xs font-black uppercase tracking-wider text-gray-700">
            CORREO ELECTRÓNICO <span className="text-[#ff0000]">*</span>
          </label>
          <Input 
            type="email" 
            placeholder="EJEMPLO@CORREO.COM" 
            defaultValue="ejemplo@correo.com"
            required 
            className="transition-all focus:-translate-y-1 focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <label className="text-xs font-black uppercase tracking-wider text-gray-700">
            CONTRASEÑA <span className="text-[#ff0000]">*</span>
          </label>
          <Input 
            type="password" 
            placeholder="••••••••" 
            defaultValue="password"
            required 
            className="transition-all focus:-translate-y-1 focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="pt-4 space-y-4"
        >
          <Button type="submit" className="w-full text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            INICIAR SESIÓN
          </Button>
          <Button type="button" variant="outline" className="w-full transition-transform hover:bg-[#e5e5e5]">
            ¿NO TIENES CUENTA? REGÍSTRATE
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
