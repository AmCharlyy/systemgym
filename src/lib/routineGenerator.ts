export type RoutineExercise = {
  title: string;
  sets: string;
  rest: string;
  notes?: string;
};

export type RoutineOutput = {
  title: string;
  time: string;
  level: string;
  exercises: RoutineExercise[];
};

export type RoutineProfile = {
  level?: string;
  equipment?: string;
  goal?: string;
};

const exerciseLibrary = [
  { title: "Sentadillas con peso corporal", equipment: ["bodyweight"], categories: ["leg", "compound"], difficulty: "Principiante" },
  { title: "Sentadilla con mancuernas", equipment: ["dumbbell"], categories: ["leg", "compound"], difficulty: "Intermedio" },
  { title: "Peso muerto con barra", equipment: ["barbell"], categories: ["leg", "posterior", "compound"], difficulty: "Avanzado" },
  { title: "Puente de glúteos", equipment: ["bodyweight", "dumbbell"], categories: ["leg", "glute"], difficulty: "Principiante" },
  { title: "Press de banca con barra", equipment: ["barbell"], categories: ["push", "compound"], difficulty: "Intermedio" },
  { title: "Press de pecho con mancuernas", equipment: ["dumbbell"], categories: ["push", "compound"], difficulty: "Principiante" },
  { title: "Fondos en paralelas", equipment: ["bodyweight"], categories: ["push", "compound"], difficulty: "Avanzado" },
  { title: "Press militar con mancuernas", equipment: ["dumbbell"], categories: ["push", "shoulder"], difficulty: "Intermedio" },
  { title: "Remo con mancuerna a una mano", equipment: ["dumbbell"], categories: ["pull", "compound"], difficulty: "Intermedio" },
  { title: "Dominadas asistidas", equipment: ["bodyweight"], categories: ["pull", "compound"], difficulty: "Avanzado" },
  { title: "Remo con barra", equipment: ["barbell"], categories: ["pull", "compound"], difficulty: "Avanzado" },
  { title: "Face pull con banda", equipment: ["band"], categories: ["pull", "shoulder"], difficulty: "Principiante" },
  { title: "Plancha frontal", equipment: ["bodyweight"], categories: ["core"], difficulty: "Principiante" },
  { title: "Elevaciones de piernas", equipment: ["bodyweight"], categories: ["core"], difficulty: "Principiante" },
  { title: "Crunch inverso", equipment: ["bodyweight"], categories: ["core"], difficulty: "Principiante" },
  { title: "Zancadas con mancuernas", equipment: ["dumbbell"], categories: ["leg", "single-leg"], difficulty: "Intermedio" },
  { title: "Peso muerto rumano con mancuernas", equipment: ["dumbbell"], categories: ["leg", "posterior"], difficulty: "Intermedio" },
  { title: "Columpios con pesa rusa", equipment: ["kettlebell"], categories: ["leg", "posterior", "power"], difficulty: "Intermedio" },
  { title: "Burpees", equipment: ["bodyweight"], categories: ["fullbody", "cardio"], difficulty: "Intermedio" },
  { title: "Saltos pliométricos", equipment: ["bodyweight"], categories: ["leg", "power"], difficulty: "Avanzado" },
  { title: "Remo invertido", equipment: ["bodyweight"], categories: ["pull", "compound"], difficulty: "Intermedio" },
  { title: "Press de hombros con kettlebell", equipment: ["kettlebell"], categories: ["push", "shoulder"], difficulty: "Intermedio" },
  { title: "Patada de tríceps con banda", equipment: ["band"], categories: ["push", "arm"], difficulty: "Principiante" },
  { title: "Curl de bíceps con mancuernas", equipment: ["dumbbell"], categories: ["pull", "arm"], difficulty: "Principiante" },
  { title: "Peso muerto con mancuernas a una pierna", equipment: ["dumbbell"], categories: ["leg", "posterior", "single-leg"], difficulty: "Avanzado" },
  { title: "Superman de espalda", equipment: ["bodyweight"], categories: ["posterior", "core"], difficulty: "Principiante" },
  { title: "Estiramiento de isquiotibiales", equipment: ["bodyweight"], categories: ["mobility", "stretch"], difficulty: "Principiante" },
  { title: "Movilidad de cadera", equipment: ["bodyweight"], categories: ["mobility", "stretch"], difficulty: "Principiante" },
  { title: "Estiramiento del pecho contra la pared", equipment: ["bodyweight"], categories: ["mobility", "stretch"], difficulty: "Principiante" },
  { title: "Escalador de montaña", equipment: ["bodyweight"], categories: ["core", "cardio"], difficulty: "Intermedio" },
  { title: "Peso muerto con banda", equipment: ["band"], categories: ["leg", "posterior"], difficulty: "Principiante" },
  { title: "Remo con banda", equipment: ["band"], categories: ["pull", "compound"], difficulty: "Principiante" },
  { title: "Press de pecho con banda", equipment: ["band"], categories: ["push", "compound"], difficulty: "Principiante" },
];

