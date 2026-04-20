import { createBrowserRouter, RouterProvider, Navigate, Outlet, useLocation } from "react-router-dom";
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
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useStore } from "./store";

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  const level = useStore(state => state.level);
  const location = useLocation();

  if (!currentUser) return <Navigate to="/" replace />;

  // User logged in but hasn't completed onboarding
  if (!level && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  // User onboarded already and is trying to access onboarding
  if (level && location.pathname === '/onboarding') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

const IndexRoute = () => {
  const { currentUser } = useAuth();
  const level = useStore(state => state.level);

  if (currentUser) {
    if (!level) return <Navigate to="/onboarding" replace />;
    return <Navigate to="/dashboard" replace />;
  }
  return <Login />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <IndexRoute /> },
      { path: "register", element: <Register /> },
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
