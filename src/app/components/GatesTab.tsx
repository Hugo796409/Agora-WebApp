import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronRight, 
  BookOpen, 
  Video, 
  FileText,
  Lock,
  Unlock,
  GraduationCap,
  AlertCircle
} from "lucide-react";
import { gatesData } from "../data/gatesData";
import { getCourseContent } from "../data/courseData";
import { CourseModal } from "./CourseModal";
import { useProjects } from "./ProjectsContext";
import { useGamification } from "./GamificationContext";

interface GatesTabProps {
  projectId: string;
}

export function GatesTab({ projectId }: GatesTabProps) {
  const { getProjectById, updateProject } = useProjects();
  const { checkAndUnlockBadges } = useGamification();
  const project = getProjectById(projectId);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([0]);
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

  // Compter combien de cours sont disponibles
  const totalCourses = gatesData.steps.reduce((total, step, stepIndex) => {
    return total + step.tasks.filter((_, taskIndex) => getCourseContent(stepIndex, taskIndex) !== null).length;
  }, 0);

  const toggleStep = (stepIndex: number) => {
    setExpandedSteps((prev) =>
      prev.includes(stepIndex)
        ? prev.filter((i) => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

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
      progress: newProgressPercentage // Mettre à jour la progression du projet
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
    };
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec progression globale */}
      <Card className="p-6 bg-gradient-to-r from-orange-50 to-blue-50 border-2 border-[#4D80C6]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl mb-2 bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">
              Progression des Gates
            </h3>
            <p className="text-sm text-gray-700">
              Complète toutes les étapes pour débloquer la certification jury
            </p>
          </div>
          {allGatesCompleted ? (
            <Badge className="bg-green-100 text-green-800 border-green-300">
              <Unlock className="w-3 h-3 mr-1" />
              Débloqué
            </Badge>
          ) : (
            <Badge className="bg-orange-100 text-orange-800 border-orange-300">
              <Lock className="w-3 h-3 mr-1" />
              Verrouillé
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Progression globale</span>
            <span className="text-[#004AAD] font-bold">
              {completedTasks} / {totalTasks} tâches
            </span>
          </div>
          <Progress value={overallProgress} className="h-3" />
          <p className="text-xs text-gray-600">
            {overallProgress}% complété
          </p>
        </div>
      </Card>

      {/* Alerte pédagogique */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300">
        <div className="flex items-start gap-3">
          <GraduationCap className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-purple-900">Mode pédagogique activé</h4>
              <Badge className="bg-purple-200 text-purple-900 border-purple-400">
                {totalCourses} cours disponibles
              </Badge>
            </div>
            <p className="text-sm text-purple-800">
              Chaque tâche contient un cours avec vidéo explicative et exercices pratiques. 
              Tu dois soumettre un livrable pour valider chaque étape et débloquer la certification.
            </p>
          </div>
        </div>
      </Card>

      {/* Liste des étapes */}
      <div className="space-y-4">
        {gatesData.steps.map((step, stepIndex) => {
          const stepProgress = getStepProgress(stepIndex);
          const isExpanded = expandedSteps.includes(stepIndex);
          const isCompleted = stepProgress.completed === stepProgress.total;

          return (
            <Card key={stepIndex} className={`overflow-hidden transition-all ${isCompleted ? 'border-green-300 bg-green-50/30' : ''}`}>
              {/* En-tête de l'étape */}
              <button
                onClick={() => toggleStep(stepIndex)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepIndex + 1}
                  </div>
                  <div className="text-left flex-1">
                    <h4 className="font-medium text-gray-900">{step.title}</h4>
                    <p className="text-xs text-gray-600">
                      {stepProgress.completed} / {stepProgress.total} tâches
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right mr-2">
                    <div className="text-sm font-medium text-[#004AAD]">
                      {stepProgress.percentage}%
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Contenu de l'étape */}
              {isExpanded && (
                <div className="border-t bg-white">
                  <div className="p-4 space-y-3">
                    {step.tasks.map((task, taskIndex) => {
                      const isTaskCompleted = gatesProgress[stepIndex]?.[taskIndex] || false;
                      const hasCourse = getCourseContent(stepIndex, taskIndex) !== null;
                      const hasDeliverable = deliverables[stepIndex]?.[taskIndex];

                      return (
                        <div
                          key={taskIndex}
                          className={`p-3 rounded-lg border transition-all ${
                            isTaskCompleted
                              ? 'bg-green-50 border-green-200'
                              : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {isTaskCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400" />
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <p className={`text-sm flex-1 ${
                                  isTaskCompleted ? 'text-gray-600' : 'text-gray-900'
                                }`}>
                                  {task.title}
                                </p>
                                
                                {hasCourse && (
                                  <Button
                                    size="sm"
                                    onClick={() => openCourse(stepIndex, taskIndex)}
                                    className={`${
                                      isTaskCompleted
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6]'
                                    }`}
                                  >
                                    <GraduationCap className="w-4 h-4 mr-1" />
                                    {isTaskCompleted ? 'Revoir' : 'Suivre le cours'}
                                  </Button>
                                )}
                              </div>

                              {/* Indicators */}
                              <div className="flex flex-wrap gap-2">
                                {hasCourse ? (
                                  <>
                                    <Badge variant="outline" className="text-xs bg-white">
                                      <Video className="w-3 h-3 mr-1" />
                                      Cours vidéo
                                    </Badge>
                                    <Badge variant="outline" className="text-xs bg-white">
                                      <FileText className="w-3 h-3 mr-1" />
                                      Livrable requis
                                    </Badge>
                                    {isTaskCompleted && (
                                      <Badge className="text-xs bg-green-100 text-green-800 border-green-300">
                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                        Validé
                                      </Badge>
                                    )}
                                  </>
                                ) : (
                                  <Badge variant="outline" className="text-xs bg-orange-50 border-orange-300 text-orange-700">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    Cours en préparation
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Message de statut final */}
      {allGatesCompleted && (
        <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-green-900 mb-2">
              🎉 Toutes les gates sont complétées !
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