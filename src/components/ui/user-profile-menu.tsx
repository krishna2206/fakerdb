import { Folders, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { getUserInitials } from "@/utils/userUtils";

export interface UserProfileData {
  name?: string;
  email?: string;
  picture?: string;
}

export interface UserProfileMenuProps {
  user: UserProfileData;
  expanded?: boolean;
  showSettings?: boolean;
  isHomeRoute?: boolean;
  align?: "start" | "center" | "end";
  onSettingsClick?: () => void;
  onLogout?: () => void;
  className?: string;
}

export function UserProfileMenu({
  user,
  expanded = true,
  showSettings = true,
  isHomeRoute = false,
  align = "end",
  onSettingsClick,
  onLogout,
  className,
}: UserProfileMenuProps) {
  const navigate = useNavigate();

  const renderTrigger = () => {
    if (expanded) {
      return (
        <div
          className={`
            flex items-center gap-3 rounded-md py-1.5 text-sm transition-colors relative
            px-2 justify-start
            hover:bg-accent hover:text-accent-foreground
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer
            ${className || ""}
          `}
        >
          <div className="flex-shrink-0">
            <Avatar className="h-7 w-7">
              <AvatarImage src={user.picture} alt={user.name || "User"} />
              <AvatarFallback className="text-xs">
                {getUserInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="truncate">{user.name || "Profile"}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={`
            flex items-center justify-center rounded-md py-1.5 text-sm font-medium transition-colors relative w-full
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer
            ${className || ""}
          `}
        >
          <Avatar className="h-7 w-7">
            <AvatarImage src={user.picture} alt={user.name || "User"} />
            <AvatarFallback className="text-xs">
              {getUserInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      );
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{renderTrigger()}</DropdownMenuTrigger>
        <DropdownMenuContent align={align} className="w-56">
          <div className="flex flex-col space-y-1 p-2">
            <p className="mb-2 text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate("/projects")}
          >
            <Folders className="mr-2 h-4 w-4" />
            My Projects
          </DropdownMenuItem>
          {showSettings &&
            (!isHomeRoute || isHomeRoute === undefined) &&
            onSettingsClick && (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={onSettingsClick}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            )}
          <DropdownMenuSeparator />
          {onLogout && (
            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:text-red-600"
              onClick={onLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {!expanded && (
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <div className="hidden">Tooltip trigger</div>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">
            {user.name || "Profile"}
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );
}
