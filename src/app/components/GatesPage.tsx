import { useState, useEffect } from "react";
import { useProjects } from "./ProjectsContext";
import { gatesData } from "../data/gatesData";
import { useNavigate, useParams } from "react-router";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Rocket, ChevronLeft, Star, CheckCircle, Lock, Sparkles, Play } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

// Couleurs des planètes pour chaque gate
const PLANET_COLORS = [
  { primary: "#8B5CF6", secondary: "#A78BFA", name: "Violet" },
  { primary: "#EC4899", secondary: "#F472B6", name: "Rose" },
  { primary: "#F59E0B", secondary: "#FBBF24", name: "Ambre" },
  { primary: "#10B981", secondary: "#34D399", name: "Émeraude" },
  { primary: "#3B82F6", secondary: "#60A5FA", name: "Bleu" },
  { primary: "#EF4444", secondary: "#F87171", name: "Rouge" },
  { primary: "#14B8A6", secondary: "#2DD4BF", name: "Teal" },
  { primary: "#F97316", secondary: "#FB923C", name: "Orange" },
  { primary: "#06B6D4", secondary: "#22D3EE", name: "Cyan" },
  { primary: "#A855F7", secondary: "#C084FC", name: "Pourpre" },
];

export function GatesPage() {
  const { projects } = useProjects();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [rocketAnimation, setRocketAnimation] = useState<'landed' | 'flying'>('landed');

  // Sélectionner automatiquement le projet si on vient de l'URL
  useEffect(() => {
    if (projectId && projects.find(p => p.id === projectId)) {
      setSelectedProject(projectId);
    } else if (projects.length === 1) {
      setSelectedProject(projects[0].id);
    }
  }, [projectId, projects]);

  const project = projects.find(p => p.id === selectedProject);

  // Calculer la progression pour chaque gate
  const getGateProgress = () => {
    if (!project) return [];

    return gatesData.steps.map((step, stepIndex) => {
      const tasks = step.tasks.length;
      const completed = project.gatesProgress?.[stepIndex]
        ? Object.values(project.gatesProgress[stepIndex]).filter(Boolean).length
        : 0;
      const percentage = (completed / tasks) * 100;
      const isCompleted = completed === tasks;

      return {
        stepIndex,
        stepName: step.title,
        tasks,
        completed,
        percentage,
        isCompleted,
        isLocked: false,
      };
    });
  };

  const gateProgress = getGateProgress();
  const completedGates = gateProgress.filter(g => g.isCompleted).length;

  // Animation de la fusée basée sur les gates complétés
  useEffect(() => {
    if (selectedProject && completedGates > 0) {
      // Démarrer une animation de décollage puis atterrissage
      setRocketAnimation('flying');
      const timer = setTimeout(() => {
        setRocketAnimation('landed');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [selectedProject, completedGates]);

  // Si aucun projet
  if (projects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
        <Card className="p-12 text-center max-w-md">
          <Rocket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Aucun projet
          </h3>
          <p className="text-gray-500 mb-6">
            Commence ton aventure en créant ton premier projet
          </p>
          <Button
            onClick={() => navigate("/create-project")}
            className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6]"
          >
            Créer un projet
          </Button>
        </Card>
      </div>
    );
  }

  // Sélection de projet
  if (!selectedProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              🚀 Parcours Gates
            </h1>
            <p className="text-white/90 text-lg">
              Choisis un projet pour commencer ton voyage à travers l'univers des 10 Gates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj) => {
              const projGateProgress = gatesData.steps.map((step, stepIndex) => {
                const tasks = step.tasks.length;
                const completed = proj.gatesProgress?.[stepIndex]
                  ? Object.values(proj.gatesProgress[stepIndex]).filter(Boolean).length
                  : 0;
                return completed === tasks;
              });
              const projCompletedGates = projGateProgress.filter(Boolean).length;
              const projTotalPercentage = (projCompletedGates / 10) * 100;

              return (
                <motion.div
                  key={proj.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className="p-6 cursor-pointer hover:shadow-xl transition-shadow bg-white/95 backdrop-blur"
                    onClick={() => setSelectedProject(proj.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold">{proj.name}</h3>
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                        {projCompletedGates}/10
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{proj.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progression</span>
                        <span className="font-semibold">{projTotalPercentage.toFixed(0)}%</span>
                      </div>
                      <Progress value={projTotalPercentage} className="h-2" />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="bg-white/90 hover:bg-white"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Retour au Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Vue du parcours Gates (style Duolingo)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
      {/* Header fixe */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur shadow-md">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedProject(null)}
              className="hover:bg-gray-100"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Projets
            </Button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <h2 className="font-bold text-sm">{project?.name}</h2>
                <p className="text-xs text-gray-600">{completedGates}/10 Gates complétés</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parcours vertical */}
      <div className="max-w-2xl mx-auto px-4 py-12 relative">
        {/* Ligne de connexion */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/30 -translate-x-1/2 hidden md:block" />

        {/* Terre (point de départ) */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mb-16 flex justify-center"
        >
          <div className="text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 via-green-400 to-blue-500 shadow-2xl mx-auto mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
              <div className="absolute top-8 left-8 w-12 h-12 rounded-full bg-green-600/30" />
              <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-blue-600/30" />
            </div>
            <p className="text-white font-bold text-lg">🌍 Terre - Départ</p>
          </div>
        </motion.div>

        {/* Fusée animée */}
        {selectedProject && completedGates < 10 && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: completedGates * 280 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute left-1/2 top-32 -translate-x-1/2 z-30 pointer-events-none"
          >
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 0],
                x: [0, -5, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Rocket className="w-12 h-12 text-white drop-shadow-2xl" />
            </motion.div>
          </motion.div>
        )}

        {/* Gates (planètes) */}
        <div className="space-y-8">
          {gateProgress.map((gate, index) => {
            const colors = PLANET_COLORS[index];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={gate.stepIndex}
                initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative flex items-center gap-8 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Planète */}
                <div className="flex-shrink-0 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-24 h-24 rounded-full shadow-2xl relative overflow-hidden ${
                      gate.isCompleted
                        ? "ring-4 ring-green-400"
                        : gate.completed > 0
                        ? "ring-4 ring-yellow-400"
                        : "ring-4 ring-white/30"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    }}
                  >
                    {/* Texture de planète */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/30" />
                    <div
                      className="absolute top-4 left-4 w-8 h-8 rounded-full"
                      style={{ backgroundColor: colors.secondary, opacity: 0.3 }}
                    />
                    <div
                      className="absolute bottom-6 right-6 w-12 h-12 rounded-full"
                      style={{ backgroundColor: colors.primary, opacity: 0.3 }}
                    />

                    {/* Icône de statut */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {gate.isCompleted ? (
                        <CheckCircle className="w-10 h-10 text-white drop-shadow-lg" />
                      ) : gate.isLocked ? (
                        <Lock className="w-8 h-8 text-white/70" />
                      ) : (
                        <span className="text-2xl font-bold text-white drop-shadow-lg">
                          {index + 1}
                        </span>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Carte du Gate */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex-1"
                >
                  <Card className="bg-white/95 backdrop-blur p-6 shadow-xl">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            style={{
                              borderColor: colors.primary,
                              color: colors.primary,
                              backgroundColor: `${colors.primary}15`,
                            }}
                          >
                            Gate {index + 1}
                          </Badge>
                          {gate.isCompleted && (
                            <Sparkles className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                        <h3 className="font-bold text-lg mb-1">{gate.stepName}</h3>
                        <p className="text-sm text-gray-600">
                          {gate.completed}/{gate.tasks} tâches complétées
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Progress
                        value={gate.percentage}
                        className="h-2"
                        style={
                          {
                            "--progress-background": colors.primary,
                          } as React.CSSProperties
                        }
                      />
                    </div>

                    <Button
                      onClick={() => navigate(`/project/${project?.id}?gate=${index}`)}
                      disabled={gate.isLocked}
                      className="w-full"
                      style={{
                        background: gate.isLocked
                          ? "#9CA3AF"
                          : `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                      }}
                    >
                      {gate.isLocked ? (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Complète le Gate précédent
                        </>
                      ) : gate.isCompleted ? (
                        <>
                          <Star className="w-4 h-4 mr-2" />
                          Revoir
                        </>
                      ) : (
                        <>
                          Commencer
                        </>
                      )}
                    </Button>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Fin du parcours - Univers */}
        {completedGates === 10 && (
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
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/40" />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white" />
              </motion.div>
              <p className="text-white font-bold text-2xl mb-2">
                ✨ Félicitations ! ✨
              </p>
              <p className="text-white/90">Tu as complété tous les Gates !</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}