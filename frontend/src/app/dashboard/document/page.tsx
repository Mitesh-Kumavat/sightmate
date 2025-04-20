"use client"

import { useState } from "react"
import CameraView from "@/components/dashboard/camera-view"
import DescriptionResult from "@/components/dashboard/description-result"

export default function ScenePage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<string | null>(null)
    const transcriptOptionsArray = [
        "capture", "analyze", "document", "analyse", "take", "click", "image",
        "what", "describe", "explain", "text", "read", "analyze text"]

    return (
        <div className="max-w-5xl mx-auto px-4 md:px-0">
            <h1 className="text-3xl font-bold mb-6">Document Analyzer</h1>
            <p className="text-lg text-muted-foreground mb-2">
                Capture any document and get an AI-powered Document summary in real-time.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
                Say <strong>"capture"</strong> to analyze via voice — or use the button.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CameraView
                    isAnalyzing={isAnalyzing}
                    setIsAnalyzing={setIsAnalyzing}
                    setResult={setResult}
                    transcriptOptionsArray={transcriptOptionsArray}
                    endpoint="/document"
                />
                <DescriptionResult result={result} isAnalyzing={isAnalyzing} />
            </div>
        </div>
    )

}
