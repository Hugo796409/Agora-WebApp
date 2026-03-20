export interface GateTask {
  title: string;
  resources: string[];
  completed?: boolean;
}

export interface GateStep {
  title: string;
  tasks: GateTask[];
}

export interface GatesData {
  steps: GateStep[];
}

export const gatesData: GatesData = {
  "steps": [
    {
      "title": "L'idée",
      "tasks": [
        {
          "title": "S'inspirer et trouver une idée",
          "resources": ["Notre tuto", "Nos articles", "Nos outils", "Nos vidéos", "Nos formations"]
        },
        {
          "title": "Évaluer l'idée",
          "resources": ["Notre tuto", "Nos articles", "Nos outils", "Nos vidéos", "Nos formations"]
        },
        {
          "title": "Formaliser l'idée retenue",
          "resources": ["Notre tuto", "Nos articles", "Nos outils", "Nos vidéos", "Nos formations"]
        }
      ]
    },
    {
      "title": "L'adéquation Personne / Projet",
      "tasks": [
        {
          "title": "Analyser mes motivations, objectifs et contraintes",
          "resources": ["Notre tuto", "Nos articles", "Nos outils", "Nos vidéos", "Nos formations"]
        },
        {
          "title": "Faire le point sur mes compétences",
          "resources": ["Notre tuto", "Nos articles", "Nos outils", "Nos vidéos", "Nos formations"]
        },
        {
          "title": "Définir le rôle de chacun dans le projet",
          "resources": ["Notre tuto", "Nos articles", "Nos outils", "Nos vidéos", "Nos formations"]
        }
      ]
    },
    {
      "title": "L'étude de marché",
      "tasks": [
        {"title": "Confronter l'idée au marché","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Identifier les éléments à protéger","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Décrire le marché visé","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Étudier l'environnement de l'entreprise","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Présenter les perspectives du marché à moyen terme","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Analyser les principaux concurrents","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Identifier les clients cibles","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Créer un profil par client cible","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Choisir un bon emplacement pour un commerce de proximité","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]}
      ]
    },
    {
      "title": "La stratégie commerciale",
      "tasks": [
        {"title": "Expliquer la mission et le positionnement de l'entreprise","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Décrire comment l'entreprise va gagner de l'argent","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Détailler l'offre de produit ou service","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Déterminer les prix de vente","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Définir les objectifs commerciaux et estimer le chiffre d'affaires prévisionnel","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Choisir les modes de distribution et évaluer leurs coûts","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Lister et chiffrer les ressources indispensables au projet","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Planifier et chiffrer les actions commerciales","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Choisir les canaux de communication et évaluer leurs coûts","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Présenter mon projet en mode \"puzzle\"","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]}
      ]
    },
    {
      "title": "L'étude financière",
      "tasks": [
        {"title": "Faire le compte de résultat sur 3 ans","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Réaliser le plan de financement initial","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Établir le plan de trésorerie mensuel","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Construire le plan de financement sur 3 ans","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]}
      ]
    },
    {
      "title": "Les aides et le financement",
      "tasks": [
        {"title": "Identifier les financements et garanties","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Recenser les aides financières","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Construire mon pitch pour convaincre les financeurs","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]}
      ]
    },
    {
      "title": "Le choix de la structure juridique",
      "tasks": [
        {"title": "Identifier la structure juridique adéquate","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Rédiger les statuts si nécessaire","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]}
      ]
    },
    {
      "title": "Démarches de création",
      "tasks": [
        {"title": "Accomplir les démarches préalables à l'immatriculation","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Réaliser les formalités d'immatriculation","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]}
      ]
    },
    {
      "title": "Installation de l'entreprise",
      "tasks": [
        {"title": "Protéger ce qui est protégeable","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Mettre en place les outils de pilotage","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Déployer le plan d'action commercial","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]}
      ]
    },
    {
      "title": "Démarrage de l'activité",
      "tasks": [
        {"title": "Trouver les premiers collaborateurs ou prestataires","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Prospecter et faire mes premières ventes","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]},
        {"title": "Développer la notoriété de l'entreprise","resources": ["Notre tuto","Nos articles","Nos outils","Nos vidéos","Nos formations"]}
      ]
    }
  ]
};
