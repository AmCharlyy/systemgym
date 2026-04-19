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

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // Rutas públicas
      { 
        index: true, 
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ) 
      },

      { 
        path: "register", 
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ) 
      },

      // Rutas protegidas
      { 
        path: "onboarding", 
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        ) 
      },

      { 
        path: "dashboard", 
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ) 
      },

      { 
        path: "generate", 
        element: (
          <ProtectedRoute>
            <GenerateRoutine />
          </ProtectedRoute>
        ) 
      },

      { 
        path: "routines", 
        element: (
          <ProtectedRoute>
            <RoutinesList />
          </ProtectedRoute>
        ) 
      },

      { 
        path: "routine/:id", 
        element: (
          <ProtectedRoute>
            <RoutineDetail />
          </ProtectedRoute>
        ) 
      },

      { 
        path: "exercise/:id", 
        element: (
          <ProtectedRoute>
            <ExerciseDetail />
          </ProtectedRoute>
        ) 
      },

      { 
        path: "workout", 
        element: (
          <ProtectedRoute>
            <ActiveWorkout />
          </ProtectedRoute>
        ) 
      },

      { 
        path: "history", 
        element: (
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        ) 
      },

      { 
        path: "profile", 
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ) 
      },

      { 
        path: "settings", 
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ) 
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
