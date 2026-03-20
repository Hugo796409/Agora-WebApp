# Système de Cours Pédagogiques - Agora

## Vue d'ensemble

Le système de cours pédagogiques d'Agora transforme chaque tâche du parcours entrepreneurial en une expérience d'apprentissage complète avec :
- 📹 **Vidéo explicative** : Cours vidéo pour comprendre les concepts
- 📚 **Contenu théorique** : Explications détaillées des principes
- 🎯 **Application pratique** : Guide pour appliquer au projet de l'utilisateur
- 📝 **Livrable obligatoire** : Exercice à soumettre pour valider l'étape

## Architecture

### Fichiers principaux

1. **`/src/app/data/courseData.ts`**
   - Contient tout le contenu pédagogique structuré
   - Organisation par étapes (steps) et tâches (tasks)
   - Interface `CourseContent` définit la structure d'un cours

2. **`/src/app/components/CourseModal.tsx`**
   - Modal interactif affichant le cours complet
   - 4 onglets : Vidéo, Théorie, Application, Livrable
   - Validation du livrable (minimum 100 caractères)
   - Sauvegarde automatique des livrables

3. **`/src/app/components/GatesTab.tsx`**
   - Affichage de toutes les étapes et tâches
   - Bouton "Suivre le cours" pour ouvrir le modal
   - Progression visuelle par étape
   - Indicateurs de validation

### Structure de données

#### CourseContent
```typescript
interface CourseContent {
  videoUrl: string;              // URL YouTube embed
  videoTitle: string;            // Titre de la vidéo
  theory: {
    title: string;
    content: string[];           // Paragraphes de théorie
  };
  application: {
    title: string;
    content: string[];           // Étapes à suivre
    examples: string[];          // Exemples concrets
  };
  deliverable: {
    title: string;
    description: string;
    instructions: string[];      // Liste d'instructions
    expectedFormat: string;      // Format attendu
  };
}
```

#### Stockage dans Project
```typescript
interface Project {
  // ... autres champs
  gatesProgress?: {
    [stepIndex: number]: {
      [taskIndex: number]: boolean;  // true = validé
    };
  };
  deliverables?: {
    [stepIndex: number]: {
      [taskIndex: number]: string;   // Texte du livrable
    };
  };
}
```

## Flux utilisateur

1. **Découverte** : L'utilisateur voit les tâches dans l'onglet "Gates"
2. **Apprentissage** : Clic sur "Suivre le cours" ouvre le modal
3. **Visionnage** : Vidéo explicative dans l'onglet "Vidéo"
4. **Compréhension** : Lecture de la théorie dans l'onglet "Théorie"
5. **Application** : Guide pratique dans l'onglet "Application"
6. **Validation** : Soumission du livrable dans l'onglet "Livrable"
7. **Déblocage** : Accès à la certification une fois toutes les tâches validées

## Système de blocage

### Validation des livrables
- Minimum 100 caractères requis
- Le compteur de mots/caractères est affiché en temps réel
- Le bouton de soumission est désactivé si la longueur est insuffisante

### Blocage de la certification
1. **PaymentPage** : Vérifie que toutes les gates sont complétées
   - Si incomplet : Affiche un message de blocage avec la progression
   - Si complet : Permet le paiement

2. **CertificationJuryPage** : Double vérification
   - Redirige vers le projet si les gates ne sont pas complètes
   - Vérifie aussi le paiement

## Ajouter un nouveau cours

### Étape 1 : Définir le contenu
Éditez `/src/app/data/courseData.ts` et ajoutez :

```typescript
export const courseData: CourseData = {
  // ... cours existants
  [stepIndex]: {
    [taskIndex]: {
      videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
      videoTitle: "Titre du cours",
      theory: {
        title: "Titre de la section théorique",
        content: [
          "Premier paragraphe de théorie",
          "Deuxième paragraphe de théorie",
          // ...
        ]
      },
      application: {
        title: "Comment l'appliquer à votre projet",
        content: [
          "Étape 1 à suivre",
          "Étape 2 à suivre",
          // ...
        ],
        examples: [
          "Exemple concret 1",
          "Exemple concret 2",
          // ...
        ]
      },
      deliverable: {
        title: "Nom du livrable",
        description: "Description courte",
        instructions: [
          "Instruction 1",
          "Instruction 2",
          // ...
        ],
        expectedFormat: "Format attendu (ex: 400-600 mots)"
      }
    }
  }
};
```

### Étape 2 : Trouver une vidéo YouTube
- Cherchez une vidéo pertinente sur YouTube
- Copiez l'ID de la vidéo (partie après `v=` dans l'URL)
- Utilisez : `https://www.youtube.com/embed/VIDEO_ID`

### Étape 3 : Tester
- Naviguez vers un projet
- Allez dans l'onglet "Gates"
- Ouvrez l'étape et la tâche correspondante
- Cliquez sur "Suivre le cours"
- Vérifiez que tout s'affiche correctement

## Bonnes pratiques

### Contenu des cours
1. **Vidéo** : 5-15 minutes idéalement
2. **Théorie** : 3-5 paragraphes concis
3. **Application** : 4-6 étapes concrètes
4. **Exemples** : 2-4 exemples pertinents
5. **Livrable** : Instructions claires et format attendu précis

### Rédaction des livrables
- Soyez spécifique sur ce qui est attendu
- Donnez une fourchette de mots claire
- Proposez une structure (sections, points à aborder)
- Expliquez comment le livrable sera utilisé

### UX
- Les badges indiquent clairement l'état (cours disponible, validé, en préparation)
- Le bouton change de couleur une fois validé (vert)
- Le message de succès s'affiche 2 secondes après soumission
- Les livrables déjà soumis peuvent être relus mais pas modifiés

## Points d'attention

### Performance
- Les cours sont chargés dynamiquement via `getCourseContent()`
- Seul le cours ouvert est rendu dans le DOM
- Les vidéos YouTube sont en embed lazy-load

### Persistance
- Les livrables sont sauvegardés dans localStorage via `ProjectsContext`
- Mise à jour immédiate lors de la soumission
- Aucune perte de données lors du rechargement

### Accessibilité
- Modal utilisable au clavier (Tab, Escape)
- Bouton de fermeture visible et accessible
- Contraste des couleurs conforme WCAG

## Prochaines améliorations possibles

1. **Rich text editor** : Permettre la mise en forme des livrables
2. **Upload de fichiers** : Joindre des documents, images, schémas
3. **Feedback automatique** : IA qui analyse le livrable et donne des suggestions
4. **Versioning** : Permettre de modifier et soumettre plusieurs versions
5. **Partage** : Partager son livrable avec des mentors ou pairs
6. **Templates** : Modèles pré-remplis pour guider la rédaction
7. **Export PDF** : Télécharger tous les livrables en un seul document

## Support

Pour toute question sur l'implémentation ou l'ajout de nouveaux cours, consulter :
- `courseData.ts` pour la structure des données
- `CourseModal.tsx` pour la logique d'affichage
- `GatesTab.tsx` pour l'intégration dans le parcours
