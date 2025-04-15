import TableDefinitionForm from "@/components/TableDefinitionForm";
import ApiKeyAlert from "@/components/alerts/ApiKeyAlert";
import FeaturesAlert from "@/components/alerts/FeaturesAlert";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AuthModal from "@/components/modals/AuthModal";
import SettingsModal from "@/components/modals/SettingsModal";
import ResultsSection from "@/components/sections/ResultsSection";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { useToast } from "@/components/ui/use-toast";
import { useApiKey } from "@/hooks/useApiKey";
import { useAuth } from "@/hooks/useAuth";
import { generateSingleTableData } from "@/services/singleTableService";
import { GeneratedData, TableDefinition } from "@/types/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SingleTabMode = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [tableDefinition, setTableDefinition] =
    useState<TableDefinition | null>(null);
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showResults, setShowResults] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // API key management
  const { apiKey, isApiKeyExpired, checkAndCleanExpiredKey } =
    useApiKey(refreshKey);

  // Redirect authenticated users to the projects page
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate("/projects");
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Handle API key expiration notification
  useEffect(() => {
    if (isApiKeyExpired) {
      toast({
        title: "API Key Expired",
        description:
          "Your saved API key has expired. Please enter a new key in settings.",
        variant: "destructive",
      });
    }
  }, [isApiKeyExpired, toast]);

  const handleSignIn = () => {
    setAuthMode('signin');
    setIsAuthOpen(true);
  };

  const handleSignUp = () => {
    setAuthMode('signup');
    setIsAuthOpen(true);
  };

  const handleGenerateData = async (
    definition: TableDefinition,
    rowCount: number
  ) => {
    setError(null);
    setIsLoading(true);
    setTableDefinition(definition);
    setShowResults(false);

    try {
      checkAndCleanExpiredKey();

      if (!apiKey) {
        throw new Error(
          "Please add a Gemini API key in settings to use this feature."
        );
      }

      const data = await generateSingleTableData(definition, rowCount);

      if (!data) {
        throw new Error("Failed to generate data. Please try again.");
      }

      setGeneratedData(data);

      // Set a short delay to allow for animations
      setTimeout(() => {
        setShowResults(true);
      }, 100);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (err: unknown) => {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";

    if (errorMessage.includes("API key")) {
      // Just show toast for API key errors without setting error state
      toast({
        variant: "destructive",
        title: "API Key Issue",
        description: errorMessage,
      });
    } else {
      // For other errors, set the error state to show the alert at the bottom
      setError(errorMessage);

      toast({
        variant: "destructive",
        title: "Generation failed",
        description: errorMessage,
      });
    }
  };

  const handleSettingsSaved = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <Navbar
        onSignInClick={handleSignIn}
        onSignUpClick={handleSignUp}
        onSettingsClick={() => setIsSettingsOpen(true)}
      />

      <FadeIn delay={100} duration={400} direction="up">
        <Container className="py-8">
          <div className="grid grid-cols-1 gap-8">
            <h1 className="text-3xl font-bold">SQL & Data Generator</h1>

            <section>
              <div className="mb-6">
                <FeaturesAlert onSignInClick={handleSignUp} />
                <ApiKeyAlert
                  apiKeyMissing={!apiKey}
                  isApiKeyExpired={isApiKeyExpired}
                  onSettingsClick={() => setIsSettingsOpen(true)}
                />
              </div>

              <TableDefinitionForm
                onSubmit={handleGenerateData}
                isLoading={isLoading}
              />
            </section>

            <ResultsSection
              error={error}
              generatedData={generatedData}
              tableDefinition={tableDefinition}
              showResults={showResults}
            />
          </div>

          <Footer />
        </Container>
      </FadeIn>

      <AuthModal open={isAuthOpen} onOpenChange={setIsAuthOpen} initialMode={authMode} />
      <SettingsModal
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        onSettingsSaved={handleSettingsSaved}
      />
    </>
  );
};

export default SingleTabMode;
