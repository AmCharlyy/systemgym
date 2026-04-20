import React, { useState } from "react";
import { Dumbbell } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/src/firebase";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email || "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        level: "",
        equipment: "",
        goal: ""
      });

      navigate("/dashboard");
    } catch (err: any) {
      console.error("Registration failed", err);
      if (err.code === "auth/email-already-in-use") {
        setError("El correo ya está registrado.");
      } else if (err.code === "auth/invalid-email") {
        setError("El correo no es válido.");
      } else if (err.code === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 caracteres.");
      } else {
        setError("No se pudo crear la cuenta. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex min-h-screen flex-col items-center justify-center p-6 bg-white bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:16px_16px]"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
        className="mb-8 flex flex-col items-center gap-4"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#ff0000] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-[3px] border-black transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <Dumbbell className="h-10 w-10 text-white" strokeWidth={2.5} />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-black uppercase tracking-tight">FITAPP</h1>
          <p className="mt-2 text-sm text-gray-500 uppercase tracking-widest font-bold">CREA TU CUENTA PARA CONTINUAR</p>
        </div>
      </motion.div>

      <form onSubmit={handleRegister} className="w-full space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <label className="text-xs font-black uppercase tracking-wider text-gray-700">
            CORREO ELECTRÓNICO <span className="text-[#ff0000]">*</span>
          </label>
          <Input
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="transition-all focus:-translate-y-1 focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <label className="text-xs font-black uppercase tracking-wider text-gray-700">
            CONTRASEÑA <span className="text-[#ff0000]">*</span>
          </label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="transition-all focus:-translate-y-1 focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          />
        </motion.div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="pt-4 space-y-4"
        >
          <Button type="submit" disabled={loading} className="w-full text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {loading ? "CREANDO CUENTA..." : "REGISTRARME"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full transition-transform hover:bg-[#e5e5e5]"
            onClick={() => navigate("/")}
          >
            Ya tengo cuenta
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
