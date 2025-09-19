import { useState } from 'react';
import { Search, Sparkles, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Question } from '@/types/quiz';

interface TopicSearchProps {
  onQuestionsGenerated: (questions: Question[]) => void;
  onClear: () => void;
}

export const TopicSearch = ({ onQuestionsGenerated, onClear }: TopicSearchProps) => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateQuestions = async () => {
    if (!topic.trim()) {
      toast({
        title: "Please enter a topic",
        description: "Enter a product management topic to generate questions",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Search for product management questions and best practices
      const searchQuery = `product management ${topic} interview questions best practices frameworks`;
      
      // Simulate web search and AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate contextual questions based on common PM frameworks and the topic
      const questionTemplates = [
        {
          template: `How would you prioritize features for a ${topic} product using a framework like RICE or MoSCoW?`,
          answer: `RICE framework approach`,
          difficulty: 'Medium' as const
        },
        {
          template: `What key metrics and KPIs would you define and track for a ${topic} product?`,
          answer: `North Star Metrics`,
          difficulty: 'Hard' as const
        },
        {
          template: `How would you approach user research and validation for a ${topic} product feature?`,
          answer: `Discovery research methods`,
          difficulty: 'Easy' as const
        },
        {
          template: `How would you handle stakeholder alignment and communication for a ${topic} product initiative?`,
          answer: `Clear communication frameworks`,
          difficulty: 'Medium' as const
        }
      ];

      // Select 3 random templates and generate questions
      const selectedTemplates = questionTemplates
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const generatedQuestions: Question[] = selectedTemplates.map((template, index) => ({
        id: `generated-${Date.now()}-${index}`,
        question: template.template,
        answer: template.answer,
        topic: topic,
        difficultyLevel: template.difficulty
      }));

      onQuestionsGenerated(generatedQuestions);
      toast({
        title: "Questions generated!",
        description: `Created ${generatedQuestions.length} questions about ${topic}`,
      });
      setTopic('');
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-quiz-gradient border-0 shadow-quiz-lg">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2 text-white mb-2">
          <Sparkles className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Auto-Generate Questions</h3>
        </div>
        <p className="text-white/90 text-sm">
          Enter a product management topic and we'll generate relevant quiz questions for you
        </p>
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="e.g., Product Strategy, User Research, Analytics..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateQuestions()}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
            />
          </div>
          <Button
            onClick={generateQuestions}
            disabled={isLoading || !topic.trim()}
            className="bg-white text-primary hover:bg-white/90 transition-all duration-300"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Generate'
            )}
          </Button>
          <Button
            onClick={onClear}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};