"use client"

import { useState } from "react"
import { BookOpen, Target } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/FileUpload"
import { QuestionList } from "@/components/QuestionList"
import { QuestionDetail } from "@/components/QuestionDetail"
import { CollapsibleSidebar } from "@/components/CollapsibleSidebar"
import type { Question, QuizState } from "@/types/quiz"

const Index = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    selectedQuestion: null,
    showAnswer: false,
  })

  const handleQuestionsLoaded = (newQuestions: Question[]) => {
    setQuizState((prev) => ({
      ...prev,
      questions: [...prev.questions, ...newQuestions],
    }))
  }

  const handleClearUploaded = () => {
    setQuizState((prev) => ({
      ...prev,
      questions: [],
      selectedQuestion: null,
    }))
  }

  const handleQuestionSelect = (question: Question) => {
    setQuizState((prev) => ({
      ...prev,
      selectedQuestion: question,
      showAnswer: false,
    }))
  }

  const handleToggleAnswer = () => {
    setQuizState((prev) => ({
      ...prev,
      showAnswer: !prev.showAnswer,
    }))
  }

  const currentQuestionIndex = quizState.selectedQuestion
    ? quizState.questions.findIndex((q) => q.id === quizState.selectedQuestion?.id)
    : -1

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevQuestion = quizState.questions[currentQuestionIndex - 1]
      handleQuestionSelect(prevQuestion)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < quizState.questions.length - 1) {
      const nextQuestion = quizState.questions[currentQuestionIndex + 1]
      handleQuestionSelect(nextQuestion)
    }
  }

  const handleReset = () => {
    setQuizState((prev) => ({
      ...prev,
      showAnswer: false,
    }))
  }

  const handleQuestionSelectByIndex = (index: number) => {
    if (index >= 0 && index < quizState.questions.length) {
      handleQuestionSelect(quizState.questions[index])
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <CollapsibleSidebar
        questionCount={quizState.questions.length}
        selectedQuestionIndex={currentQuestionIndex}
        onQuestionSelect={handleQuestionSelectByIndex}
      >
        <div className="w-full space-y-4 mt-4">
          <FileUpload onQuestionsLoaded={handleQuestionsLoaded} onClear={handleClearUploaded} />

          <Card className="p-4 bg-muted/30 border-border">
            <h4 className="font-semibold mb-2 text-card-foreground">Excel Format:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                • <strong>Question:</strong> The quiz question
              </li>
              <li>
                • <strong>Answer:</strong> The complete answer
              </li>
              <li>
                • <strong>Topic:</strong> Product management topic
              </li>
              <li>
                • <strong>Difficulty Level:</strong> Easy, Medium, or Hard
              </li>
            </ul>
          </Card>
        </div>

        <QuestionList
          questions={quizState.questions}
          selectedQuestion={quizState.selectedQuestion}
          onQuestionSelect={handleQuestionSelect}
        />
      </CollapsibleSidebar>

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-primary" />
              <Target className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Product Tank Bengaluru
                <span className="text-primary ml-2">Quiz Time!</span>
              </h1>
              <p className="text-muted-foreground mt-1 italic font-medium">Think, Answer, Learn and have Fun!!</p>
            </div>
          </div>
        </div>

        {/* ProductTank header image back to center position */}
        <div className="text-center mb-8">
          
        </div>

        {/* Question Detail Area */}
        <div className="h-[calc(100vh-200px)]">
          {quizState.selectedQuestion ? (
            <QuestionDetail
              question={quizState.selectedQuestion}
              showAnswer={quizState.showAnswer}
              onToggleAnswer={handleToggleAnswer}
              currentIndex={currentQuestionIndex}
              totalQuestions={quizState.questions.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onReset={handleReset}
            />
          ) : (
            <Card className="p-12 text-center h-full flex items-center justify-center bg-card border-border">
              <div className="space-y-6 max-w-md">
                <Target className="w-20 h-20 text-muted-foreground mx-auto" />
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold text-card-foreground">Ready to Start?</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {quizState.questions.length === 0
                      ? "Upload an Excel file to begin your quiz journey."
                      : "Select a question from the sidebar to view it in detail and test your knowledge."}
                  </p>
                </div>
                {quizState.questions.length > 0 && (
                  <Button
                    onClick={() => handleQuestionSelect(quizState.questions[0])}
                    className="mt-6 px-8 py-3 text-base"
                  >
                    Start with First Question
                  </Button>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default Index
