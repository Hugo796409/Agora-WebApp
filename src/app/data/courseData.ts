export interface CourseContent {
  videoUrl: string;
  videoTitle: string;
  theory: {
    title: string;
    content: string[];
  };
  application: {
    title: string;
    content: string[];
    examples: string[];
  };
  deliverable: {
    title: string;
    description: string;
    instructions: string[];
    expectedFormat: string;
  };
}

export interface CourseData {
  [stepIndex: number]: {
    [taskIndex: number]: CourseContent;
  };
}

// Contenu des cours pour chaque tâche
export const courseData: CourseData = {
  // Étape 0: L'idée
  0: {
    0: {
      videoUrl: "https://www.youtube.com/embed/bzYTrYQZJRU",
      videoTitle: "Comment trouver et valider une idée de startup",
      theory: {
        title: "Comprendre l'idéation entrepreneuriale",
        content: [
          "Trouver une idée de startup ne consiste pas à avoir une révélation géniale, mais à identifier un problème réel que les gens rencontrent au quotidien.",
          "Les meilleures idées viennent souvent de votre propre expérience : quels problèmes rencontrez-vous régulièrement ? Quelles frustrations observez-vous autour de vous ?",
          "Une bonne idée répond à un besoin clairement identifié et apporte une valeur ajoutée mesurable par rapport aux solutions existantes.",
          "L'innovation peut être incrémentale (améliorer l'existant) ou disruptive (créer quelque chose de nouveau), les deux approches sont valables."
        ]
      },
      application: {
        title: "Appliquer cette méthode à votre projet",
        content: [
          "Identifiez 3 problèmes que vous ou votre entourage rencontrez fréquemment",
          "Pour chaque problème, listez les solutions existantes et leurs limites",
          "Imaginez comment votre solution pourrait améliorer significativement la situation",
          "Validez que le problème est suffisamment important pour que des gens soient prêts à payer pour le résoudre"
        ],
        examples: [
          "Exemple 1: Problème = difficulté à trouver un parking → Solution = app de réservation de places",
          "Exemple 2: Problème = gaspillage alimentaire → Solution = plateforme anti-gaspi",
          "Exemple 3: Problème = isolement des seniors → Solution = réseau social intergénérationnel"
        ]
      },
      deliverable: {
        title: "Pitch de votre idée",
        description: "Rédigez un pitch court de votre idée d'entreprise",
        instructions: [
          "Décrivez le problème que vous souhaitez résoudre (2-3 phrases)",
          "Expliquez votre solution en termes simples (2-3 phrases)",
          "Identifiez qui sont vos clients potentiels (1-2 phrases)",
          "Expliquez pourquoi maintenant est le bon moment (1-2 phrases)"
        ],
        expectedFormat: "Texte de 300 à 500 mots maximum"
      }
    },
    1: {
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoTitle: "Comment évaluer le potentiel de votre idée",
      theory: {
        title: "Les critères d'évaluation d'une idée",
        content: [
          "Une idée viable doit répondre à trois critères essentiels : désirabilité (les gens en veulent), faisabilité (vous pouvez le construire) et viabilité (ça peut être rentable).",
          "La désirabilité se mesure par l'intensité du problème et la taille du marché potentiel.",
          "La faisabilité dépend de vos ressources, compétences et du contexte technologique/réglementaire.",
          "La viabilité s'évalue en analysant si des clients seraient prêts à payer suffisamment pour couvrir vos coûts et générer du profit."
        ]
      },
      application: {
        title: "Évaluer votre idée de projet",
        content: [
          "Testez la désirabilité : parlez à 10-15 personnes de votre cible pour valider le problème",
          "Analysez la faisabilité : listez ce dont vous avez besoin vs ce que vous avez déjà",
          "Vérifiez la viabilité : estimez combien les gens seraient prêts à payer",
          "Comparez avec les alternatives existantes sur le marché"
        ],
        examples: [
          "Désirabilité: 'Sur 10 personnes interrogées, 8 ont confirmé rencontrer ce problème au moins 1x/semaine'",
          "Faisabilité: 'J'ai les compétences tech nécessaires, il me manque l'expertise marketing'",
          "Viabilité: 'Les concurrents facturent 15-30€/mois, je peux me positionner à 20€'"
        ]
      },
      deliverable: {
        title: "Grille d'évaluation de votre idée",
        description: "Complétez une analyse structurée du potentiel de votre idée",
        instructions: [
          "Désirabilité: Décrivez le problème, son intensité et la taille du marché (100-150 mots)",
          "Faisabilité: Listez vos ressources disponibles et les gaps à combler (100-150 mots)",
          "Viabilité: Estimez votre modèle de revenus potentiel (100-150 mots)",
          "Conclusion: Score sur 10 pour chaque critère et justification"
        ],
        expectedFormat: "Document structuré de 400 à 600 mots"
      }
    },
    2: {
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoTitle: "Formaliser votre concept pour le présenter",
      theory: {
        title: "Structurer votre proposition de valeur",
        content: [
          "Formaliser votre idée signifie la transformer en un concept clair, communicable et actionnable.",
          "Utilisez le framework de la proposition de valeur : Pour [cible], qui [problème], notre [solution] est [catégorie] qui [bénéfice clé]. Contrairement à [alternatives], nous [différenciation].",
          "Définissez clairement votre MVP (Minimum Viable Product) : la version la plus simple de votre produit qui apporte de la valeur.",
          "Documentez vos hypothèses clés à tester : ce sont les paris critiques sur lesquels repose votre modèle."
        ]
      },
      application: {
        title: "Formaliser votre concept de projet",
        content: [
          "Rédigez votre proposition de valeur en une phrase claire",
          "Listez les 3 fonctionnalités essentielles de votre MVP",
          "Identifiez vos 3 hypothèses les plus risquées à valider",
          "Créez un one-pager visuel de votre concept"
        ],
        examples: [
          "Proposition: 'Pour les étudiants en difficulté qui manquent de soutien académique, StudyBuddy est une plateforme de tutorat peer-to-peer qui rend l'aide accessible et abordable'",
          "MVP: 1) Matching tuteur-étudiant, 2) Système de réservation, 3) Paiement sécurisé",
          "Hypothèse risquée: 'Les étudiants sont prêts à payer 15€/h pour un tuteur étudiant'"
        ]
      },
      deliverable: {
        title: "Document de concept formalisé",
        description: "Créez un document qui présente clairement votre concept",
        instructions: [
          "Rédigez votre proposition de valeur en utilisant le framework proposé",
          "Listez et décrivez les 3-5 fonctionnalités de votre MVP",
          "Identifiez 5 hypothèses critiques à valider et comment vous comptez les tester",
          "Créez un schéma simple montrant comment votre solution fonctionne"
        ],
        expectedFormat: "Document de 500 à 700 mots + un schéma/diagramme simple"
      }
    }
  },

  // Étape 1: L'adéquation Personne / Projet
  1: {
    0: {
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoTitle: "Comprendre vos motivations entrepreneuriales",
      theory: {
        title: "L'importance de l'introspection entrepreneuriale",
        content: [
          "Lancer une startup demande énormément d'énergie et de résilience. Comprendre vos motivations profondes est essentiel pour tenir sur la durée.",
          "Vos motivations peuvent être variées : impact social, liberté, création de richesse, défis intellectuels, reconnaissance... Aucune n'est meilleure qu'une autre.",
          "Identifiez aussi vos contraintes : temps disponible, besoins financiers, situation familiale, engagement géographique...",
          "L'adéquation entre vos motivations/contraintes et les exigences du projet détermine en grande partie vos chances de succès."
        ]
      },
      application: {
        title: "Auto-évaluer votre fit avec le projet",
        content: [
          "Listez vos 3 motivations principales pour lancer ce projet spécifique",
          "Identifiez vos contraintes majeures (temps, argent, mobilité...)",
          "Estimez le temps réel que vous pouvez consacrer au projet par semaine",
          "Évaluez si le projet peut répondre à vos motivations tout en respectant vos contraintes"
        ],
        examples: [
          "Motivation: 'Créer un impact positif sur l'environnement + devenir indépendant financièrement'",
          "Contrainte: 'Je peux consacrer 20h/semaine max car je suis en études + besoin de 1000€/mois pour vivre'",
          "Fit: 'Le projet environnemental correspond à mes valeurs, mais je dois prévoir 6-12 mois avant rentabilité'"
        ]
      },
      deliverable: {
        title: "Analyse personnelle d'adéquation",
        description: "Analysez votre fit personnel avec votre projet",
        instructions: [
          "Listez 3-5 motivations profondes qui vous poussent à entreprendre",
          "Identifiez vos contraintes personnelles (temps, argent, compétences, géographie...)",
          "Décrivez ce que vous attendez concrètement de ce projet à 1 an, 3 ans",
          "Analysez les points d'alignement et de friction entre votre profil et les exigences du projet"
        ],
        expectedFormat: "Analyse structurée de 400 à 600 mots"
      }
    },
    1: {
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoTitle: "Faire le bilan de vos compétences",
      theory: {
        title: "Cartographier vos compétences entrepreneuriales",
        content: [
          "Une startup nécessite un large spectre de compétences : techniques, commerciales, financières, opérationnelles, marketing...",
          "Personne ne maîtrise tout. L'essentiel est d'identifier vos forces et vos gaps pour savoir comment les combler.",
          "Les compétences peuvent être acquises (formation), déléguées (recrutement/freelance) ou compensées (associés/partenaires).",
          "Évaluez aussi vos soft skills : résilience, communication, leadership, capacité d'apprentissage... Souvent plus importantes que les hard skills."
        ]
      },
      application: {
        title: "Cartographier vos compétences pour le projet",
        content: [
          "Listez les 10 compétences clés nécessaires pour votre projet spécifique",
          "Auto-évaluez votre niveau sur chacune (débutant/intermédiaire/expert)",
          "Pour chaque gap, identifiez comment le combler (formation/recrutement/partenariat)",
          "Priorisez les compétences à développer en urgence vs celles à déléguer"
        ],
        examples: [
          "Compétence nécessaire: Développement web → Mon niveau: Intermédiaire → Action: Formation React avancé",
          "Compétence nécessaire: Marketing digital → Mon niveau: Débutant → Action: Recruter freelance marketing",
          "Compétence nécessaire: Vente B2B → Mon niveau: Expert → Action: C'est ma force, je gère"
        ]
      },
      deliverable: {
        title: "Matrice de compétences",
        description: "Créez une cartographie complète de vos compétences",
        instructions: [
          "Listez 10-15 compétences critiques pour votre projet",
          "Évaluez votre niveau actuel sur chacune (échelle de 1 à 5)",
          "Pour chaque gap (niveau <3), proposez une solution concrète pour le combler",
          "Identifiez vos 3 compétences clés qui sont vos avantages compétitifs"
        ],
        expectedFormat: "Tableau/matrice + analyse de 300 à 500 mots"
      }
    },
    2: {
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoTitle: "Structurer votre équipe fondatrice",
      theory: {
        title: "La composition d'une équipe gagnante",
        content: [
          "Les investisseurs disent souvent qu'ils investissent dans l'équipe avant d'investir dans l'idée. Une bonne équipe peut pivoter, une mauvaise équipe échouera même avec une excellente idée.",
          "Une équipe complémentaire couvre les 3 piliers : Tech (construire le produit), Business (vendre et gérer), Design/UX (créer l'expérience).",
          "Au-delà des compétences, cherchez des valeurs partagées, une vision commune et une confiance mutuelle absolue.",
          "Définissez dès le départ les rôles, responsabilités et la répartition du capital. Les conflits d'associés sont la 1ère cause d'échec des startups."
        ]
      },
      application: {
        title: "Définir les rôles dans votre équipe",
        content: [
          "Si vous êtes seul : identifiez le profil de votre co-fondateur idéal",
          "Si vous avez une équipe : attribuez des rôles clairs à chacun (qui fait quoi)",
          "Définissez un process de décision : qui a le dernier mot sur quoi ?",
          "Discutez de la répartition du capital : comment diviser les parts équitablement ?"
        ],
        examples: [
          "Solo: 'Je suis tech, je cherche un co-fondateur business/marketing avec expérience vente B2B'",
          "Équipe de 3: 'Alice = CEO/Business, Bob = CTO/Tech, Charlie = CMO/Marketing'",
          "Équité: 'Fondateur principal 40%, co-fondateur 30%, early employee 15%, pool options 15%'"
        ]
      },
      deliverable: {
        title: "Organigramme et pacte d'associés simplifié",
        description: "Définissez la structure de votre équipe",
        instructions: [
          "Présentez chaque membre de l'équipe : rôle, compétences clés, expérience pertinente",
          "Si solo : décrivez le profil du co-fondateur recherché",
          "Définissez les responsabilités principales de chaque rôle",
          "Proposez une répartition du capital et justifiez-la",
          "Décrivez votre process de prise de décision collective"
        ],
        expectedFormat: "Document de 500 à 700 mots + organigramme visuel"
      }
    }
  },

  // Étape 2: L'étude de marché (exemple avec quelques tâches)
  2: {
    0: {
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoTitle: "Valider votre marché : la méthodologie",
      theory: {
        title: "L'étude de marché terrain",
        content: [
          "L'étude de marché ne consiste pas à compiler des statistiques depuis votre bureau, mais à aller sur le terrain parler à de vrais clients potentiels.",
          "Objectif : valider que le problème que vous pensez résoudre existe vraiment, est assez important, et que les gens sont prêts à payer pour votre solution.",
          "Menez au minimum 20-30 entretiens qualitatifs avec des personnes de votre cible. Posez des questions ouvertes sur leurs problèmes, pas sur votre solution.",
          "Méfiez-vous du 'Mom Test' : les gens sont trop polis et vous diront que c'est une bonne idée même si ce n'est pas le cas."
        ]
      },
      application: {
        title: "Construire votre étude de marché",
        content: [
          "Définissez votre cible précise : qui interroger ?",
          "Préparez un guide d'entretien avec 10-15 questions ouvertes",
          "Menez 10 entretiens minimum (objectif : 20-30)",
          "Synthétisez les résultats : quels patterns observez-vous ?"
        ],
        examples: [
          "Cible: 'Étudiants universitaires en L1-L3 de toutes filières'",
          "Question: 'Racontez-moi la dernière fois que vous avez eu besoin d'aide pour comprendre un cours'",
          "Pattern: '18 personnes sur 20 ont mentionné spontanément la difficulté à trouver de l'aide accessible'"
        ]
      },
      deliverable: {
        title: "Rapport d'étude de marché terrain",
        description: "Synthèse de vos entretiens clients",
        instructions: [
          "Décrivez votre méthodologie : qui, combien, comment avez-vous interrogé ?",
          "Synthétisez les 3-5 insights principaux qui ressortent",
          "Citez 5-10 verbatims marquants des interviews",
          "Concluez : le marché valide-t-il votre hypothèse initiale ? Qu'avez-vous appris ?"
        ],
        expectedFormat: "Rapport de 600 à 800 mots avec citations"
      }
    },
    1: {
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoTitle: "Protéger votre propriété intellectuelle",
      theory: {
        title: "Les bases de la protection intellectuelle",
        content: [
          "La propriété intellectuelle protège vos créations : marques, brevets, designs, droits d'auteur...",
          "Avant d'investir massivement, identifiez ce qui dans votre projet est protégeable et stratégique.",
          "Une marque protège votre nom commercial et logo. C'est souvent le premier actif à protéger.",
          "Un brevet protège une innovation technique. C'est coûteux et complexe, mais crucial dans certains secteurs."
        ]
      },
      application: {
        title: "Identifier ce qui est à protéger dans votre projet",
        content: [
          "Listez tous les éléments de votre projet qui ont une valeur distinctive",
          "Vérifiez la disponibilité de votre nom de marque (INPI, Google, réseaux sociaux)",
          "Évaluez si vous avez une innovation technique brevetable",
          "Consultez un expert PI si nécessaire (souvent gratuit en première consultation)"
        ],
        examples: [
          "Marque: Vérifier que 'StudyBuddy' n'est pas déjà déposé dans la classe 41 (éducation)",
          "Secret commercial: Algorithme de matching tuteur-étudiant à ne pas divulguer",
          "Design: Protéger l'interface unique de votre app si elle est distinctive"
        ]
      },
      deliverable: {
        title: "Stratégie de protection intellectuelle",
        description: "Plan de protection de vos actifs immatériels",
        instructions: [
          "Listez 5-10 éléments de votre projet ayant une valeur distinctive",
          "Pour chaque élément, identifiez le type de protection adapté (marque, brevet, secret...)",
          "Priorisez : qu'est-ce qui doit être protégé en priorité et pourquoi ?",
          "Estimez le coût et le timing de protection pour les éléments prioritaires"
        ],
        expectedFormat: "Document structuré de 400 à 600 mots"
      }
    }
  },

  // Étape 3: La stratégie commerciale
  3: {
    0: {
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoTitle: "Définir votre mission et positionnement",
      theory: {
        title: "Mission, Vision, Positionnement",
        content: [
          "Votre mission explique POURQUOI votre entreprise existe : quel problème résolvez-vous ? Pour qui ?",
          "Votre vision décrit OÙ vous voulez aller : à quoi ressemble le monde si vous réussissez ?",
          "Votre positionnement définit COMMENT vous êtes perçu par rapport à vos concurrents.",
          "Ces 3 éléments guident toutes vos décisions stratégiques et motivent votre équipe."
        ]
      },
      application: {
        title: "Formuler votre mission et positionnement",
        content: [
          "Rédigez votre mission en 1-2 phrases : Pour qui ? Quel problème ? Comment ?",
          "Décrivez votre vision à 5-10 ans en quelques phrases inspirantes",
          "Positionnez-vous sur 2-3 axes différenciants vs vos concurrents",
          "Testez ces formulations avec votre équipe et quelques personnes extérieures"
        ],
        examples: [
          "Mission: 'Rendre l'aide académique accessible à tous les étudiants grâce au tutorat peer-to-peer'",
          "Vision: 'Un monde où aucun étudiant n'échoue par manque de soutien'",
          "Positionnement: 'Plus abordable que les cours particuliers, plus humain que les plateformes en ligne'"
        ]
      },
      deliverable: {
        title: "Manifeste de votre entreprise",
        description: "Document définissant mission, vision et positionnement",
        instructions: [
          "Rédigez votre mission : pourquoi existez-vous ?",
          "Décrivez votre vision : où voulez-vous aller ?",
          "Définissez votre positionnement : comment vous différenciez-vous ?",
          "Expliquez comment ces éléments guident vos décisions stratégiques"
        ],
        expectedFormat: "Document inspirant de 400 à 600 mots"
      }
    }
  }
};

// Fonction helper pour vérifier si un cours existe
export function getCourseContent(stepIndex: number, taskIndex: number): CourseContent | null {
  return courseData[stepIndex]?.[taskIndex] || null;
}