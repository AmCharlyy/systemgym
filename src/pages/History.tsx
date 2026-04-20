import { useEffect, useMemo, useState } from "react";
import { Trophy, Clock, Calendar } from "lucide-react";
import { Card } from "@/src/components/ui/card";
import { useAuth } from "@/src/contexts/AuthContext";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "@/src/firebase";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";

interface WorkoutRecord {
  id: string;
  title: string;
  duration: number;
  calories: number;
  completedAt: any;
}

const dayOrder = [1, 2, 3, 4, 5, 6, 0];
const labels = ["L", "M", "X", "J", "V", "S", "D"];

function toDate(value: any): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value?.toDate === "function") return value.toDate();
  return null;
}

export default function History() {
  const { currentUser } = useAuth();
  const [history, setHistory] = useState<WorkoutRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      if (!currentUser) {
        setHistory([]);
        setLoading(false);
        return;
      }

      try {
        const historyQuery = query(
          collection(db, "users", currentUser.uid, "history"),
          orderBy("completedAt", "desc"),
          limit(12)
        );

        const snapshot = await getDocs(historyQuery);
        setHistory(
          snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title || "Rutina completada",
              duration: data.duration || 0,
              calories: data.calories || 0,
              completedAt: data.completedAt || null,
            };
          })
        );
      } catch (error) {
        console.error("Error cargando historial:", error);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [currentUser]);

  const totalWorkouts = history.length;
  const totalMinutes = history.reduce((acc, item) => acc + item.duration, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  const daysActive = useMemo(() => {
    const uniqueDays = new Set(
      history
        .map((item) => toDate(item.completedAt))
        .filter(Boolean)
        .map((date) => date!.toDateString())
    );
    return uniqueDays.size;
  }, [history]);

  const chartData = useMemo(() => {
    return labels.map((label, index) => {
      const dayIndex = dayOrder[index];
      const value = history.reduce((sum, item) => {
        const date = toDate(item.completedAt);
        return date?.getDay() === dayIndex ? sum + item.duration : sum;
      }, 0);

      return {
        name: label,
        value,
      };
    });
  }, [history]);

  return (
    <div className="flex flex-col p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-black uppercase tracking-tight">Historial</h1>
        <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gray-500">Registra tus rutinas completas y consulta tu progreso.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex flex-col items-center justify-center p-6 border-b-0 border-r-0 border-t-[3px] border-l-[3px] rounded-none">
          <Trophy className="h-8 w-8 mb-2" strokeWidth={2} />
          <span className="text-4xl font-black">{totalWorkouts}</span>
          <span className="text-[10px] font-black uppercase tracking-widest mt-1">Sesiones</span>
        </Card>

        <Card variant="black" className="flex flex-col items-center justify-center p-6 border-b-0 border-r-0 border-t-[3px] border-l-[3px] rounded-none">
          <Clock className="h-8 w-8 mb-2" strokeWidth={2} />
          <span className="text-4xl font-black">{totalHours}{remainingMinutes > 0 ? `h ${remainingMinutes}m` : "h"}</span>
          <span className="text-[10px] font-black uppercase tracking-widest mt-1 text-gray-400">Total entrenado</span>
        </Card>

        <Card variant="black" className="flex flex-col items-center justify-center p-8 border-b-0 border-r-0 border-t-[3px] border-l-[3px] rounded-none">
          <Calendar className="h-8 w-8 mb-2" strokeWidth={2} />
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black">{daysActive}</span>
            <span className="text-xs font-black uppercase tracking-widest">Días activos</span>
          </div>
        </Card>
      </div>

      <div className="space-y-3 pt-4">
        <h3 className="font-black uppercase tracking-wider text-sm">Minutos por día</h3>
        <Card className="p-4 h-64 rounded-none">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" axisLine={{ stroke: '#000', strokeWidth: 2 }} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#000' }} />
              <Line type="monotone" dataKey="value" stroke="#ff0000" strokeWidth={4} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black uppercase tracking-tight">Últimas sesiones</h3>
          <span className="text-sm uppercase tracking-widest text-gray-500">{loading ? "Cargando..." : `${totalWorkouts} completadas`}</span>
        </div>

        {loading ? (
          <Card className="p-6 text-center">Cargando historial...</Card>
        ) : history.length === 0 ? (
          <Card className="p-6 text-center">Aún no tienes registros de entrenamiento. Completa una rutina para ver tu historial.</Card>
        ) : (
          <div className="space-y-3">
            {history.map((item) => {
              const date = toDate(item.completedAt);
              return (
                <Card key={item.id} className="p-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="font-black text-lg">{item.title}</p>
                      <p className="text-sm uppercase tracking-widest text-gray-500">{date ? date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' }) : 'Fecha no disponible'}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-2xl">{item.duration} min</p>
                      <p className="text-sm uppercase tracking-widest text-gray-500">{item.calories} kcal</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
