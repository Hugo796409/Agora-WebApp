import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { Trophy, Award, Star, Zap, Flame, Target, Rocket, Crown } from "lucide-react";
import { useAuth } from "./AuthContext";

// Badge types and definitions
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "project" | "learning" | "social" | "achievement";
  condition: string;
  unlocked: boolean;
  unlockedAt?: Date;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface DailyActivity {
  date: string; // YYYY-MM-DD format
  actions: number; // Number of actions performed that day
  hasActivity: boolean;
}

interface GamificationContextType {
  xp: number;
  level: number;
  streak: number;
  totalPoints: number;
  badges: Badge[];
  dailyActivities: DailyActivity[];
  addXP: (amount: number, reason?: string) => void;
  checkStreak: () => void;
  incrementStreak: () => void;
  getProgressToNextLevel: () => number;
  xpToNextLevel: number;
  unlockBadge: (badgeId: string) => void;
  checkAndUnlockBadges: (projectCount?: number, gatesCompleted?: number, allGatesCompleted?: boolean, hasCertification?: boolean, hasFeedback?: boolean) => void;
  recordActivity: () => void;
  getActivityForDate: (date: string) => DailyActivity | undefined;
  getCurrentStreak: () => number;
  getLongestStreak: () => number;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error("useGamification must be used within GamificationProvider");
  }
  return context;
}

interface GamificationProviderProps {
  children: ReactNode;
}

// Default badges (defined here before use)
const defaultBadges: Badge[] = [
  {
    id: "first-project",
    name: "Premier Pas",
    description: "Créer ton premier projet",
    icon: "Rocket",
    category: "project",
    condition: "Créer 1 projet",
    unlocked: false,
    rarity: "common",
  },
  {
    id: "three-projects",
    name: "Entrepreneur Actif",
    description: "Créer 3 projets",
    icon: "Target",
    category: "project",
    condition: "Créer 3 projets",
    unlocked: false,
    rarity: "rare",
  },
  {
    id: "first-gate-completed",
    name: "Franchir la Porte",
    description: "Compléter ta première gate",
    icon: "Award",
    category: "learning",
    condition: "Compléter 1 gate",
    unlocked: false,
    rarity: "common",
  },
  {
    id: "all-gates-completed",
    name: "Maître des Gates",
    description: "Compléter toutes les gates d'un projet",
    icon: "Trophy",
    category: "learning",
    condition: "Compléter 10 gates",
    unlocked: false,
    rarity: "epic",
  },
  {
    id: "certification-obtained",
    name: "Certifié par le Jury",
    description: "Obtenir une certification jury",
    icon: "Crown",
    category: "achievement",
    condition: "Obtenir 1 certification",
    unlocked: false,
    rarity: "legendary",
  },
  {
    id: "week-streak",
    name: "Série de Feu",
    description: "Maintenir une série de 7 jours consécutifs",
    icon: "Flame",
    category: "achievement",
    condition: "7 jours consécutifs",
    unlocked: false,
    rarity: "rare",
  },
  {
    id: "mentor-feedback",
    name: "Mentoré",
    description: "Recevoir un feedback de mentor",
    icon: "Star",
    category: "social",
    condition: "Recevoir 1 feedback",
    unlocked: false,
    rarity: "common",
  },
  {
    id: "level-5",
    name: "Niveau Supérieur",
    description: "Atteindre le niveau 5",
    icon: "Zap",
    category: "achievement",
    condition: "Atteindre niveau 5",
    unlocked: false,
    rarity: "rare",
  },
];

