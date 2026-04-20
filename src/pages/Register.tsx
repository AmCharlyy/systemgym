import React, { useState } from "react";
import { Dumbbell } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { registerUser } from "../services/firebase/auth";
import { saveUserPreferences } from "../services/firebase/userPreferences";
import { useOnboardingStore } from "../store/onboardingStore";
import { useUserStore } from "../store/userStore";

export default function Register() {
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);
    const resetOnboarding = useOnboardingStore((state) => state.resetOnboarding);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            const userCredential = await registerUser(email, password);
            const user = userCredential.user;

            setUser({ uid: user.uid, email: user.email || "" });

            resetOnboarding();

            await saveUserPreferences(user.uid, {
            level: null,
            goal: null,
            equipment: [],
            });

            navigate("/onboarding");
        } catch {
            setError("No se pudo crear la cuenta.");
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex min-h-screen flex-col items-center justify-center p-6"
        >
        <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mb-8 flex flex-col items-center gap-4"
        >
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#ff0000] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Dumbbell className="h-10 w-10 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight">Crear Cuenta</h1>
        </motion.div>

        <form onSubmit={handleRegister} className="w-full space-y-6 max-w-sm">
            
            {/* Email */}
            <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-700">
                Correo electrónico
            </label>
            <Input 
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-700">
                Contraseña
            </label>
            <Input 
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>

            {/* Confirmar contraseña */}
            <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-700">
                Confirmar contraseña
            </label>
            <Input 
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Botón registrar */}
            <Button type="submit" className="w-full text-lg">
            Registrarse
            </Button>

            {/* Botón volver a login */}
            <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={() => navigate("/")}
            >
            ¿Ya tienes cuenta? Inicia sesión
            </Button>
        </form>
        </motion.div>
    );
}
