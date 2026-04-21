import { useState, useEffect, useMemo, useCallback } from "react";
import { X, Pause, Play, SkipForward, SkipBack, CheckCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/src/components/ui/button";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/src/contexts/AuthContext";
import { db } from "@/src/firebase";

const WORKOUT_ROUTINE_SESSION_KEY = "fitapp-selected-workout-routine";

function parseRoutineMinutes(timeText: string | undefined) {
  if (!timeText) return 10;
  const match = timeText.match(/\d+/);
  return match ? Number(match[0]) : 10;
}

export default function ActiveWorkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const stateRoutine = (location.state as any)?.routine;
  const [routine, setRoutine] = useState<any>(stateRoutine || null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const defaultRoutine = useMemo(() => ({
    title: "Rutina rápida",
    time: "10 min",
    level: "Intermedio",
    exercises: [
      { title: "Sentadillas libres", sets: "3x12", rest: "Descanso 60s" },
      { title: "Flexiones", sets: "3x12", rest: "Descanso 60s" },
      { title: "Plancha", sets: "3x45s", rest: "Descanso 45s" },
    ],
  }), []);

  useEffect(() => {
    if (stateRoutine) {
      setRoutine(stateRoutine);
      sessionStorage.setItem(WORKOUT_ROUTINE_SESSION_KEY, JSON.stringify(stateRoutine));
    } else {
      const stored = sessionStorage.getItem(WORKOUT_ROUTINE_SESSION_KEY);
      if (stored) {
        try {
          setRoutine(JSON.parse(stored));
        } catch {
          setRoutine(defaultRoutine);
        }
      } else {
        setRoutine(defaultRoutine);
      }
    }
    setCurrentExerciseIndex(0);
    setIsComplete(false);
    setSaved(false);
    setSaveError(null);
    setIsPaused(false);
  }, [stateRoutine, defaultRoutine]);

  const exercise = routine?.exercises?.[currentExerciseIndex];
  const exerciseSeconds = useMemo(() => {
    const totalMinutes = parseRoutineMinutes(routine?.time);
    const count = routine?.exercises?.length || 1;
    return Math.max(30, Math.round((totalMinutes * 60) / count));
  }, [routine]);

  useEffect(() => {
    if (exercise) {
      setTimeLeft(exerciseSeconds);
    }
  }, [exercise, exerciseSeconds]);

  const advanceExercise = useCallback(() => {
    if (!routine) return;
    if (currentExerciseIndex + 1 < routine.exercises.length) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setIsPaused(false);
      return;
    }
    setIsComplete(true);
  }, [currentExerciseIndex, routine]);

  useEffect(() => {
    if (isPaused || isComplete || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          advanceExercise();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused, isComplete, timeLeft, advanceExercise]);

  const routineDurationMinutes = parseRoutineMinutes(routine?.time);
  const routineCalories = Math.max(100, Math.round(routineDurationMinutes * 8 + (routine?.exercises?.length || 1) * 10));

  useEffect(() => {
    const saveWorkout = async () => {
      if (!isComplete || saved || !currentUser) return;

      try {
        await addDoc(collection(db, "users", currentUser.uid, "history"), {
          title: routine?.title || "Rutina completada",
          duration: routineDurationMinutes,
          calories: routineCalories,
          completedAt: serverTimestamp(),
        });
        setSaved(true);
        setSaveError(null);
      } catch (error) {
        console.error("Error guardando historial:", error);
        setSaveError("No se pudo guardar el historial. Intenta de nuevo más tarde.");
      }
    };

    saveWorkout();
  }, [isComplete, saved, currentUser, routine, routineDurationMinutes, routineCalories]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder.toString().padStart(2, "0")}`;
  };

  if (isComplete) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-black text-white p-6 text-center">
        <div className="w-32 h-32 bg-[#ff0000] rounded-full flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(255,0,0,0.5)]">
          <CheckCircle className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-4">¡Rutina Completada!</h1>
        <p className="text-lg font-bold text-gray-300 mb-2">
          Has terminado todos los ejercicios.
        </p>
        <p className="text-sm text-gray-400 mb-8">
          {saved && !saveError
            ? "Tu historial se ha guardado correctamente."
            : saveError || "Guardando historial..."}
        </p>
        {saveError ? (
          <Button
            className="w-full h-16 text-xl mb-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none"
            onClick={() => {
              setSaved(false);
              setSaveError(null);
            }}
          >
            REINTENTAR GUARDADO
          </Button>
        ) : null}
        <Button 
          className="w-full h-16 text-xl shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none"
          onClick={() => navigate("/dashboard")}
        >
          VOLVER AL INICIO
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-gray-100">
      {/* Top half: Image background & info */}
      <div className="relative h-2/5 min-h-[300px] bg-black text-white flex flex-col justify-between p-6">
        <button 
          className="absolute top-6 right-6 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm z-20"
          onClick={() => navigate("/dashboard")}
        >
          <X className="h-5 w-5" />
        </button>
        
        {/* Placeholder gradient to simulate dark overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-0"></div>

        <div className="relative z-10 mt-auto pb-4">
          <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">
            EJERCICIO {currentExerciseIndex + 1} DE {routine?.exercises?.length || 1}
          </p>
          <h2 className="text-4xl font-black tracking-tight">{exercise?.title || "Rutina activa"}</h2>
          <div className="mt-4 inline-block bg-red-200/20 text-[#ff0000] border-2 border-[#ff0000] font-black px-4 py-1.5 rounded-full">
            {exercise?.sets || "-"}
          </div>
          <p className="mt-3 text-sm uppercase tracking-widest text-gray-400">{exercise?.rest || "Descanso"}</p>
        </div>
        
        {/* Progress bar line */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-800 z-20">
          <div className="h-full bg-[#ff0000]" style={{ width: `${((currentExerciseIndex + 1) / (routine?.exercises?.length || 1)) * 100}%` }}></div>
        </div>
      </div>

      {/* Bottom half: Timer & Controls */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 pb-20 relative bg-gray-50">
        
        {/* Circular Timer Visual */}
        <div className="relative w-64 h-64 flex items-center justify-center mb-8">
          <svg className="w-full h-full transform -rotate-90 absolute inset-0">
            <circle cx="128" cy="128" r="120" stroke="#4b5563" strokeWidth="8" fill="none" className="opacity-20" />
            <circle 
              cx="128" 
              cy="128" 
              r="120" 
              stroke="#06b6d4" 
              strokeWidth="8" 
              fill="none" 
              strokeDasharray={120 * 2 * Math.PI}
              strokeDashoffset={(120 * 2 * Math.PI) * (1 - timeLeft / Math.max(1, exerciseSeconds))}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="text-center">
            <div className="text-7xl font-black tracking-tighter leading-none">{formatTime(timeLeft)}</div>
            <div className="uppercase font-bold tracking-widest text-gray-400 text-sm mt-2">RESTANTES</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button
            className="w-16 h-16 rounded-full bg-gray-400 text-white flex items-center justify-center hover:bg-gray-500 transition-colors"
            onClick={() => {
              if (currentExerciseIndex > 0) {
                setCurrentExerciseIndex((prev) => prev - 1);
                setIsPaused(false);
              }
            }}
          >
            <SkipBack className="h-8 w-8 ml-[-2px]" />
          </button>
          <button 
            className="w-24 h-24 rounded-full bg-[#ff0000] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(255,0,0,0.4)] hover:scale-105 transition-transform"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? <Play className="h-10 w-10 ml-2" /> : <Pause className="h-10 w-10" />}
          </button>
          <button 
            className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-900 transition-colors"
            onClick={advanceExercise}
          >
            <SkipForward className="h-8 w-8 ml-[2px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
