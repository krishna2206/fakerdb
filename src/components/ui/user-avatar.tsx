import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Folders, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface UserData {
  name?: string;
  email?: string;
  picture?: string;
}

export interface UserAvatarProps {
  user: UserData;
  onSettingsClick?: () => void;
  onLogout?: () => void;
  showSettings?: boolean;
  isHomeRoute?: boolean;
  align?: "start" | "center" | "end";
}

export function UserAvatar({ 
  user, 
  onSettingsClick, 
  onLogout, 
  showSettings = true,
  isHomeRoute,
  align = "end" 
}: UserAvatarProps) {
  const navigate = useNavigate();

  // Get initials for avatar fallback
  const getInitials = (): string => {
    if (!user?.name) return "?";

    return user.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={user.picture}
              alt={user.name || "User"}
            />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align={align}
        forceMount
      >
        <div className="flex flex-col space-y-1 p-2">
          <p className="mb-2 text-sm font-medium leading-none">
            {user.name}
          </p>
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
        {showSettings && (!isHomeRoute || isHomeRoute === undefined) && onSettingsClick && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={onSettingsClick}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}