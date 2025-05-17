import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useApiKey } from '@/contexts/ApiKeyContext';
import { InfoIcon, Monitor, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Key expiration options in seconds
const EXPIRATION_OPTIONS = [
  { label: "Never", value: "0" },
  { label: "1 hour", value: "3600" },
  { label: "24 hours", value: "86400" },
  { label: "7 days", value: "604800" },
  { label: "30 days", value: "2592000" },
];

// Theme options
const THEME_OPTIONS = [
  { label: "System", value: "system", icon: Monitor },
  { label: "Light", value: "light", icon: SunIcon },
  { label: "Dark", value: "dark", icon: MoonIcon },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [expirationTime, setExpirationTime] = useState("604800"); // Default: 7 days
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const { saveApiKey, refreshApiKey } = useApiKey();

  // Fetch saved settings on component mount
  useEffect(() => {
    if (open) {
      const savedApiKey = localStorage.getItem("gemini_api_key") || "";
      setApiKeyInput(savedApiKey);
      const savedExpiration =
        localStorage.getItem("gemini_api_key_expiration") || "604800";
      setExpirationTime(savedExpiration);
    }
  }, [open]);

  const handleSaveSettings = () => {
    saveApiKey(apiKeyInput.trim(), expirationTime);
    
    refreshApiKey();
    
    onOpenChange(false);

    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your application settings
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Theme Selector */}
          <div className="grid gap-2">
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme || "system"} onValueChange={setTheme}>
              <SelectTrigger id="theme" className="w-full">
                <SelectValue placeholder="Select theme">
                  {theme &&
                    THEME_OPTIONS.find((option) => option.value === theme) && (
                      <div className="flex items-center">
                        {React.createElement(
                          THEME_OPTIONS.find((option) => option.value === theme)
                            ?.icon as React.ElementType,
                          { className: "mr-2 h-4 w-4" }
                        )}
                        <span>
                          {
                            THEME_OPTIONS.find(
                              (option) => option.value === theme
                            )?.label
                          }
                        </span>
                      </div>
                    )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {THEME_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center">
                        <Icon className="mr-2 h-4 w-4" />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground">
              Choose your preferred application theme
            </span>
          </div>

          {/* API Key section */}
          <div className="grid gap-2">
            <Label htmlFor="apiKey">Gemini API Key</Label>
            <Input
              id="apiKey"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="w-full"
              type="password"
            />
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <InfoIcon className="h-3 w-3 mr-1" />
              <span>
                Get your API key from{" "}
                <a
                  href="https://makersuite.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Google AI Studio
                </a>
              </span>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="expiration">API Key Expiration</Label>
            <Select value={expirationTime} onValueChange={setExpirationTime}>
              <SelectTrigger id="expiration">
                <SelectValue placeholder="Select expiration time" />
              </SelectTrigger>
              <SelectContent>
                {EXPIRATION_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground">
              Set how long until the API key is cleared from local storage
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveSettings}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
