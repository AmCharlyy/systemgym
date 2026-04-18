import { Settings, Activity, PlusCircle, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";
import { motion } from "motion/react";

const data = [
  { name: "L", value: 40 },
  { name: "M", value: 30 },
  { name: "X", value: 60 },
  { name: "J", value: 0 },
  { name: "V", value: 45 },
  { name: "S", value: 80 },
  { name: "D", value: 20 },
];

export default function Dashboard() {
  return (
    <motion.div 
      initial="hidden" animate="show" 
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
      className="flex flex-col p-6 space-y-8"
    >
      <header className="flex items-start justify-between">
        <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
          <h1 className="text-2xl font-black uppercase tracking-tight">FITNESS SYSTEM</h1>
          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#ff0000]">ESTADO: ACTIVO</p>
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}>
          <Link to="/settings" className="block border-[3px] border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none bg-white transition-all">
            <Settings className="h-6 w-6" strokeWidth={2.5} />
          </Link>
        </motion.div>
      </header>

      {/* Routine of the Day */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="relative group">
        <div className="absolute top-0 right-0 w-4 h-[100%] bg-[#ff0000] z-10 border-y-[3px] border-r-[3px] border-black transition-transform group-hover:w-full group-hover:bg-[#ff0000]/10 duration-500"></div>
        <Card className="pr-4 rounded-none transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-20">
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3 border-b-[3px] border-black pb-4 relative">
              <div className="border-[3px] border-black p-1 bg-white">
                <Activity className="h-6 w-6 text-[#ff0000]" strokeWidth={2.5}/>
              </div>
              <div>
                <h2 className="font-bold uppercase tracking-tight text-xl">RUTINA DEL DÍA</h2>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">REPORT_ID: 26.3</p>
              </div>
            </div>
            
            <p className="font-bold text-sm leading-snug">
              Generar nueva rutina basada en objetivos actuales del sistema.
            </p>
            
            <Link to="/generate" className="block pt-2">
              <Button className="w-full text-lg gap-2 shadow-[4px_4px_0px_0px_rgba(255,0,0,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1">
                <PlusCircle className="h-5 w-5" strokeWidth={3} />
                GENERAR
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>

      {/* Weekly Progress */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="space-y-3">
        <div className="flex justify-between items-center group cursor-pointer" onClick={() => window.location.href='/history'}>
          <h3 className="font-black uppercase tracking-wider text-sm flex items-center gap-2">PROGRESO_SEMANAL</h3>
          <span className="text-xs font-bold uppercase flex items-center text-gray-500 group-hover:text-black transition-colors">
            VER <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
        
        <Card className="p-4 h-48 rounded-none border-b-[6px] border-l-[6px] transition-transform hover:-translate-y-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" axisLine={true} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#000' }} />
              <Bar dataKey="value" fill="#ff0000">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.value > 50 ? '#ff0000' : '#000'} className="hover:opacity-80 cursor-pointer transition-opacity" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Quick Access */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="space-y-3 pb-8">
        <h3 className="font-black uppercase tracking-wider text-sm">ACCESOS_RÁPIDOS</h3>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/routines">
            <Card variant="black" className="p-4 h-24 rounded-none border-[3px] border-black transition-all hover:bg-[#ff0000] hover:border-black hover:text-white group flex items-center justify-center overflow-hidden relative">
               <ArrowRight className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transform -translate-x-8 group-hover:translate-x-0 transition-all absolute" />
               <h4 className="font-black uppercase group-hover:opacity-0 transition-opacity">RUTINAS</h4>
            </Card>
          </Link>
          <Link to="/profile">
            <Card variant="black" className="p-4 h-24 rounded-none border-[3px] border-black transition-all hover:bg-white hover:text-black group flex items-center justify-center overflow-hidden relative">
               <ArrowRight className="h-8 w-8 text-black opacity-0 group-hover:opacity-100 transform -translate-x-8 group-hover:translate-x-0 transition-all absolute" />
               <h4 className="font-black uppercase group-hover:opacity-0 transition-opacity">PERFIL</h4>
            </Card>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
