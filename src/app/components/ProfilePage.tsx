"use client";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Edit,
  Trophy,
  Target,
  Zap,
  Award,
  Star,
  Flame,
  Rocket,
  Crown,
  Lock,
  HelpCircle,
  Medal,
  Sparkles,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import { useGamification } from "./GamificationContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { badges, level, xp, streak } = useGamification();

  // Mock user data
  const [userData, setUserData] = useState({
    firstName: "Alex",
    lastName: "Dupont",
    email: "alex.dupont@example.com",
    age: "22",
  });

  const handleSave = () => {
    toast.success("Profil mis à jour avec succès !");
    setIsEditing(false);
  };

  // Mock stats
  const stats = {
    projectsCreated: 3,
    testsCompleted: 5,
    averageScore: 75,
    skills: [
      "Analyse de marché",
      "Business Plan",
      "Modélisation financière",
      "Stratégie marketing",
    ],
  };

  // Get icon for badge
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

  const unlockedBadges = badges.filter((b) => b.unlocked);
  const recentBadges = unlockedBadges.slice(0, 4);

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-blue-200">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-2xl">
                  {userData.firstName[0]}
                  {userData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl mb-2">
                  {userData.firstName} {userData.lastName}
                </h1>
                <p className="text-gray-600 mb-2">{userData.email}</p>
                <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">
                  🎓 Entrepreneur en formation
                </Badge>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "Annuler" : "Modifier"}
            </Button>
          </div>

          {/* Info Form */}
          {isEditing ? (
            <div className="space-y-4 pt-6 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="mb-2 block">
                    Prénom
                  </Label>
                  <Input
                    id="firstName"
                    value={userData.firstName}
                    onChange={(e) =>
                      setUserData({ ...userData, firstName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="mb-2 block">
                    Nom
                  </Label>
                  <Input
                    id="lastName"
                    value={userData.lastName}
                    onChange={(e) =>
                      setUserData({ ...userData, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="age" className="mb-2 block">
                  Âge (18-25 ans)
                </Label>
                <Input
                  id="age"
                  type="number"
                  min="18"
                  max="25"
                  value={userData.age}
                  onChange={(e) =>
                    setUserData({ ...userData, age: e.target.value })
                  }
                />
              </div>

              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                Enregistrer les modifications
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nom complet</p>
                  <p className="font-medium">
                    {userData.firstName} {userData.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Âge</p>
                  <p className="font-medium">{userData.age} ans</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Startup Weekend Achievement Banner */}
        <Card className="p-0 mb-6 overflow-hidden border-0 bg-gradient-to-r from-[#FC4C00] via-[#FD824D] to-[#004AAD] shadow-lg">
          <div className="p-1.5">
            <div className="bg-white rounded-md p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Medal Icon with glow effect */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FC4C00] to-[#004AAD] rounded-full blur-xl opacity-60 animate-pulse"></div>
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#744A7C] to-[#8A5A94] flex items-center justify-center shadow-2xl p-1">
                      <img
                       src="/logo2.png" alt="Techstars Logo"
                       className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>

                  {/* Achievement Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-[#FC4C00]" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#004AAD]">
                        Achievement Spécial
                      </span>
                    </div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent mb-1">
                      Startup Weekend Niort 2026
                    </h3>
                    <p className="text-sm text-gray-600">
                      Participant officiel • Mars 2026
                    </p>
                  </div>
                </div>

                {/* Trophy Badge */}
                <div className="hidden md:flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <Badge className="bg-gradient-to-r from-[#FC4C00] to-[#FD824D] text-white border-0 shadow-md text-xs">
                    Certifié
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Opération Dragon Achievement Banner */}
        <Card className="p-0 mb-6 overflow-hidden border-0 bg-gradient-to-r from-[#FC4C00] via-[#FD824D] to-[#004AAD] shadow-lg">
          <div className="p-1.5">
            <div className="bg-white rounded-md p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Medal Icon with glow effect */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FC4C00] to-[#004AAD] rounded-full blur-xl opacity-60 animate-pulse"></div>
                    <div className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl p-2">
                      <img
                        src="/logo3.png"
                        alt="Altae Technopole"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>

                  {/* Achievement Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-[#FC4C00]" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#004AAD]">
                        Achievement Spécial
                      </span>
                    </div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent mb-1">
                      Opération Dragon
                    </h3>
                    <p className="text-sm text-gray-600">
                      Altae Technopole • 2026
                    </p>
                  </div>
                </div>

                {/* Trophy Badge */}
                <div className="hidden md:flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <Badge className="bg-gradient-to-r from-[#FC4C00] to-[#FD824D] text-white border-0 shadow-md text-xs">
                    Certifié
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.projectsCreated}</p>
                <p className="text-sm text-gray-600">Projets créés</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.testsCompleted}</p>
                <p className="text-sm text-gray-600">Crash tests réalisés</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.averageScore}%</p>
                <p className="text-sm text-gray-600">Score moyen</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Skills Acquired */}
        <Card className="p-8">
          <h2 className="text-2xl mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-blue-600" />
            Compétences acquises
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-sm">
                  ✓
                </div>
                <span className="font-medium">{skill}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-900">
              💡 <strong>Continue d'apprendre !</strong> Plus tu testes de
              projets, plus tu développes de compétences entrepreneuriales.
            </p>
          </div>
        </Card>

        {/* Achievement Badges - Updated */}
        <Card className="p-8 mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl flex items-center gap-2">
              <Trophy className="w-6 h-6 text-[#FC4C00]" />
              Badges de réussite
            </h2>
            <Button
              variant="outline"
              onClick={() => navigate("/achievements")}
              className="text-[#004AAD] border-[#004AAD] hover:bg-[#004AAD] hover:text-white"
            >
              Voir tous ({unlockedBadges.length}/{badges.length})
            </Button>
          </div>

          {recentBadges.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recentBadges.map((badge) => {
                const IconComponent = iconMap[badge.icon] || Trophy;
                return (
                  <div
                    key={badge.id}
                    className={`text-center p-4 rounded-lg border-2 cursor-pointer transition-transform hover:scale-105 ${
                      badge.rarity === "legendary"
                        ? "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300"
                        : badge.rarity === "epic"
                        ? "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300"
                        : badge.rarity === "rare"
                        ? "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300"
                        : "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300"
                    }`}
                    onClick={() => navigate("/achievements")}
                  >
                    <div className="mb-2 flex justify-center">
                      <div
                        className={`p-3 rounded-full ${
                          badge.rarity === "legendary"
                            ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                            : badge.rarity === "epic"
                            ? "bg-gradient-to-br from-purple-500 to-pink-500"
                            : badge.rarity === "rare"
                            ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                            : "bg-gradient-to-br from-gray-500 to-gray-600"
                        }`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="font-medium text-sm">{badge.name}</p>
                    <p className="text-xs text-gray-600">Débloqué</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Lock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">
                Aucun badge débloqué pour le moment
              </p>
              <Button
                onClick={() => navigate("/achievements")}
                className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD]"
              >
                Découvrir les badges
              </Button>
            </div>
          )}

          {unlockedBadges.length > 0 && (
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg border-2 border-[#FC4C00]/20">
              <p className="text-sm">
                🎉 <strong>Bravo !</strong> Tu as débloqué{" "}
                {unlockedBadges.length} badge{unlockedBadges.length > 1 ? "s" : ""}. Continue
                comme ça pour en débloquer plus !
              </p>
            </div>
          )}
        </Card>

        {/* FAQ Section */}
        <Card className="p-8 mt-6 bg-gradient-to-r from-orange-50 to-blue-50 border-2 border-[#4D80C6]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl mb-2">Des questions ?</h3>
                <p className="text-gray-700 text-sm">
                  Consulte notre centre d'aide pour trouver toutes les réponses à tes questions sur Agora
                </p>
              </div>
            </div>
            <Button
              onClick={() => navigate("/faq")}
              className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6] whitespace-nowrap"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Voir la FAQ
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
