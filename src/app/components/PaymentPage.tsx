import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useProjects } from "./ProjectsContext";
import { gatesData } from "../data/gatesData";

export function PaymentPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { getProjectById } = useProjects();
  const project = getProjectById(projectId || "");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  // Vérifier si toutes les gates sont complétées
  const gatesProgress = project?.gatesProgress || {};
  const totalTasks = gatesData.steps.reduce((acc, step) => acc + step.tasks.length, 0);
  const completedTasks = Object.values(gatesProgress).reduce(
    (acc, stepTasks) => acc + Object.values(stepTasks).filter(Boolean).length,
    0
  );
  const allGatesCompleted = completedTasks === totalTasks;

  // Si les gates ne sont pas toutes complétées, bloquer l'accès
  if (!allGatesCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 p-4">
        <Card className="max-w-md w-full p-8 text-center border-2 border-orange-300">
          <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-orange-600" />
          </div>
          <h2 className="text-2xl mb-4 text-gray-900">Accès bloqué</h2>
          <p className="text-gray-700 mb-2">
            Tu dois compléter toutes les étapes de formation avant d'accéder à la certification jury.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Progression actuelle : <strong>{completedTasks} / {totalTasks} tâches complétées</strong>
          </p>
          <Button
            onClick={() => navigate(`/project/${projectId}`)}
            className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au projet
          </Button>
        </Card>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsProcessing(true);

    // Simulation de paiement
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Sauvegarder le statut de paiement dans localStorage
      const payments = JSON.parse(localStorage.getItem("certificationPayments") || "{}");
      payments[projectId || ""] = {
        paid: true,
        date: new Date().toISOString(),
        amount: 399.99,
      };
      localStorage.setItem("certificationPayments", JSON.stringify(payments));
      
      toast.success("Paiement effectué avec succès !");
      
      // Redirection vers la certification après 2 secondes
      setTimeout(() => {
        navigate(`/certification/${projectId}`);
      }, 2000);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl mb-4">Paiement réussi !</h2>
          <p className="text-gray-600 mb-6">
            Votre paiement a été traité avec succès. Vous allez être redirigé vers la certification jury...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(`/project/${projectId}`)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au projet
          </Button>
          <h1 className="text-3xl bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent mb-2">
            Paiement Certification Jury
          </h1>
          <p className="text-gray-600">
            Finalisez votre paiement pour accéder à la certification
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Formulaire de paiement */}
          <Card className="md:col-span-2 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl">Informations de paiement</h2>
                <p className="text-sm text-gray-600">Paiement sécurisé</p>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Numéro de carte</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  maxLength={19}
                />
              </div>

              <div>
                <Label htmlFor="cardName">Nom sur la carte</Label>
                <Input
                  id="cardName"
                  name="cardName"
                  placeholder="JEAN DUPONT"
                  value={formData.cardName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Date d'expiration</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/AA"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength={3}
                    type="password"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6]"
                >
                  {isProcessing ? (
                    <>Traitement en cours...</>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Payer 49,99 €
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 justify-center pt-2">
                <Lock className="w-4 h-4" />
                <span>Paiement sécurisé SSL</span>
              </div>
            </form>
          </Card>

          {/* Récapitulatif */}
          <Card className="p-6 h-fit">
            <h3 className="font-medium mb-4">Récapitulatif</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Certification Jury</span>
                <span className="font-medium">49,99 €</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="text-lg font-bold bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">
                  49,99 €
                </span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#004AAD]" />
                Inclus dans la certification
              </h4>
              <ul className="text-xs text-gray-700 space-y-2">
                <li>✓ Évaluation par un jury d'experts</li>
                <li>✓ Feedback détaillé personnalisé</li>
                <li>✓ Score de certification officiel</li>
                <li>✓ Recommandations d'amélioration</li>
                <li>✓ Accès au récapitulatif complet</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}