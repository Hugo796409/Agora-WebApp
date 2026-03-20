import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import {
  Check,
  ArrowLeft,
  Zap,
  Crown,
  Gift,
  Star,
  TrendingUp,
  Shield,
  MessageCircle,
  Award,
  Users,
  Sparkles,
  CreditCard,
  X,
  Lock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useUserPlan } from "./UserPlanContext"; // v2.0 with community access

interface PricingTier {
  id: string;
  name: string;
  price: number;
  priceCommitted?: number; // Prix avec engagement
  yearlyPrice?: number; // Prix annuel avec engagement
  description: string;
  icon: React.ElementType;
  features: Array<string | { text: string; highlighted: boolean }>;
  highlighted?: boolean;
  highlightLabel?: string;
  highlightIcon?: React.ElementType;
  buttonText: string;
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Pour découvrir Agora et tester tes premières idées",
    icon: Gift,
    features: [
      "1 projet actif",
      "Accès complet aux gates",
      "1 webinaire collectif avec un mentor"
    ],
    buttonText: "Commencer gratuitement",
  },
  {
    id: "basic",
    name: "Basic",
    price: 14.99, // Sans engagement
    priceCommitted: 12.99, // Avec engagement
    yearlyPrice: 155,
    description: "L'essentiel pour construire sérieusement ton projet",
    icon: Zap,
    features: [
      { text: "5 projets actifs", highlighted: true },
      { text: "Feedback de mentors", highlighted: true },
      { text: "Accès à la communauté", highlighted: true },
      { text: "Accès limité à Heliée", highlighted: true }
    ],
    highlighted: true,
    highlightLabel: "Le plus apprécié",
    highlightIcon: Star,
    buttonText: "Choisir Basic",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 49.99, // Sans engagement
    priceCommitted: 43.99, // Avec engagement
    yearlyPrice: 520,
    description: "Pour les entrepreneurs ambitieux qui veulent mettre toutes les chances de leur côté",
    icon: Crown,
    features: [
      { text: "Projets illimités", highlighted: true },
      { text: "Coaching 1-to-1 mensuel", highlighted: true },
      { text: "Accès complet à Heliée", highlighted: true },
      { text: "Accès à la Certification", highlighted: true },
    ],
    buttonText: "Passer à Premium",
  },
];

