"use client"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import axios from "axios"
import { BACKEND_URL, BASE_BACKEND } from "@/constants"

declare global {
    interface Window {
        webkitSpeechRecognition: any
        SpeechRecognition: any
    }
}

export default function ScenePage() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<string | null>(null)
    const [_audio, setAudio] = useState<HTMLAudioElement | null>(null)
    const [facingMode, setFacingMode] = useState<"user" | "environment">("environment")
    const recognitionRef = useRef<any>(null)
    const transcriptOptionsArray = ["capture", "analyze", "take a picture", "analyze road", "analyze scene", "analyze surroundings", "analyze environment", "what is around me", "what is in front of me", "where am i"]

    useEffect(() => {
        startCamera()

        if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            const recognition = new SpeechRecognition()
            recognition.continuous = true
            recognition.lang = "en-US"
            recognition.interimResults = false
            recognition.onresult = (event: any) => {
                const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase()
                if (transcriptOptionsArray.some(transcriptOption => transcript.includes(transcriptOption))) {
                    handleAnalyze()
                }
            }
            recognition.onerror = (err: any) => {
                console.error("Speech recognition error:", err)
            }
            recognition.start()
            recognitionRef.current = recognition
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop()
            }
        }
    }, [facingMode])

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { exact: facingMode } }
            })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
        } catch (err) {
            console.error("Error accessing camera:", err)
        }
    }

    const switchCamera = () => {
        setFacingMode(prev => (prev === "user" ? "environment" : "user"))
    }

    const handleAnalyze = async () => {
        if (!videoRef.current || !canvasRef.current) return

        setIsAnalyzing(true)
        setResult(null)

        const context = canvasRef.current.getContext("2d")
        if (!context) return

        const video = videoRef.current
        context.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height)

        canvasRef.current.toBlob(async (blob) => {
            if (!blob) return

            const formData = new FormData()
            formData.append("image", blob, "capture.jpg")

            try {
                const res = await axios.post(`${BACKEND_URL}/analyze`, formData)
                const { description, audio_path } = res.data

                setResult(description)

                const audioFile = new Audio(audio_path.startsWith("/") ? `${BASE_BACKEND}${audio_path}` : audio_path)
                setAudio(audioFile)
                audioFile.play()
            } catch (error) {
                console.error("Error analyzing image:", error)
                setResult("Failed to analyze the image.")
            } finally {
                setIsAnalyzing(false)
            }
        }, "image/jpeg")
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Scene Description</h1>
            <p className="text-lg text-muted-foreground mb-4">
                Capture your surroundings and get an AI-powered description in real-time.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
                Say <strong>"capture"</strong> to analyze via voice — or use the button.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Camera View</CardTitle>
                        <CardDescription>Aim your camera and capture surroundings</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <div className="w-full aspect-video bg-muted relative rounded-md overflow-hidden mb-4">
                            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-md" />
                            <canvas ref={canvasRef} width={640} height={480} className="hidden" />
                        </div>
                        <div className="flex gap-2 w-full">
                            <Button size="lg" className="w-full text-base" onClick={handleAnalyze} disabled={isAnalyzing}>
                                {isAnalyzing ? "Analyzing..." : "Analyze Scene"}
                            </Button>
                            <Button variant="outline" size="lg" onClick={switchCamera}>
                                Switch Camera
                            </Button>
                        </div>
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

