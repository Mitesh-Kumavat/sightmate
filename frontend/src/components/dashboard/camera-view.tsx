"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import { BACKEND_URL, BASE_BACKEND } from "@/constants"
import { toast } from "sonner"

interface CameraProps {
    isAnalyzing: boolean
    setIsAnalyzing: (value: boolean) => void
    setResult: (value: string | null) => void
    transcriptOptionsArray: string[]
    endpoint: string
}

declare global {
    interface Window {
        webkitSpeechRecognition: any
        SpeechRecognition: any
    }
}


export default function CameraView({ isAnalyzing, setIsAnalyzing, setResult, transcriptOptionsArray, endpoint }: CameraProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [facingMode, setFacingMode] = useState<"user" | "environment">("environment")
    const recognitionRef = useRef<any>(null)
    const [_audio, setAudio] = useState<HTMLAudioElement | null>(null)



    useEffect(() => {
        startCamera()
        setupSpeechRecognition()

        return () => {
            if (recognitionRef.current) recognitionRef.current.stop()
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

    const setupSpeechRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (!SpeechRecognition) return

        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.lang = "en-US"
        recognition.onresult = (event: any) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase()
            if (transcriptOptionsArray.some(opt => transcript.includes(opt))) {
                handleAnalyze()
            }
        }
        recognition.onerror = console.error
        recognition.start()
        recognitionRef.current = recognition
    }

    const switchCamera = () => setFacingMode(prev => (prev === "user" ? "environment" : "user"))

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
            formData.append("image", blob, "capture.jpg")

            try {
                const res = await axios.post(`${BACKEND_URL}${endpoint}`, formData);

                if (res.status !== 200) {
                    setResult(res.data.message || "Failed to analyze the image.")
                    toast.error(res.data.message || "Failed to analyze the image.")
                    return
                }
                const { description, audio_path, status, message } = res.data

                if (status !== "success" || !description || !audio_path) {
                    toast.error(message || "Failed to analyze the image.")
                    setResult(message || "Failed to analyze the image.")
                    return
                }

                setResult(description)

                const audioFile = new Audio(audio_path.startsWith("/") ? `${BASE_BACKEND}${audio_path}` : audio_path)
                setAudio(audioFile)
                audioFile.play()
            } catch (err: any) {
                toast.error(err.response.data.description || "Failed to analyze the image.")
                setResult(err.response.data.description || "Failed to analyze the image. Please try again later.")
            } finally {
                setIsAnalyzing(false)
            }
        }, "image/jpeg")
    }

    return (
        <Card className="h-full w-full">
            <CardHeader>
                <CardTitle>Camera View</CardTitle>
                <CardDescription>Aim your camera and capture</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 px-0 sm:px-4">
                {/* Responsive video container */}
                <div className="w-full aspect-[9/16] sm:aspect-video max-h-[80vh] relative bg-black overflow-hidden">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <canvas ref={canvasRef} width={640} height={480} className="hidden" />
                </div>

                {/* Buttons layout */}
                <div className="flex flex-col sm:flex-row gap-3 w-full px-4 sm:px-0">
                    <Button
                        size="lg"
                        className="w-full sm:w-1/2"
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                    >
                        {isAnalyzing ? "Analyzing..." : "Analyze Scene"}
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-1/2"
                        onClick={switchCamera}
                    >
                        Switch Camera
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
