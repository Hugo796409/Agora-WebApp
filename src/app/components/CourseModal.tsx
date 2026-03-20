import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  X,
  Video,
  BookOpen,
  FileText,
  CheckCircle,
  AlertCircle,
  Upload,
  Send
} from "lucide-react";
import { CourseContent } from "../data/courseData";

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: CourseContent;
  taskTitle: string;
  stepIndex: number;
  taskIndex: number;
  currentDeliverable?: string;
  isCompleted: boolean;
  onSubmitDeliverable: (deliverable: string) => void;
}

export function CourseModal({
  isOpen,
  onClose,
  course,
  taskTitle,
  stepIndex,
  taskIndex,
  currentDeliverable,
  isCompleted,
  onSubmitDeliverable,
}: CourseModalProps) {
  const [activeTab, setActiveTab] = useState<"video" | "theory" | "application" | "deliverable">("video");
  const [deliverableText, setDeliverableText] = useState(currentDeliverable || "");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (deliverableText.trim().length < 100) {
      alert("Votre livrable doit contenir au moins 100 caractères.");
      return;
    }
    onSubmitDeliverable(deliverableText);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      onClose();
    }, 2000);
  };

  const wordCount = deliverableText.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-white/20 text-white border-white/30">
                  Étape {stepIndex + 1} - Tâche {taskIndex + 1}
                </Badge>
                {isCompleted && (
                  <Badge className="bg-green-500 text-white border-green-400">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Validé
                  </Badge>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-1">{taskTitle}</h2>
              <p className="text-white/90 text-sm">{course.videoTitle}</p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b bg-gray-50 px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("video")}
              className={`px-4 py-3 font-medium transition-colors flex items-center gap-2 border-b-2 ${
                activeTab === "video"
                  ? "text-[#FC4C00] border-[#FC4C00]"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              <Video className="w-4 h-4" />
              Vidéo
            </button>
            <button
              onClick={() => setActiveTab("theory")}
              className={`px-4 py-3 font-medium transition-colors flex items-center gap-2 border-b-2 ${
                activeTab === "theory"
                  ? "text-[#FC4C00] border-[#FC4C00]"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Théorie
            </button>
            <button
              onClick={() => setActiveTab("application")}
              className={`px-4 py-3 font-medium transition-colors flex items-center gap-2 border-b-2 ${
                activeTab === "application"
                  ? "text-[#FC4C00] border-[#FC4C00]"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              <FileText className="w-4 h-4" />
              Application
            </button>
            <button
              onClick={() => setActiveTab("deliverable")}
              className={`px-4 py-3 font-medium transition-colors flex items-center gap-2 border-b-2 ${
                activeTab === "deliverable"
                  ? "text-[#FC4C00] border-[#FC4C00]"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              <Upload className="w-4 h-4" />
              Livrable
              {!isCompleted && (
                <Badge className="bg-orange-100 text-orange-700 text-xs">Requis</Badge>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Video Tab */}
          {activeTab === "video" && (
            <div className="space-y-4">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={course.videoUrl}
                  title={course.videoTitle}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <Card className="p-4 bg-blue-50 border-blue-200">
                <p className="text-sm text-gray-700">
                  💡 <strong>Astuce :</strong> Regarde la vidéo en entier pour bien comprendre les concepts avant de passer aux autres onglets.
                </p>
              </Card>
            </div>
          )}

          {/* Theory Tab */}
          {activeTab === "theory" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{course.theory.title}</h3>
                <div className="space-y-4">
                  {course.theory.content.map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Application Tab */}
          {activeTab === "application" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{course.application.title}</h3>
                
                {/* Steps */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Étapes à suivre :</h4>
                  <div className="space-y-3">
                    {course.application.content.map((step, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] text-white text-sm font-bold flex items-center justify-center">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 flex-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Examples */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Exemples concrets :</h4>
                  <div className="space-y-3">
                    {course.application.examples.map((example, index) => (
                      <Card key={index} className="p-4 bg-gradient-to-r from-orange-50 to-blue-50 border-gray-200">
                        <p className="text-sm text-gray-700 italic">{example}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Deliverable Tab */}
          {activeTab === "deliverable" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{course.deliverable.title}</h3>
                <p className="text-gray-600 mb-4">{course.deliverable.description}</p>
              </div>

              {/* Instructions */}
              <Card className="p-4 bg-yellow-50 border-yellow-200">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  Instructions
                </h4>
                <ul className="space-y-2">
                  {course.deliverable.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-yellow-600">•</span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-yellow-300">
                  <p className="text-sm text-gray-700">
                    <strong>Format attendu :</strong> {course.deliverable.expectedFormat}
                  </p>
                </div>
              </Card>

              {/* Success Message */}
              {showSuccessMessage && (
                <Card className="p-4 bg-green-50 border-2 border-green-300 animate-pulse">
                  <div className="flex items-center gap-3 text-green-800">
                    <CheckCircle className="w-6 h-6" />
                    <div>
                      <p className="font-semibold">Livrable validé avec succès !</p>
                      <p className="text-sm">Tu peux maintenant passer à la tâche suivante.</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Text Area */}
              {!showSuccessMessage && (
                <>
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Ton livrable :
                    </label>
                    <textarea
                      value={deliverableText}
                      onChange={(e) => setDeliverableText(e.target.value)}
                      placeholder="Rédige ton livrable ici en suivant les instructions ci-dessus..."
                      className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:border-[#FC4C00] focus:outline-none resize-none"
                      disabled={isCompleted}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm text-gray-500">
                        {wordCount} mots • {deliverableText.length} caractères
                      </p>
                      {deliverableText.trim().length < 100 && (
                        <p className="text-sm text-orange-600">
                          Minimum 100 caractères requis
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={onClose}
                    >
                      Fermer
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={deliverableText.trim().length < 100 || isCompleted}
                      className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isCompleted ? "Déjà validé" : "Soumettre le livrable"}
                    </Button>
                  </div>
                </>
              )}

              {/* Already completed message */}
              {isCompleted && !showSuccessMessage && (
                <Card className="p-4 bg-green-50 border-green-200">
                  <div className="flex items-center gap-3 text-green-800">
                    <CheckCircle className="w-5 h-5" />
                    <p className="font-medium">Ce livrable a déjà été validé ✓</p>
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
