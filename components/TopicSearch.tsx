"use client"

import { useState } from "react"
import { Search, Sparkles, Loader2, Trash2, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import type { Question } from "@/types/quiz"

interface TopicSearchProps {
  onQuestionsGenerated: (questions: Question[]) => void
  onClear: () => void
}

export const TopicSearch = ({ onQuestionsGenerated, onClear }: TopicSearchProps) => {
  const [topic, setTopic] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const generateQuestions = async () => {
    if (!topic.trim()) {
      toast({
        title: "Please enter a topic",
        description: "Enter a product management topic to generate questions",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: topic.trim() }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate questions")
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      onQuestionsGenerated(data.questions)
      toast({
        title: "Questions generated!",
        description: `Created ${data.questions.length} questions about ${topic} using web search`,
      })
      setTopic("")
    } catch (error) {
      console.error("Generation error:", error)
      toast({
        title: "Generation failed",
        description: "Failed to generate questions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Sparkles className="w-5 h-5 text-primary" />
            <Globe className="w-4 h-4 text-secondary" />
          </div>
          <h3 className="font-semibold text-lg">AI-Powered Question Generator</h3>
        </div>

        <p className="text-sm text-muted-foreground">
          Enter a product management topic and we'll search the web for relevant questions and generate a comprehensive
          quiz for you
        </p>

        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="e.g., Product Strategy, User Research, Analytics..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && generateQuestions()}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={generateQuestions} disabled={isLoading || !topic.trim()} className="flex-1">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Searching & Generating...
                </>
              ) : (
                <>
                  <Globe className="w-4 h-4 mr-2" />
                  Generate from Web
                </>
              )}
            </Button>

            <Button variant="outline" onClick={onClear} className="text-destructive bg-transparent">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded-md">
          <div className="flex items-center gap-1 mb-1">
            <Globe className="w-3 h-3" />
            <span className="font-medium">Sources:</span>
          </div>
          <span>Medium, Product Management Exercises, Glassdoor, and other PM resources</span>
        </div>
      </div>
    </Card>
  )
}
