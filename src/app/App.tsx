import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './components/AuthContext';
import { UserPlanProvider } from './components/UserPlanContext';
import { ProjectsProvider } from './components/ProjectsContext';
import { GamificationProvider } from './components/GamificationContext';

export default function App() {
  return (
    <AuthProvider>
      <UserPlanProvider>
        <ProjectsProvider>
          <GamificationProvider>
            <RouterProvider router={router} />
          </GamificationProvider>
        </ProjectsProvider>
      </UserPlanProvider>
    </AuthProvider>
  );
}