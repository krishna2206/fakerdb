import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { HelpCircle, KeyRound, Link } from 'lucide-react';
import React from 'react';

interface KeyBadgeProps {
  className?: string;
}

export const PrimaryKeyBadge: React.FC<KeyBadgeProps> = ({ className }) => {
  return (
    <div className={cn(
      "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary",
      className
    )}>
      <KeyRound className="h-3 w-3 mr-1" />
      Primary key
    </div>
  );
};

export const CompoundPrimaryKeyBadge: React.FC<KeyBadgeProps & { keyCount?: number }> = ({ 
  className, 
  keyCount 
}) => {
  return (
    <div className={cn(
      "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary",
      className
    )}>
      <KeyRound className="h-3 w-3 mr-1" />
      Part of compound primary key
      {keyCount && keyCount > 0 && (
        <span className="ml-1">({keyCount} fields)</span>
      )}
    </div>
  );
};

interface ForeignKeyBadgeProps extends KeyBadgeProps {
  tooltipContent?: React.ReactNode;
}

export const ForeignKeyBadge: React.FC<ForeignKeyBadgeProps> = ({ 
  className, 
  tooltipContent 
}) => {
  return (
    <div className={cn(
      "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-400/10 text-blue-500",
      className
    )}>
      <Link className="h-3 w-3 mr-1" />
      Foreign key
      
      {tooltipContent && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-3.5 w-3.5 ml-1 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="w-80">
              {tooltipContent}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export const ReferencedKeyBadge: React.FC<ForeignKeyBadgeProps> = ({ 
  className, 
  tooltipContent 
}) => {
  return (
    <div className={cn(
      "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-400/10 text-blue-500",
      className
    )}>
      <Link className="h-3 w-3 mr-1" />
      Referenced by other table
      
      {tooltipContent && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-3.5 w-3.5 ml-1 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="w-80">
              {tooltipContent}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
