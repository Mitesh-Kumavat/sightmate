import axios from "axios"
import { toast } from "sonner"
import { BASE_BACKEND, BACKEND_URL } from "@/constants"
import { speakWithWebSpeech } from "./camera.utils"

interface AnalyzeParams {
    videoRef: React.RefObject<HTMLVideoElement>
    canvasRef: React.RefObject<HTMLCanvasElement>
    setIsAnalyzing: (v: boolean) => void
    setResult: (v: string | null) => void
    endpoint: string
}

interface AnalyzeParams {
    videoRef: React.RefObject<HTMLVideoElement>
    canvasRef: React.RefObject<HTMLCanvasElement>
    setIsAnalyzing: (v: boolean) => void
    setResult: (v: string | null) => void
    endpoint: string
    recognitionRef?: React.MutableRefObject<any>
    setIsAudioPlaying?: (v: boolean) => void
    isAudioPlaying?: boolean
}


export const handleAnalyzeImage = async ({
    videoRef,
    canvasRef,
    setIsAnalyzing,
    setResult,
    setIsAudioPlaying,
    isAudioPlaying,
    endpoint,
    recognitionRef
}: AnalyzeParams) => {

    if (!videoRef.current || !canvasRef.current || isAudioPlaying) return

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
            const res = await axios.post(`${BACKEND_URL}${endpoint}`, formData)

            const { description, audio_path, status, message } = res.data

            if (res.status !== 200 || status !== "success" || !description) {
                const errMsg = message || "Failed to analyze the image."
                toast.error(errMsg)
                setResult(errMsg)
                speakWithWebSpeech(errMsg)
                return
            }

            setResult(description)

            if (recognitionRef?.current?.stop) {
                recognitionRef.current.stop()
            }

            if (audio_path) {
                setIsAudioPlaying?.(true)
                const audio = new Audio(audio_path.startsWith("/") ? `${BASE_BACKEND}${audio_path}` : audio_path)

                audio.play()
                audio.onended = () => {
                    setIsAudioPlaying?.(false)
                    if (recognitionRef?.current?.start) {
                        try {
                            recognitionRef.current.start()
                        } catch (e) {
                            console.warn("Recognition restart failed:", e)
                        }
                    }
                }
            } else {
                setIsAudioPlaying?.(true)
                speakWithWebSpeech(description, () => {
                    setIsAudioPlaying?.(false)
                    if (recognitionRef?.current?.start) {
                        try {
                            recognitionRef.current.start()
                        } catch (e) {
                            console.warn("Recognition restart failed:", e)
                        }
                    }
                })
            }

        } catch (err: any) {
            const fallback = err?.response?.data?.description || "Failed to analyze. Try again later."
            toast.error(err?.response?.data?.message || fallback)
            setResult(fallback)
            speakWithWebSpeech(fallback)
            if (recognitionRef?.current?.start) {
                try {
                    recognitionRef.current.start()
                } catch (e) {
                    console.warn("Recognition restart failed:", e)
                }
            }
        } finally {
            setIsAnalyzing(false)
        }
    }, "image/jpeg")
}

