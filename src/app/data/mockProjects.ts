export interface Project {
  id: string;
  name: string;
  description: string;
  budget: number;
  status: "draft" | "testing" | "completed" | "failed";
  progress: number;
  createdAt: string;
  crashTestScore?: number;
  feedback?: {
    mentor: string;
    strengths: string[];
    improvements: string[];
    rating: number;
  };
  businessPlan?: {
    targetMarket: string;
    valueProposition: string;
    revenueModel: string;
    competition: string;
    marketing: string;
  };
  resources?: {
    team: number;
    technology: number;
    marketing: number;
    operations: number;
  };
  gatesProgress?: {
    [stepIndex: number]: {
      [taskIndex: number]: boolean;
    };
  };
  deliverables?: {
    [stepIndex: number]: {
      [taskIndex: number]: string;
    };
  };
}

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "EcoBox - Livraison zéro déchet",
    description: "Service de livraison de repas dans des contenants réutilisables",
    budget: 50000,
    status: "completed",
    progress: 100,
    createdAt: "2026-02-15",
    crashTestScore: 85,
    feedback: {
      mentor: "Sophie Martin",
      strengths: [
        "Concept innovant et aligné avec les tendances écologiques",
        "Modèle économique clair et viable",
        "Bonne identification du marché cible"
      ],
      improvements: [
        "Prévoir un plan de scalabilité plus détaillé",
        "Analyser les coûts de logistique inversée",
        "Renforcer la stratégie d'acquisition client"
      ],
      rating: 4.5
    },
    businessPlan: {
      targetMarket: "Urbains 25-40 ans sensibles à l'écologie",
      valueProposition: "Livraison de repas sans déchets",
      revenueModel: "Abonnement mensuel + caution contenants",
      competition: "Uber Eats, Deliveroo - mais sans focus écologique",
      marketing: "Réseaux sociaux, partenariats avec restaurants bio"
    },
    resources: {
      team: 4,
      technology: 30,
      marketing: 40,
      operations: 26
    }
  },
  {
    id: "2",
    name: "StudyBuddy - Tutorat entre étudiants",
    description: "Plateforme de tutorat peer-to-peer pour étudiants",
    budget: 30000,
    status: "testing",
    progress: 65,
    createdAt: "2026-02-28",
    crashTestScore: 72,
    feedback: {
      mentor: "Thomas Dubois",
      strengths: [
        "Problème réel et bien identifié",
        "Approche peer-to-peer pertinente"
      ],
      improvements: [
        "Définir un système de vérification des compétences",
        "Prévoir un modèle de monétisation plus solide",
        "Analyser la concurrence existante"
      ],
      rating: 3.5
    }
  },
  {
    id: "3",
    name: "FitChallenge - Défis sportifs",
    description: "App de défis sportifs en groupe avec gamification",
    budget: 40000,
    status: "draft",
    progress: 30,
    createdAt: "2026-03-05"
  }
];