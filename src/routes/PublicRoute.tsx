import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "@/src/store/userStore";

export default function PublicRoute({ children }: { children: React.ReactNode }) {
    const user = useUserStore((state) => state.user);

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}
