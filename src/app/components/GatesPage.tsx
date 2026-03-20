import { useProjects } from "./ProjectsContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { gatesData } from "../data/gatesData";
import { CheckCircle2, Circle, Lock, Rocket, Target } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export function GatesPage() {
  const { projects } = useProjects();
  const navigate = useNavigate();

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Vue d'ensemble des Gates</h1>
        <p className="text-gray-600">
          Suivi de ta progression à travers les 5 gates de validation pour tous tes projets
        </p>
      </div>

      {/* Projects */}
      {projects.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Rocket className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aucun projet
            </h3>
            <p className="text-gray-500 mb-6 text-center max-w-md">
              Commence ton aventure en créant ton premier projet
            </p>
            <Button
              onClick={() => navigate("/create-project")}
              className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6]"
            >
              Créer un projet
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {projects.map((project) => {
            // Calculate progress for each gate
            const gateProgress = gatesData.steps.map((step, stepIndex) => {
              const tasks = step.tasks.length;
              const completed = project.gatesProgress?.[stepIndex]
                ? Object.values(project.gatesProgress[stepIndex]).filter(Boolean).length
                : 0;
              const percentage = (completed / tasks) * 100;
              const isCompleted = completed === tasks;

              return {
                stepIndex,
                stepName: step.step,
                tasks,
                completed,
                percentage,
                isCompleted,
              };
            });

            const totalCompleted = gateProgress.filter((g) => g.isCompleted).length;
            const totalPercentage = (totalCompleted / 5) * 100;

            return (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {project.name}
                      </CardTitle>
                      <CardDescription>
                        {project.description}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={totalCompleted === 5 ? "default" : "secondary"}
                      className={
                        totalCompleted === 5 ? "bg-green-500" : "bg-blue-500"
                      }
                    >
                      {totalCompleted}/5 Gates
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 font-medium">
                        Progression globale
                      </span>
                      <span className="font-semibold">
                        {totalPercentage.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={totalPercentage} className="h-2" />
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {gateProgress.map((gate) => (
                      <div
                        key={gate.stepIndex}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          gate.isCompleted
                            ? "border-green-500 bg-green-50"
                            : gate.completed > 0
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-sm">
                            Gate {gate.stepIndex + 1}
                          </h4>
                          {gate.isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : gate.completed > 0 ? (
                            <Circle className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Lock className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                          {gate.stepName}
                        </p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Tâches</span>
                            <span className="font-semibold">
                              {gate.completed}/{gate.tasks}
                            </span>
                          </div>
                          <Progress value={gate.percentage} className="h-1.5" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={() => navigate(`/project/${project.id}`)}
                      variant="outline"
                      className="border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Voir le détail du projet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}