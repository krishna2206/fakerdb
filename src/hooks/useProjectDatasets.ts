import { useToast } from '@/components/ui/use-toast';
import { getProjectDatasets } from '@/services/datasetService';
import { Dataset } from '@/types/types';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useProjectDatasets(
  projectId: string | undefined,
  isAuthenticated: boolean,
  refreshKey: number = 0
) {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Use a ref to track component mounted state
  const isMounted = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Function to fetch datasets with retry logic
  const fetchDatasets = useCallback(async (retryCount = 0) => {
    if (!projectId || !isAuthenticated) return;
    
    const MAX_RETRIES = 3;
    
    // Only set loading on first attempt
    if (retryCount === 0 && isMounted.current) {
      setIsLoading(true);
    }
    
    try {
      // Add a delay for retries to allow database to stabilize
      if (retryCount > 0 || refreshKey > 0) {
        // Different delays based on operation type
        // For deletion, we need less time as the operation is usually faster
        // For creation, we need more time to ensure database consistency
        const operationDelay = 600 + (retryCount * 200);
        await new Promise(resolve => setTimeout(resolve, operationDelay));
      }
      
      const projectDatasets = await getProjectDatasets(projectId);
      
      if (isMounted.current) {
        setDatasets(projectDatasets);
        setIsLoading(false);
      }
    } catch (error) {
      // Check for specific PocketBase autocancellation error
      const isPocketBaseCancel = 
        error && 
        typeof error === 'object' && 
        'message' in error && 
        typeof error.message === 'string' &&
        error.message.includes('autocancelled');
      
      // If it's not a cancellation error and we haven't exceeded max retries, try again
      if (!isPocketBaseCancel && retryCount < MAX_RETRIES && isMounted.current) {
        fetchDatasets(retryCount + 1);
      } else if (!isPocketBaseCancel && isMounted.current) {
        console.error("Error fetching datasets:", error);
        toast({
          title: "Failed to load datasets",
          description: "There was a problem loading your datasets.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }
  }, [projectId, isAuthenticated, refreshKey, toast]);

  // Effect to fetch datasets
  useEffect(() => {
    // Track if the current effect is still active
    let isActive = true;
    
    fetchDatasets();
    
    return () => {
      isActive = false;
    };
  }, [projectId, isAuthenticated, refreshKey, fetchDatasets]);

  return { datasets, isLoading };
}