import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useGamification } from "./GamificationContext";
import { useProjects } from "./ProjectsContext";

export function CreateProjectPage() {
  const navigate = useNavigate();
  const { addXP, unlockBadge } = useGamification();
  const { addProject, projects } = useProjects();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Form state
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [needsBudget, setNeedsBudget] = useState<boolean | null>(null);
  const [budget, setBudget] = useState(30000);
  
  // Business Plan
  const [targetMarket, setTargetMarket] = useState("");
  const [valueProposition, setValueProposition] = useState("");
  const [revenueModel, setRevenueModel] = useState("");
  const [competition, setCompetition] = useState("");
  const [marketing, setMarketing] = useState("");

  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step === 1 && !projectName.trim()) {
      toast.error("Le nom du projet est requis");
      return;
    }
    if (step === 2 && !description.trim()) {
      toast.error("La description est requise");
      return;
    }
    if (step === 3 && needsBudget === null) {
      toast.error("Indique si tu as besoin d'un budget");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Créer le nouveau projet et vérifier les badges
    addProject({
      name: projectName,
      description: description,
      budget: needsBudget ? budget : 0,
      businessPlan: {
        targetMarket: targetMarket || "Non défini",
        valueProposition: valueProposition || "Non défini",
        revenueModel: revenueModel || "Non défini",
        competition: competition || "Non défini",
        marketing: marketing || "Non défini",
      },
    }, (projectCount) => {
      // Callback appelé après l'ajout du projet avec le nouveau nombre
      setTimeout(() => {
        checkAndUnlockBadges(projectCount);
      }, 500);
    });

    addXP(50, "🎉 Projet créé ! Continue comme ça !");
    
    toast.success("🚀 Projet créé avec succès !", {
      description: "Tu peux maintenant le gérer depuis ton dashboard",
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const checkAndUnlockBadges = (projectCount: number) => {
    // Débloquer le badge "Premier Pas" si c'est le premier projet
    if (projectCount === 1) {
      unlockBadge("first-project");
    }
    
    // Débloquer le badge "Entrepreneur Actif" si c'est le 3ème projet
    if (projectCount === 3) {
      unlockBadge("three-projects");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au dashboard
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl">Créer un projet</h1>
            <span className="text-sm text-gray-600">
              Étape {step} / {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps */}
        <Card className="p-8">
          {/* Step 1: Project Name */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl">Nomme ton projet</h2>
                  <p className="text-gray-600">
                    Choisis un nom accrocheur pour ton idée
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="projectName" className="mb-2 block">
                  Nom du projet *
                </Label>
                <Input
                  id="projectName"
                  placeholder="Ex: EcoBox, StudyBuddy, FitChallenge..."
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="text-lg"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Un bon nom doit être simple, mémorable et refléter ta valeur ajoutée
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Description */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl">Décris ton projet</h2>
                  <p className="text-gray-600">
                    Explique ton idée en quelques phrases
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="mb-2 block">
                  Description courte *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Ex: Une plateforme qui permet de commander des repas livrés dans des contenants réutilisables pour réduire les déchets..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Décris le problème que tu résous et ta solution
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl">As-tu besoin d'un budget ?</h2>
                  <p className="text-gray-600">
                    Certains projets démarrent sans financement
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setNeedsBudget(true)}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      needsBudget === true
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-4xl mb-2">💰</div>
                    <h3 className="font-bold mb-1">Oui, j'ai besoin d'un budget</h3>
                    <p className="text-sm text-gray-600">
                      Je vais définir un budget fictif
                    </p>
                  </button>

                  <button
                    onClick={() => setNeedsBudget(false)}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      needsBudget === false
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-4xl mb-2">🚀</div>
                    <h3 className="font-bold mb-1">Non, je démarre sans budget</h3>
                    <p className="text-sm text-gray-600">
                      Mon projet ne nécessite pas de financement
                    </p>
                  </button>
                </div>

                {needsBudget === true && (
                  <div className="mt-6 space-y-4 animate-in fade-in-50 duration-300">
                    <Label className="block">Budget initial</Label>
                    <div className="text-center mb-6">
                      <div className="text-5xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                        {budget.toLocaleString()}€
                      </div>
                      <p className="text-sm text-gray-600">Budget fictif pour la simulation</p>
                    </div>
                    <Slider
                      value={[budget]}
                      onValueChange={(values) => setBudget(values[0])}
                      min={10000}
                      max={100000}
                      step={5000}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>10K€</span>
                      <span>100K€</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-900">
                  💡 <strong>Conseil :</strong> De nombreux projets réussis ont démarré sans budget initial.
                  L'important est de valider ton idée d'abord !
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Business Plan */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl">Business Plan</h2>
                  <p className="text-gray-600">
                    Les fondations de ton projet
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="targetMarket" className="mb-2 block">
                    🎯 Marché cible
                  </Label>
                  <Input
                    id="targetMarket"
                    placeholder="Ex: Jeunes urbains 25-35 ans soucieux de l'environnement"
                    value={targetMarket}
                    onChange={(e) => setTargetMarket(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="valueProposition" className="mb-2 block">
                    💎 Proposition de valeur
                  </Label>
                  <Textarea
                    id="valueProposition"
                    placeholder="Qu'apportes-tu à tes clients ?"
                    value={valueProposition}
                    onChange={(e) => setValueProposition(e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="revenueModel" className="mb-2 block">
                    💰 Modèle de revenus
                  </Label>
                  <Input
                    id="revenueModel"
                    placeholder="Ex: Abonnement mensuel, commission, vente directe..."
                    value={revenueModel}
                    onChange={(e) => setRevenueModel(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="competition" className="mb-2 block">
                    🏆 Concurrence
                  </Label>
                  <Textarea
                    id="competition"
                    placeholder="Qui sont tes principaux concurrents ?"
                    value={competition}
                    onChange={(e) => setCompetition(e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="marketing" className="mb-2 block">
                    📣 Stratégie marketing
                  </Label>
                  <Textarea
                    id="marketing"
                    placeholder="Comment vas-tu attirer tes premiers clients ?"
                    value={marketing}
                    onChange={(e) => setMarketing(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>

            {step < totalSteps ? (
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                Suivant
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Check className="w-4 h-4 mr-2" />
                Créer le projet
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}