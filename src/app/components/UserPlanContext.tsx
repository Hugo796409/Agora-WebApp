"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

// UserPlanContext v2.1 - Updated with per-user plan storage
type PlanType = "free" | "basic" | "premium";

interface UserPlan {
  plan: PlanType;
  projectLimit: number;
  isCommitted: boolean;
}

interface UserPlanContextType {
  currentPlan: UserPlan;
  upgradePlan: (plan: PlanType, isCommitted: boolean) => void;
  canCreateProject: (currentProjectCount: number) => boolean;
  getProjectLimit: () => number;
  hasCommunityAccess: () => boolean;
  hasMentorsAccess: () => boolean;
}

const UserPlanContext = createContext<UserPlanContextType | undefined>(undefined);

const PLAN_LIMITS: Record<PlanType, number> = {
  free: 1,
  basic: 5,
  premium: 999999, // Illimité
};

const DEFAULT_PLAN: UserPlan = {
  plan: "free",
  projectLimit: PLAN_LIMITS.free,
  isCommitted: false,
};

export function UserPlanProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [currentPlan, setCurrentPlan] = useState<UserPlan>(DEFAULT_PLAN);

  // Charger le plan de l'utilisateur actuel
  useEffect(() => {
    if (!user?.id) {
      setCurrentPlan(DEFAULT_PLAN);
      return;
    }

    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem("agora_user_plans");
        if (saved) {
          const allPlans = JSON.parse(saved);
          const userPlan = allPlans[user.id];
          
          if (userPlan) {
            setCurrentPlan({
              plan: userPlan.plan || "free",
              projectLimit: PLAN_LIMITS[userPlan.plan || "free"],
              isCommitted: userPlan.isCommitted || false,
            });
          } else {
            // Initialiser un nouveau plan pour cet utilisateur
            setCurrentPlan(DEFAULT_PLAN);
          }
        } else {
          // Initialiser le stockage des plans
          setCurrentPlan(DEFAULT_PLAN);
        }
      }
    } catch (error) {
      console.error("Error loading user plan from localStorage:", error);
      setCurrentPlan(DEFAULT_PLAN);
    }
  }, [user?.id]);

  // Sauvegarder le plan dans localStorage quand il change
  useEffect(() => {
    if (!user?.id) return;

    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem("agora_user_plans");
        const allPlans = saved ? JSON.parse(saved) : {};
        
        allPlans[user.id] = {
          plan: currentPlan.plan,
          isCommitted: currentPlan.isCommitted,
        };
        
        localStorage.setItem("agora_user_plans", JSON.stringify(allPlans));
      }
    } catch (error) {
      console.error("Error saving user plan to localStorage:", error);
    }
  }, [currentPlan, user?.id]);

  const upgradePlan = (plan: PlanType, isCommitted: boolean) => {
    setCurrentPlan({
      plan,
      projectLimit: PLAN_LIMITS[plan],
      isCommitted,
    });
  };

  const canCreateProject = (currentProjectCount: number): boolean => {
    return currentProjectCount < currentPlan.projectLimit;
  };

  const getProjectLimit = (): number => {
    return currentPlan.projectLimit;
  };

  const hasCommunityAccess = (): boolean => {
    return currentPlan.plan === "basic" || currentPlan.plan === "premium";
  };

  const hasMentorsAccess = (): boolean => {
    return currentPlan.plan === "premium";
  };

  return (
    <UserPlanContext.Provider
      value={{
        currentPlan,
        upgradePlan,
        canCreateProject,
        getProjectLimit,
        hasCommunityAccess,
        hasMentorsAccess,
      }}
    >
      {children}
    </UserPlanContext.Provider>
  );
}

export function useUserPlan() {
  const context = useContext(UserPlanContext);
  if (context === undefined) {
    throw new Error("useUserPlan must be used within a UserPlanProvider");
  }
  return context;
}