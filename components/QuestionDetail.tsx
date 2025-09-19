"use client"

import { Eye, EyeOff, ChevronLeft, ChevronRight, RotateCcw, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { Question } from "@/types/quiz"

interface QuestionDetailProps {
  question: Question
  showAnswer: boolean
  onToggleAnswer: () => void
  currentIndex: number
  totalQuestions: number
  onPrevious?: () => void
  onNext?: () => void
  onReset?: () => void
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
    case "Medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
    case "Hard":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
  }
}

export const QuestionDetail = ({
  question,
  showAnswer,
  onToggleAnswer,
  currentIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onReset,
}: QuestionDetailProps) => {
  const progress = ((currentIndex + 1) / totalQuestions) * 100

  return (
    <div className="space-y-6 h-full flex flex-col">
      <Card className="p-4 bg-card border-border">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-medium text-card-foreground">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
            </div>
            <Badge variant="outline" className="text-xs">
              {Math.round(progress)}% Complete
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </Card>

      <Card className="p-8 flex-1 bg-card border-border">
        <div className="space-y-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="secondary" className="bg-secondary/10 text-secondary">
              {question.topic}
            </Badge>
            <Badge className={getDifficultyColor(question.difficultyLevel)}>{question.difficultyLevel}</Badge>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold leading-relaxed text-balance text-card-foreground mb-8">
              {question.question}
            </h2>

            {showAnswer && (
              <Card className="p-6 bg-muted/30 border-primary/20 animate-fade-in">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <h3 className="font-semibold text-lg text-card-foreground">Answer</h3>
                  </div>
                  <p className="text-pretty leading-relaxed text-card-foreground">{question.answer}</p>
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-4 pt-6 border-t border-border">
            <Button
              onClick={onToggleAnswer}
              className="w-full h-12 text-base font-medium"
              variant={showAnswer ? "outline" : "default"}
            >
              {showAnswer ? (
                <>
                  <EyeOff className="w-5 h-5 mr-2" />
                  Hide Answer
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5 mr-2" />
                  Reveal Answer
                </>
              )}
            </Button>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={currentIndex === 0}
                className={cn("flex-1 h-11", currentIndex === 0 && "opacity-50 cursor-not-allowed")}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button
                variant="outline"
                onClick={onReset}
                className="px-4 h-11 bg-transparent"
                title="Reset answer visibility"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                onClick={onNext}
                disabled={currentIndex === totalQuestions - 1}
                className={cn("flex-1 h-11", currentIndex === totalQuestions - 1 && "opacity-50 cursor-not-allowed")}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
