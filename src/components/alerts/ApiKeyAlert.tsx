import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import React from "react";

interface ApiKeyAlertProps {
  onGlobalSettings?: () => void;
  onProjectSettings?: () => void;
  apiKeyMissing?: boolean;
  isApiKeyExpired?: boolean;
  onSettingsClick?: () => void;
  compact?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const ApiKeyAlert: React.FC<ApiKeyAlertProps> = ({
  apiKeyMissing = true,
  isApiKeyExpired = false,
  onSettingsClick,
  onGlobalSettings,
  onProjectSettings,
  compact = false,
  onDismiss,
  className = "",
}) => {
  if (!apiKeyMissing && !isApiKeyExpired) return null;

  // Use old behavior if only onSettingsClick is provided
  if (onSettingsClick && !onGlobalSettings && !onProjectSettings) {
    if (compact) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-red-50 border border-red-200 text-red-800 rounded-md shadow-sm
                      dark:bg-red-900/30 dark:border-red-800 dark:text-red-100 ${className}`}
        >
          <div className="flex items-start p-3">
            <AlertCircle className="h-4 w-4 mt-0.5 mr-2 shrink-0" />
            <div className="flex-1">
              <div className="font-medium text-xs">
                {isApiKeyExpired ? "API Key Expired" : "API Key Required"}
              </div>
              <p className="text-xs mt-1">
                {isApiKeyExpired ? 
                  "Your saved API key has expired. Please enter a new one." : 
                  "Add an API key to generate SQL from your diagram"}
              </p>
              <div className="flex gap-2 mt-1.5">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={onSettingsClick}
                  className="h-6 px-2 text-xs bg-red-50 border-red-300 hover:bg-red-100 
                            dark:bg-red-900/30 dark:border-red-800 dark:hover:bg-red-900/60"
                >
                  Add API Key
                </Button>
                {onDismiss && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={onDismiss}
                    className="h-6 w-6 p-0 ml-auto"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <Alert variant="error" className={`mt-4 ${className}`}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>
          {isApiKeyExpired ? "API Key Expired" : "API Key Required"}
        </AlertTitle>
        <AlertDescription className="flex flex-col gap-2">
          {isApiKeyExpired ? (
            <p>Your saved API key has expired. Please enter a new one.</p>
          ) : (
            <p>
              A Gemini API key is required to generate data. This application
              requires an API key to function.
            </p>
          )}
          <Button
            variant="outline"
            size="sm"
            className="self-start bg-red-50 border-red-300 hover:bg-red-100 dark:bg-red-900/30 dark:border-red-800 dark:hover:bg-red-900/60 dark:text-red-100"
            onClick={onSettingsClick}
          >
            Add API Key
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Compact mode with separate buttons for global and project-specific settings
  if (compact) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-red-50 border border-red-200 text-red-800 rounded-md shadow-sm
                    dark:bg-red-900/30 dark:border-red-800 dark:text-red-100 ${className}`}
      >
        <div className="flex items-start p-3">
          <AlertCircle className="h-4 w-4 mt-0.5 mr-2 shrink-0" />
          <div className="flex-1">
            <div className="font-medium text-xs">
              {isApiKeyExpired ? "API Key Expired" : "API Key Required"}
            </div>
            <p className="text-xs mt-1">
              Add an API key to generate SQL from your diagram
            </p>
            <div className="flex gap-2 mt-1.5">
              {onGlobalSettings && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={onGlobalSettings}
                  className="h-6 px-2 text-xs bg-red-50 border-red-300 hover:bg-red-100 
                            dark:bg-red-900/30 dark:border-red-800 dark:hover:bg-red-900/60"
                >
                  Global Key
                </Button>
              )}
              {onProjectSettings && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={onProjectSettings}
                  className="h-6 px-2 text-xs bg-red-50 border-red-300 hover:bg-red-100
                            dark:bg-red-900/30 dark:border-red-800 dark:hover:bg-red-900/60"
                >
                  Project Key
                </Button>
              )}
              {onDismiss && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={onDismiss}
                  className="h-6 w-6 p-0 ml-auto"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Standard mode with separate buttons for global and project-specific settings
  return (
    <Alert variant="error" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>
        {isApiKeyExpired ? "API Key Expired" : "API Key Required"}
      </AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>
          No Gemini API key found. You need to set either a global API
          key in settings or a project-specific API key in project
          settings.
        </p>
        <div className="flex gap-2 mt-2">
          {onGlobalSettings && (
            <Button
              variant="outline"
              size="sm"
              className="self-start bg-red-50 border-red-300 hover:bg-red-100 dark:bg-red-900/30 dark:border-red-800 dark:hover:bg-red-900/60 dark:text-red-100"
              onClick={onGlobalSettings}
            >
              Add Global API Key
            </Button>
          )}
          {onProjectSettings && (
            <Button
              variant="outline"
              size="sm"
              className="self-start bg-red-50 border-red-300 hover:bg-red-100 dark:bg-red-900/30 dark:border-red-800 dark:hover:bg-red-900/60 dark:text-red-100"
              onClick={onProjectSettings}
            >
              Add Project API Key
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ApiKeyAlert;
