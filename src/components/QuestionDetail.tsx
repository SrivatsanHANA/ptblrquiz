import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Question } from '@/types/quiz';

interface QuestionDetailProps {
  question: Question;
  showAnswer: boolean;
  onToggleAnswer: () => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }
};

export const QuestionDetail = ({ question, showAnswer, onToggleAnswer }: QuestionDetailProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-quiz-lg">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary">
                {question.topic}
              </Badge>
              <Badge className={getDifficultyColor(question.difficultyLevel)}>
                {question.difficultyLevel}
              </Badge>
            </div>
            <h2 className="text-xl font-semibold text-foreground leading-relaxed">
              {question.question}
            </h2>
          </div>
        </div>

        <div className="mt-6">
          <Button
            onClick={onToggleAnswer}
            className="mb-4 transition-all duration-300 hover:scale-105"
            variant={showAnswer ? "secondary" : "default"}
          >
            {showAnswer ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Answer
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Show Answer
              </>
            )}
          </Button>

          {showAnswer && (
            <Card className="p-4 bg-secondary/10 border-secondary/20 transition-all duration-500 animate-in slide-in-from-top-2">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-secondary mt-2"></div>
                <div className="flex-1">
                  <h3 className="font-medium text-secondary mb-2">Answer:</h3>
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {question.answer}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
};
