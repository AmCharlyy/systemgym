import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function AppLayout() {
  const location = useLocation();

  // Hide bottom nav on specific screens (like login, onboarding, active workout)
  const hideNavPaths = ["/", "/onboarding", "/workout"];
  const shouldShowNav = !hideNavPaths.some(path => location.pathname.startsWith(path) && path !== "/" || (path === "/" && location.pathname === "/"));

  return (
    <div className="bg-[#e5e5e5] min-h-[100dvh] w-full flex justify-center selection:bg-[#ff0000] selection:text-white">
      <div className="flex w-full max-w-md flex-col bg-[#f5f5f5] text-black shadow-2xl sm:border-x-[3px] sm:border-black overflow-x-hidden relative">
        <main className="flex-1 pb-20"> 
          <Outlet />
        </main>
        {shouldShowNav && <BottomNav />}
      </div>
    </div>
  );
}
