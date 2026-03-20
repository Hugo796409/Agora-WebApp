import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { LandingPage } from "./components/LandingPage";
import { SignInPage } from "./components/SignInPage";
import { SignUpPage } from "./components/SignUpPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import { DashboardStartup } from "./components/DashboardStartup";
import { CreateProjectPage } from "./components/CreateProjectPage";
import { ProjectDetailPage } from "./components/ProjectDetailPage";
import { CertificationJuryPage } from "./components/CertificationJuryPage";
import { PaymentPage } from "./components/PaymentPage";
import { ProfilePage } from "./components/ProfilePage";
import { FeedbacksPage } from "./components/FeedbacksPage";
import { RecapPage } from "./components/RecapPage";
import { TeamPage } from "./components/TeamPage";
import { MentorsPage } from "./components/MentorsPage";
import { AchievementsPage } from "./components/AchievementsPage";
import { PricingPage } from "./components/PricingPage";
import { FAQPage } from "./components/FAQPage";
import { CommunityPage } from "./components/CommunityPage";
import { GatesPage } from "./components/GatesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: LandingPage,
      },
      {
        path: "signin",
        Component: SignInPage,
      },
      {
        path: "signup",
        Component: SignUpPage,
      },
      // Routes protégées avec Layout
      {
        path: "/",
        Component: ProtectedRoute,
        children: [
          {
            path: "/",
            Component: Layout,
            children: [
              {
                path: "dashboard",
                Component: DashboardStartup,
              },
              {
                path: "create-project",
                Component: CreateProjectPage,
              },
              {
                path: "project/:projectId",
                Component: ProjectDetailPage,
              },
              {
                path: "certification/:projectId",
                Component: CertificationJuryPage,
              },
              {
                path: "payment/:projectId",
                Component: PaymentPage,
              },
              {
                path: "profile",
                Component: ProfilePage,
              },
              {
                path: "feedbacks",
                Component: FeedbacksPage,
              },
              {
                path: "recap",
                Component: RecapPage,
              },
              {
                path: "team",
                Component: TeamPage,
              },
              {
                path: "mentors",
                Component: MentorsPage,
              },
              {
                path: "achievements",
                Component: AchievementsPage,
              },
              {
                path: "pricing",
                Component: PricingPage,
              },
              {
                path: "faq",
                Component: FAQPage,
              },
              {
                path: "community",
                Component: CommunityPage,
              },
              {
                path: "gates",
                Component: GatesPage,
              },
            ],
          },
        ],
      },
    ],
  },
]);