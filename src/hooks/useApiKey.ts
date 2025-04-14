import { validateApiKey } from '@/utils/apiKeyUtils';
import { useEffect, useState } from 'react';

interface UseApiKeyReturn {
  apiKey: string | null;
  isApiKeyExpired: boolean;
  clearApiKey: () => void;
  checkAndCleanExpiredKey: () => boolean;
  saveApiKey: (key: string, expirationTime: string) => void;
}

export function useApiKey(refreshKey: number = 0): UseApiKeyReturn {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isApiKeyExpired, setIsApiKeyExpired] = useState(false);
  
  const checkAndCleanExpiredKey = (): boolean => {
    const validation = validateApiKey();
    
    if (!validation.valid && validation.error?.message.includes("expired")) {
      setApiKey(null);
      setIsApiKeyExpired(true);
      return true;
    }
    
    return false;
  };
  
  const clearApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    localStorage.removeItem('gemini_api_key_expiry_date');
    localStorage.removeItem('gemini_api_key_expiration');
    setApiKey(null);
    setIsApiKeyExpired(false);
  };

  const saveApiKey = (key: string, expirationTime: string) => {
    // Save the API key
    localStorage.setItem('gemini_api_key', key.trim());

    // Set expiration if selected
    const expirationSeconds = parseInt(expirationTime, 10);
    localStorage.setItem('gemini_api_key_expiration', String(expirationSeconds));

    if (expirationSeconds > 0) {
      const expirationDate = Date.now() + expirationSeconds * 1000;
      localStorage.setItem('gemini_api_key_expiry_date', String(expirationDate));
    } else {
      // Remove expiration date if "never" is selected
      localStorage.removeItem('gemini_api_key_expiry_date');
    }
    
    // Update state
    setApiKey(key.trim());
    setIsApiKeyExpired(false);
  };
  
  useEffect(() => {
    // Check for expiration first
    const isExpired = checkAndCleanExpiredKey();
    
    if (!isExpired) {
      // If not expired, get the current API key
      const savedApiKey = localStorage.getItem('gemini_api_key');
      setApiKey(savedApiKey);
      setIsApiKeyExpired(false);
    }
  }, [refreshKey]); // Now the effect will re-run when refreshKey changes
  
  return {
    apiKey,
    isApiKeyExpired,
    clearApiKey,
    checkAndCleanExpiredKey,
    saveApiKey
  };
}