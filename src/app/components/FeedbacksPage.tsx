import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  ArrowLeft,
  MessageSquare,
  TrendingUp,
  User,
  Calendar,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useProjects } from "./ProjectsContext";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function FeedbacksPage() {
  const navigate = useNavigate();
  const { projects } = useProjects();

  // Get all projects with feedback
  const projectsWithFeedback = projects.filter((p) => p.feedback);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="mb-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au dashboard
              </Button>
              <h1 className="text-3xl">Feedbacks des mentors</h1>
              <p className="text-gray-600 mt-1">
                Tous les retours et conseils reçus sur tes projets
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {projectsWithFeedback.length}
              </div>
              <p className="text-sm text-gray-600">Feedbacks</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {projectsWithFeedback.length === 0 ? (
          <Card className="p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl mb-2">Aucun feedback pour le moment</h3>
            <p className="text-gray-600 mb-6">
              Lance des crash tests sur tes projets pour recevoir des conseils de
              mentors
            </p>
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              Voir mes projets
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {projectsWithFeedback.map((project) => (
              <Card
                key={project.id}
                className="p-6 hover:shadow-lg transition-all"
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-medium">{project.name}</h2>
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Feedback reçu
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(project.createdAt).toLocaleDateString("fr-FR")}
                      </span>
                      {project.crashTestScore && (
                        <span className="flex items-center gap-1 text-green-600 font-medium">
                          <TrendingUp className="w-4 h-4" />
                          {project.crashTestScore}%
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    Voir le projet
                  </Button>
                </div>

                {/* Mentor Info */}
                {project.feedback && (
                  <>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 mb-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12 border-2 border-purple-300">
                          <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                            {project.feedback.mentor[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{project.feedback.mentor}</p>
                          <p className="text-sm text-gray-600">Mentor expert</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({
                          length: Math.floor(project.feedback.rating),
                        }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <span className="ml-2 font-medium text-gray-700">
                          {project.feedback.rating}/5
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Strengths */}
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h3 className="font-medium mb-3 flex items-center gap-2 text-green-800">
                          <CheckCircle className="w-5 h-5" />
                          Points forts
                        </h3>
                        <ul className="space-y-2">
                          {project.feedback.strengths.map((strength, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="text-green-600 mt-0.5 font-bold">
                                ✓
                              </span>
                              <span className="text-gray-700 flex-1">
                                {strength}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Improvements */}
                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <h3 className="font-medium mb-3 flex items-center gap-2 text-orange-800">
                          <AlertCircle className="w-5 h-5" />
                          Axes d'amélioration
                        </h3>
                        <ul className="space-y-2">
                          {project.feedback.improvements.map(
                            (improvement, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-sm"
                              >
                                <span className="text-orange-600 mt-0.5 font-bold">
                                  →
                                </span>
                                <span className="text-gray-700 flex-1">
                                  {improvement}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                          💡 Utilise ces conseils pour améliorer ton projet
                        </p>
                        <Button
                          onClick={() => navigate(`/project/${project.id}`)}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          Améliorer le projet
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Info Card */}
        {projectsWithFeedback.length > 0 && (
          <Card className="p-6 mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium mb-2">
                  Comment tirer le meilleur parti des feedbacks ?
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>
                      <strong>Analyse les points forts</strong> pour comprendre ce
                      qui fonctionne dans ton projet
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>
                      <strong>Priorise les améliorations</strong> suggérées par
                      ordre d'importance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>
                      <strong>Itère et teste à nouveau</strong> pour mesurer tes
                      progrès
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>
                      <strong>N'aie pas peur de l'échec</strong> - c'est un outil
                      d'apprentissage !
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}