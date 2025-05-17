import { validateApiKey } from '@/utils/apiKeyUtils';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface ApiKeyContextType {
  apiKey: string | null;
  isApiKeyExpired: boolean;
  clearApiKey: () => void;
  checkAndCleanExpiredKey: () => boolean;
  saveApiKey: (key: string, expirationTime: string) => void;
  refreshApiKey: () => void;
}

interface ApiKeyProviderProps {
  children: ReactNode;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export function ApiKeyProvider({ children }: ApiKeyProviderProps) {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isApiKeyExpired, setIsApiKeyExpired] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const checkAndCleanExpiredKey = useCallback((): boolean => {
    const validation = validateApiKey();
    
    if (!validation.valid && validation.error?.message.includes("expired")) {
      localStorage.removeItem('gemini_api_key');
      setApiKey(null);
      setIsApiKeyExpired(true);
      return true;
    }
    
    return false;
  }, []);

  const clearApiKey = useCallback(() => {
    localStorage.removeItem('gemini_api_key');
    localStorage.removeItem('gemini_api_key_expiry_date');
    localStorage.removeItem('gemini_api_key_expiration');
    setApiKey(null);
    setIsApiKeyExpired(false);
  }, []);

  const saveApiKey = useCallback((key: string, expirationTime: string) => {
    const trimmedKey = key.trim();
    if (!trimmedKey) {
      clearApiKey();
      return;
    }
    
    localStorage.setItem('gemini_api_key', trimmedKey);

    const expirationSeconds = parseInt(expirationTime, 10);
    localStorage.setItem('gemini_api_key_expiration', String(expirationSeconds));

    if (expirationSeconds > 0) {
      const expirationDate = Date.now() + expirationSeconds * 1000;
      localStorage.setItem('gemini_api_key_expiry_date', String(expirationDate));
    } else {
      localStorage.removeItem('gemini_api_key_expiry_date');
    }
    
    setApiKey(trimmedKey);
    setIsApiKeyExpired(false);
  }, [clearApiKey]);

  const refreshApiKey = useCallback(() => {
    setRefreshCounter(prev => prev + 1);
  }, []);
  
  useEffect(() => {
    const isExpired = checkAndCleanExpiredKey();
    
    if (!isExpired) {
      const savedApiKey = localStorage.getItem('gemini_api_key');
      setApiKey(savedApiKey);
      setIsApiKeyExpired(false);
    }
  }, [refreshCounter, checkAndCleanExpiredKey]);
  
  const value = useMemo(() => ({
    apiKey,
    isApiKeyExpired,
    clearApiKey,
    checkAndCleanExpiredKey,
    saveApiKey,
    refreshApiKey
  }), [
    apiKey, 
    isApiKeyExpired, 
    clearApiKey, 
    checkAndCleanExpiredKey, 
    saveApiKey, 
    refreshApiKey
  ]);
  
  return (
    <ApiKeyContext.Provider value={value}>
      {children}
    </ApiKeyContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApiKey(): ApiKeyContextType {
  const context = useContext(ApiKeyContext);
  
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  
  return context;
}
