"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface Props {
    result: string | null
    isAnalyzing: boolean
}

export default function DescriptionResult({ result, isAnalyzing }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Description</CardTitle>
                <CardDescription>AI-powered analysis</CardDescription>
            </CardHeader>
            <CardContent>
                <div
                    className="w-full rounded-md border p-4 min-h-[240px] flex items-center justify-center"
                    aria-live="polite"
                >
                    {isAnalyzing ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                            <div className="h-8 w-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4" />
                            <p className="text-center text-muted-foreground">Analyzing...</p>
                        </motion.div>
                    ) : result ? (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-base leading-relaxed">
                            {result}
                        </motion.p>
                    ) : (
                        <p className="text-center text-muted-foreground">Description will appear here after analysis</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
