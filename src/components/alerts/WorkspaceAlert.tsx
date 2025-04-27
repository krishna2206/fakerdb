import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { InfoIcon } from "lucide-react";
import React from "react";

interface WorkspaceAlertProps {
  onSignIn?: () => void;
}

const WorkspaceAlert: React.FC<WorkspaceAlertProps> = ({ onSignIn }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-blue-50 border border-blue-200 text-blue-800 rounded-md shadow-sm
                dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-100 max-w-xs"
    >
      <div className="flex items-start p-3">
        <InfoIcon className="h-4 w-4 mt-0.5 mr-2 shrink-0" />
        <div className="flex-1">
          <div className="font-medium text-xs">Temporary Workspace</div>
          <p className="text-xs mt-1">
            You are currently not signed in. Please sign in to save your work and access it later.
          </p>
          {onSignIn && (
            <div className="flex mt-1.5">
              <Button 
                size="sm" 
                variant="outline"
                onClick={onSignIn}
                className="h-6 px-2 text-xs bg-blue-50 border-blue-300 hover:bg-blue-100 
                         dark:bg-blue-900/30 dark:border-blue-800 dark:hover:bg-blue-900/60"
              >
                Sign In
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WorkspaceAlert;