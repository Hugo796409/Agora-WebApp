import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { 
  CheckCircle2, 
  Circle, 
  Lock,
  Unlock,
  GraduationCap,
  AlertCircle,
  Rocket,
  Star,
  Sparkles,
  Trophy,
  Book,
  ChevronLeft,
  Video,
  FileText
} from "lucide-react";
import { gatesData } from "../data/gatesData";
import { getCourseContent } from "../data/courseData";
import { CourseModal } from "./CourseModal";
import { useProjects } from "./ProjectsContext";
import { useGamification } from "./GamificationContext";
import { motion } from "motion/react";
import { RealisticPlanet } from "./RealisticPlanet";

// Planètes du système solaire pour chaque gate avec apparence réaliste
const PLANET_DATA = [
  { 
    name: "Mercure", 
    colors: { primary: "#8C7853", secondary: "#B5A393", surface: "#6B5D4F" },
    description: "La planète de l'inspiration"
  },
  { 
    name: "Vénus", 
    colors: { primary: "#FFA500", secondary: "#FFD700", surface: "#FF8C00" },
    description: "La planète de l'adéquation"
  },
  { 
    name: "Mars", 
    colors: { primary: "#CD5C5C", secondary: "#FF6B6B", surface: "#8B0000" },
    description: "La planète de l'étude"
  },
  { 
    name: "Jupiter", 
    colors: { primary: "#DAA520", secondary: "#F0E68C", surface: "#B8860B" },
    description: "La planète de la stratégie"
  },
  { 
    name: "Saturne", 
    colors: { primary: "#F4E4C1", secondary: "#E6D7B8", surface: "#D4C4A8" },
    description: "La planète des finances"
  },
  { 
    name: "Uranus", 
    colors: { primary: "#4FD1C5", secondary: "#81E6D9", surface: "#319795" },
    description: "La planète des aides"
  },
  { 
    name: "Neptune", 
    colors: { primary: "#4169E1", secondary: "#6495ED", surface: "#1E3A8A" },
    description: "La planète juridique"
  },
  { 
    name: "Pluton", 
    colors: { primary: "#8B7D6B", secondary: "#A89F91", surface: "#6B5D4F" },
    description: "La planète des démarches"
  },
  { 
    name: "Titan", 
    colors: { primary: "#FF6347", secondary: "#FF7F50", surface: "#DC143C" },
    description: "La planète de l'installation"
  },
  { 
    name: "Europa", 
    colors: { primary: "#E0F2FE", secondary: "#BAE6FD", surface: "#7DD3FC" },
    description: "La planète du démarrage"
  },
];

interface GatesTabProps {
  projectId: string;
}

