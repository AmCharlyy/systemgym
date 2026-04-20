import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Login from "./pages/Login";
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
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";
import { useStore } from "./store";

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  const { fetchUserPreferences, setLoggedIn } = useStore();

  useEffect(() => {
    if (currentUser) {
      setLoggedIn(true);
      fetchUserPreferences(currentUser.uid);
    } else {
      setLoggedIn(false);
    }
  }, [currentUser, fetchUserPreferences, setLoggedIn]);

  if (!currentUser) return <Navigate to="/" replace />;
  return <Outlet />;
};

const AuthCheckRoute = () => {
  const { currentUser } = useAuth();
  if (currentUser) return <Navigate to="/dashboard" replace />;
  return <Login />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <AuthCheckRoute /> },
      { 
        element: <ProtectedRoute />, 
        children: [
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
        ]
      }
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
