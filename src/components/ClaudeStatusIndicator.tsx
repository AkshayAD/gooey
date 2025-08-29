import { useState, useEffect } from "react";
import { api, type ClaudeVersionStatus, type ClaudeAuthStatus } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClaudeStatusIndicatorProps {
  onConfigureClick?: () => void;
  className?: string;
}

export function ClaudeStatusIndicator({ onConfigureClick, className }: ClaudeStatusIndicatorProps) {
  const [status, setStatus] = useState<ClaudeVersionStatus | null>(null);
  const [authStatus, setAuthStatus] = useState<ClaudeAuthStatus | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const checkClaudeStatus = async () => {
    setIsChecking(true);
    try {
      // Check both version and authentication status
      const [versionResult, authResult] = await Promise.all([
        api.checkClaudeVersion(),
        api.checkClaudeAuthStatus()
      ]);
      
      setStatus(versionResult);
      setAuthStatus(authResult);
      setLastCheck(new Date());
    } catch (error) {
      console.error("Failed to check Claude status:", error);
      setStatus({
        is_installed: false,
        version: null,
        output: "Failed to check Claude status"
      });
      setAuthStatus({
        is_authenticated: false,
        auth_details: "Failed to check authentication status"
      });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkClaudeStatus();
    
    // Check every 5 minutes
    const interval = setInterval(checkClaudeStatus, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    if (isChecking) {
      return <RefreshCw className="h-4 w-4 animate-spin text-yellow-500" />;
    }
    
    if (!status || !authStatus) {
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
    
    if (status.is_installed && authStatus.is_authenticated) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    
    if (status.is_installed && !authStatus.is_authenticated) {
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
    
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getStatusText = () => {
    if (isChecking) {
      return "Checking Claude Code status...";
    }
    
    if (!status || !authStatus) {
      return "Unknown Claude Code status";
    }
    
    if (!status.is_installed) {
      return "Claude Code not found";
    }
    
    if (status.is_installed && !authStatus.is_authenticated) {
      return "Claude Code needs authentication";
    }
    
    if (status.is_installed && authStatus.is_authenticated) {
      return `Claude Code is ready${status.version ? ` (v${status.version})` : ''}`;
    }
    
    return "Claude Code status unknown";
  };

  const getStatusColor = () => {
    if (isChecking) return "text-yellow-500";
    if (!status || !authStatus) return "text-yellow-500";
    if (!status.is_installed) return "text-red-500";
    if (status.is_installed && !authStatus.is_authenticated) return "text-yellow-500";
    if (status.is_installed && authStatus.is_authenticated) return "text-green-500";
    return "text-yellow-500";
  };

  const getDisplayText = () => {
    if (isChecking) return "Checking...";
    if (!status || !authStatus) return "Unknown";
    if (!status.is_installed) return "Not Found";
    if (status.is_installed && !authStatus.is_authenticated) return "Auth Required";
    if (status.is_installed && authStatus.is_authenticated) return "Ready";
    return "Unknown";
  };

  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-2", className)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer" onClick={checkClaudeStatus}>
              {getStatusIcon()}
              <span className={cn("text-sm font-medium", getStatusColor())}>
                {getDisplayText()}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-sm">
            <div className="space-y-2">
              <p className="font-semibold">{getStatusText()}</p>
              {authStatus?.auth_details && (
                <p className="text-xs text-muted-foreground">{authStatus.auth_details}</p>
              )}
              {status?.output && (
                <p className="text-xs text-muted-foreground">{status.output}</p>
              )}
              {lastCheck && (
                <p className="text-xs text-muted-foreground">
                  Last checked: {lastCheck.toLocaleTimeString()}
                </p>
              )}
              <p className="text-xs text-muted-foreground">Click to refresh</p>
            </div>
          </TooltipContent>
        </Tooltip>
        
        {(!status?.is_installed || (status?.is_installed && !authStatus?.is_authenticated)) && !isChecking && onConfigureClick && (
          <Button
            variant="outline"
            size="sm"
            onClick={onConfigureClick}
            className="h-7 px-2"
          >
            <Settings className="h-3 w-3 mr-1" />
            {!status?.is_installed ? "Configure" : "Authenticate"}
          </Button>
        )}
      </div>
    </TooltipProvider>
  );
}