export function GatesTab({ projectId }: GatesTabProps) {
  const { getProjectById, updateProject } = useProjects();
  const { checkAndUnlockBadges } = useGamification();
  const project = getProjectById(projectId);
  const [selectedGate, setSelectedGate] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<{
    stepIndex: number;
    taskIndex: number;
  } | null>(null);

  if (!project) return null;

  const gatesProgress = project.gatesProgress || {};
  const deliverables = project.deliverables || {};

  // Calculer la progression totale
  const totalTasks = gatesData.steps.reduce((acc, step) => acc + step.tasks.length, 0);
  const completedTasks = Object.values(gatesProgress).reduce(
    (acc, stepTasks) => acc + Object.values(stepTasks).filter(Boolean).length,
    0
  );
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Vérifier si toutes les gates sont complétées
  const allGatesCompleted = completedTasks === totalTasks;

  // Calculer les gates complétés (un gate = toutes ses tâches terminées)
  const completedGates = gatesData.steps.filter((step, stepIndex) => {
    const stepTasks = gatesProgress[stepIndex] || {};
    const completed = Object.values(stepTasks).filter(Boolean).length;
    return completed === step.tasks.length;
  }).length;

  // Compter combien de cours sont disponibles
  const totalCourses = gatesData.steps.reduce((total, step, stepIndex) => {
    return total + step.tasks.filter((_, taskIndex) => getCourseContent(stepIndex, taskIndex) !== null).length;
  }, 0);

  const openCourse = (stepIndex: number, taskIndex: number) => {
    setSelectedCourse({ stepIndex, taskIndex });
  };

  const closeCourse = () => {
    setSelectedCourse(null);
  };

  const submitDeliverable = (stepIndex: number, taskIndex: number, deliverable: string) => {
    // Sauvegarder le livrable
    const newDeliverables = { ...deliverables };
    if (!newDeliverables[stepIndex]) {
      newDeliverables[stepIndex] = {};
    }
    newDeliverables[stepIndex][taskIndex] = deliverable;

    // Marquer la tâche comme complétée
    const newProgress = { ...gatesProgress };
    if (!newProgress[stepIndex]) {
      newProgress[stepIndex] = {};
    }
    newProgress[stepIndex][taskIndex] = true;

    // Calculer le nombre de gates complétées après cette validation
    const newCompletedTasks = Object.values(newProgress).reduce(
      (acc, stepTasks) => acc + Object.values(stepTasks).filter(Boolean).length,
      0
    );
    const newAllGatesCompleted = newCompletedTasks === totalTasks;
    
    // Calculer la progression en pourcentage basée sur les gates
    const newProgressPercentage = totalTasks > 0 ? Math.round((newCompletedTasks / totalTasks) * 100) : 0;

    updateProject(projectId, { 
      deliverables: newDeliverables,
      gatesProgress: newProgress,
      progress: newProgressPercentage
    });

    // Vérifier et débloquer les badges
    setTimeout(() => {
      checkAndUnlockBadges(undefined, newCompletedTasks, newAllGatesCompleted);
    }, 500);
  };

  const getStepProgress = (stepIndex: number) => {
    const step = gatesData.steps[stepIndex];
    const stepTasks = gatesProgress[stepIndex] || {};
    const completed = Object.values(stepTasks).filter(Boolean).length;
    return {
      completed,
      total: step.tasks.length,
      percentage: step.tasks.length > 0 ? Math.round((completed / step.tasks.length) * 100) : 0,
      isCompleted: completed === step.tasks.length,
    };
  };

  // Déterminer la prochaine tâche disponible dans un gate
  const getNextAvailableTask = (stepIndex: number) => {
    const stepTasks = gatesProgress[stepIndex] || {};
    const tasks = gatesData.steps[stepIndex].tasks;
    
    for (let i = 0; i < tasks.length; i++) {
      if (!stepTasks[i]) {
        return i; // Première tâche non complétée
      }
    }
    return tasks.length; // Toutes complétées
  };

  // Vérifier si une planète est découverte (visible)
  const isPlanetDiscovered = (stepIndex: number) => {
    if (stepIndex === 0) return true; // Premier gate toujours visible
    const previousStepProgress = getStepProgress(stepIndex - 1);
    return previousStepProgress.isCompleted || stepIndex <= completedGates;
  };

  // Vérifier si un gate est accessible (on peut cliquer dessus)
  const isGateAccessible = (stepIndex: number) => {
    if (stepIndex === 0) return true;
    const previousStepProgress = getStepProgress(stepIndex - 1);
    return previousStepProgress.isCompleted;
  };

  // Vue de la carte (parcours des planètes)
  if (selectedGate === null) {
    return (
      <div className="space-y-6">
        {/* En-tête avec progression globale */}
        <Card className="p-6 bg-gradient-to-r from-orange-50 to-blue-50 border-2 border-[#4D80C6]">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl mb-2 bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">
                Voyage Spatial des Gates
              </h3>
              <p className="text-sm text-gray-700">
                Explore les planètes et complète toutes les missions pour débloquer la certification
              </p>
            </div>
            {allGatesCompleted ? (
              <Badge className="bg-green-100 text-green-800 border-green-300">
                <Trophy className="w-3 h-3 mr-1" />
                Voyage Complété
              </Badge>
            ) : (
              <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                <Rocket className="w-3 h-3 mr-1" />
                En cours
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Progression du voyage</span>
              <span className="text-[#004AAD] font-bold">
                {completedGates}/10 Planètes explorées
              </span>
            </div>
            <Progress value={(completedGates / 10) * 100} className="h-3" />
          </div>
        </Card>

        {/* Alerte pédagogique */}
        <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300">
          <div className="flex items-start gap-3">
            <GraduationCap className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-purple-900">Mode exploration activé</h4>
                <Badge className="bg-purple-200 text-purple-900 border-purple-400">
                  {totalCourses} cours disponibles
                </Badge>
              </div>
              <p className="text-sm text-purple-800">
                Découvre chaque planète en complétant ses missions. Chaque mission contient un cours et nécessite un livrable.
              </p>
            </div>
          </div>
        </Card>

        {/* Parcours des planètes */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
          {/* Étoiles de fond */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Ligne de connexion verticale */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/20 -translate-x-1/2 hidden md:block" />

          {/* Terre (point de départ) - Ultra-réaliste */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mb-16 flex justify-center"
          >
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-3">
                <div className="w-40 h-40 rounded-full shadow-2xl relative overflow-hidden"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, #87CEEB, #1E90FF 50%, #000080 85%, #000000)",
                    boxShadow: "0 12px 40px rgba(30, 144, 255, 0.5), inset -12px -12px 30px rgba(0,0,0,0.8), inset 6px 6px 20px rgba(135, 206, 235, 0.3)",
                  }}
                >
                  {/* Rotation lente de la Terre */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
                  >
                    {/* Continents (Amérique) */}
                    <div className="absolute top-8 left-6 w-12 h-20 bg-green-700/70 blur-[1px]" 
                      style={{ borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%" }} 
                    />
                    <div className="absolute top-10 left-8 w-8 h-16 bg-green-800/60 blur-[1px]" 
                      style={{ borderRadius: "50% 50% 60% 40% / 60% 50% 50% 40%" }} 
                    />
                    
                    {/* Continents (Afrique/Europe) */}
                    <div className="absolute top-6 right-10 w-14 h-16 bg-green-700/70 blur-[1px]" 
                      style={{ borderRadius: "40% 60% 50% 50% / 50% 50% 60% 40%" }} 
                    />
                    <div className="absolute top-4 right-8 w-10 h-10 bg-green-800/60 blur-[1px]" 
                      style={{ borderRadius: "50% 50% 40% 60%" }} 
                    />

                    {/* Continents (Asie) */}
                    <div className="absolute top-12 right-4 w-16 h-14 bg-green-700/70 blur-[1px]" 
                      style={{ borderRadius: "50% 60% 40% 50% / 60% 40% 50% 50%" }} 
                    />

                    {/* Océans avec reflets */}
                    <div className="absolute top-14 left-14 w-18 h-18 bg-blue-600/30 rounded-full blur-md" />
                    <div className="absolute top-20 right-16 w-20 h-20 bg-blue-700/25 rounded-full blur-md" />

                    {/* Calottes glaciaires */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white/90 blur-sm" />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white/85 blur-sm" />

                    {/* Nuages animés */}
                    <motion.div 
                      className="absolute top-8 left-12 w-16 h-8 rounded-full bg-white/40 blur-md"
                      animate={{ x: [0, 10, 0], opacity: [0.4, 0.6, 0.4] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div 
                      className="absolute top-18 right-14 w-14 h-6 rounded-full bg-white/35 blur-md"
                      animate={{ x: [0, -8, 0], opacity: [0.35, 0.55, 0.35] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                    <motion.div 
                      className="absolute bottom-12 left-16 w-18 h-10 rounded-full bg-white/40 blur-lg"
                      animate={{ x: [0, 12, 0], opacity: [0.4, 0.6, 0.4] }}
                      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    />
                  </motion.div>

                  {/* Reflet lumineux ultra-réaliste du soleil */}
                  <div className="absolute top-4 left-4 w-24 h-24 rounded-full bg-gradient-to-br from-white/70 via-white/40 to-transparent blur-xl" />
                  <div className="absolute top-3 left-3 w-16 h-16 rounded-full bg-white/50 blur-lg" />
                  <div className="absolute top-2 left-2 w-10 h-10 rounded-full bg-white/30 blur-md" />

                  {/* Ombre du terminateur (transition jour/nuit) */}
                  <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

                  {/* Atmosphère bleue lumineuse */}
                  <div 
                    className="absolute inset-0 rounded-full"
                    style={{
                      boxShadow: "inset 0 0 25px rgba(135, 206, 235, 0.4), 0 0 50px rgba(30, 144, 255, 0.3)",
                    }}
                  />
                </div>

                {/* Lueur orbitale bleue pulsante */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  animate={{
                    boxShadow: [
                      "0 0 40px rgba(30, 144, 255, 0.4)",
                      "0 0 60px rgba(30, 144, 255, 0.6)",
                      "0 0 40px rgba(30, 144, 255, 0.4)",
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <p className="text-white font-bold text-lg">🌍 Terre</p>
              <p className="text-white/70 text-sm">Point de départ</p>
            </div>
          </motion.div>

          {/* Fusée animée */}
          {completedGates < 10 && (
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: completedGates * 280 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-1/2 top-32 -translate-x-1/2 z-30 pointer-events-none"
            >
              <motion.div
                animate={{
                  rotate: [0, -8, 8, -8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Rocket className="w-12 h-12 text-yellow-400 drop-shadow-2xl" />
              </motion.div>
            </motion.div>
          )}

          {/* Planètes */}
          <div className="space-y-12">
            {PLANET_DATA.map((planet, stepIndex) => {
              const isDiscovered = isPlanetDiscovered(stepIndex);
              const isAccessible = isGateAccessible(stepIndex);
              const stepProgress = getStepProgress(stepIndex);
              const isEven = stepIndex % 2 === 0;

              if (!isDiscovered) return null; // Ne pas afficher les planètes non découvertes

              return (
                <motion.div
                  key={stepIndex}
                  initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: stepIndex * 0.1, duration: 0.5 }}
                  className={`relative flex items-center gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Planète réaliste ultra-détaillée */}
                  <RealisticPlanet
                    planet={planet}
                    stepIndex={stepIndex}
                    stepProgress={stepProgress}
                    isAccessible={isAccessible}
                    onClick={() => isAccessible && setSelectedGate(stepIndex)}
                  />

                  {/* Carte info planète */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex-1"
                  >
                    <Card className="bg-white/95 backdrop-blur p-5 shadow-xl border-2"
                      style={{ borderColor: planet.colors.primary }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-bold text-xl mb-1" style={{ color: planet.colors.primary }}>
                            {planet.name}
                          </h3>
                          <p className="text-sm text-gray-600 italic mb-2">{planet.description}</p>
                          <p className="text-sm font-medium text-gray-700">{gatesData.steps[stepIndex].title}</p>
                        </div>
                        <Badge
                          variant="outline"
                          style={{
                            borderColor: planet.colors.primary,
                            color: planet.colors.primary,
                            backgroundColor: `${planet.colors.primary}20`,
                          }}
                        >
                          {stepProgress.completed}/{stepProgress.total}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-3">
                        <Progress
                          value={stepProgress.percentage}
                          className="h-2"
                          style={{
                            backgroundColor: `${planet.colors.primary}30`,
                          }}
                        />
                        <p className="text-xs text-gray-600">
                          {stepProgress.percentage}% des missions complétées
                        </p>
                      </div>

                      <Button
                        onClick={() => setSelectedGate(stepIndex)}
                        disabled={!isAccessible}
                        className="w-full"
                        style={{
                          backgroundColor: isAccessible ? planet.colors.primary : "#9CA3AF",
                        }}
                      >
                        {!isAccessible ? (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Planète verrouillée
                          </>
                        ) : stepProgress.isCompleted ? (
                          <>
                            <Star className="w-4 h-4 mr-2" />
                            Revoir les missions
                          </>
                        ) : (
                          <>
                            <Book className="w-4 h-4 mr-2" />
                            Explorer ({stepProgress.completed}/{stepProgress.total})
                          </>
                        )}
                      </Button>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Univers final */}
          {allGatesCompleted && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="relative z-10 mt-16 flex justify-center"
            >
              <div className="text-center">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="w-40 h-40 rounded-full bg-gradient-to-br from-yellow-300 via-purple-500 to-pink-500 shadow-2xl mx-auto mb-4 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white" />
                </motion.div>
                <p className="text-white font-bold text-3xl mb-2">
                  ✨ Voyage Complété ! ✨
                </p>
                <p className="text-white/90 text-lg">L'univers t'appartient</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Message final */}
        {allGatesCompleted && (
          <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300">
            <div className="text-center">
              <Trophy className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-900 mb-2">
                🎉 Toutes les planètes explorées !
              </h3>
              <p className="text-green-700 mb-4">
                Tu peux maintenant soumettre ton projet à la certification jury
              </p>
              <Button 
                onClick={() => window.location.href = `/payment/${projectId}`}
                className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6]"
              >
                <Unlock className="w-4 h-4 mr-2" />
                Accéder à la certification
              </Button>
            </div>
          </Card>
        )}
      </div>
    );
  }

  // Vue détaillée d'un gate (parcours des tâches style Duolingo)
  const currentPlanet = PLANET_DATA[selectedGate];
  const currentStep = gatesData.steps[selectedGate];
  const currentStepProgress = getStepProgress(selectedGate);
  const nextAvailableTaskIndex = getNextAvailableTask(selectedGate);

  return (
    <div className="space-y-6">
      {/* Retour et info planète */}
      <Card className="p-6 border-2" style={{ borderColor: currentPlanet.colors.primary }}>
        <div className="flex items-start gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedGate(null)}
            className="flex-shrink-0"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Retour
          </Button>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold" style={{ color: currentPlanet.colors.primary }}>
                {currentPlanet.name}
              </h2>
              <Badge
                variant="outline"
                style={{
                  borderColor: currentPlanet.colors.primary,
                  color: currentPlanet.colors.primary,
                  backgroundColor: `${currentPlanet.colors.primary}20`,
                }}
              >
                Gate {selectedGate + 1}
              </Badge>
            </div>
            <p className="text-gray-600 italic mb-1">{currentPlanet.description}</p>
            <p className="text-gray-700 font-medium">{currentStep.title}</p>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold" style={{ color: currentPlanet.colors.primary }}>
              {currentStepProgress.completed}/{currentStepProgress.total}
            </p>
            <p className="text-sm text-gray-600">Missions</p>
          </div>
        </div>

        <div className="mt-4">
          <Progress
            value={currentStepProgress.percentage}
            className="h-3"
            style={{
              backgroundColor: `${currentPlanet.colors.primary}30`,
            }}
          />
        </div>
      </Card>

      {/* Parcours des tâches style Duolingo */}
      <div className="relative rounded-2xl overflow-hidden p-8"
        style={{
          background: `linear-gradient(180deg, #0A0E27 0%, #1a1f3a 50%, #0A0E27 100%)`,
        }}
      >
        {/* Étoiles de fond animées */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                opacity: [0.1, 1, 0.1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Nébuleuses colorées */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${currentPlanet.colors.primary}40, transparent)`,
            }}
          />
          <div 
            className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${currentPlanet.colors.secondary}40, transparent)`,
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, #4169E140, transparent)`,
            }}
          />
        </div>

        {/* Étoiles filantes occasionnelles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 50}%`,
              top: `${Math.random() * 50}%`,
            }}
            animate={{
              x: [0, 200],
              y: [0, 200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 5 + Math.random() * 3,
              repeatDelay: 8,
            }}
          >
            <div className="absolute w-20 h-0.5 bg-gradient-to-r from-white to-transparent blur-sm" />
          </motion.div>
        ))}

        {/* Chemin sinueux des tâches */}
        <div className="max-w-md mx-auto relative z-10">
          {currentStep.tasks.map((task, taskIndex) => {
            const isCompleted = gatesProgress[selectedGate]?.[taskIndex] || false;
            const isAvailable = taskIndex === nextAvailableTaskIndex;
            const isLocked = taskIndex > nextAvailableTaskIndex;
            const hasCourse = getCourseContent(selectedGate, taskIndex) !== null;

            return (
              <div key={taskIndex}>
                {/* Bouton de tâche */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: taskIndex * 0.1 }}
                  className="relative flex justify-center mb-6"
                >
                  <motion.button
                    onClick={() => hasCourse && !isLocked && openCourse(selectedGate, taskIndex)}
                    disabled={isLocked || !hasCourse}
                    whileHover={!isLocked && hasCourse ? { scale: 1.1 } : {}}
                    whileTap={!isLocked && hasCourse ? { scale: 0.95 } : {}}
                    className={`relative z-10 w-32 h-32 rounded-full shadow-2xl transition-all ${
                      isLocked || !hasCourse ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                    }`}
                    style={{
                      background: isCompleted
                        ? `linear-gradient(135deg, ${currentPlanet.colors.primary}, ${currentPlanet.colors.secondary})`
                        : isAvailable
                        ? `linear-gradient(135deg, #FFD700, #FFA500)`
                        : "linear-gradient(135deg, #374151, #4B5563)",
                      boxShadow: isCompleted 
                        ? `0 0 30px ${currentPlanet.colors.primary}80`
                        : isAvailable
                        ? "0 0 30px #FFD70080"
                        : "0 4px 20px rgba(0,0,0,0.5)",
                    }}
                  >
                    {/* Effet de lueur interne */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent" />

                    {/* Contenu du bouton */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="w-12 h-12 text-white drop-shadow-lg mb-1" />
                          <span className="text-xs font-bold text-white drop-shadow-lg">
                            Mission {taskIndex + 1}
                          </span>
                        </>
                      ) : isLocked ? (
                        <>
                          <Lock className="w-10 h-10 text-gray-300 drop-shadow-lg mb-1" />
                          <span className="text-xs font-bold text-gray-300 drop-shadow-lg">
                            Mission {taskIndex + 1}
                          </span>
                        </>
                      ) : !hasCourse ? (
                        <>
                          <AlertCircle className="w-10 h-10 text-gray-300 drop-shadow-lg mb-1" />
                          <span className="text-xs font-bold text-gray-300 drop-shadow-lg">
                            Mission {taskIndex + 1}
                          </span>
                        </>
                      ) : (
                        <>
                          <Book className="w-10 h-10 text-white drop-shadow-lg mb-1" />
                          <span className="text-xs font-bold text-white drop-shadow-lg">
                            Mission {taskIndex + 1}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Animation pulsante pour la tâche disponible */}
                    {isAvailable && hasCourse && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-yellow-400"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.8, 0, 0.8],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            boxShadow: "0 0 40px #FFD700",
                          }}
                          animate={{
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        />
                      </>
                    )}

                    {/* Étoiles pour les tâches complétées */}
                    {isCompleted && (
                      <>
                        <motion.div
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                          }}
                        >
                          <Star
                            className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 fill-yellow-400 drop-shadow-lg"
                          />
                        </motion.div>
                        <motion.div
                          animate={{
                            rotate: [0, -360],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                          }}
                        >
                          <Star
                            className="absolute -top-2 -left-2 w-5 h-5 text-yellow-300 fill-yellow-300 drop-shadow-lg"
                          />
                        </motion.div>
                        <motion.div
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.15, 1],
                          }}
                          transition={{
                            duration: 2.8,
                            repeat: Infinity,
                          }}
                        >
                          <Star
                            className="absolute -bottom-2 -right-1 w-5 h-5 text-yellow-300 fill-yellow-300 drop-shadow-lg"
                          />
                        </motion.div>
                      </>
                    )}
                  </motion.button>
                </motion.div>

                {/* Chemin avec petites fusées entre les tâches */}
                {taskIndex < currentStep.tasks.length - 1 && (
                  <div className="relative flex flex-col items-center mb-6">
                    {/* Ligne pointillée verticale */}
                    <div 
                      className="w-1 h-16 relative"
                      style={{
                        background: isCompleted 
                          ? `repeating-linear-gradient(to bottom, ${currentPlanet.colors.primary} 0px, ${currentPlanet.colors.primary} 8px, transparent 8px, transparent 16px)`
                          : "repeating-linear-gradient(to bottom, #4B5563 0px, #4B5563 8px, transparent 8px, transparent 16px)",
                      }}
                    >
                      {/* Petites fusées sur le chemin */}
                      <motion.div
                        className="absolute left-1/2 top-1/4 -translate-x-1/2"
                        animate={{
                          y: [0, -3, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Rocket 
                          className="w-4 h-4 rotate-180"
                          style={{
                            color: isCompleted ? currentPlanet.colors.primary : "#6B7280",
                            filter: "drop-shadow(0 0 4px rgba(255,255,255,0.5))",
                          }}
                        />
                      </motion.div>
                      
                      <motion.div
                        className="absolute left-1/2 top-3/4 -translate-x-1/2"
                        animate={{
                          y: [0, -3, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5,
                        }}
                      >
                        <Rocket 
                          className="w-4 h-4 rotate-180"
                          style={{
                            color: isCompleted ? currentPlanet.colors.primary : "#6B7280",
                            filter: "drop-shadow(0 0 4px rgba(255,255,255,0.5))",
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Trésor / Récompense à la fin */}
          {currentStepProgress.isCompleted && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="flex justify-center mt-12"
            >
              <div className="text-center">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="w-32 h-32 mx-auto mb-4 relative"
                >
                  <Trophy className="w-full h-full text-yellow-500 drop-shadow-2xl" />
                  <Sparkles className="absolute top-0 right-0 w-8 h-8 text-yellow-300" />
                  <Sparkles className="absolute bottom-0 left-0 w-6 h-6 text-yellow-400" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: currentPlanet.colors.primary }}>
                  Planète explorée !
                </h3>
                <p className="text-gray-700">
                  Toutes les missions de {currentPlanet.name} sont complétées
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Course Modal */}
      {selectedCourse && (() => {
        const course = getCourseContent(selectedCourse.stepIndex, selectedCourse.taskIndex);
        const task = gatesData.steps[selectedCourse.stepIndex].tasks[selectedCourse.taskIndex];
        const isCompleted = gatesProgress[selectedCourse.stepIndex]?.[selectedCourse.taskIndex] || false;
        const currentDeliverable = deliverables[selectedCourse.stepIndex]?.[selectedCourse.taskIndex];

        return course ? (
          <CourseModal
            isOpen={true}
            onClose={closeCourse}
            course={course}
            taskTitle={task.title}
            stepIndex={selectedCourse.stepIndex}
            taskIndex={selectedCourse.taskIndex}
            currentDeliverable={currentDeliverable}
            isCompleted={isCompleted}
            onSubmitDeliverable={(deliverable) => 
              submitDeliverable(selectedCourse.stepIndex, selectedCourse.taskIndex, deliverable)
            }
          />
        ) : null;
      })()}
    </div>
  );
}