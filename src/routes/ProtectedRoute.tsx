import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/src/store/userStore";
import { useOnboardingStore } from "@/src/store/onboardingStore";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const user = useUserStore((state) => state.user);
    const location = useLocation();

    if (!user) return <Navigate to="/" replace />;

    const incomplete =
        !user.level ||
        !user.goal ||
        !user.equipment ||
        user.equipment.length === 0;

    if (incomplete && location.pathname !== "/onboarding") {
        return <Navigate to="/onboarding" replace />;
    }

    return children;
}

