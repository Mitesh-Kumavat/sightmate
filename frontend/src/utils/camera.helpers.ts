declare global {
    interface Window {
        SpeechRecognition: any
        webkitSpeechRecognition: any
    }
}

export const setupSpeechRecognition = (options: string[], onMatch: () => void) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return null

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.lang = "en-US"

    recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase()
        if (options.some(opt => transcript.includes(opt))) onMatch()
    }

    recognition.onerror = console.error
    recognition.start()

    return recognition
}

export const startCamera = async (
    videoRef: React.RefObject<HTMLVideoElement>,
    facingMode: "user" | "environment"
) => {
    if (!videoRef.current) return
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { exact: facingMode } }
        })
        if (videoRef.current) videoRef.current.srcObject = stream
    } catch (err) {
        console.error("Camera error:", err)
    }
}