const goalProfiles: Record<string, {
  focus: string[];
  volume: "low" | "medium" | "high";
  emphasis: string[];
  restModifier: number;
  repRange: { min: number; max: number };
  exerciseCount: { Principiante: number; Intermedio: number; Avanzado: number };
  title: string;
}> = {
  Fuerza: {
    focus: ["compound", "leg", "push", "pull"],
    volume: "medium",
    emphasis: ["compound", "leg", "push", "pull"],
    restModifier: 1.1,
    repRange: { min: 4, max: 8 },
    exerciseCount: { Principiante: 5, Intermedio: 6, Avanzado: 7 },
    title: "Fuerza Máxima",
  },
  Hipertrofia: {
    focus: ["compound", "arm", "leg", "core"],
    volume: "high",
    emphasis: ["compound", "arm", "leg", "core"],
    restModifier: 0.8,
    repRange: { min: 8, max: 14 },
    exerciseCount: { Principiante: 5, Intermedio: 6, Avanzado: 7 },
    title: "Hipertrofia Total",
  },
  Resistencia: {
    focus: ["fullbody", "cardio", "bodyweight"],
    volume: "high",
    emphasis: ["fullbody", "cardio", "core"],
    restModifier: 0.6,
    repRange: { min: 12, max: 20 },
    exerciseCount: { Principiante: 5, Intermedio: 6, Avanzado: 7 },
    title: "Resistencia Intensa",
  },
  Movilidad: {
    focus: ["mobility", "stretch"],
    volume: "low",
    emphasis: ["mobility", "stretch"],
    restModifier: 0.4,
    repRange: { min: 30, max: 60 },
    exerciseCount: { Principiante: 6, Intermedio: 6, Avanzado: 7 },
    title: "Movilidad y Recuperación",
  },
};

const difficultyOrder = ["Principiante", "Intermedio", "Avanzado"];

function normalizeText(value?: string) {
  return String(value || "").trim();
}

function normalizeLevel(level?: string) {
  const normalized = normalizeText(level).toLowerCase();
  if (normalized.includes("princip")) return "Principiante";
  if (normalized.includes("inter")) return "Intermedio";
  if (normalized.includes("avanz")) return "Avanzado";
  return "Intermedio";
}

function normalizeGoal(goal?: string) {
  const normalized = normalizeText(goal).toLowerCase();
  if (normalized.includes("fuer") || normalized.includes("fuerza")) return "Fuerza";
  if (normalized.includes("hiper") || normalized.includes("crec") || normalized.includes("mus") || normalized.includes("masa")) return "Hipertrofia";
  if (normalized.includes("resis") || normalized.includes("card") || normalized.includes("resistencia")) return "Resistencia";
  if (normalized.includes("mov") || normalized.includes("flex") || normalized.includes("ralaj")) return "Movilidad";
  return "Hipertrofia";
}

function normalizeEquipment(equipment?: string) {
  const normalized = normalizeText(equipment).toLowerCase();
  if (!normalized) return ["bodyweight"];

  if (normalized.includes("mancu") || normalized.includes("dumbbell")) return ["dumbbell", "bodyweight"];
  if (normalized.includes("barra") || normalized.includes("barbell")) return ["barbell", "dumbbell", "bodyweight"];
  if (normalized.includes("kettlebell") || normalized.includes("pesa rusa") || normalized.includes("kettle")) return ["kettlebell", "dumbbell", "bodyweight"];
  if (normalized.includes("banda") || normalized.includes("band")) return ["band", "bodyweight"];
  if (normalized.includes("peso corporal") || normalized.includes("corporal") || normalized.includes("sin equipo")) return ["bodyweight"];
  if (normalized.includes("máquina") || normalized.includes("maquina")) return ["machine", "bodyweight"];
  return ["bodyweight", "dumbbell", "barbell", "band", "kettlebell"];
}

function shuffleArray<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function pickByEquipment(exercises: typeof exerciseLibrary, availableEquipment: string[]) {
  return exercises.filter((exercise) => exercise.equipment.some((item) => availableEquipment.includes(item)));
}

