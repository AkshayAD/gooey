import React from "react";
import { ClaudeStatusIndicator } from "@/components/ClaudeStatusIndicator";
import { cn } from "@/lib/utils";

interface TopbarProps {
  /**
   * Callback when CLAUDE.md is clicked
   */
  onClaudeClick: () => void;
  /**
   * Callback when Settings is clicked
   */
  onSettingsClick: () => void;
  /**
   * Callback when Usage Dashboard is clicked
   */
  onUsageClick: () => void;
  /**
   * Callback when MCP is clicked
   */
  onMCPClick: () => void;
  /**
   * Callback when Info is clicked
   */
  onInfoClick: () => void;
  /**
   * Callback when Agents is clicked
   */
  onAgentsClick?: () => void;
  /**
   * Optional className for styling
   */
  className?: string;
}

/**
 * Topbar component with status indicator and navigation buttons
 * 
 * @example
 * <Topbar
 *   onClaudeClick={() => setView('editor')}
 *   onSettingsClick={() => setView('settings')}
 *   onUsageClick={() => setView('usage-dashboard')}
 *   onMCPClick={() => setView('mcp')}
 * />
 */
export const Topbar: React.FC<TopbarProps> = ({
  onSettingsClick,
  className,
}) => {
  const handleConfigureClick = () => {
    // Emit an event that can be caught by the parent to show the Claude binary dialog
    window.dispatchEvent(new CustomEvent('claude-not-found'));
  };
  
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      {/* Claude Status Indicator */}
      <ClaudeStatusIndicator 
        onConfigureClick={handleConfigureClick}
      />
      
      {/* Spacer - Navigation moved to titlebar */}
      <div></div>
    </div>
  );
}; 