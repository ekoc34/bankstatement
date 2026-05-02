"use client"

import { useState, useCallback } from "react"
import { Upload, FileText, Copy, Download, Check, X, FileSpreadsheet, Lock, Zap, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

export function PDFConverter() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [extractedText, setExtractedText] = useState("")
  const [copied, setCopied] = useState(false)
  const [copiedCsv, setCopiedCsv] = useState(false)
  
  const { 
    isProUser, 
    conversionCount, 
    incrementConversion, 
    setShowUpgradeModal,
    FREE_LIMIT,
    PRO_PRICE 
  } = useAuth()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile)
      setExtractedText("")
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile)
      setExtractedText("")
    }
  }, [])

  // Convert text to CSV format - each line becomes a row
  const convertToCSV = useCallback((text: string): string => {
    const lines = text.split('\n').filter(line => line.trim())
    return lines.map(line => {
      // Escape quotes and wrap in quotes for CSV
      const escaped = line.replace(/"/g, '""')
      return `"${escaped}"`
    }).join('\n')
  }, [])

  const handleConvert = useCallback(async () => {
    if (!file) return
    
    console.log("[v0] Convert button clicked for file:", file.name)
    
    setIsConverting(true)
    
    // Simulate PDF text extraction
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate mock extracted data based on file name
    // In production, this would use a real PDF parsing library like pdf-parse
    const mockTransactions = `Date | Description | Debit | Credit | Balance
01/05/2026 | Opening Balance | | | $5,432.10
02/05/2026 | SALARY DEPOSIT - ACME CORP | | $3,500.00 | $8,932.10
03/05/2026 | GROCERY STORE #1234 | $156.78 | | $8,775.32
04/05/2026 | ELECTRIC BILL PAYMENT | $89.50 | | $8,685.82
05/05/2026 | RESTAURANT DOWNTOWN | $45.20 | | $8,640.62
06/05/2026 | ATM WITHDRAWAL | $200.00 | | $8,440.62
07/05/2026 | ONLINE TRANSFER - SAVINGS | $500.00 | | $7,940.62
08/05/2026 | GAS STATION | $67.45 | | $7,873.17
09/05/2026 | SUBSCRIPTION SERVICE | $14.99 | | $7,858.18
10/05/2026 | COFFEE SHOP | $8.50 | | $7,849.68

--- End of extracted transactions ---

File: ${file.name}
Extracted: ${new Date().toLocaleString()}

Note: This is a demonstration of the extraction format. 
Your actual bank statement data would appear here.`
    
    setExtractedText(mockTransactions)
    setIsConverting(false)
    
    // Increment conversion count for non-Pro users
    incrementConversion()
    
    console.log("[v0] Conversion complete")
  }, [file, incrementConversion])

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(extractedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [extractedText])

  const handleCopyCSV = useCallback(async () => {
    const csvText = convertToCSV(extractedText)
    await navigator.clipboard.writeText(csvText)
    setCopiedCsv(true)
    setTimeout(() => setCopiedCsv(false), 2000)
  }, [extractedText, convertToCSV])

  const handleDownloadTXT = useCallback(() => {
    const blob = new Blob([extractedText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${file?.name.replace(".pdf", "")}-text.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [extractedText, file])

  const handleDownloadCSV = useCallback(() => {
    const csvText = convertToCSV(extractedText)
    const blob = new Blob([csvText], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${file?.name.replace(".pdf", "")}-data.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [extractedText, file, convertToCSV])

  const handleRemoveFile = useCallback(() => {
    setFile(null)
    setExtractedText("")
  }, [])

  const handleDownloadSampleCSV = useCallback(() => {
    const sampleText = `Date | Description | Debit | Credit | Balance
01/05/2026 | Opening Balance | | | $5,432.10
02/05/2026 | Salary Deposit | | $3,500.00 | $8,932.10
03/05/2026 | Grocery Store | $156.78 | | $8,775.32
04/05/2026 | Electric Bill | $89.50 | | $8,685.82
05/05/2026 | Restaurant | $45.20 | | $8,640.62`
    const csvText = convertToCSV(sampleText)
    const blob = new Blob([csvText], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sample-bank-statement.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [convertToCSV])

  const handleUpgradeClick = useCallback(() => {
    console.log("[v0] PDF Converter: Upgrade button clicked")
    setShowUpgradeModal(true)
  }, [setShowUpgradeModal])

  const remainingFree = FREE_LIMIT - conversionCount

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Upload Area */}
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer",
            isDragging 
              ? "border-primary bg-primary/5 scale-[1.02]" 
              : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50",
            file && "border-primary/30 bg-primary/5"
          )}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Upload PDF file"
          />
          
          {file ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
                <FileText className="w-7 h-7 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveFile()
                }}
                className="ml-2"
                aria-label="Remove file"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-muted">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-foreground mb-1">
                Drop your bank statement here
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse from your device
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {isProUser ? (
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Pro Active - Unlimited
                  </span>
                ) : (
                  `${remainingFree > 0 ? remainingFree : 0} free conversion${remainingFree !== 1 ? 's' : ''} left`
                )}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownloadSampleCSV}
                className="mt-3 text-xs"
              >
                <Download className="w-3 h-3 mr-1" />
                Download Sample CSV
              </Button>
            </>
          )}
        </div>
      </Card>

      {/* Convert Button */}
      {file && !extractedText && (
        <Button
          onClick={handleConvert}
          disabled={isConverting}
          className="w-full h-12 text-base font-medium rounded-xl shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
          size="lg"
        >
          {isConverting ? (
            <>
              <Spinner className="mr-2" />
              Extracting Transactions...
            </>
          ) : (
            "Extract Transactions"
          )}
        </Button>
      )}

      {/* Output Panel */}
      {extractedText && (
        <Card className="border-0 shadow-lg overflow-hidden bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <span className="font-medium text-foreground">Preview</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Text
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyCSV}
                className="gap-2"
              >
                {copiedCsv ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <FileSpreadsheet className="w-4 h-4" />
                    Copy CSV
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadTXT}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                .txt
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadCSV}
                className="gap-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Excel CSV
              </Button>
            </div>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto relative">
            <div className="mb-4 pb-4 border-b border-border/50">
              <p className="text-sm font-medium text-green-600 flex items-center gap-2">
                <Check className="w-4 h-4" />
                Ready for Excel
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Results may vary depending on bank format. This is a preview.
              </p>
            </div>
            
            {/* Free limit blur overlay */}
            {!isProUser && conversionCount >= FREE_LIMIT && (
              <div className="absolute inset-0 top-24 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-10">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2 text-center">
                  Free limit reached
                </h4>
                <p className="text-sm text-muted-foreground text-center mb-4 max-w-xs">
                  Upgrade to Pro to view full structured data and download Excel-ready CSV files.
                </p>
                <Button
                  onClick={handleUpgradeClick}
                  className="w-full max-w-xs gap-2"
                  size="lg"
                >
                  <Zap className="w-4 h-4" />
                  Upgrade to Pro
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  {PRO_PRICE}/month - Cancel anytime
                </p>
              </div>
            )}
            
            <pre className={cn(
              "whitespace-pre-wrap text-sm text-muted-foreground font-mono leading-relaxed",
              !isProUser && conversionCount >= FREE_LIMIT && "blur-sm select-none"
            )}>
              {extractedText}
            </pre>
          </div>
          <div className="px-6 py-4 border-t border-border/50 bg-muted/30">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
                className="flex-1"
              >
                <Upload className="w-4 h-4 mr-2" />
                Try another file
              </Button>
              {!isProUser && conversionCount >= FREE_LIMIT && (
                <Button
                  onClick={handleUpgradeClick}
                  className="flex-1 gap-2"
                  size="sm"
                >
                  <Zap className="w-4 h-4" />
                  Upgrade to Pro
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Footer Trust Note */}
      <div className="text-center pt-8">
        <p className="text-xs text-muted-foreground">
          Built for freelancers and accountants processing bank statements
        </p>
      </div>
    </div>
  )
}