function pickExercises(profile: { level: string; goal: string; availableEquipment: string[] }) {
  const goalProfile = goalProfiles[profile.goal] || goalProfiles.Hipertrofia;
  const targetCount = goalProfile.exerciseCount[profile.level] || 6;
  const availableExercises = pickByEquipment(exerciseLibrary, profile.availableEquipment);

  const candidates = availableExercises
    .filter((exercise) => difficultyOrder.indexOf(exercise.difficulty) <= difficultyOrder.indexOf(profile.level))
    .sort((a, b) => {
      const aPriority = goalProfile.focus.some((tag) => exerciseHasTag(a, tag)) ? 0 : 1;
      const bPriority = goalProfile.focus.some((tag) => exerciseHasTag(b, tag)) ? 0 : 1;
      return aPriority - bPriority;
    });

  const chosen: typeof exerciseLibrary = [];
  const usedCategories = new Set<string>();

  for (const exercise of candidates) {
    if (chosen.length >= targetCount) break;
    const isDuplicate = chosen.some((item) => item.title === exercise.title);
    if (isDuplicate) continue;

    if (chosen.length < 2) {
      chosen.push(exercise);
      exercise.categories.forEach((tag) => usedCategories.add(tag));
      continue;
    }

    const hasNewCategory = exercise.categories.some((tag) => !usedCategories.has(tag));
    if (hasNewCategory || chosen.length + 1 >= targetCount) {
      chosen.push(exercise);
      exercise.categories.forEach((tag) => usedCategories.add(tag));
    }
  }

  if (chosen.length < targetCount) {
    const fallback = shuffleArray(availableExercises).filter((exercise) => !chosen.some((item) => item.title === exercise.title));
    while (chosen.length < targetCount && fallback.length > 0) {
      chosen.push(fallback.shift()!);
    }
  }

  return chosen.slice(0, targetCount);
}

function exerciseHasTag(exercise: { categories: string[] }, tag: string) {
  return exercise.categories.some((category) => category === tag || category.includes(tag));
}

function buildSetsAndRest(goal: string, level: string, categories: string[]) {
  const goalProfile = goalProfiles[goal] || goalProfiles.Hipertrofia;
  const repRange = goalProfile.repRange;
  const baseRest = Math.round(45 * goalProfile.restModifier);
  const levelModifier = level === "Principiante" ? 0.9 : level === "Avanzado" ? 1.1 : 1;
  const rest = Math.max(30, Math.round(baseRest * levelModifier));

  const isStrength = goal === "Fuerza";
  const isMobility = goal === "Movilidad";
  const isEndurance = goal === "Resistencia";

  const sets = isMobility ? 1 : isStrength ? 4 : 3;
  const reps = isMobility ? Math.max(20, repRange.max) : isEndurance ? Math.max(12, repRange.min + 4) : Math.round((repRange.min + repRange.max) / 2);
  const repValue = isMobility ? `${Math.round(repRange.min)}-${Math.round(repRange.max)}s` : `${sets}x${reps}`;

  const restText = isMobility ? "Descanso mínimo entre series" : `Descanso ${rest}s`;
  return { sets: repValue, rest: restText };
}

function estimateRoutineTime(exercises: RoutineExercise[], goal: string, level: string) {
  const goalProfile = goalProfiles[goal] || goalProfiles.Hipertrofia;
  const base = goalProfile.volume === "low" ? 30 : goalProfile.volume === "medium" ? 40 : 50;
  const levelBonus = level === "Avanzado" ? 10 : level === "Principiante" ? -5 : 0;
  const exerciseBonus = exercises.length * 3;
  const total = Math.max(25, base + levelBonus + exerciseBonus);
  return `${total} min`;
}

function createRoutineTitle(goal: string, level: string, equipment: string) {
  const goalProfile = goalProfiles[goal] || goalProfiles.Hipertrofia;
  const prefix = goalProfile.title;
  const equipmentTag = equipment ? `con ${equipment}` : "";
  return `${prefix} ${level} ${equipmentTag}`.trim();
}

export function generateRoutine(profile: RoutineProfile): RoutineOutput {
  const level = normalizeLevel(profile.level);
  const goal = normalizeGoal(profile.goal);
  const availableEquipment = normalizeEquipment(profile.equipment);

  const chosenExercises = pickExercises({ level, goal, availableEquipment });
  const routineExercises: RoutineExercise[] = chosenExercises.map((exercise) => {
    const { sets, rest } = buildSetsAndRest(goal, level, exercise.categories);
    return {
      title: exercise.title,
      sets,
      rest,
    };
  });

  const title = createRoutineTitle(goal, level, profile.equipment ? normalizeText(profile.equipment) : "Equipo Disponible");
  const time = estimateRoutineTime(routineExercises, goal, level);

  return {
    title,
    time,
    level,
    exercises: routineExercises,
  };
}
