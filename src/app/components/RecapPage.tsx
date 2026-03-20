import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import {
  ArrowLeft,
  Trophy,
  Target,
  TrendingUp,
  Zap,
  Rocket,
  Star,
  CheckCircle,
  Award,
  Lock,
  Flame,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { useProjects } from "./ProjectsContext";
import { useGamification } from "./GamificationContext";

export function RecapPage() {
  const navigate = useNavigate();
  const { projects } = useProjects();
  const { badges, xp, level, streak } = useGamification();

  // Calculate stats from projects
  const totalProjects = projects.length;
  const completedProjects = projects.filter(
    (p) => p.status === "completed"
  ).length;
  const totalTests = projects.filter((p) => p.crashTestScore).length;
  const averageScore =
    totalTests > 0
      ? Math.round(
          projects
            .filter((p) => p.crashTestScore)
            .reduce((sum, p) => sum + (p.crashTestScore || 0), 0) / totalTests
        )
      : 0;

  const successRate = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;

  // Stats des badges
  const unlockedBadges = badges.filter(b => b.unlocked).length;
  const totalBadges = badges.length;
  const badgeProgress = totalBadges > 0 ? (unlockedBadges / totalBadges) * 100 : 0;

  // Fonction pour obtenir la couleur selon la rareté
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "from-gray-400 to-gray-500";
      case "rare":
        return "from-blue-400 to-blue-600";
      case "epic":
        return "from-purple-400 to-purple-600";
      case "legendary":
        return "from-yellow-400 to-orange-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  // Fonction pour obtenir l'icône React selon le nom de l'icône
  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ElementType } = {
      Trophy, Award, Star, Zap, Flame, Target, Rocket
    };
    return icons[iconName] || Award;
  };

  const skills = [
    {
      name: "Analyse de marché",
      level: 85,
      description: "Identification et analyse des marchés cibles",
      icon: "🎯",
    },
    {
      name: "Business Plan",
      level: 75,
      description: "Création et structuration de business plans",
      icon: "📊",
    },
    {
      name: "Modélisation financière",
      level: 70,
      description: "Gestion des budgets et projections financières",
      icon: "💰",
    },
    {
      name: "Stratégie marketing",
      level: 80,
      description: "Élaboration de stratégies d'acquisition client",
      icon: "📢",
    },
    {
      name: "Gestion des ressources",
      level: 65,
      description: "Allocation optimale des ressources humaines et matérielles",
      icon: "⚙️",
    },
    {
      name: "Résilience entrepreneuriale",
      level: 90,
      description: "Capacité à rebondir après un échec",
      icon: "💪",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au dashboard
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl mb-3 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Ton parcours entrepreneurial
          </h1>
          <p className="text-xl text-gray-600">
            Récapitulatif de tes progrès et compétences acquises
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {totalProjects}
            </div>
            <p className="text-sm text-gray-600">Projets créés</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {totalTests}
            </div>
            <p className="text-sm text-gray-600">Crash tests</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">
              {averageScore}%
            </div>
            <p className="text-sm text-gray-600">Score moyen</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {successRate.toFixed(0)}%
            </div>
            <p className="text-sm text-gray-600">Taux de réussite</p>
          </Card>
        </div>

        {/* Skills Section */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl">Compétences acquises</h2>
              <p className="text-gray-600">Ton évolution en tant qu'entrepreneur</p>
            </div>
          </div>

          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <div>
                      <p className="font-medium">{skill.name}</p>
                      <p className="text-sm text-gray-600">{skill.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-blue-600">
                      {skill.level}%
                    </span>
                  </div>
                </div>
                <Progress value={skill.level} className="h-3" />
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              💡 <strong>Continue de progresser !</strong> Chaque projet et crash
              test te permet d'améliorer ces compétences essentielles pour devenir
              un entrepreneur accompli.
            </p>
          </div>
        </Card>

        {/* Achievements Section */}
        <Card className="p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl">Achievements</h2>
                <p className="text-gray-600">Tes badges et accomplissements</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">
                {unlockedBadges}/{totalBadges}
              </p>
              <p className="text-sm text-gray-600">Badges débloqués</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progression globale</span>
              <span className="text-sm font-medium text-[#FC4C00]">
                {badgeProgress.toFixed(0)}%
              </span>
            </div>
            <Progress value={badgeProgress} className="h-3" />
          </div>

          {/* Gamification Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-blue-50 rounded-lg border-2 border-[#FC4C00]/20">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Star className="w-5 h-5 text-[#FC4C00]" />
                <p className="text-2xl font-bold">{level}</p>
              </div>
              <p className="text-xs text-gray-600">Niveau</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-blue-50 rounded-lg border-2 border-[#004AAD]/20">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Zap className="w-5 h-5 text-[#004AAD]" />
                <p className="text-2xl font-bold">{xp}</p>
              </div>
              <p className="text-xs text-gray-600">Points XP</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-blue-50 rounded-lg border-2 border-[#FC4C00]/20">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Flame className="w-5 h-5 text-orange-500" />
                <p className="text-2xl font-bold">{streak}</p>
              </div>
              <p className="text-xs text-gray-600">Jours de streak</p>
            </div>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge) => {
              const IconComponent = getIconComponent(badge.icon);
              const rarityColor = getRarityColor(badge.rarity);

              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    badge.unlocked
                      ? "bg-gradient-to-br from-white to-gray-50 border-gray-300 hover:shadow-lg"
                      : "bg-gray-100 border-gray-200 opacity-60"
                  }`}
                >
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                        badge.unlocked
                          ? `bg-gradient-to-r ${rarityColor}`
                          : "bg-gray-300"
                      }`}
                    >
                      {badge.unlocked ? (
                        <IconComponent className="w-8 h-8 text-white" />
                      ) : (
                        <Lock className="w-8 h-8 text-gray-500" />
                      )}
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {badge.description}
                    </p>
                    <Badge
                      className={`text-xs ${
                        badge.rarity === "legendary"
                          ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0"
                          : badge.rarity === "epic"
                          ? "bg-gradient-to-r from-purple-400 to-purple-600 text-white border-0"
                          : badge.rarity === "rare"
                          ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white border-0"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {badge.rarity}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg border-2 border-[#FC4C00]/20">
            <p className="text-sm text-gray-800">
              🏆 <strong>Débloque tous les badges !</strong> Chaque action compte pour progresser. Continue à créer des projets, compléter les gates et interagir avec la communauté.
            </p>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl mb-3">Prochaines étapes</h3>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>
                    Continue à créer de nouveaux projets pour explorer différentes
                    idées
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>
                    Améliore tes projets existants en appliquant les feedbacks reçus
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>
                    Vise le score parfait de 100% sur un crash test
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>
                    Consulte tes achievements pour débloquer tous les badges
                  </span>
                </li>
              </ul>
              <div className="flex gap-3">
                <Button
                  onClick={() => navigate("/create-project")}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Créer un nouveau projet
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                >
                  Retour au dashboard
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}