export function PricingPage() {
  const navigate = useNavigate();
  const { upgradePlan } = useUserPlan();
  const [commitmentStatus, setCommitmentStatus] = useState<{ [key: string]: boolean }>({
    basic: true, // Par défaut avec engagement
    premium: true, // Par défaut avec engagement
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ tier: PricingTier; isCommitted: boolean } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectPlan = (tierId: string) => {
    const tier = pricingTiers.find((t) => t.id === tierId);
    if (!tier) return;

    // Si c'est le plan free, pas de paiement
    if (tierId === "free") {
      upgradePlan("free", false);
      toast.success("Bienvenue sur Agora ! Ton compte gratuit est activé.");
      return;
    }

    const isCommitted = commitmentStatus[tierId] || false;
    setSelectedPlan({ tier, isCommitted });
    setShowPaymentModal(true);
    setPaymentSuccess(false);
    setFormData({ cardNumber: "", cardName: "", expiryDate: "", cvv: "" });
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan) return;
    
    // Validation simple
    if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsProcessing(true);

    // Simulation de paiement
    const amount = selectedPlan.isCommitted 
      ? selectedPlan.tier.yearlyPrice 
      : selectedPlan.tier.price;

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Mettre à jour le plan de l'utilisateur
      upgradePlan(
        selectedPlan.tier.id as "free" | "basic" | "premium",
        selectedPlan.isCommitted
      );
      
      toast.success(`Paiement effectué avec succès !`);
      
      // Fermer après 2 secondes
      setTimeout(() => {
        setShowPaymentModal(false);
        toast.success(
          `Bienvenue dans le plan ${selectedPlan.tier.name} !`,
          { duration: 5000 }
        );
        navigate("/dashboard");
      }, 2000);
    }, 2000);
  };

  const toggleCommitment = (tierId: string) => {
    setCommitmentStatus((prev) => ({
      ...prev,
      [tierId]: !prev[tierId],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au Dashboard
          </Button>
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-[#FC4C00]" />
              <h1 className="text-4xl bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">
                Choisis ton plan
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Débloque tout le potentiel d'Agora et accélère ta progression entrepreneuriale
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-stretch">
          {pricingTiers.map((tier) => {
            const Icon = tier.icon;
            const HighlightIcon = tier.highlightIcon;

            return (
              <Card
                key={tier.id}
                className={`relative p-8 transition-all hover:shadow-xl flex flex-col h-full ${
                  tier.highlighted
                    ? "border-4 border-[#FC4C00] shadow-2xl transform scale-105 bg-gradient-to-b from-white to-orange-50"
                    : "border-2 border-gray-200 hover:border-[#4D80C6]"
                }`}
              >
                {/* Highlight Badge */}
                {tier.highlighted && tier.highlightLabel && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] text-white px-4 py-2 text-sm shadow-lg border-0">
                      {HighlightIcon && <HighlightIcon className="w-4 h-4 mr-1 inline" />}
                      {tier.highlightLabel}
                    </Badge>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                    tier.highlighted
                      ? "bg-gradient-to-r from-[#FC4C00] to-[#004AAD]"
                      : "bg-gradient-to-br from-gray-100 to-gray-50"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 ${
                      tier.highlighted ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>

                {/* Name & Price */}
                <h3 className="text-2xl mb-2">{tier.name}</h3>
                
                <div className="mb-4">
                  <div>
                    <span className="text-5xl bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">
                      {tier.id === "free" 
                        ? tier.price 
                        : commitmentStatus[tier.id] 
                          ? tier.priceCommitted 
                          : tier.price}€
                    </span>
                    <span className="text-gray-600 ml-2">/mois</span>
                  </div>
                  {tier.id !== "free" && commitmentStatus[tier.id] && (
                    <div className="text-sm text-gray-500 mt-1">
                      {tier.yearlyPrice}€/an
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-6">{tier.description}</p>

                {/* Features List */}
                <div className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature, index) => {
                    const isHighlighted = typeof feature !== "string" && feature.highlighted;
                    const featureText = typeof feature === "string" ? feature : feature.text;
                    
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div 
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isHighlighted 
                              ? "bg-gradient-to-r from-[#FC4C00] to-[#004AAD]" 
                              : "bg-gray-200"
                          }`}
                        >
                          <Check 
                            className={`w-3 h-3 ${
                              isHighlighted ? "text-white" : "text-gray-600"
                            }`}
                          />
                        </div>
                        <span 
                          className={`text-sm ${
                            isHighlighted 
                              ? "font-semibold bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent" 
                              : "text-gray-700"
                          }`}
                        >
                          {featureText}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Buttons Section - Fixed at bottom */}
                <div className="mt-auto">
                  {/* CTA Button */}
                  <Button
                    onClick={() => handleSelectPlan(tier.id)}
                    className={`w-full mb-3 py-6 text-base ${
                      tier.highlighted
                        ? "bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6] text-white shadow-lg"
                        : "bg-white border-2 border-[#004AAD] text-[#004AAD] hover:bg-[#004AAD] hover:text-white"
                    }`}
                  >
                    {tier.buttonText}
                  </Button>

                  {/* Petit bouton pour basculer vers sans engagement */}
                  {tier.id !== "free" && tier.priceCommitted && (
                    <button
                      onClick={() => toggleCommitment(tier.id)}
                      className="w-full text-xs text-gray-500 hover:text-[#004AAD] underline transition-colors"
                    >
                      {commitmentStatus[tier.id] ? "Sans engagement" : "Avec engagement"}
                    </button>
                  )}
                  
                  {/* Spacer pour free tier sans bouton d'engagement */}
                  {tier.id === "free" && <div className="h-4"></div>}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 text-center border-2 border-gray-200">
            <TrendingUp className="w-8 h-8 text-[#FC4C00] mx-auto mb-3" />
            <p className="text-2xl mb-1">500+</p>
            <p className="text-sm text-gray-600">Projets lancés</p>
          </Card>
          <Card className="p-6 text-center border-2 border-gray-200">
            <Users className="w-8 h-8 text-[#004AAD] mx-auto mb-3" />
            <p className="text-2xl mb-1">200+</p>
            <p className="text-sm text-gray-600">Entrepreneurs actifs</p>
          </Card>
          <Card className="p-6 text-center border-2 border-gray-200">
            <Award className="w-8 h-8 text-[#FC4C00] mx-auto mb-3" />
            <p className="text-2xl mb-1">150+</p>
            <p className="text-sm text-gray-600">Certifications délivrées</p>
          </Card>
          <Card className="p-6 text-center border-2 border-gray-200">
            <MessageCircle className="w-8 h-8 text-[#004AAD] mx-auto mb-3" />
            <p className="text-2xl mb-1">4.8/5</p>
            <p className="text-sm text-gray-600">Satisfaction mentors</p>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="mt-12 p-8 max-w-3xl mx-auto bg-gradient-to-r from-orange-50 to-blue-50 border-2 border-[#4D80C6]">
          <div className="text-center mb-6">
            <Shield className="w-12 h-12 text-[#004AAD] mx-auto mb-3" />
            <h3 className="text-2xl mb-2">Une question ?</h3>
            <p className="text-gray-600">
              Tous nos plans incluent une garantie satisfait ou remboursé de 14 jours
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/mentors")}
              className="border-[#004AAD] text-[#004AAD] hover:bg-[#004AAD] hover:text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contacter un mentor
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/faq")}
              className="border-[#FC4C00] text-[#FC4C00] hover:bg-[#FC4C00] hover:text-white"
            >
              Voir la FAQ
            </Button>
          </div>
        </Card>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          {paymentSuccess ? (
            // Success Screen
            <Card className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl mb-4">Paiement réussi !</h2>
              <p className="text-gray-600 mb-6">
                Votre paiement de {selectedPlan.isCommitted 
                  ? selectedPlan.tier.yearlyPrice 
                  : selectedPlan.tier.price}€ a été traité avec succès.<br />
                Bienvenue dans le plan {selectedPlan.tier.name} !
              </p>
            </Card>
          ) : (
            // Payment Form
            <Card className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Paiement sécurisé</h3>
                      <p className="text-white/80 text-sm">Plan {selectedPlan.tier.name}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setShowPaymentModal(false)}
                    className="text-white hover:bg-white/20 p-2"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Montant à payer */}
                <div className="text-center mb-6 p-6 bg-gradient-to-br from-orange-50 to-blue-50 rounded-lg border-2 border-[#FC4C00]/20">
                  <p className="text-sm text-gray-600 mb-2 uppercase tracking-wide">Montant à payer</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-6xl font-bold bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">
                      {selectedPlan.isCommitted 
                        ? selectedPlan.tier.yearlyPrice 
                        : selectedPlan.tier.price}
                    </span>
                    <span className="text-2xl text-gray-600">€</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {selectedPlan.isCommitted 
                      ? `Paiement annuel • ${selectedPlan.tier.priceCommitted}€/mois` 
                      : "Paiement mensuel • Sans engagement"}
                  </p>
                </div>

                {/* Détails du plan */}
                <div className="mb-6 space-y-3 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Plan sélectionné</span>
                    <span className="font-semibold text-gray-900">{selectedPlan.tier.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Type d'abonnement</span>
                    <Badge className={selectedPlan.isCommitted ? "bg-[#004AAD]" : "bg-[#FC4C00]"}>
                      {selectedPlan.isCommitted ? "Avec engagement" : "Sans engagement"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Période de facturation</span>
                    <span className="font-semibold text-gray-900">
                      {selectedPlan.isCommitted ? "Annuelle" : "Mensuelle"}
                    </span>
                  </div>
                </div>

                {/* Sécurité */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 bg-green-50 p-3 rounded-lg border border-green-200">
                  <Lock className="w-4 h-4 text-green-600" />
                  <span>Paiement 100% sécurisé • Données cryptées</span>
                </div>

                {/* Formulaire de paiement */}
                <form onSubmit={handlePayment}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <Input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Nom sur la carte</Label>
                      <Input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <Label htmlFor="expiryDate">Date d'expiration</Label>
                        <Input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/AA"
                          className="w-full"
                        />
                      </div>
                      <div className="w-1/2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Boutons */}
                  <div className="space-y-3 mt-6">
                    <Button
                      type="submit"
                      className="w-full py-6 text-base bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6] text-white shadow-lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 mr-2 animate-spin" />
                          Traitement...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Lock className="w-5 h-5 mr-2" />
                          Payer {selectedPlan.isCommitted 
                            ? selectedPlan.tier.yearlyPrice 
                            : selectedPlan.tier.price}€
                        </div>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowPaymentModal(false)}
                      className="w-full"
                      disabled={isProcessing}
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}