import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Project, mockProjects } from "../data/mockProjects";
import { useAuth } from "./AuthContext";

interface ProjectsContextType {
  projects: Project[];
  addProject: (project: Omit<Project, "id" | "createdAt">, checkBadges?: (projectCount: number) => void) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  getProjectById: (id: string) => Project | undefined;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);

  // Charger les projets de l'utilisateur actuel
  useEffect(() => {
    if (!user?.id) {
      setProjects([]);
      return;
    }

    try {
      if (typeof window !== 'undefined') {
        const savedProjects = localStorage.getItem("agora_all_projects");
        if (savedProjects) {
          const allProjects = JSON.parse(savedProjects);
          const userProjects = allProjects[user.id] || [];
          setProjects(userProjects);
        } else {
          // Pour la démo, initialiser avec mockProjects pour le premier utilisateur
          setProjects([]);
        }
      }
    } catch (e) {
      console.error("Error loading projects from localStorage:", e);
      setProjects([]);
    }
  }, [user?.id]);

  // Sauvegarder les projets dans localStorage à chaque changement
  useEffect(() => {
    if (!user?.id) return;

    try {
      if (typeof window !== 'undefined') {
        const savedProjects = localStorage.getItem("agora_all_projects");
        const allProjects = savedProjects ? JSON.parse(savedProjects) : {};
        
        allProjects[user.id] = projects;
        
        localStorage.setItem("agora_all_projects", JSON.stringify(allProjects));
      }
    } catch (e) {
      console.error("Error saving projects to localStorage:", e);
    }
  }, [projects, user?.id]);

  const addProject = (projectData: Omit<Project, "id" | "createdAt">, checkBadges?: (projectCount: number) => void) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
      status: "testing",
      progress: 0,
    };
    setProjects((prev) => {
      const newProjects = [newProject, ...prev];
      if (checkBadges) {
        checkBadges(newProjects.length);
      }
      return newProjects;
    });
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, ...updates } : project
      )
    );
  };

  const getProjectById = (id: string) => {
    return projects.find((project) => project.id === id);
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, addProject, updateProject, getProjectById }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
}