import { format, formatDistanceToNow } from "date-fns";
import {
  FileSpreadsheet,
  LogIn,
  Network,
  Settings,
  Sparkle,
  Trash2,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useProjectDatasets } from "@/hooks/useProjectDatasets";
import { cn } from "@/lib/utils";
import { deleteDataset } from "@/services/datasetService";
import { Dataset } from "@/types/types";
import { UserProfileMenu } from "../ui/user-profile-menu";

interface SidebarItemProps {
  expanded: boolean;
  icon: React.ReactNode;
  label: string;
  secondaryLabel?: string;
  onClick?: () => void;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  tooltipContent?: string;
  isActive: boolean;
}

function SidebarItem({
  expanded,
  icon,
  label,
  secondaryLabel,
  onClick,
  badge,
  badgeVariant = "secondary",
  tooltipContent,
  isActive,
}: SidebarItemProps) {
  const content = (
    <FadeIn
      duration={300}
      direction={expanded ? "right" : "none"}
      distance={10}
    >
      <div
        className={cn(
          "flex items-center gap-3 rounded-md text-sm transition-colors relative",
          expanded
            ? "px-2 justify-start py-2.5"
            : "px-0 justify-center w-full py-2",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isActive ? "bg-accent text-accent-foreground" : "",
          onClick ? "cursor-pointer" : "",
          expanded ? "h-10" : ""
        )}
        onClick={onClick}
      >
        <div
          className={cn(
            "flex items-center justify-center",
            expanded ? "flex-shrink-0 w-5 h-5" : "w-10 h-5"
          )}
        >
          {icon}
        </div>

        {expanded && (
          <div className="flex-1 overflow-hidden">
            <div className="truncate">{label}</div>
            {secondaryLabel && (
              <div className="text-xs text-muted-foreground truncate">
                {secondaryLabel}
              </div>
            )}
          </div>
        )}

        {badge && expanded && (
          <Badge variant={badgeVariant} className="ml-auto">
            {badge}
          </Badge>
        )}

        {badge && !expanded && (
          <Badge
            variant={badgeVariant}
            className="absolute -top-1 -right-1 h-4 min-w-4 text-[10px]"
          >
            {badge}
          </Badge>
        )}
      </div>
    </FadeIn>
  );

  return tooltipContent && !expanded ? (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <div>{content}</div>
      </TooltipTrigger>
      <TooltipContent side="right" className="text-xs">
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  ) : (
    content
  );
}

interface DatasetItemProps {
  expanded: boolean;
  dataset: Dataset;
  onClick?: () => void;
  tooltipContent?: string;
  isActive: boolean;
  activeDatasetId?: string;
  onDelete: (id: string, e: React.MouseEvent) => void;
}

