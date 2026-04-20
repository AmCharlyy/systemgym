import { ChevronLeft, Smartphone, Mail, Lock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/src/components/ui/button";
import { useStore } from "@/src/store";
import { auth } from "@/src/firebase";

export default function Settings() {
  const navigate = useNavigate();
  const reset = useStore(state => state.reset);

  const handleLogout = async () => {
    await auth.signOut();
    reset();
    navigate("/");
  };

  return (
    <div className="flex min-h-[100dvh] flex-col p-6 space-y-8 bg-[#f5f5f5]">
      <header className="flex items-center pb-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft className="h-6 w-6 stroke-[2.5px]" />
        </button>
        <h1 className="text-2xl font-black uppercase tracking-tight ml-2">CONFIGURACIÓN</h1>
      </header>

      <div className="space-y-4">
        <h3 className="font-black uppercase tracking-widest text-sm text-gray-600">NOTIFICACIONES</h3>
        
        <div className="bg-black text-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="p-5 flex items-center justify-between border-b-[3px] border-gray-800">
            <div className="flex items-center gap-4">
              <Smartphone className="h-6 w-6 text-gray-400" />
              <div>
                <h4 className="font-bold text-lg">Notificaciones Push</h4>
                <p className="text-xs font-bold text-gray-400 mt-1">Recordatorios de entrenamiento</p>
              </div>
            </div>
            {/* Custom Toggle */}
            <div className="w-12 h-6 bg-[#ff0000] rounded-full p-1 flex justify-end">
              <div className="w-4 h-4 bg-black rounded-full"></div>
            </div>
          </div>

          <div className="p-5 flex items-center gap-4">
            <Mail className="h-6 w-6 text-gray-400" />
            <div>
              <h4 className="font-bold text-lg">Correos Electrónicos</h4>
              <p className="text-xs font-bold text-gray-400 mt-1">Resumen semanal y noticias</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-black uppercase tracking-widest text-sm text-gray-600">PRIVACIDAD</h3>
        
        <div className="bg-black text-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 flex items-center gap-4">
          <Lock className="h-6 w-6 text-gray-400" />
          <div>
            <h4 className="font-bold text-lg">Perfil Público</h4>
            <p className="text-xs font-bold text-gray-400 mt-1">Otros usuarios pueden ver tus rutinas</p>
          </div>
        </div>
      </div>

      <div className="pt-6 space-y-6">
        <div className="h-[2px] bg-black/20 w-full"></div>
        <Button 
          variant="outline" 
          className="w-full text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" /> CERRAR SESIÓN
        </Button>

        <button className="w-full font-bold text-[#ff0000] pt-4 hover:underline">
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
}
