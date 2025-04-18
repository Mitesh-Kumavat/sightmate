"use client"

import { useState, useCallback } from "react"
import axios from "axios"
import DescriptionResult from "@/components/dashboard/description-result"
import useVoiceCommand from "@/hooks/use-voice-command"
import { speakWithWebSpeech } from "@/utils/camera.utils"
import { Button } from "@/components/ui/button"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api"

export default function NewsPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<string | null>(null)

    const fetchNews = useCallback(async () => {
        setIsAnalyzing(true)
        try {
            const response = await axios.get(`${BACKEND_URL}/news`)
            const { news_summary, audio_path, status } = response.data
            setResult(news_summary)

            if (status === "success" && audio_path) {
                const audio = new Audio(
                    audio_path.startsWith("/") ? `${BACKEND_URL}${audio_path}` : audio_path
                )
                audio.play()
            } else {
                speakWithWebSpeech(news_summary)
            }
        } catch (err: any) {
            setResult(err.response.data.news_summary || "Failed to fetch news. Please try again.")
            speakWithWebSpeech(err.response.data.news_summary || "Sorry, I couldn't fetch the news right now.")
        } finally {
            setIsAnalyzing(false)
        }


    }, [])


    useVoiceCommand({
        commands: [
            "news", "today's news", "current news", "fetch news", "get news",
            "latest news", "top news", "headlines", "news headlines"
        ],
        onCommandMatch: fetchNews
    })

    return (
        < div className="max-w-5xl mx-auto px-4 md:px-0" >
            <h1 className="text-3xl font-bold mb-6">News Summary</h1>
            <p className="text-lg text-muted-foreground mb-2">
                Speak something like <strong>"today's news"</strong> or press the button below.
            </p>
            <p className="text-sm text-muted-foreground mb-4">
                Voice command powered by Whisper. Response powered by AI and optionally text-to-speech.
            </p>

            <Button onClick={fetchNews} disabled={isAnalyzing}>
                {isAnalyzing ? "Fetching..." : "Fetch Today's News"}
            </Button>

            <div className="mt-6">
                <DescriptionResult result={result} isAnalyzing={isAnalyzing} />
            </div>
        </div >
    )
}
