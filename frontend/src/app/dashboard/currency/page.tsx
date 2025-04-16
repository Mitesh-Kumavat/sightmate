"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, DollarSign } from "lucide-react"
import { motion } from "framer-motion"

export default function CurrencyPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<string | null>(null)

    const handleAnalyze = () => {
        setIsAnalyzing(true)
        setResult(null)

        // Simulate AI processing
        setTimeout(() => {
            setIsAnalyzing(false)
            setResult(
                "This appears to be an Indian 500 Rupee note. It has a purple color scheme. The front side features a portrait of Mahatma Gandhi in the center. The note also contains a security thread, watermark, and denomination written in 15 languages on the reverse. This is legal tender for all debts, public and private.",
            )
        }, 2000)
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Currency Recognizer</h1>
            <p className="text-lg text-muted-foreground mb-8">Identify and describe Indian currency notes instantly.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Camera View</CardTitle>
                        <CardDescription>Position the currency note in frame</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <div className="w-full aspect-video bg-muted relative rounded-md overflow-hidden flex items-center justify-center mb-4">
                            <Camera className="h-16 w-16 text-muted-foreground/50" />
                        </div>
                        <Button size="lg" className="w-full text-base" onClick={handleAnalyze} disabled={isAnalyzing}>
                            {isAnalyzing ? "Identifying..." : "Identify Currency"}
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Currency Details</CardTitle>
                        <CardDescription>Information about the identified currency</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="w-full rounded-md border p-4 min-h-[240px] flex items-center justify-center"
                            aria-live="polite"
                        >
                            {isAnalyzing ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                                    <div className="h-8 w-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4" />
                                    <p className="text-center text-muted-foreground">Identifying currency...</p>
                                </motion.div>
                            ) : result ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <DollarSign className="h-6 w-6 text-primary" />
                                        <p className="font-medium text-lg">Currency Identified</p>
                                    </div>
                                    <p className="text-base leading-relaxed">{result}</p>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col items-center text-center text-muted-foreground">
                                    <DollarSign className="h-10 w-10 mb-2" />
                                    <p>Currency details will appear here after analysis</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