function DatasetItem({
  expanded,
  dataset,
  onClick,
  tooltipContent,
  isActive,
  activeDatasetId,
  onDelete,
}: DatasetItemProps) {
  const [showDelete, setShowDelete] = React.useState(false);
  
  // Format the timestamp for display using updated instead of created
  const formattedTime = formatDistanceToNow(new Date(dataset.updated || dataset.created), { addSuffix: true });
  
  // Format the dataset name based on creation date and table count
  const datasetName = `Dataset ${format(new Date(dataset.created), "MMM d")}`;
  
  // Check if this specific dataset is active
  const isActiveDataset = isActive && (activeDatasetId ? activeDatasetId === dataset.id : false);

  const content = (
    <FadeIn
      duration={300}
      direction={expanded ? "up" : "none"}
      distance={8}
      className="w-full"
    >
      <div
        className={cn(
          "flex items-center rounded-md my-2 py-1.5 text-sm font-medium transition-colors relative",
          expanded ? "px-2 gap-3 justify-start" : "px-0 justify-center w-full",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isActiveDataset ? "bg-accent text-accent-foreground" : "",
          onClick ? "cursor-pointer" : ""
        )}
        onClick={onClick}
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
      >
        <div
          className={cn(
            "flex items-center justify-center",
            expanded ? "flex-shrink-0 w-5 h-5" : "w-10 h-5"
          )}
        >
          <FileSpreadsheet className="text-muted-foreground" />
        </div>

        {expanded && (
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-1">
              <span className="truncate">{datasetName}</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                · {formattedTime}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {dataset.tableCount} tables, {dataset.rowCount} rows
            </div>
          </div>
        )}

        {expanded && showDelete && (
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 rounded-full opacity-70 hover:opacity-100 ml-auto"
            onClick={(e) => onDelete(dataset.id, e)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        )}
      </div>
    </FadeIn>
  );

  return tooltipContent && !expanded ? (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <div>{content}</div>
      </TooltipTrigger>
      <TooltipContent side="right" className="text-xs">
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  ) : (
    content
  );
}

interface DatasetPopoverProps {
  datasets: Dataset[];
  onDatasetClick: (dataset: Dataset) => void;
  onDatasetDelete: (id: string, e: React.MouseEvent) => void;
  isActive: boolean;
}

function DatasetPopover({
  datasets,
  onDatasetClick,
  onDatasetDelete,
  isActive,
}: DatasetPopoverProps) {
  const [open, setOpen] = useState(false);

  // Get only the last 6 datasets to display
  const displayedDatasets = [...datasets].slice(0, 6);
  const hasMoreDatasets = datasets.length > 6;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          onMouseLeave={() => setOpen(false)}
          className="w-full"
        >
          <FadeIn duration={400} direction="up" distance={5} className="w-full">
            <div
              className={cn(
                "flex items-center justify-center rounded-md py-1.5 text-sm font-medium transition-colors relative w-full",
                "hover:bg-accent hover:text-accent-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive ? "bg-accent text-accent-foreground" : ""
              )}
            >
              <div className="w-10 h-5 flex items-center justify-center">
                <FileSpreadsheet className="text-muted-foreground" />
              </div>

              {datasets.length > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute -top-0.5 -right-0.5 h-3.5 min-w-3.5 text-[9px] flex items-center justify-center px-1"
                >
                  {datasets.length}
                </Badge>
              )}
            </div>
          </FadeIn>
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        className="w-60 p-2"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <FadeIn duration={300} direction="right" distance={10}>
          <div className="space-y-1">
            <div className="text-xs font-semibold text-muted-foreground px-2 pb-2">
              Generated Datasets{" "}
              {hasMoreDatasets &&
                `(Showing ${displayedDatasets.length} of ${datasets.length})`}
            </div>

            {datasets.length === 0 ? (
              <div className="text-xs text-muted-foreground italic px-2">
                No datasets generated yet
              </div>
            ) : (
              <FadeIn staggerChildren staggerDelay={50} duration={250}>
                {displayedDatasets.map((dataset) => {
                  const datasetName = `Dataset ${format(new Date(dataset.created), "MMM d")}`;
                  const formattedTime = formatDistanceToNow(new Date(dataset.updated || dataset.created), { addSuffix: true });
                  
                  return (
                    <div
                      key={dataset.id}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors relative",
                        "hover:bg-accent hover:text-accent-foreground",
                        "cursor-pointer"
                      )}
                      onClick={() => onDatasetClick(dataset)}
                    >
                      <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center gap-1">
                          <span className="truncate">{datasetName}</span>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            · {formattedTime}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {dataset.tableCount} tables, {dataset.rowCount} rows
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 rounded-full opacity-70 hover:opacity-100"
                        onClick={(e) => onDatasetDelete(dataset.id, e)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  );
                })}
              </FadeIn>
            )}

            {hasMoreDatasets && (
              <FadeIn delay={150} duration={300} direction="up" distance={5}>
                <div className="text-xs text-muted-foreground px-2 pt-1 border-t border-border mt-1">
                  <span className="italic">
                    + {datasets.length - 6} more datasets
                  </span>
                </div>
              </FadeIn>
            )}
          </div>
        </FadeIn>
      </PopoverContent>
    </Popover>
  );
}

interface ProjectSidebarProps {
  expanded: boolean;
  currentView: "diagram" | "data" | "design";
  onToggle: () => void;
  onViewChange: (view: "diagram" | "data" | "design", datasetId?: string) => void;
  onOpenProjectSettings: () => void;
  projectId?: string;
  refreshKey?: number;
  onLogout?: () => void;
  onOpenUserSettings?: () => void;
  onSignIn?: () => void;
  activeDatasetId?: string;
  onDatasetDeleted?: (datasetId: string) => void;
}

