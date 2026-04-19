import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import GenerateRoutine from "./pages/GenerateRoutine";
import RoutinesList from "./pages/RoutinesList";
import RoutineDetail from "./pages/RoutineDetail";
import ExerciseDetail from "./pages/ExerciseDetail";
import ActiveWorkout from "./pages/ActiveWorkout";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },  
      { path: "onboarding", element: <Onboarding /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "generate", element: <GenerateRoutine /> },
      { path: "routines", element: <RoutinesList /> },
      { path: "routine/:id", element: <RoutineDetail /> },
      { path: "exercise/:id", element: <ExerciseDetail /> },
      { path: "workout", element: <ActiveWorkout /> },
      { path: "history", element: <History /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
