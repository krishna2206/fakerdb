import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, Moon, Settings, Sun, UserPlus } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FadeIn } from "../ui/fade-in";

interface NavbarProps {
  onSignInClick: () => void;
  onSettingsClick: () => void;
  onSignUpClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onSignInClick,
  onSettingsClick,
  onSignUpClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const isHomeRoute = location.pathname === "/";

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    logout(() => navigate("/"));
  };

  // Handle navigation to different routes
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="FakerDB Logo" className="w-8 h-8" />
            <h1 className="text-xl font-bold text-primary">FakerDB</h1>
          </Link>

          <FadeIn duration={400}>
            <div className="flex items-center space-x-2">
              {isHomeRoute && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="GitHub repository"
                    onClick={() =>
                      window.open(
                        "https://github.com/krishna2206/fakerdb",
                        "_blank"
                      )
                    }
                  >
                    <svg
                      fill="currentColor"
                      viewBox="3 3 18 18"
                    >
                      <title>GitHub</title>
                      <path d="M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z"></path>
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Toggle theme"
                    className="mr-2"
                    onClick={toggleTheme}
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </Button>
                </>
              )}

              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-20 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              ) : isAuthenticated && user ? (
                <div className="flex items-center gap-3">
                  <UserAvatar
                    user={user}
                    onLogout={handleLogout}
                    onSettingsClick={onSettingsClick}
                    isHomeRoute={isHomeRoute}
                  />
                </div>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={onSignInClick}
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={onSignUpClick}
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Button>
                  {!isHomeRoute && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={onSettingsClick}
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Button>
                  )}
                </>
              )}
            </div>
          </FadeIn>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