export function ProjectSidebar({
  expanded,
  currentView,
  onToggle,
  onViewChange,
  onOpenProjectSettings,
  projectId,
  refreshKey,
  onLogout,
  onOpenUserSettings,
  onSignIn,
  activeDatasetId,
  onDatasetDeleted,
}: ProjectSidebarProps) {
  const { user, isAuthenticated } = useAuth();
  const isUnauthenticated = !isAuthenticated;
  const { toast } = useToast();

  const { datasets, isLoading } = useProjectDatasets(
    projectId,
    isAuthenticated,
    refreshKey
  );

  // Function to handle dataset deletion with refresh
  const handleDeleteDataset = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      await deleteDataset(id);
      
      // Use the callback from parent component to handle deletion effects
      if (onDatasetDeleted) {
        onDatasetDeleted(id);
      } else {
        if (activeDatasetId === id) {
          onViewChange('diagram');
        }
      }
      
      toast({
        title: "Dataset deleted",
        description: "The dataset has been successfully deleted.",
      });
    } catch (error) {
      console.error(`Error deleting dataset ${id}:`, error);
      toast({
        title: "Delete failed",
        description: "There was a problem deleting the dataset.",
        variant: "destructive",
      });
    }
  };

  // Use a ref to track component mounted state
  const isMounted = useRef(true);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleDatasetClick = (dataset: Dataset) => {
    onViewChange("data", dataset.id);
  };

  return (
    <div
      className={cn(
        "h-full border-r border-border bg-card transition-all duration-300 ease-in-out",
        expanded ? "w-56" : "w-14"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center justify-between px-3">
          <Link
            to="/"
            className={cn(
              "flex items-center gap-2",
              expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            )}
          >
            <img src="/logo.svg" alt="FakerDB Logo" className="w-7 h-7" />
            <h1 className="text-lg font-bold text-primary truncate">FakerDB</h1>
          </Link>

          <SidebarToggle
            expanded={expanded}
            onClick={onToggle}
            iconSize={22}
            className="text-primary-foreground"
          />
        </div>

        <div className="flex-1 overflow-auto p-2 flex flex-col">
          {/* Design and View Section */}
          <div className={cn("space-y-2")}>
            <div
              className={cn(
                "text-xs font-semibold text-muted-foreground mb-2 transition-opacity",
                expanded
                  ? "px-2 opacity-100"
                  : "px-0 opacity-0 h-0 overflow-hidden"
              )}
            >
              Design
            </div>

            {/* Design with AI View button */}
            <SidebarItem
              expanded={expanded}
              icon={<Sparkle className="text-muted-foreground" />}
              label="Design with AI"
              onClick={() => onViewChange("design")}
              tooltipContent="Generate schema with AI"
              isActive={currentView === "design"}
            />

            {/* Diagram View button */}
            <SidebarItem
              expanded={expanded}
              icon={<Network className="text-muted-foreground" />}
              label="Diagram View"
              onClick={() => onViewChange("diagram")}
              tooltipContent="View database diagram"
              isActive={currentView === "diagram"}
            />
          </div>

          {/* Only show datasets section for authenticated users */}
          {!isUnauthenticated && (
            <>
              <Separator className={cn("my-2", !expanded && "my-1")} />

              <FadeIn
                delay={300}
                duration={500}
                direction="up"
                distance={15}
                className={cn("space-y-2 flex-1", expanded ? "mt-2" : "mt-1")}
              >
                {expanded && (
                  <FadeIn
                    delay={100}
                    duration={400}
                    direction="right"
                    distance={10}
                  >
                    <div className="text-xs font-semibold text-muted-foreground px-2 mb-2">
                      <span>Generated Datasets</span>
                      {isLoading && <span className="ml-2 italic text-muted-foreground">Loading...</span>}
                    </div>
                  </FadeIn>
                )}

                <div className="space-y-1">
                  {expanded ? (
                    datasets.length === 0 ? (
                      <FadeIn delay={200} duration={400} direction="up">
                        <div className="text-xs text-muted-foreground italic px-2">
                          {isLoading ? "Loading datasets..." : "No datasets generated yet"}
                        </div>
                      </FadeIn>
                    ) : (
                      <FadeIn staggerChildren staggerDelay={80} duration={350}>
                        {datasets.map((dataset) => (
                          <DatasetItem
                            key={dataset.id}
                            expanded={expanded}
                            dataset={dataset}
                            onClick={() => handleDatasetClick(dataset)}
                            tooltipContent={`${dataset.tableCount} tables, ${dataset.rowCount} rows`}
                            isActive={currentView === "data"}
                            activeDatasetId={activeDatasetId}
                            onDelete={handleDeleteDataset}
                          />
                        ))}
                      </FadeIn>
                    )
                  ) : (
                    <DatasetPopover
                      datasets={datasets}
                      onDatasetClick={handleDatasetClick}
                      onDatasetDelete={handleDeleteDataset}
                      isActive={currentView === "data"}
                    />
                  )}
                </div>
              </FadeIn>
            </>
          )}
        </div>

        <div className="mt-auto p-2">
          <Separator className={cn("my-2", !expanded && "my-1")} />

          <SidebarItem
            expanded={expanded}
            icon={<Settings className="text-muted-foreground" />}
            label={isUnauthenticated ? "Settings" : "Project Settings"}
            onClick={
              isUnauthenticated ? onOpenUserSettings : onOpenProjectSettings
            }
            tooltipContent={
              isUnauthenticated ? "Open settings" : "Open project settings"
            }
            isActive={false}
          />

          {isUnauthenticated && onSignIn && (
            <div className="mt-3">
              <Button
                variant="default"
                size={expanded ? "default" : "icon"}
                onClick={onSignIn}
                className={cn("w-full", !expanded && "h-10")}
              >
                <LogIn className={cn("h-4 w-4", expanded && "mr-2")} />
                {expanded && <span>Sign In</span>}
              </Button>
            </div>
          )}

          {user && !isUnauthenticated && (
            <div className="mt-3">
              <UserProfileMenu
                user={user}
                expanded={expanded}
                onSettingsClick={onOpenUserSettings}
                onLogout={onLogout}
                align={expanded ? "start" : "end"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
