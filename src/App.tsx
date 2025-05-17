import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { ApiKeyProvider } from "./contexts/ApiKeyContext";
import Index from "./pages/Index";
import Lab from "./pages/Lab";
import NotFound from "./pages/NotFound";
import ProjectPage from "./pages/ProjectPage";
import Projects from "./pages/Projects";
import ThemePreview from "./pages/ThemePreview";
import UntitledProjectPage from "./pages/UntitledProjectPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/untitled-project" element={<UntitledProjectPage />} />
      <Route path="/lab" element={<Lab />} />
      <Route path="/theme-preview" element={<ThemePreview />} />
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectPage />} />
      </Route>
      
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <TooltipProvider>
      <ApiKeyProvider>
        <Toaster />
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ApiKeyProvider>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
