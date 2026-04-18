import { NavLink } from "react-router-dom";
import { Home, List, Clock, User } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion } from "motion/react";

export default function BottomNav() {
  const tabs = [
    { to: "/dashboard", label: "INICIO", icon: Home },
    { to: "/routines", label: "RUTINAS", icon: List },
    { to: "/history", label: "HISTORIAL", icon: Clock },
    { to: "/profile", label: "PERFIL", icon: User },
  ];

  return (
    <nav className="absolute bottom-0 w-full bg-[#e5e5e5] border-t-[3px] border-black pb-safe">
      <ul className="flex h-16 w-full items-center justify-around relative">
        {tabs.map((tab, idx) => (
          <li key={tab.to} className="flex-1 h-full z-10">
            <NavLink
              to={tab.to}
              className={({ isActive }) =>
                cn(
                  "flex h-full w-full flex-col items-center justify-center gap-1 transition-colors relative group",
                  isActive ? "text-black" : "text-gray-500 hover:text-black",
                  idx > 0 && "border-l-[3px] border-black/10" // Optional subtle divider
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span 
                      layoutId="bottom-nav-indicator"
                      className="absolute top-0 left-0 right-0 h-1 bg-[#ff0000]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <motion.div 
                    whileTap={{ scale: 0.8 }} 
                    animate={isActive ? { y: -2 } : { y: 0 }}
                    className="transition-transform group-hover:scale-110 duration-200"
                  >
                    <tab.icon className="h-6 w-6 stroke-[2.5px]" />
                  </motion.div>
                  <span className="text-[10px] font-bold tracking-wider uppercase transition-all">
                    {tab.label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
