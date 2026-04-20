import React, { useState } from "react";
import { Dumbbell } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/src/store";
import { motion } from "motion/react";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "@/src/firebase";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user exists in Firestore
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Create user
        await setDoc(userRef, {
          email: user.email,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          level: '',
          equipment: '',
          goal: ''
        });
        navigate("/onboarding");
      } else {
        const data = userSnap.data();
        if (!data.level) {
          navigate("/onboarding");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Hubo un error al iniciar sesión.");
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
          <p className="mt-2 text-sm text-gray-500 uppercase tracking-widest font-bold">INICIA SESIÓN PARA CONTINUAR</p>
        </div>
      </motion.div>

      <div className="w-full space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="pt-4 space-y-4"
        >
          <Button 
            disabled={loading} 
            onClick={handleGoogleLogin} 
            className="w-full text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-14"
          >
            {loading ? "CARGANDO..." : "INICIAR CON GOOGLE"}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
