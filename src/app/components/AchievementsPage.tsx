import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useGamification, Badge as BadgeType } from "./GamificationContext";
import {
  Trophy,
  Award,
  Star,
  Zap,
  Flame,
  Target,
  Rocket,
  Crown,
  Lock,
  Sparkles,
} from "lucide-react";

// Map icon names to components
const iconMap: Record<string, any> = {
  Trophy,
  Award,
  Star,
  Zap,
  Flame,
  Target,
  Rocket,
  Crown,
};

export function AchievementsPage() {
  const navigate = useNavigate();
  const { badges, level, xp, streak, totalPoints, getProgressToNextLevel, unlockBadge } = useGamification();
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const progressPercent = (unlockedCount / badges.length) * 100;

  // Test function to unlock a random locked badge (for demo purposes)
  const unlockRandomBadge = () => {
    const lockedBadges = badges.filter((b) => !b.unlocked);
    if (lockedBadges.length > 0) {
      const randomBadge = lockedBadges[Math.floor(Math.random() * lockedBadges.length)];
      unlockBadge(randomBadge.id);
    }
  };

  // Filter badges
  const filteredBadges = badges.filter((badge) => {
    if (filter === "unlocked" && !badge.unlocked) return false;
    if (filter === "locked" && badge.unlocked) return false;
    if (categoryFilter !== "all" && badge.category !== categoryFilter) return false;
    return true;
  });

  const getRarityColor = (rarity: BadgeType["rarity"]) => {
    switch (rarity) {
      case "common":
        return "border-gray-300 bg-gray-50";
      case "rare":
        return "border-blue-400 bg-blue-50";
      case "epic":
        return "border-purple-400 bg-purple-50";
      case "legendary":
        return "border-yellow-400 bg-yellow-50";
    }
  };

  const getRarityLabel = (rarity: BadgeType["rarity"]) => {
    switch (rarity) {
      case "common":
        return "Commun";
      case "rare":
        return "Rare";
      case "epic":
        return "Épique";
      case "legendary":
        return "Légendaire";
    }
  };

  const getCategoryLabel = (category: BadgeType["category"]) => {
    switch (category) {
      case "project":
        return "Projets";
      case "learning":
        return "Apprentissage";
      case "social":
        return "Social";
      case "achievement":
        return "Accomplissement";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-[#FC4C00] to-[#004AAD] rounded-xl">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">
                Mes Achievements
              </h1>
              <p className="text-gray-600 mt-1">
                Débloquez des badges en accomplissant des défis
              </p>
            </div>
          </div>

          {/* Progress Overview */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-[#FC4C00]" />
                  <span className="font-semibold text-gray-700">Badges Débloqués</span>
                </div>
                <div className="text-3xl bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">
                  {unlockedCount} / {badges.length}
                </div>
                <Progress value={progressPercent} className="mt-2 h-2" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-700">Niveau</span>
                </div>
                <div className="text-3xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {level}
                </div>
                <Progress value={getProgressToNextLevel()} className="mt-2 h-2" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold text-gray-700">Série</span>
                </div>
                <div className="text-3xl text-orange-600">
                  {streak} jours
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-700">Total XP</span>
                </div>
                <div className="text-3xl text-purple-600">
                  {totalPoints}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-gradient-to-r from-[#FC4C00] to-[#004AAD]" : ""}
            >
              Tous
            </Button>
            <Button
              variant={filter === "unlocked" ? "default" : "outline"}
              onClick={() => setFilter("unlocked")}
              className={filter === "unlocked" ? "bg-gradient-to-r from-[#FC4C00] to-[#004AAD]" : ""}
            >
              Débloqués
            </Button>
            <Button
              variant={filter === "locked" ? "default" : "outline"}
              onClick={() => setFilter("locked")}
              className={filter === "locked" ? "bg-gradient-to-r from-[#FC4C00] to-[#004AAD]" : ""}
            >
              Verrouillés
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant={categoryFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter("all")}
              className={categoryFilter === "all" ? "bg-[#004AAD]" : ""}
            >
              Toutes catégories
            </Button>
            <Button
              variant={categoryFilter === "project" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter("project")}
              className={categoryFilter === "project" ? "bg-[#004AAD]" : ""}
            >
              Projets
            </Button>
            <Button
              variant={categoryFilter === "learning" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter("learning")}
              className={categoryFilter === "learning" ? "bg-[#004AAD]" : ""}
            >
              Apprentissage
            </Button>
            <Button
              variant={categoryFilter === "social" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter("social")}
              className={categoryFilter === "social" ? "bg-[#004AAD]" : ""}
            >
              Social
            </Button>
            <Button
              variant={categoryFilter === "achievement" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter("achievement")}
              className={categoryFilter === "achievement" ? "bg-[#004AAD]" : ""}
            >
              Accomplissement
            </Button>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBadges.map((badge) => {
            const IconComponent = iconMap[badge.icon] || Trophy;
            const isUnlocked = badge.unlocked;

            return (
              <Card
                key={badge.id}
                className={`p-6 transition-all hover:scale-105 relative overflow-hidden ${
                  getRarityColor(badge.rarity)
                } ${isUnlocked ? "border-2" : "opacity-60"}`}
              >
                {/* Rarity indicator */}
                <div className="absolute top-2 right-2">
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      badge.rarity === "legendary"
                        ? "bg-yellow-200 text-yellow-900"
                        : badge.rarity === "epic"
                        ? "bg-purple-200 text-purple-900"
                        : badge.rarity === "rare"
                        ? "bg-blue-200 text-blue-900"
                        : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    {getRarityLabel(badge.rarity)}
                  </Badge>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-4 rounded-full ${
                      isUnlocked
                        ? badge.rarity === "legendary"
                          ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                          : badge.rarity === "epic"
                          ? "bg-gradient-to-br from-purple-500 to-pink-500"
                          : badge.rarity === "rare"
                          ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                          : "bg-gradient-to-br from-gray-500 to-gray-600"
                        : "bg-gray-300"
                    } relative`}
                  >
                    {isUnlocked ? (
                      <IconComponent className="w-8 h-8 text-white" />
                    ) : (
                      <Lock className="w-8 h-8 text-gray-500" />
                    )}
                    {isUnlocked && badge.rarity === "legendary" && (
                      <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-1">{badge.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                  
                  <Badge variant="outline" className="text-xs">
                    {getCategoryLabel(badge.category)}
                  </Badge>

                  {isUnlocked && badge.unlockedAt && (
                    <p className="text-xs text-gray-500 mt-2">
                      Débloqué le{" "}
                      {new Date(badge.unlockedAt).toLocaleDateString("fr-FR")}
                    </p>
                  )}

                  {!isUnlocked && (
                    <p className="text-xs text-gray-500 mt-2 italic">
                      {badge.condition}
                    </p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {filteredBadges.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucun badge trouvé avec ces filtres</p>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="min-w-[200px]"
          >
            Retour au Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}