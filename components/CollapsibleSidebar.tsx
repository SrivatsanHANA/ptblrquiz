"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Upload, Sparkles, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CollapsibleSidebarProps {
  children: React.ReactNode
  questionCount: number
  selectedQuestionIndex: number | null
  onQuestionSelect: (index: number) => void
}

export const CollapsibleSidebar = ({
  children,
  questionCount,
  selectedQuestionIndex,
  onQuestionSelect,
}: CollapsibleSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <div
        className={cn(
          "bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col",
          isCollapsed ? "w-16" : "w-80",
        )}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-2 animate-fade-in">
                <List className="w-5 h-5 text-sidebar-accent" />
                <h2 className="font-semibold text-sidebar-foreground">Quiz Panel</h2>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-sidebar-foreground hover:bg-sidebar-primary"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-hidden">
          {!isCollapsed ? (
            <div className="p-4 space-y-4 animate-slide-in">{children}</div>
          ) : (
            <div className="p-2 space-y-2">
              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center text-sidebar-foreground hover:bg-sidebar-primary"
                  title="Upload Questions"
                >
                  <Upload className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center text-sidebar-foreground hover:bg-sidebar-primary"
                  title="Generate Questions"
                >
                  <Sparkles className="w-4 h-4" />
                </Button>
                {questionCount > 0 && (
                  <Badge variant="secondary" className="mx-auto">
                    {questionCount}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {!isCollapsed && questionCount > 0 && (
          <div className="p-4 border-t border-sidebar-border">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-sidebar-foreground">Quick Navigation</h3>
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: Math.min(questionCount, 15) }, (_, i) => (
                  <Button
                    key={i}
                    variant={selectedQuestionIndex === i ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "w-8 h-8 p-0 text-xs",
                      selectedQuestionIndex === i
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-primary",
                    )}
                    onClick={() => onQuestionSelect(i)}
                  >
                    {i + 1}
                  </Button>
                ))}
                {questionCount > 15 && (
                  <div className="w-8 h-8 flex items-center justify-center text-xs text-sidebar-foreground">
                    +{questionCount - 15}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="h-full">{/* Content will be passed as children to the main page */}</div>
      </div>
    </div>
  )
}
