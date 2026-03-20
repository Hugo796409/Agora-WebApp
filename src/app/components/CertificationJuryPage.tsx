import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import {
  ArrowLeft,
  Award,
  CheckCircle,
  Star,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  MessageSquare,
  Download,
} from "lucide-react";
import { useProjects } from "./ProjectsContext";
import { useGamification } from "./GamificationContext";
import { gatesData } from "../data/gatesData";

export function CertificationJuryPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { getProjectById } = useProjects();
  const { checkAndUnlockBadges } = useGamification();
  const [testPhase, setTestPhase] = useState<"loading" | "evaluating" | "results">("loading");
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);

  const project = getProjectById(projectId || "");

  // Vérifier si toutes les gates sont complétées
  const gatesProgress = project?.gatesProgress || {};
  const totalTasks = gatesData.steps.reduce((acc, step) => acc + step.tasks.length, 0);
  const completedTasks = Object.values(gatesProgress).reduce(
    (acc, stepTasks) => acc + Object.values(stepTasks).filter(Boolean).length,
    0
  );
  const allGatesCompleted = completedTasks === totalTasks;

  useEffect(() => {
    // Vérifier que toutes les gates sont complétées
    if (!allGatesCompleted) {
      // Rediriger vers la page de projet si les gates ne sont pas complétées
      navigate(`/project/${projectId}`);
      return;
    }

    // Vérifier le paiement
    const payments = JSON.parse(localStorage.getItem("certificationPayments") || "{}");
    const payment = payments[projectId || ""];

    if (!payment || !payment.paid) {
      // Rediriger vers la page de paiement si non payé
      navigate(`/payment/${projectId}`);
      return;
    }

    // Phase de chargement
    const loadingTimer = setTimeout(() => {
      setTestPhase("evaluating");
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, [projectId, navigate, allGatesCompleted]);

  useEffect(() => {
    if (testPhase === "evaluating") {
      // Simulation de progression
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Calcul du score final
            const finalScore = project?.crashTestScore || Math.floor(Math.random() * 30 + 60);
            setScore(finalScore);
            setTestPhase("results");
            
            // Débloquer les badges après la certification
            setTimeout(() => {
              checkAndUnlockBadges(undefined, undefined, undefined, true, true);
            }, 1000);
            
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [testPhase, project, checkAndUnlockBadges]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl mb-4">Projet non trouvé</h2>
          <Button onClick={() => navigate("/dashboard")}>
            Retour au dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const isPassed = score >= 80;
  const isWarning = score >= 60 && score < 80;
  const isFailed = score < 60;

  const juryFeedback = {
    strengths: [
      "Vision claire et bien articulée du problème à résoudre",
      "Modèle économique cohérent et réaliste",
      "Bonne compréhension du marché cible",
      "Équipe complémentaire avec les compétences nécessaires",
    ],
    weaknesses: [
      "Stratégie de go-to-market à préciser davantage",
      "Analyse concurrentielle à approfondir",
      "Prévisions financières optimistes à ajuster",
      "Plan de croissance nécessitant plus de détails",
    ],
    recommendations: [
      "Effectuer des interviews clients pour valider les hypothèses",
      "Développer un MVP minimal pour tester le marché rapidement",
      "Établir des partenariats stratégiques pour accélérer la distribution",
      "Revoir le budget marketing en fonction des canaux d'acquisition identifiés",
    ],
  };

  const criteria = [
    {
      name: "Vision & Innovation",
      score: Math.min(100, score + Math.floor(Math.random() * 20 - 10)),
      icon: Star,
    },
    {
      name: "Faisabilité Technique",
      score: Math.min(100, score + Math.floor(Math.random() * 20 - 10)),
      icon: CheckCircle,
    },
    {
      name: "Viabilité Économique",
      score: Math.min(100, score + Math.floor(Math.random() * 20 - 10)),
      icon: TrendingUp,
    },
    {
      name: "Potentiel Marché",
      score: Math.min(100, score + Math.floor(Math.random() * 20 - 10)),
      icon: Award,
    },
  ];

  // Phase de chargement
  if (testPhase === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <Card className="max-w-md w-full p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl mb-4">Préparation de la certification</h1>
          <p className="text-gray-600 mb-8">
            Le jury examine votre dossier...
          </p>
          <Progress value={33} className="h-2" />
        </Card>
      </div>
    );
  }

  // Phase d'évaluation
  if (testPhase === "evaluating") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
        <Card className="max-w-2xl w-full p-12">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] flex items-center justify-center mx-auto mb-6">
              <Award className="w-12 h-12 text-white animate-pulse" />
            </div>
            <h1 className="text-3xl mb-4">Certification en cours</h1>
            <p className="text-xl text-gray-600 mb-2">{project.name}</p>
            <p className="text-sm text-gray-500 mb-8">
              Le jury évalue votre projet selon plusieurs critères
            </p>

            <div className="space-y-4 mb-8">
              {["Analyse de la vision", "Évaluation technique", "Viabilité économique", "Potentiel marché"].map(
                (phase, index) => (
                  <div
                    key={phase}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      progress > index * 25
                        ? "bg-gradient-to-r from-orange-50 to-blue-50 border-blue-300"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{phase}</span>
                      {progress > index * 25 && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progression</span>
                <span className="font-bold text-[#004AAD]">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Phase de résultats
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
      <div className="max-w-5xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(`/project/${project.id}`)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au projet
          </Button>
        </div>

        {/* Score principal */}
        <Card className="p-8 mb-6 text-center">
          <div
            className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 ${
              isPassed
                ? "bg-gradient-to-br from-green-400 to-green-600"
                : isWarning
                ? "bg-gradient-to-br from-orange-400 to-orange-600"
                : "bg-gradient-to-br from-red-400 to-red-600"
            }`}
          >
            {isPassed ? (
              <CheckCircle className="w-16 h-16 text-white" />
            ) : isWarning ? (
              <AlertTriangle className="w-16 h-16 text-white" />
            ) : (
              <TrendingDown className="w-16 h-16 text-white" />
            )}
          </div>

          <div className="mb-4">
            <div className="text-6xl font-bold bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent mb-2">
              {score}%
            </div>
            <h2 className="text-2xl mb-2">Score de Certification</h2>
            <p className="text-lg mb-2">
              {isPassed
                ? "Félicitations ! Ton projet est certifié par le jury"
                : isWarning
                ? "Ton projet a du potentiel mais nécessite des ajustements"
                : "Ton projet nécessite des améliorations significatives"}
            </p>
          </div>

          <Badge
            className={`${
              isPassed
                ? "bg-green-100 text-green-800 border-green-200"
                : isWarning
                ? "bg-orange-100 text-orange-800 border-orange-200"
                : "bg-red-100 text-red-800 border-red-200"
            } border text-lg px-6 py-2`}
          >
            {isPassed ? "✓ CERTIFIÉ" : isWarning ? "⚠ EN RÉVISION" : "✗ NON CERTIFIÉ"}
          </Badge>
        </Card>

        {/* Critères d'évaluation */}
        <Card className="p-6 mb-6">
          <h3 className="text-xl mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-[#004AAD]" />
            Évaluation détaillée par critère
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {criteria.map((criterion) => {
              const Icon = criterion.icon;
              return (
                <div
                  key={criterion.name}
                  className="p-4 border-2 rounded-lg bg-gradient-to-r from-orange-50 to-blue-50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-[#004AAD]" />
                      <span className="font-medium">{criterion.name}</span>
                    </div>
                    <span className="text-lg font-bold text-[#FC4C00]">
                      {criterion.score}%
                    </span>
                  </div>
                  <Progress value={criterion.score} className="h-2" />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Feedback du jury */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Points forts */}
          <Card className="p-6">
            <h3 className="text-lg mb-4 flex items-center gap-2 text-green-700">
              <TrendingUp className="w-5 h-5" />
              Points forts
            </h3>
            <ul className="space-y-3">
              {juryFeedback.strengths.map((strength, index) => (
                <li key={index} className="flex gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Points à améliorer */}
          <Card className="p-6">
            <h3 className="text-lg mb-4 flex items-center gap-2 text-orange-700">
              <AlertTriangle className="w-5 h-5" />
              À améliorer
            </h3>
            <ul className="space-y-3">
              {juryFeedback.weaknesses.map((weakness, index) => (
                <li key={index} className="flex gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{weakness}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Recommandations */}
          <Card className="p-6">
            <h3 className="text-lg mb-4 flex items-center gap-2 text-blue-700">
              <MessageSquare className="w-5 h-5" />
              Recommandations
            </h3>
            <ul className="space-y-3">
              {juryFeedback.recommendations.map((rec, index) => (
                <li key={index} className="flex gap-2 text-sm">
                  <Star className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Actions */}
        <Card className="p-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => navigate(`/project/${project.id}`)}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au projet
            </Button>
            <Button
              onClick={() => navigate("/feedbacks")}
              className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6] gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Voir tous les feedbacks
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Télécharger le certificat
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}