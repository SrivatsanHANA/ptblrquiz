"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { Question } from "@/types/quiz"

interface QuestionListProps {
  questions: Question[]
  selectedQuestion: Question | null
  onQuestionSelect: (question: Question) => void
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

export const QuestionList = ({ questions, selectedQuestion, onQuestionSelect }: QuestionListProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All")

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.topic.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === "All" || question.difficultyLevel === difficultyFilter
    return matchesSearch && matchesDifficulty
  })

  if (questions.length === 0) {
    return (
      <Card className="p-8 text-center bg-card">
        <p className="text-muted-foreground">
          No questions available. Upload an Excel file
        </p>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg text-card-foreground">
              Questions ({filteredQuestions.length}/{questions.length})
            </h3>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {selectedQuestion
                ? `${questions.findIndex((q) => q.id === selectedQuestion.id) + 1}/${questions.length}`
                : "None selected"}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-card-foreground hover:bg-muted"
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </Button>
        </div>

        {!isCollapsed && (
          <div className="mt-4 space-y-3 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search questions or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input"
              />
            </div>

            <div className="flex gap-2">
              {["All", "Easy", "Medium", "Hard"].map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={difficultyFilter === difficulty ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDifficultyFilter(difficulty)}
                  className={cn(
                    "text-xs",
                    difficultyFilter === difficulty
                      ? "bg-primary text-primary-foreground"
                      : "text-card-foreground hover:bg-muted",
                  )}
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <div className="p-4">
          <div className="space-y-3 max-h-96 overflow-y-auto animate-fade-in">
            {filteredQuestions.map((question, index) => (
              <Card
                key={question.id}
                className={cn(
                  "p-4 cursor-pointer transition-all duration-200 hover:shadow-md border",
                  selectedQuestion?.id === question.id
                    ? "ring-2 ring-primary bg-primary/5 border-primary/20 shadow-sm"
                    : "hover:bg-muted/50 border-border",
                )}
                onClick={() => onQuestionSelect(question)}
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                      {questions.findIndex((q) => q.id === question.id) + 1}
                    </div>
                    <p className="text-sm font-medium line-clamp-2 text-card-foreground flex-1">{question.question}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs bg-secondary/10 text-secondary">
                        {question.topic}
                      </Badge>
                      <Badge className={`text-xs ${getDifficultyColor(question.difficultyLevel)}`}>
                        {question.difficultyLevel}
                      </Badge>
                    </div>

                    {selectedQuestion?.id === question.id && (
                      <Badge variant="default" className="text-xs bg-primary text-primary-foreground">
                        Selected
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
