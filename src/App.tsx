import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/NotFound.tsx";
import AppLayout from "./components/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import ClientsPage from "./pages/ClientsPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import ChatbotPage from "./pages/ChatbotPage";
import PitchPage from "./pages/PitchPage";
import DocumentsPage from "./pages/DocumentsPage";
import OpportunitiesPage from "./pages/OpportunitiesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/pitch" element={<PitchPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/opportunities" element={<OpportunitiesPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
