import { Trophy, Clock, Calendar } from "lucide-react";
import { Card } from "@/src/components/ui/card";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";

const performanceData = [
  { name: "L", value: 30 },
  { name: "M", value: 20 },
  { name: "X", value: 45 },
  { name: "J", value: 10 },
  { name: "V", value: 35 },
  { name: "S", value: 60 },
  { name: "D", value: 15 },
];

export default function History() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-black uppercase tracking-tight">HISTORIAL_SISTEMA</h1>
        <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gray-500">DATA_TRACKING: ACTIVO</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <Card className="flex flex-col items-center justify-center p-6 border-b-0 border-r-0 border-t-[3px] border-l-[3px] rounded-none">
          <Trophy className="h-8 w-8 mb-2" strokeWidth={2} />
          <span className="text-4xl font-black">12</span>
          <span className="text-[10px] font-black uppercase tracking-widest mt-1">RUTINAS</span>
        </Card>
        
        <Card variant="black" className="flex flex-col items-center justify-center p-6 border-b-0 border-r-0 border-t-[3px] border-l-[3px] rounded-none">
          <Clock className="h-8 w-8 mb-2" strokeWidth={2} />
          <span className="text-4xl font-black">8.5</span>
          <span className="text-[10px] font-black uppercase tracking-widest mt-1 text-gray-400">HORAS</span>
        </Card>

        <Card variant="black" className="col-span-2 flex flex-col items-center justify-center p-8 border-b-0 border-r-0 border-t-[3px] border-l-[3px] rounded-none">
          <Calendar className="h-8 w-8 mb-2" strokeWidth={2} />
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black">5</span>
            <span className="text-xs font-black uppercase tracking-widest">DÍAS/SEMANA</span>
          </div>
        </Card>
      </div>

      <div className="space-y-3 pt-4">
        <h3 className="font-black uppercase tracking-wider text-sm">GRAPH_MINUTOS</h3>
        <Card className="p-4 h-64 rounded-none">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <XAxis dataKey="name" axisLine={{ stroke: '#000', strokeWidth: 2 }} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#000' }} />
              <Line type="monotone" dataKey="value" stroke="#ff0000" strokeWidth={4} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
