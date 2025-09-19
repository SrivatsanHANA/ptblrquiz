import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Question } from '@/types/quiz';

interface QuestionListProps {
  questions: Question[];
  selectedQuestion: Question | null;
  onQuestionSelect: (question: Question) => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }
};

export const QuestionList = ({ questions, selectedQuestion, onQuestionSelect }: QuestionListProps) => {
  if (questions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">
          No questions available. Upload an Excel file or generate questions from a topic.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold mb-4">Questions ({questions.length})</h2>
      <div className="h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {questions.map((question) => (
            <Card
              key={question.id}
              className={`p-3 cursor-pointer transition-all duration-300 hover:shadow-quiz ${
                selectedQuestion?.id === question.id
                  ? 'ring-2 ring-primary shadow-quiz-lg bg-quiz-card-hover'
                  : 'hover:bg-quiz-card-hover'
              }`}
              onClick={() => onQuestionSelect(question)}
            >
              <div className="flex flex-col gap-2">
                <p className="font-medium text-xs text-foreground line-clamp-2 mb-2">
                  {question.question}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {question.topic}
                  </Badge>
                  <Badge
                    className={`text-xs ${getDifficultyColor(question.difficultyLevel)}`}
                  >
                    {question.difficultyLevel}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
