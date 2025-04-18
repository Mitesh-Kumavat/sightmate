"use client"

import { useEffect, useRef } from "react"

interface UseVoiceCommandProps {
    commands: string[]
    onCommandMatch: () => void
}

export default function useVoiceCommand({ commands, onCommandMatch }: UseVoiceCommandProps) {
    const recognitionRef = useRef<any | null>(null)
    const isManuallyStopped = useRef(false)

    useEffect(() => {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
        if (!SpeechRecognition) {
            console.warn("SpeechRecognition not supported in this browser.")
            return
        }
    
        navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
            recognitionRef.current = new SpeechRecognition()
            recognitionRef.current.continuous = true
            recognitionRef.current.lang = "en-US"
            recognitionRef.current.interimResults = false
    
            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase()
                console.log("Heard:", transcript)
                if (commands.some(cmd => transcript.includes(cmd.toLowerCase()))) {
                    onCommandMatch()
                    console.log("Command matched:", transcript)
                }
            }
    
            recognitionRef.current.onstart = () => console.log("Voice recognition active.")
            recognitionRef.current.onspeechstart = () => console.log("Speech detected.")
    
            recognitionRef.current.onend = () => {
                if (!isManuallyStopped.current) {
                    setTimeout(() => {
                        try {
                            recognitionRef.current?.start()
                        } catch (e) {
                            console.warn("Restart failed:", e)
                        }
                    }, 500)
                }
            }
    
            recognitionRef.current.start()
        }).catch((err) => {
            console.warn("Mic permission denied or error:", err)
        })
    
        return () => {
            isManuallyStopped.current = true
            recognitionRef.current?.stop()
        }
    }, [commands, onCommandMatch])
    
}
