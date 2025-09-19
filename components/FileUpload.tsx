"use client"

import type React from "react"

import { useCallback } from "react"
import { Upload, FileSpreadsheet, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import * as XLSX from "xlsx"
import type { Question, ExcelRow } from "@/types/quiz"

interface FileUploadProps {
  onQuestionsLoaded: (questions: Question[]) => void
  onClear: () => void
}

export const FileUpload = ({ onQuestionsLoaded, onClear }: FileUploadProps) => {
  const { toast } = useToast()

  const parseExcelFile = useCallback(
    (file: File) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer)
          const workbook = XLSX.read(data, { type: "array" })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const jsonData: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet)

          const questions: Question[] = jsonData
            .map((row, index) => ({
              id: `excel-${index + 1}`,
              question: row.Question || "",
              answer: row.Answer || "",
              topic: row.Topic || "",
              difficultyLevel: (row["Difficulty Level"] as "Easy" | "Medium" | "Hard") || "Medium",
            }))
            .filter((q) => q.question && q.answer)

          if (questions.length === 0) {
            toast({
              title: "No valid questions found",
              description: "Please check your Excel file format",
              variant: "destructive",
            })
            return
          }

          onQuestionsLoaded(questions)
          toast({
            title: "Success!",
            description: `Loaded ${questions.length} questions from Excel file`,
          })
        } catch (error) {
          toast({
            title: "Error parsing file",
            description: "Please make sure the file is a valid Excel file with the correct format",
            variant: "destructive",
          })
        }
      }
      reader.readAsArrayBuffer(file)
    },
    [onQuestionsLoaded, toast],
  )

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      parseExcelFile(file)
    }
  }

  return (
    <Card className="p-6 border-2 border-dashed border-border hover:border-primary/50 transition-colors">
      <div className="text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <FileSpreadsheet className="w-6 h-6 text-primary" />
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Upload Excel File</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop or click to select an Excel file (.xlsx, .xls)
          </p>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Browse Files
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              onClear()
            }}
            className="w-full text-destructive border-destructive/20 hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Uploaded
          </Button>
        </div>
      </div>
    </Card>
  )
}
