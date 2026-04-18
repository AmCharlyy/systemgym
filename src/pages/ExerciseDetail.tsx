import { ChevronLeft, Info, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/src/components/ui/button";

export default function ExerciseDetail() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[100dvh] flex-col pb-20">
      <header className="flex items-start p-6 pb-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 -mt-1">
          <ChevronLeft className="h-6 w-6 stroke-[2.5px]" />
        </button>
        <div className="ml-2">
          <h1 className="text-2xl font-black uppercase tracking-tight leading-none mb-1">SENTADILLAS LIBRES</h1>
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-500">
            <span>PIERNAS</span>
            <span className="text-[#ff0000]">INTERMEDIO</span>
          </div>
        </div>
      </header>

      {/* Video Placeholder */}
      <div className="w-full h-48 bg-black relative flex items-end p-4">
        <div className="bg-[#ff0000] text-white flex items-center gap-2 px-3 py-1.5 font-bold text-xs uppercase tracking-wider">
          <Info className="h-4 w-4" /> DEMOSTRACIÓN VISUAL
        </div>
      </div>

      <div className="p-6 space-y-8">
        <p className="font-bold text-lg leading-relaxed">
          Las sentadillas libres son uno de los ejercicios fundamentales para el desarrollo de fuerza en el tren inferior.
        </p>

        <div className="space-y-4">
          <h3 className="font-black uppercase tracking-wider flex items-center gap-2">
            <Target className="h-5 w-5" /> MÚSCULOS_TRABAJADOS
          </h3>
          
          <div className="border-[3px] border-black p-4 space-y-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">PRINCIPALES</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#ff0000] text-white border-2 border-black font-black uppercase text-xs px-2 py-1">CUÁDRICEPS</span>
                <span className="bg-[#ff0000] text-white border-2 border-black font-black uppercase text-xs px-2 py-1">GLÚTEOS</span>
                <span className="bg-[#ff0000] text-white border-2 border-black font-black uppercase text-xs px-2 py-1">ISQUIOTIBIALES</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">SECUNDARIOS</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-200 text-black border-2 border-black font-black uppercase text-xs px-2 py-1">CORE</span>
                <span className="bg-gray-200 text-black border-2 border-black font-black uppercase text-xs px-2 py-1">LUMBARES</span>
                <span className="bg-gray-200 text-black border-2 border-black font-black uppercase text-xs px-2 py-1">PANTORRILLAS</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-black uppercase tracking-wider">PASOS_DE_EJECUCIÓN</h3>
          <div className="border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] divide-y-[3px] divide-black">
            <div className="p-4 flex gap-4">
              <div className="w-6 h-6 flex-shrink-0 bg-black text-white flex items-center justify-center font-bold text-sm">1</div>
              <p className="font-bold text-sm leading-snug">Párate con los pies separados al ancho de los hombros.</p>
            </div>
            <div className="p-4 flex gap-4">
              <div className="w-6 h-6 flex-shrink-0 bg-black text-white flex items-center justify-center font-bold text-sm">2</div>
              <p className="font-bold text-sm leading-snug">Mantén el pecho erguido y la mirada al frente.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto p-6 pt-0">
        <Button 
          className="w-full text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          onClick={() => navigate(-1)}
        >
          ENTENDIDO, VOLVER
        </Button>
      </div>
    </div>
  );
}
