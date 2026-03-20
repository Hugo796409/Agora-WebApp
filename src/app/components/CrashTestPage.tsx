import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import {
  ArrowLeft,
  Zap,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  Target,
} from "lucide-react";
import { useProjects } from "./ProjectsContext";

export function CrashTestPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { getProjectById } = useProjects();
  const [testPhase, setTestPhase] = useState<"loading" | "testing" | "results">(
    "loading"
  );
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [currentTest, setCurrentTest] = useState("");

  const project = getProjectById(projectId || "");

  const tests = [
    "Analyse du marché cible...",
    "Évaluation de la proposition de valeur...",
    "Test du modèle économique...",
    "Simulation de la concurrence...",
    "Analyse des ressources allouées...",
    "Projection financière...",
    "Test de scalabilité...",
  ];

  useEffect(() => {
    // Loading phase
    const loadingTimer = setTimeout(() => {
      setTestPhase("testing");
      runTests();
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  const runTests = () => {
    let currentProgress = 0;
    let testIndex = 0;

    const interval = setInterval(() => {
      if (currentProgress >= 100) {
        clearInterval(interval);
        // Calculate final score based on project data
        const finalScore = project?.crashTestScore || Math.floor(Math.random() * 40 + 50);
        setScore(finalScore);
        setTestPhase("results");
      } else {
        currentProgress += 100 / tests.length;
        setProgress(Math.min(currentProgress, 100));
        
        if (testIndex < tests.length) {
          setCurrentTest(tests[testIndex]);
          testIndex++;
        }
      }
    }, 800);
  };

  const handleRetry = () => {
    navigate(`/project/${projectId}`);
  };

  const handleNewProject = () => {
    navigate("/create-project");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Projet non trouvé</p>
      </div>
    );
  }

  const isPassed = score >= 80;
  const isWarning = score >= 60 && score < 80;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(`/project/${projectId}`)}
            disabled={testPhase === "testing"}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au projet
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Loading Phase */}
        {testPhase === "loading" && (
          <Card className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl mb-4">Préparation du crash test</h1>
            <p className="text-gray-600 mb-8">
              Initialisation des simulations...
            </p>
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          </Card>
        )}

        {/* Testing Phase */}
        {testPhase === "testing" && (
          <Card className="p-12">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-white animate-pulse" />
              </div>
              <h1 className="text-3xl mb-4">Crash Test en cours</h1>
              <p className="text-xl text-gray-600 mb-2">{project.name}</p>
              <p className="text-sm text-gray-500">
                Testez votre idée à 80% de seuil de réussite
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  {currentTest}
                </span>
                <span className="text-sm font-medium text-blue-600">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <p className="text-sm text-blue-900 text-center">
                ⏳ <strong>Simulation en cours...</strong> Nous analysons tous les
                aspects de ton projet pour te donner un feedback précis et
                pédagogique.
              </p>
            </div>
          </Card>
        )}

        {/* Results Phase */}
        {testPhase === "results" && (
          <div className="space-y-6">
            {/* Score Card */}
            <Card
              className={`p-12 text-center border-4 ${
                isPassed
                  ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300"
                  : isWarning
                  ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300"
                  : "bg-gradient-to-br from-red-50 to-pink-50 border-red-300"
              }`}
            >
              {isPassed ? (
                <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
              ) : isWarning ? (
                <AlertTriangle className="w-20 h-20 text-amber-600 mx-auto mb-6" />
              ) : (
                <XCircle className="w-20 h-20 text-red-600 mx-auto mb-6" />
              )}

              <h1 className="text-3xl mb-4">
                {isPassed
                  ? "🎉 Félicitations !"
                  : isWarning
                  ? "⚠️ Presque réussi !"
                  : "💪 Continue d'apprendre !"}
              </h1>

              <div className="mb-6">
                <div
                  className={`text-7xl mb-2 ${
                    isPassed
                      ? "text-green-600"
                      : isWarning
                      ? "text-amber-600"
                      : "text-red-600"
                  }`}
                >
                  {score}%
                </div>
                <p className="text-gray-600">Score global</p>
              </div>

              <p className="text-lg mb-2">
                {isPassed
                  ? "Ton projet a passé le crash test avec succès !"
                  : isWarning
                  ? "Ton projet a du potentiel mais nécessite des ajustements."
                  : "Ton projet a besoin d'améliorations significatives."}
              </p>
              <p className="text-gray-600">
                {isPassed
                  ? "Tu as atteint le seuil de réussite de 80%. Bravo !"
                  : "Seuil de réussite : 80%"}
              </p>
            </Card>

            {/* Detailed Results */}
            <Card className="p-8">
              <h2 className="text-2xl mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-600" />
                Résultats détaillés
              </h2>

              <div className="space-y-4">
                {/* Market Analysis */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${score >= 70 ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                    <span className="font-medium">Analyse du marché</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {score >= 70 ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-amber-600" />
                    )}
                    <span className="font-medium">{Math.min(score + 5, 100)}%</span>
                  </div>
                </div>

                {/* Value Proposition */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${score >= 75 ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                    <span className="font-medium">Proposition de valeur</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {score >= 75 ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-amber-600" />
                    )}
                    <span className="font-medium">{Math.min(score + 8, 100)}%</span>
                  </div>
                </div>

                {/* Business Model */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${score >= 80 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="font-medium">Modèle économique</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {score >= 80 ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    )}
                    <span className="font-medium">{Math.max(score - 5, 0)}%</span>
                  </div>
                </div>

                {/* Resources */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${score >= 65 ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                    <span className="font-medium">Allocation des ressources</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {score >= 65 ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-amber-600" />
                    )}
                    <span className="font-medium">{score}%</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pedagogical Feedback */}
            <Card className="p-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
              <h2 className="text-2xl mb-4 flex items-center gap-2">
                💡 Points d'apprentissage
              </h2>

              {isPassed ? (
                <div className="space-y-3">
                  <p className="text-gray-700">
                    ✅ <strong>Excellent travail !</strong> Ton projet présente une base
                    solide et viable.
                  </p>
                  <p className="text-gray-700">
                    📚 Continue à itérer et à améliorer les détails de ton business plan.
                  </p>
                  <p className="text-gray-700">
                    🚀 Tu peux maintenant créer un nouveau projet ou affiner celui-ci.
                  </p>
                </div>
              ) : isWarning ? (
                <div className="space-y-3">
                  <p className="text-gray-700">
                    ⚡ <strong>Bon début !</strong> Ton projet a du potentiel mais
                    nécessite quelques ajustements.
                  </p>
                  <p className="text-gray-700">
                    📊 Revois ton modèle économique et ta stratégie de marché.
                  </p>
                  <p className="text-gray-700">
                    🔄 Prends en compte les feedbacks et réessaye !
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-gray-700">
                    💪 <strong>L'échec fait partie de l'apprentissage !</strong> C'est en
                    testant qu'on apprend.
                  </p>
                  <p className="text-gray-700">
                    📝 Analyse les points faibles identifiés et repense ton approche.
                  </p>
                  <p className="text-gray-700">
                    🎯 Concentre-toi sur la proposition de valeur et le modèle économique.
                  </p>
                </div>
              )}
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleRetry}
                variant="outline"
                className="flex-1"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Améliorer ce projet
              </Button>
              <Button
                onClick={handleNewProject}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Créer un nouveau projet
              </Button>
              <Button onClick={handleDashboard} variant="outline" className="flex-1">
                Retour au dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}