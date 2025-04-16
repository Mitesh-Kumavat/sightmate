"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera } from "lucide-react"
import { motion } from "framer-motion"

export default function ScenePage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<string | null>(null)

    const handleAnalyze = () => {
        setIsAnalyzing(true)
        setResult(null)

        // Simulate AI processing
        setTimeout(() => {
            setIsAnalyzing(false)
            setResult(
                "You are in what appears to be a living room. There's a brown sofa against the wall with two decorative pillows. To the left is a wooden coffee table with a vase of flowers. A bookshelf stands in the corner with approximately 30 books. The room has large windows letting in natural light, and there's a potted plant next to the window.",
            )
        }, 2000)
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Scene Description</h1>
            <p className="text-lg text-muted-foreground mb-8">
                Capture your surroundings and get an AI-powered description in real-time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Camera View</CardTitle>
                        <CardDescription>Aim your camera at your surroundings</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <div className="w-full aspect-video bg-muted relative rounded-md overflow-hidden flex items-center justify-center mb-4">
                            <Camera className="h-16 w-16 text-muted-foreground/50" />
                        </div>
                        <Button size="lg" className="w-full text-base" onClick={handleAnalyze} disabled={isAnalyzing}>
                            {isAnalyzing ? "Analyzing..." : "Analyze Scene"}
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Description</CardTitle>
                        <CardDescription>AI-powered scene analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="w-full rounded-md border p-4 min-h-[240px] flex items-center justify-center"
                            aria-live="polite"
                        >
                            {isAnalyzing ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                                    <div className="h-8 w-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4" />
                                    <p className="text-center text-muted-foreground">Analyzing your surroundings...</p>
                                </motion.div>
                            ) : result ? (
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-base leading-relaxed">
                                    {result}
                                </motion.p>
                            ) : (
                                <p className="text-center text-muted-foreground">Scene description will appear here after analysis</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
