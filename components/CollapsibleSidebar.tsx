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
        <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="p-8 text-center border-b border-slate-200/50">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome to ProductTank Quiz</h1>
            <p className="text-slate-600 text-lg">
              Upload your Excel file to get started with interactive quiz questions
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="relative group">
              {/* Background glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-lg blur-lg opacity-30 group-hover:opacity-60 animate-pulse transition-all duration-700"></div>

              {/* Main banner image with enhanced animations */}
              <img
                src="/images/producttank-banner-enhanced.png"
                alt="ProductTank Bengaluru - Mind the Product Mission Statement"
                className="relative max-w-full max-h-full object-contain rounded-lg shadow-2xl 
                           cursor-pointer transform-gpu
                           hover:scale-110 hover:rotate-1 hover:-translate-y-2
                           hover:shadow-3xl hover:shadow-blue-500/30
                           transition-all duration-700 ease-out
                           animate-bounce-gentle group-hover:animate-none
                           group-hover:brightness-110"
                style={{
                  animation:
                    "floatDynamic 4s ease-in-out infinite, fadeInBounce 1.2s ease-out, shimmer 8s ease-in-out infinite",
                  filter: "drop-shadow(0 10px 20px rgba(59, 130, 246, 0.3))",
                }}
                onClick={() => {
                  // Add click animation
                  const img = document.querySelector('img[alt*="ProductTank"]') as HTMLElement
                  if (img) {
                    img.style.animation = "clickBounce 0.6s ease-out"
                    setTimeout(() => {
                      img.style.animation = "floatDynamic 4s ease-in-out infinite, shimmer 8s ease-in-out infinite"
                    }, 600)
                  }
                }}
              />

              {/* Floating particles effect */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-ping"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + (i % 3) * 30}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${2 + i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatDynamic {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(0.5deg); }
          50% { transform: translateY(-12px) rotate(0deg); }
          75% { transform: translateY(-6px) rotate(-0.5deg); }
        }
        
        @keyframes fadeInBounce {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          60% { opacity: 1; transform: scale(1.05) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0px); }
        }
        
        @keyframes shimmer {
          0%, 100% { filter: brightness(1) drop-shadow(0 10px 20px rgba(59, 130, 246, 0.3)); }
          50% { filter: brightness(1.1) drop-shadow(0 15px 30px rgba(59, 130, 246, 0.5)); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes clickBounce {
          0% { transform: scale(1); }
          25% { transform: scale(0.95) rotate(-1deg); }
          50% { transform: scale(1.1) rotate(1deg); }
          75% { transform: scale(0.98) rotate(-0.5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
