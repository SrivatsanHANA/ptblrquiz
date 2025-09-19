import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileSpreadsheet, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import * as XLSX from 'xlsx';
import { Question, ExcelRow } from '@/types/quiz';

interface FileUploadProps {
  onQuestionsLoaded: (questions: Question[]) => void;
  onClear: () => void;
}

export const FileUpload = ({ onQuestionsLoaded, onClear }: FileUploadProps) => {
  const { toast } = useToast();

  const parseExcelFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet);

        const questions: Question[] = jsonData.map((row, index) => ({
          id: `excel-${index + 1}`,
          question: row.Question || '',
          answer: row.Answer || '',
          topic: row.Topic || '',
          difficultyLevel: (row['Difficulty Level'] as 'Easy' | 'Medium' | 'Hard') || 'Medium'
        })).filter(q => q.question && q.answer);

        if (questions.length === 0) {
          toast({
            title: "No valid questions found",
            description: "Please check your Excel file format",
            variant: "destructive",
          });
          return;
        }

        onQuestionsLoaded(questions);
        toast({
          title: "Success!",
          description: `Loaded ${questions.length} questions from Excel file`,
        });
      } catch (error) {
        toast({
          title: "Error parsing file",
          description: "Please make sure the file is a valid Excel file with the correct format",
          variant: "destructive",
        });
      }
    };
    reader.readAsArrayBuffer(file);
  }, [onQuestionsLoaded, toast]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      parseExcelFile(file);
    }
  }, [parseExcelFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: false,
  });

  return (
    <Card className="p-8 border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors duration-300">
      <div
        {...getRootProps()}
        className={`cursor-pointer text-center transition-colors duration-300 ${
          isDragActive ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <div className={`p-4 rounded-full transition-colors duration-300 ${
            isDragActive ? 'bg-primary/10' : 'bg-muted/30'
          }`}>
            {isDragActive ? (
              <Upload className="h-8 w-8 text-primary" />
            ) : (
              <FileSpreadsheet className="h-8 w-8" />
            )}
          </div>
          <div>
            <p className="text-lg font-medium mb-2">
              {isDragActive ? 'Drop your Excel file here' : 'Upload Excel File'}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop or click to select an Excel file (.xlsx, .xls)
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm">
                Browse Files
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                className="text-destructive border-destructive/20 hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Uploaded
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};