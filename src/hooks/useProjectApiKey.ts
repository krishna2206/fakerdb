import { updateProject } from '@/services/projectService';
import { Project } from '@/types/types';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { useToast } from './useToast';

interface UseProjectApiKeyReturn {
  apiKey: string | null;
  isLoading: boolean;
  error: Error | null;
  setApiKey: (key: string | null) => Promise<void>;
  clearApiKey: () => Promise<void>;
}

export function useProjectApiKey(project: Project | null): UseProjectApiKeyReturn {
  const [apiKey, setApiKeyState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // Load API key when project changes
  useEffect(() => {
    if (project?.geminiApiKey) {
      try {
        // Project API keys are already decrypted by the service layer
        setApiKeyState(project.geminiApiKey);
      } catch (err) {
        console.error("Error loading project API key:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    } else {
      setApiKeyState(null);
    }
  }, [project]);

  const setApiKey = async (key: string | null): Promise<void> => {
    if (!project || !user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // The project service will handle encryption
      const updatedProject = await updateProject(project.id, { 
        geminiApiKey: key 
      });
      
      setApiKeyState(updatedProject.geminiApiKey);
      
      toast({
        title: key ? "API Key Saved" : "API Key Removed",
        description: key 
          ? "Your API key has been securely saved for this project" 
          : "API key has been removed from this project",
      });
    } catch (err) {
      console.error("Error saving project API key:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      
      toast({
        title: "Error",
        description: "Failed to update project API key",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearApiKey = async (): Promise<void> => {
    return setApiKey(null);
  };

  return {
    apiKey,
    isLoading,
    error,
    setApiKey,
    clearApiKey
  };
}