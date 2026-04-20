import { ChevronLeft, Smartphone, Mail, Lock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/src/components/ui/button";
import { useUserStore } from "@/src/store/userStore";
import { useOnboardingStore } from "../store/onboardingStore";
import { logoutUser } from "@/src/services/firebase/auth";
import { deleteUser } from "firebase/auth";
import { deleteUserData } from "@/src/services/firebase/userPreferences";
import { auth } from "@/src/services/firebase/config";

export default function Settings() {
  const navigate = useNavigate();
  const clearUser = useUserStore(state => state.clearUser);
  const resetOnboarding = useOnboardingStore(state => state.resetOnboarding);

/*   const handleLogout = async () => {
    await logoutUser();
    clearUser();
    resetOnboarding();
    navigate("/");
  }; */
  
  const handleDeleteAccount = async () => {
  const user = auth.currentUser;
  if (!user) return;

  await deleteUserData(user.uid);
  await deleteUser(user);

  clearUser();
  resetOnboarding();
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
          className="w-full text-lg"
          onClick={handleDeleteAccount}
        >
          <LogOut className="h-5 w-5 mr-3" /> Eliminar Cuenta
        </Button>

{/*         <button className="w-full font-bold text-[#ff0000] pt-4 hover:underline">
          Eliminar cuenta
        </button> */}
      </div>
    </div>
  );
}
