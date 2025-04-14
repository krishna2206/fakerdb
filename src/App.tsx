import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Lab from "./pages/Lab";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/Projects";
import SingleTableMode from "./pages/SingleTableMode";
import ThemePreview from "./pages/ThemePreview";

// Main app router
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/single-table" element={<SingleTableMode />} />
      <Route path="/lab" element={<Lab />} />
      <Route path="/theme-preview" element={<ThemePreview />} />
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
      </Route>
      
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
