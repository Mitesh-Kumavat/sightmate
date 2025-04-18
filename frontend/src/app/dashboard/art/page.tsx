"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PaintbrushIcon as PaintBrush, RepeatIcon } from "lucide-react"
import { motion } from "framer-motion"
import axios from "axios"
import { BACKEND_URL, BASE_BACKEND } from "@/constants"

declare global {
    interface Window {
        webkitSpeechRecognition: any
        SpeechRecognition: any
    }
}

export default function ArtPage() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<string | null>(null)
    const [facingMode, setFacingMode] = useState<"user" | "environment">("environment")
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
    const cooldownRef = useRef(false)
    const transcriptOptionsArray = [
        "capture",
        "analyze",
        "describe",
        "art",
        "artistic",
        "description",
        "what is",
        "where am i",
        "surroundings",
        "environment",
        "vision"
    ]

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode },
            })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
        } catch (error) {
            console.error("Camera error:", error)
        }
    }

    useEffect(() => {
        startCamera()
    }, [facingMode])


    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (!SpeechRecognition) return

        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.lang = "en-US"

        const startRecognition = () => {
            try {
                recognition.start()
            } catch (err) {
                console.error("Speech recognition error:", err)
            }
        }

        recognition.onend = () => {
            startRecognition()
        }

        recognition.onresult = (event: any) => {
            if (isAnalyzing || cooldownRef.current) return

            const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase()
            const shouldAnalyze = transcriptOptionsArray.some(option => transcript.includes(option))

            if (shouldAnalyze) {
                cooldownRef.current = true
                handleAnalyze().finally(() => {
                    setTimeout(() => {
                        cooldownRef.current = false
                    }, 3000)
                })
            }
        }

        startRecognition()

        return () => recognition.stop()
    }, [isAnalyzing])

    const handleAnalyze = async () => {
        if (!videoRef.current || !canvasRef.current) return

        setIsAnalyzing(true)
        setResult(null)

        const ctx = canvasRef.current.getContext("2d")
        if (!ctx) return

        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

        canvasRef.current.toBlob(async (blob) => {
            if (!blob) return

            const formData = new FormData()
            formData.append("image", blob, "photo.jpg")

            try {
                const res = await axios.post(`${BACKEND_URL}/art`, formData)
                const { description, audio_path } = res.data

                setResult(description)

                const audioFile = new Audio(audio_path.startsWith("/") ? `${BASE_BACKEND}${audio_path}` : audio_path)
                setAudio(audioFile)
                audioFile.play()

            } catch (error) {
                console.error("Art API Error:", error)
                setResult("Failed to generate artistic description.")
            } finally {
                setIsAnalyzing(false)
            }
        }, "image/jpeg")
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Artistic Description</h1>
            <p className="text-lg text-muted-foreground mb-8">
                Experience your surroundings through rich, creative descriptions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Camera View</CardTitle>
                        <CardDescription>Capture your surroundings for artistic description</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <div className="w-full aspect-video bg-muted relative rounded-md overflow-hidden mb-4">
                            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-md" />
                            <canvas ref={canvasRef} width={640} height={480} className="hidden" />
                        </div>


                        <div className="flex w-full gap-2">
                            <Button size="lg" className="w-full text-base" onClick={handleAnalyze} disabled={isAnalyzing}>
                                {isAnalyzing ? "Creating..." : "Create Artistic Description"}
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setFacingMode(facingMode === "user" ? "environment" : "user")}
                                title="Switch Camera"
                            >
                                <RepeatIcon className="w-5 h-5" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Artistic Description</CardTitle>
                        <CardDescription>Creative interpretation of your surroundings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="w-full rounded-md border p-4 min-h-[240px] flex items-center justify-center"
                            aria-live="polite"
                        >
                            {isAnalyzing ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                                    <div className="h-8 w-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4" />
                                    <p className="text-center text-muted-foreground">Creating artistic description...</p>
                                </motion.div>
                            ) : result ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <PaintBrush className="h-5 w-5 text-primary" />
                                        <p className="font-medium">Artistic Vision</p>
                                    </div>
                                    <p className="text-base leading-relaxed">{result}</p>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col items-center text-center text-muted-foreground">
                                    <PaintBrush className="h-10 w-10 mb-2" />
                                    <p>Artistic description will appear here</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
