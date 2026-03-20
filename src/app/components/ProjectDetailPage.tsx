import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  ArrowLeft,
  Zap,
  TrendingUp,
  MessageSquare,
  Edit,
  Target,
  DollarSign,
  Users,
  Rocket,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useProjects } from "./ProjectsContext";
import { GatesTab } from "./GatesTab";
import { gatesData } from "../data/gatesData";

export function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isLaunchingTest, setIsLaunchingTest] = useState(false);
  const { getProjectById } = useProjects();

  const project = getProjectById(projectId || "");

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Projet non trouvé</p>
      </div>
    );
  }

  // Calculer la progression des gates
  const gatesProgress = project.gatesProgress || {};
  const totalTasks = gatesData.steps.reduce((acc, step) => acc + step.tasks.length, 0);
  const completedTasks = Object.values(gatesProgress).reduce(
    (acc, stepTasks) => acc + Object.values(stepTasks).filter(Boolean).length,
    0
  );
  const allGatesCompleted = completedTasks === totalTasks;

  const handleLaunchCrashTest = () => {
    // Vérifier si toutes les gates sont complétées
    if (!allGatesCompleted) {
      alert("❌ Tu dois compléter toutes les gates avant de pouvoir accéder à la certification jury !");
      return;
    }

    setIsLaunchingTest(true);
    
    // Vérifier si le paiement a été effectué
    const payments = JSON.parse(localStorage.getItem("certificationPayments") || "{}");
    const payment = payments[project.id];
    
    setTimeout(() => {
      if (payment && payment.paid) {
        // Si payé, aller directement à la certification
        navigate(`/certification/${project.id}`);
      } else {
        // Sinon, aller à la page de paiement
        navigate(`/payment/${project.id}`);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au dashboard
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl mb-2">{project.name}</h1>
              <p className="text-gray-600">{project.description}</p>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="text-lg font-medium">
                    {project.budget.toLocaleString()}€
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Score</p>
                  <p className="text-lg font-medium">
                    {project.crashTestScore || "-"}
                    {project.crashTestScore && "%"}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Statut</p>
                  <p className="text-lg font-medium capitalize">
                    {project.status === "completed"
                      ? "Terminé"
                      : project.status === "testing"
                      ? "En test"
                      : project.status === "failed"
                      ? "Échec"
                      : "Brouillon"}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Progression</p>
                  <p className="text-lg font-medium">{project.progress}%</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="gates" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="gates">Gates</TabsTrigger>
                <TabsTrigger value="business-plan">Business Plan</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>

              {/* Gates Tab */}
              <TabsContent value="gates">
                <GatesTab projectId={projectId || ""} />
              </TabsContent>

              {/* Business Plan Tab */}
              <TabsContent value="business-plan">
                <Card className="p-6">
                  {project.businessPlan ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          🎯 Marché cible
                        </h3>
                        <p className="text-gray-700">
                          {project.businessPlan.targetMarket}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          💎 Proposition de valeur
                        </h3>
                        <p className="text-gray-700">
                          {project.businessPlan.valueProposition}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          💰 Modèle de revenus
                        </h3>
                        <p className="text-gray-700">
                          {project.businessPlan.revenueModel}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          🏆 Concurrence
                        </h3>
                        <p className="text-gray-700">
                          {project.businessPlan.competition}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          📣 Marketing
                        </h3>
                        <p className="text-gray-700">
                          {project.businessPlan.marketing}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        Business plan non renseigné
                      </p>
                      <Button variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Compléter le business plan
                      </Button>
                    </div>
                  )}
                </Card>
              </TabsContent>

              {/* Feedback Tab */}
              <TabsContent value="feedback">
                <Card className="p-6">
                  {project.feedback ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                            {project.feedback.mentor[0]}
                          </div>
                          <div>
                            <p className="font-medium">{project.feedback.mentor}</p>
                            <p className="text-sm text-gray-600">Mentor</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-2xl">
                            {"⭐".repeat(Math.floor(project.feedback.rating))}
                          </span>
                          <span className="text-gray-600 ml-1">
                            {project.feedback.rating}/5
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-3 text-green-700">
                          ✅ Points forts
                        </h3>
                        <ul className="space-y-2">
                          {project.feedback.strengths.map((strength, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="text-green-600 mt-0.5">•</span>
                              <span className="text-gray-700">{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium mb-3 text-orange-700">
                          📈 Axes d'amélioration
                        </h3>
                        <ul className="space-y-2">
                          {project.feedback.improvements.map((improvement, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="text-orange-600 mt-0.5">•</span>
                              <span className="text-gray-700">{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 mb-2">
                        Aucun feedback pour le moment
                      </p>
                      <p className="text-sm text-gray-400">
                        Lance une certification jury pour recevoir des conseils de mentors
                      </p>
                    </div>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Actions */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h3 className="text-lg mb-4">Actions</h3>

              <div className="space-y-3">
                <Button
                  onClick={handleLaunchCrashTest}
                  disabled={isLaunchingTest}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  {isLaunchingTest ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Lancement...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Certification Jury
                    </>
                  )}
                </Button>

                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier le projet
                </Button>

                {project.feedback && (
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Voir le feedback complet
                  </Button>
                )}
              </div>

              {/* Progress Card */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progression</span>
                  <span className="text-sm text-blue-600">
                    {project.progress}%
                  </span>
                </div>
                <Progress value={project.progress} className="h-2 mb-3" />
                <p className="text-xs text-gray-600">
                  Continue à améliorer ton projet pour atteindre 100%
                </p>
              </div>

              {/* Info Card */}
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <Rocket className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      Certification Jury
                    </p>
                    <p className="text-xs text-blue-700">
                      Soumets ton projet à l'évaluation d'un jury d'experts. Frais : 399,99€
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}