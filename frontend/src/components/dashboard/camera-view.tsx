"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import { setupSpeechRecognition, startCamera } from "@/utils/camera.helpers"
import { handleAnalyzeImage } from "@/utils/camera.service"

interface CameraProps {
    isAnalyzing: boolean
    setIsAnalyzing: (value: boolean) => void
    setResult: (value: string | null) => void
    transcriptOptionsArray: string[]
    endpoint: string
}

export default function CameraView({
    isAnalyzing,
    setIsAnalyzing,
    setResult,
    transcriptOptionsArray,
    endpoint
}: CameraProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const recognitionRef = useRef<any>(null)
    const [facingMode, setFacingMode] = useState<"user" | "environment">("environment")

    useEffect(() => {
        if (!videoRef.current || !canvasRef.current) return

        if (videoRef.current) {
            startCamera(videoRef as React.RefObject<HTMLVideoElement>, facingMode)
        }
        recognitionRef.current = setupSpeechRecognition(transcriptOptionsArray, () =>
            handleAnalyzeImage({
                videoRef: videoRef as React.RefObject<HTMLVideoElement>,
                canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
                setIsAnalyzing,
                setResult,
                endpoint
            })
        )
        return () => recognitionRef.current?.stop()
    }, [facingMode])

    const switchCamera = () =>
        setFacingMode((prev) => (prev === "user" ? "environment" : "user"))

    return (
        <Card className="h-full w-full">
            <CardHeader>
                <CardTitle>Camera View</CardTitle>
                <CardDescription>Aim your camera and capture</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 px-0 sm:px-4">
                <div className="w-full aspect-square sm:aspect-video max-h-[80vh] relative bg-black overflow-hidden">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <canvas ref={canvasRef} width={640} height={480} className="hidden" />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full px-4 sm:px-0">
                    <Button
                        size="lg"
                        className="w-full sm:w-1/2"
                        onClick={() =>
                            handleAnalyzeImage({ 
                                videoRef: videoRef as React.RefObject<HTMLVideoElement>, 
                                canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>, 
                                setIsAnalyzing, 
                                setResult, 
                                endpoint 
                            })
                        }
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
