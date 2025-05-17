import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { useState } from "react";

interface SidebarToggleProps {
  expanded: boolean;
  onClick: () => void;
  iconSize?: number;
  hoverEffect?: boolean;
  className?: string;
}

/**
 * Custom sidebar toggle button with enhanced icon sizing and hover effects
 * 
 * Features:
 * - Adjustable icon size (defaults to 18px)
 * - Color transition on hover for improved feedback
 * - Smooth transitions between expanded/collapsed states
 * - Accessible with proper aria-label
 * - Adapts width based on sidebar state
 * 
 * @example
 * <SidebarToggle 
 *   expanded={sidebarExpanded}
 *   onClick={toggleSidebar}
 *   iconSize={20}
 *   hoverEffect={true}
 *   className="custom-class"
 * />
 */
export function SidebarToggle({
  expanded,
  onClick,
  iconSize = 18,
  hoverEffect = true,
  className,
}: SidebarToggleProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "flex items-center justify-center rounded-md transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        expanded ? "h-8 w-8" : "h-8 w-10",
        hoverEffect ? "hover:bg-accent hover:text-accent-foreground" : "",
        className
      )}
      aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
    >
      <FadeIn key={expanded ? "open" : "close"} duration={200}>
        {expanded ? (
          <PanelRightOpen 
            className={cn(
              "transition-colors duration-200",
              isHovering ? "text-foreground" : "text-muted-foreground"
            )}
            style={{ 
              width: iconSize, 
              height: iconSize 
            }}
          />
        ) : (
          <PanelRightClose 
            className={cn(
              "transition-colors duration-200",
              isHovering ? "text-foreground" : "text-muted-foreground"
            )}
            style={{ 
              width: iconSize, 
              height: iconSize 
            }}
          />
        )}
      </FadeIn>
    </button>
  );
}
