"use client";
import { useNavigate, useLocation } from "react-router";
import { Button } from "./ui/button";
import {
  Home,
  User,
  Users,
  MessageCircle,
  Trophy,
  MessageSquare,
  Rocket,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Flame,
  Award,
  Notebook,
  MessagesSquare,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useGamification } from "./GamificationContext";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { TipsCarousel } from "./TipsCarousel";
import { useUserPlan } from "./UserPlanContext"; // v2.0 with community access
import { useAuth } from "./AuthContext";

interface SidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ onClose, isMobile = false, isCollapsed, onToggleCollapse }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { xp, level, streak, getProgressToNextLevel, xpToNextLevel } = useGamification();
  const { hasCommunityAccess, hasMentorsAccess } = useUserPlan();
  const { logout } = useAuth();

  const allMenuItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: User,
      label: "Profil",
      path: "/profile",
    },
    {
      icon: MessagesSquare,
      label: "Communauté",
      path: "/community",
      requiresPaid: true,
    },
    {
      icon: Users,
      label: "Équipe",
      path: "/team",
    },
    {
      icon: MessageCircle,
      label: "Mentors",
      path: "/mentors",
      requiresPremium: true,
    },
    {
      icon: MessageSquare,
      label: "Feedbacks",
      path: "/feedbacks",
    },
    {
      icon: Notebook,
      label: "Récapitulatif",
      path: "/recap",
    },
  ];

  // Filtrer les items selon le plan de l'utilisateur
  const menuItems = allMenuItems.filter(item => {
    if (item.requiresPaid && !hasCommunityAccess()) {
      return false;
    }
    if (item.requiresPremium && !hasMentorsAccess()) {
      return false;
    }
    return true;
  });

  const handleNavigate = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col relative transition-all duration-300">
      {/* Logo */}
      <div className={`p-6 border-b border-gray-200 ${isCollapsed && !isMobile ? "p-4" : ""}`}>
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-3 ${isCollapsed && !isMobile ? "justify-center w-full" : ""}`}>
            {(!isCollapsed || isMobile) ? ( 
               <img src="/logo1.png" alt="Agora Logo"
                    className="h-16 object-contain"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#FC4C00] to-[#004AAD] flex items-center justify-center flex-shrink-0">
                <Rocket className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
          {isMobile && onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Gamification Stats */}
      {(!isCollapsed || isMobile) && (
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-blue-50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] flex items-center justify-center">
                <Star className="w-4 h-4 text-white fill-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Niveau</p>
                <p className="font-bold text-lg text-[#004AAD]">{level}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600">Série</p>
              <p className="font-bold text-[#FC4C00] flex items-center gap-1">
                <Flame className="w-4 h-4" />
                {streak}
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">XP: {xp}/{xpToNextLevel}</span>
              <span className="text-[#004AAD] font-medium">{Math.round(getProgressToNextLevel())}%</span>
            </div>
            <Progress value={getProgressToNextLevel()} className="h-2" />
          </div>
        </div>
      )}

      {isCollapsed && !isMobile && (
        <div className="p-2 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-blue-50">
          <div className="flex flex-col items-center gap-1">
            <Badge className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] text-white border-0 w-full justify-center">
              {level}
            </Badge>
            <div className="flex items-center gap-1 text-[#FC4C00]">
              <Flame className="w-3 h-3" />
              <span className="text-xs font-bold">{streak}</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                className={`w-full ${isCollapsed && !isMobile ? "justify-center px-2" : "justify-start"} ${
                  isActive
                    ? "bg-gradient-to-r from-[#FC4C00] to-[#004AAD] text-white hover:from-[#FD824D] hover:to-[#4D80C6]"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleNavigate(item.path)}
                title={isCollapsed && !isMobile ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 ${!isCollapsed || isMobile ? "mr-3" : ""}`} />
                {(!isCollapsed || isMobile) && item.label}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      {(!isCollapsed || isMobile) && (
        <div className="p-4 border-t border-gray-200">
          <TipsCarousel />
        </div>
      )}

      {/* Collapse Toggle Button - Desktop Only */}
      {!isMobile && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full w-6 h-6 p-0 shadow-md hover:bg-gray-100 z-10"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      )}

      {/* Logout Button */}
      {(!isCollapsed || isMobile) && (
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Déconnexion
          </Button>
        </div>
      )}
    </div>
  );
}

export function MobileSidebarToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="md:hidden"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 w-64 z-50 md:hidden">
            <Sidebar onClose={() => setIsOpen(false)} isMobile isCollapsed={false} onToggleCollapse={() => {}} />
          </div>
        </>
      )}
    </>
  );
}
