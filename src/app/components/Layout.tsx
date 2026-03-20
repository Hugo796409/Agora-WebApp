import { Outlet } from "react-router";
import { Sidebar, MobileSidebarToggle } from "./Sidebar";
import { useState, useEffect } from "react";
import { useGamification } from "./GamificationContext";

export function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { checkStreak } = useGamification();

  // Check streak on mount
  useEffect(() => {
    checkStreak();
  }, [checkStreak]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden md:block flex-shrink-0 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <Sidebar 
          isCollapsed={isCollapsed} 
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)} 
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center gap-3">
          <MobileSidebarToggle />
          <h1 className="text-lg font-bold bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">
            Agora - Initiate Together
          </h1>
        </div>
        
        <Outlet />
      </main>
    </div>
  );
}