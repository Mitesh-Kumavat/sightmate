"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Upload } from "lucide-react"
import { motion } from "framer-motion"

export default function DocumentPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [fileName, setFileName] = useState<string | null>(null)
    const [result, setResult] = useState<string | null>(null)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        const files = e.dataTransfer.files
        if (files.length > 0) {
            setFileName(files[0].name)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            setFileName(files[0].name)
        }
    }

    const handleAnalyze = () => {
        if (!fileName) return

        setIsAnalyzing(true)
        setResult(null)

        // Simulate AI processing
        setTimeout(() => {
            setIsAnalyzing(false)
            setResult(
                "This document appears to be an invoice from Acme Corporation dated April 13, 2025. The total amount due is $1,250.00 for services rendered between March 15 and April 10. Payment is due within 30 days. The document includes an itemized list of services: Consulting (10 hours at $100/hour), Software Development (5 hours at $150/hour), and Technical Support (flat fee of $250).",
            )
        }, 2000)
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Document Reader</h1>
            <p className="text-lg text-muted-foreground mb-8">Upload documents to extract and read text content.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Upload Document</CardTitle>
                        <CardDescription>Upload an image or PDF document</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <div
                            className={`w-full aspect-video border-2 border-dashed rounded-md flex flex-col items-center justify-center p-6 mb-4 transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                            <p className="text-center text-muted-foreground mb-2">
                                Drag and drop your document here or click to browse
                            </p>
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                accept=".pdf,image/*"
                                onChange={handleFileChange}
                            />
                            <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                                Browse Files
                            </Button>
                            {fileName && <p className="mt-4 text-sm font-medium">Selected: {fileName}</p>}
                        </div>
                        <Button size="lg" className="w-full text-base" onClick={handleAnalyze} disabled={!fileName || isAnalyzing}>
                            {isAnalyzing ? "Analyzing..." : "Analyze Document"}
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Extracted Text</CardTitle>
                        <CardDescription>Content extracted from your document</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="w-full rounded-md border p-4 min-h-[240px] flex items-center justify-center"
                            aria-live="polite"
                        >
                            {isAnalyzing ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                                    <div className="h-8 w-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4" />
                                    <p className="text-center text-muted-foreground">Extracting text from document...</p>
                                </motion.div>
                            ) : result ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <FileText className="h-5 w-5 text-primary" />
                                        <p className="font-medium">Document Content:</p>
                                    </div>
                                    <p className="text-base leading-relaxed">{result}</p>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col items-center text-center text-muted-foreground">
                                    <FileText className="h-10 w-10 mb-2" />
                                    <p>Extracted text will appear here after analysis</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
