import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Plus,
  TrendingUp,
  Target,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter,
  Zap,
  Award,
  Sparkles,
  ArrowRight,
  BarChart3,
  Lightbulb,
  Users,
  Trophy,
  Flame,
  Star,
  Crown,
  Lock,
  CreditCard,
  User,
  FolderOpen,
  MessageSquare,
  X,
  FileText,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Project } from "../data/mockProjects";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useGamification } from "./GamificationContext";
import { useProjects } from "./ProjectsContext";
import { useUserPlan } from "./UserPlanContext"; // v2.0 with community access

// Dashboard component for startup projects
export function DashboardStartup() {
  const navigate = useNavigate();
  const { projects } = useProjects();
  const [filter, setFilter] = useState<"all" | "draft" | "testing" | "completed">("all");
  const { streak, incrementStreak, badges } = useGamification();
  const { currentPlan, canCreateProject, getProjectLimit } = useUserPlan();
  const [showLimitModal, setShowLimitModal] = useState(false);

  const handleCreateProject = () => {
    if (canCreateProject(projects.length)) {
      navigate("/create-project");
    } else {
      setShowLimitModal(true);
    }
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects-section");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "testing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "testing":
        return <Clock className="w-4 h-4" />;
      case "failed":
        return <AlertCircle className="w-4 h-4" />;
      case "draft":
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "Terminé";
      case "testing":
        return "En test";
      case "failed":
        return "Échec";
      case "draft":
        return "Brouillon";
    }
  };

  // Filter projects based on selected filter
  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    if (filter === "draft") return project.status === "draft";
    if (filter === "testing") return project.status === "testing" || project.status === "failed";
    if (filter === "completed") return project.status === "completed";
    return true;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">
                Initiate Together
              </h1>
              <p className="text-gray-600 mt-1">
                Crée, teste et améliore tes idées de startup
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/pricing")}
                className="border-[#FC4C00] text-[#FC4C00] hover:bg-[#FC4C00] hover:text-white"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Pricing
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/profile")}
              >
                <User className="w-4 h-4 mr-2" />
                Profil
              </Button>
              <Button
                onClick={handleCreateProject}
                className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Créer mon premier projet
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card
            className="p-6 cursor-pointer hover:shadow-lg transition-all border-2 hover:border-[#4D80C6]"
            onClick={handleCreateProject}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] flex items-center justify-center shadow-lg">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Créer un projet</h3>
                <p className="text-sm text-gray-600">
                  Lance une nouvelle idée
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 cursor-pointer hover:shadow-lg transition-all border-2 hover:border-[#4D80C6]" onClick={scrollToProjects}>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shadow-md">
                <FolderOpen className="w-8 h-8 text-[#004AAD]" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Mes projets</h3>
                <p className="text-sm text-gray-600">
                  {projects.length} projet{projects.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 cursor-pointer hover:shadow-lg transition-all border-2 hover:border-[#FD824D]"
            onClick={() => navigate("/feedbacks")}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center shadow-md">
                <MessageSquare className="w-8 h-8 text-[#FD824D]" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Voir les feedbacks</h3>
                <p className="text-sm text-gray-600">
                  Conseils des mentors
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Onboarding Tutorial */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-orange-50 to-blue-50 border-2 border-[#4D80C6]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg mb-2">La pédagogie du crash test</h3>
              <p className="text-gray-700 text-sm mb-4">
                Le bac à sable te permet de tester tes idées sans risque réel. 
                Chaque projet passe par un <strong>crash test</strong> qui évalue sa viabilité. 
                L'objectif n'est pas d'éviter l'échec, mais d'<strong>apprendre de tes erreurs</strong>  
                et d'améliorer ton projet jusqu'à atteindre le seuil de réussite de 80%.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white text-[#004AAD] border border-[#4D80C6]">
                  📊 Simulation réaliste
                </Badge>
                <Badge className="bg-white text-[#004AAD] border border-[#4D80C6]">
                  🎯 Feedback personnalisé
                </Badge>
                <Badge className="bg-white text-[#004AAD] border border-[#4D80C6]">
                  🔄 Itération encouragée
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Projects List */}
        <div id="projects-section" className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl">Mes Projets</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-gray-100" : ""}
            >
              Tous
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilter("draft")}
              className={filter === "draft" ? "bg-gray-100" : ""}
            >
              Brouillons
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilter("testing")}
              className={filter === "testing" ? "bg-gray-100" : ""}
            >
              En cours
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilter("completed")}
              className={filter === "completed" ? "bg-gray-100" : ""}
            >
              Terminés
            </Button>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg mb-2">Aucun projet pour le moment</h3>
              <p className="text-gray-600 mb-6">
                Lance-toi et crée ton premier projet pour commencer à apprendre !
              </p>
              <Button
                onClick={handleCreateProject}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Créer mon premier projet
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="p-6 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => navigate(`/project/${project.id}`)}
              >
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <Badge
                    className={`${getStatusColor(project.status)} border`}
                  >
                    <span className="flex items-center gap-1">
                      {getStatusIcon(project.status)}
                      {getStatusLabel(project.status)}
                    </span>
                  </Badge>
                  {project.crashTestScore && (
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        {project.crashTestScore}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <h3 className="text-lg mb-2">{project.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progression</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    {new Date(project.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                  <span>{project.budget.toLocaleString()}€</span>
                </div>

                {/* Feedback Badge */}
                {project.feedback && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-purple-600">
                      <MessageSquare className="w-4 h-4" />
                      <span>Feedback disponible</span>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* No Zero Day Section */}
        <Card className="mt-8 p-8 bg-gradient-to-r from-orange-50 via-white to-blue-50 border-2 border-[#FC4C00]">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] flex items-center justify-center animate-pulse">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">No Zero Day</h3>
                <p className="text-sm text-gray-600">Ta série actuelle</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-6xl mb-2 bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">
                {streak}
              </div>
              <p className="text-sm text-gray-600">jour{streak > 1 ? 's' : ''} consécutif{streak > 1 ? 's' : ''}</p>
            </div>

            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
              Ne pas perdre de jour en ne faisant rien. Sois productif tous les jours. 
              Deviens la meilleure version de toi-même. Chaque action compte.
            </p>

            <Button
              onClick={() => {
                incrementStreak();
              }}
              className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6] text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Flame className="w-5 h-5 mr-2" />
              J'ai été productif aujourd'hui
            </Button>
          </div>
        </Card>
      </div>

      {/* Project Limit Modal */}
      {showLimitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Limite atteinte !</h3>
                    <p className="text-white/80 text-sm">
                      Plan {currentPlan.plan === "free" ? "Free" : currentPlan.plan === "basic" ? "Basic" : "Premium"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setShowLimitModal(false)}
                  className="text-white hover:bg-white/20 p-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Limit Info */}
              <div className="text-center mb-6 p-6 bg-gradient-to-br from-orange-50 to-blue-50 rounded-lg border-2 border-[#FC4C00]/20">
                <p className="text-sm text-gray-600 mb-2">Vous avez créé</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">
                    {projects.length}
                  </span>
                  <span className="text-2xl text-gray-600">/</span>
                  <span className="text-3xl font-bold text-gray-600">
                    {getProjectLimit()}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  projets
                </p>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 text-center mb-4">
                  Tu as atteint la limite de projets de ton plan{" "}
                  <strong>
                    {currentPlan.plan === "free" ? "Free" : currentPlan.plan === "basic" ? "Basic" : "Premium"}
                  </strong>.
                </p>
                <p className="text-gray-600 text-center text-sm">
                  Pour créer plus de projets, passe à l'offre supérieure et débloque de nouvelles fonctionnalités ! 🚀
                </p>
              </div>

              {/* Upgrade Options */}
              <div className="space-y-3 mb-6">
                {currentPlan.plan === "free" && (
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg border-2 border-[#4D80C6]">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="w-6 h-6 text-[#FC4C00]" />
                      <h4 className="font-semibold text-lg">Plan Basic</h4>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-1 mb-3 ml-9">
                      <li>✓ Jusqu'à <strong>5 projets actifs</strong></li>
                      <li>✓ Feedback de mentors</li>
                      <li>✓ Accès à la communauté</li>
                    </ul>
                    <p className="text-xs text-gray-500 ml-9">
                      À partir de <strong className="text-[#FC4C00]">12,99€/mois</strong> avec engagement
                    </p>
                  </div>
                )}
                {currentPlan.plan === "basic" && (
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg border-2 border-[#4D80C6]">
                    <div className="flex items-center gap-3 mb-2">
                      <Crown className="w-6 h-6 text-[#004AAD]" />
                      <h4 className="font-semibold text-lg">Plan Premium</h4>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-1 mb-3 ml-9">
                      <li>✓ <strong>Projets illimités</strong></li>
                      <li>✓ Coaching 1-to-1 mensuel</li>
                      <li>✓ Accès complet à Heliée</li>
                      <li>✓ Accès à la Certification</li>
                    </ul>
                    <p className="text-xs text-gray-500 ml-9">
                      À partir de <strong className="text-[#004AAD]">43,99€/mois</strong> avec engagement
                    </p>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setShowLimitModal(false);
                    navigate("/pricing");
                  }}
                  className="w-full py-6 text-base bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6] text-white shadow-lg"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Passer à l'offre supérieure
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowLimitModal(false)}
                  className="w-full"
                >
                  Annuler
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}