export function GamificationProvider({ children }: GamificationProviderProps) {
  const { user } = useAuth();
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [lastVisit, setLastVisit] = useState<string | null>(null);
  const [badges, setBadges] = useState<Badge[]>(defaultBadges);
  const [dailyActivities, setDailyActivities] = useState<DailyActivity[]>([]);

  // Load from localStorage when user changes
  useEffect(() => {
    if (!user?.id) {
      // Reset to default if no user
      setXp(0);
      setLevel(1);
      setStreak(0);
      setTotalPoints(0);
      setLastVisit(null);
      setBadges(defaultBadges);
      setDailyActivities([]);
      return;
    }

    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem("agora_gamification");
        if (saved) {
          const allData = JSON.parse(saved);
          const userData = allData[user.id];
          
          if (userData) {
            setXp(userData.xp || 0);
            setLevel(userData.level || 1);
            setStreak(userData.streak || 0);
            setTotalPoints(userData.totalPoints || 0);
            setLastVisit(userData.lastVisit || null);
            
            if (userData.badges) {
              const mergedBadges = defaultBadges.map(defaultBadge => {
                const savedBadge = userData.badges.find((b: Badge) => b.id === defaultBadge.id);
                return savedBadge || defaultBadge;
              });
              setBadges(mergedBadges);
            } else {
              setBadges(defaultBadges);
            }

            if (userData.dailyActivities) {
              setDailyActivities(userData.dailyActivities);
            } else {
              setDailyActivities([]);
            }
          } else {
            // Initialize new user with default data
            setXp(0);
            setLevel(1);
            setStreak(0);
            setTotalPoints(0);
            setLastVisit(null);
            setBadges(defaultBadges);
            setDailyActivities([]);
          }
        } else {
          // Initialize storage
          setXp(0);
          setLevel(1);
          setStreak(0);
          setTotalPoints(0);
          setLastVisit(null);
          setBadges(defaultBadges);
          setDailyActivities([]);
        }
      }
    } catch (error) {
      console.error("Error loading gamification data:", error);
    }
  }, [user?.id]);

  // Save to localStorage when data changes
  useEffect(() => {
    if (!user?.id) return;

    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem("agora_gamification");
        const allData = saved ? JSON.parse(saved) : {};
        
        allData[user.id] = {
          xp,
          level,
          streak,
          totalPoints,
          lastVisit,
          badges,
          dailyActivities,
        };
        
        localStorage.setItem("agora_gamification", JSON.stringify(allData));
      }
    } catch (error) {
      console.error("Error saving gamification data:", error);
    }
  }, [xp, level, streak, totalPoints, lastVisit, badges, user?.id, dailyActivities]);

  // XP needed for next level (exponential curve)
  const xpToNextLevel = level * 100 + (level - 1) * 50;

  const celebrateWithConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#3b82f6", "#06b6d4", "#8b5cf6", "#ec4899"],
    });
  }, []);

  const addXP = useCallback((amount: number, reason?: string) => {
    setXp(prevXp => {
      const newXp = prevXp + amount;
      setTotalPoints(prev => prev + amount);

      // Check for level up
      setLevel(prevLevel => {
        const currentXpToNextLevel = prevLevel * 100 + (prevLevel - 1) * 50;
        
        if (newXp >= currentXpToNextLevel) {
          const newLevel = prevLevel + 1;
          setXp(newXp - currentXpToNextLevel);
          
          celebrateWithConfetti();
          
          toast.success(
            <div>
              <p className="font-bold">🎉 Niveau supérieur !</p>
              <p className="text-sm">Tu es maintenant niveau {newLevel}</p>
            </div>,
            { duration: 4000 }
          );
          
          return newLevel;
        } else {
          if (reason) {
            toast.success(
              <div>
                <p className="font-bold">+ {amount} XP</p>
                <p className="text-sm">{reason}</p>
              </div>,
              { duration: 2000 }
            );
          }
          return prevLevel;
        }
      });
      
      return newXp;
    });
  }, [celebrateWithConfetti]);

  const checkStreak = useCallback(() => {
    const today = new Date().toDateString();
    
    setStreak(prevStreak => {
      setLastVisit(prevLastVisit => {
        if (prevLastVisit) {
          const lastVisitDate = new Date(prevLastVisit);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          
          if (lastVisitDate.toDateString() === yesterday.toDateString()) {
            // Consecutive day
            const newStreak = prevStreak + 1;
            
            if (newStreak % 7 === 0) {
              // Weekly streak bonus
              setTimeout(() => {
                addXP(100, `🔥 Série de ${newStreak} jours ! Bonus de fidélité`);
                celebrateWithConfetti();
              }, 0);
            } else {
              toast.success(`🔥 Série de ${newStreak} jours consécutifs !`, {
                duration: 3000,
              });
            }
            
            setStreak(newStreak);
          } else if (lastVisitDate.toDateString() !== today) {
            // Streak broken
            if (prevStreak > 0) {
              toast.error("La série est cassée ! Reviens demain pour recommencer.", {
                duration: 3000,
              });
            }
            setStreak(1);
          }
          // If same day, don't do anything
        } else {
          setStreak(1);
        }
        
        return today;
      });
      
      return prevStreak;
    });
  }, [addXP, celebrateWithConfetti]);

  const incrementStreak = useCallback(() => {
    setStreak(prevStreak => {
      const newStreak = prevStreak + 1;
      
      if (newStreak % 7 === 0) {
        // Weekly streak bonus
        setTimeout(() => {
          addXP(100, `🔥 Série de ${newStreak} jours ! Bonus de fidélité`);
          celebrateWithConfetti();
        }, 0);
      } else {
        toast.success(`🔥 Série de ${newStreak} jours consécutifs !`, {
          duration: 3000,
        });
      }
      
      return newStreak;
    });
  }, [addXP, celebrateWithConfetti]);

  const getProgressToNextLevel = useCallback(() => {
    return (xp / xpToNextLevel) * 100;
  }, [xp, xpToNextLevel]);

  const unlockBadge = useCallback((badgeId: string) => {
    setBadges((prevBadges) => {
      const badge = prevBadges.find((b) => b.id === badgeId);
      if (!badge || badge.unlocked) return prevBadges;

      const updatedBadges = prevBadges.map((b) =>
        b.id === badgeId
          ? { ...b, unlocked: true, unlockedAt: new Date() }
          : b
      );

      // Show notification with badge info
      const rarityColors = {
        common: "bg-gray-100 text-gray-800",
        rare: "bg-blue-100 text-blue-800",
        epic: "bg-purple-100 text-purple-800",
        legendary: "bg-yellow-100 text-yellow-800",
      };

      // Confetti for rare+ badges
      if (badge.rarity !== "common") {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 },
          colors: badge.rarity === "legendary" ? ["#FFD700", "#FFA500", "#FF6347"] : ["#3b82f6", "#06b6d4", "#8b5cf6"],
        });
      }

      toast.success(
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${rarityColors[badge.rarity]}`}>
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold">🎉 Badge débloqué !</p>
            <p className="text-sm font-semibold">{badge.name}</p>
            <p className="text-xs text-gray-600">{badge.description}</p>
          </div>
        </div>,
        { 
          duration: 5000,
          action: {
            label: "Voir tous",
            onClick: () => {
              window.location.href = "/achievements";
            },
          },
        }
      );

      return updatedBadges;
    });
  }, []);

  const checkAndUnlockBadges = useCallback((projectCount?: number, gatesCompleted?: number, allGatesCompleted?: boolean, hasCertification?: boolean, hasFeedback?: boolean) => {
    // Automatically check and unlock badges based on current state
    // This will be called after any significant action

    // Check project badges
    if (projectCount) {
      if (projectCount >= 1 && !badges.find(b => b.id === "first-project" && b.unlocked)) {
        unlockBadge("first-project");
      }
      if (projectCount >= 3 && !badges.find(b => b.id === "three-projects" && b.unlocked)) {
        unlockBadge("three-projects");
      }
    }

    // Check learning badges
    if (gatesCompleted) {
      if (gatesCompleted >= 1 && !badges.find(b => b.id === "first-gate-completed" && b.unlocked)) {
        unlockBadge("first-gate-completed");
      }
      if (allGatesCompleted && !badges.find(b => b.id === "all-gates-completed" && b.unlocked)) {
        unlockBadge("all-gates-completed");
      }
    }

    // Check achievement badges
    if (hasCertification && !badges.find(b => b.id === "certification-obtained" && b.unlocked)) {
      unlockBadge("certification-obtained");
    }
    if (streak >= 7 && !badges.find(b => b.id === "week-streak" && b.unlocked)) {
      unlockBadge("week-streak");
    }
    if (hasFeedback && !badges.find(b => b.id === "mentor-feedback" && b.unlocked)) {
      unlockBadge("mentor-feedback");
    }
    if (level >= 5 && !badges.find(b => b.id === "level-5" && b.unlocked)) {
      unlockBadge("level-5");
    }
  }, [badges, unlockBadge, streak, level]);

  const recordActivity = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    setDailyActivities(prevActivities => {
      const currentActivity = prevActivities.find(a => a.date === today);
      if (currentActivity) {
        return prevActivities.map(a => a.date === today ? { ...a, actions: a.actions + 1, hasActivity: true } : a);
      } else {
        return [...prevActivities, { date: today, actions: 1, hasActivity: true }];
      }
    });
  }, []);

  const getActivityForDate = useCallback((date: string) => {
    return dailyActivities.find(a => a.date === date);
  }, [dailyActivities]);

  const getCurrentStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const activities = dailyActivities.find(a => a.date === today);
    return activities && activities.hasActivity ? streak : 0;
  }, [dailyActivities, streak]);

  const getLongestStreak = useCallback(() => {
    let longestStreak = 0;
    let currentStreak = 0;
    const dates = Object.keys(dailyActivities).sort();

    for (const date of dates) {
      const activities = dailyActivities.find(a => a.date === date);
      if (activities && activities.hasActivity) {
        currentStreak++;
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
      } else {
        currentStreak = 0;
      }
    }

    return longestStreak;
  }, [dailyActivities]);

  return (
    <GamificationContext.Provider
      value={{
        xp,
        level,
        streak,
        totalPoints,
        badges,
        dailyActivities,
        addXP,
        checkStreak,
        incrementStreak,
        getProgressToNextLevel,
        xpToNextLevel,
        unlockBadge,
        checkAndUnlockBadges,
        recordActivity,
        getActivityForDate,
        getCurrentStreak,
        getLongestStreak,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}