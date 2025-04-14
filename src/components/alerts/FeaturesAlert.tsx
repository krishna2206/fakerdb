import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface FeaturesAlertProps {
  onSignInClick: () => void;
}

const FeaturesAlert: React.FC<FeaturesAlertProps> = ({ onSignInClick }) => {
  return (
    <>
      <Alert variant="default" className="border-primary/30 bg-primary/5">
        <AlertDescription>
          <div className="flex-row justify-center content-center">
            <Info className="w-4 h-4 mr-2 inline" />
            You're using the single table mode.
            <Link
              to=""
              onClick={onSignInClick}
              className="font-medium underline ml-1"
            >
              Sign up
            </Link>{" "}
            to save your tables and create multi-table projects.
          </div>
        </AlertDescription>
      </Alert>
    </>
  );
};

export default FeaturesAlert;
