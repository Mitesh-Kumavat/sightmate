declare global {
    interface Window {
        SpeechRecognition: any
        webkitSpeechRecognition: any
    }
}

export const setupSpeechRecognition = (
    options: string[],
    onMatch: () => void
) => {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return null

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.lang = "en-US"

    let isManuallyStopped = false

    recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase()
        console.log("Heard:", transcript)
        if (options.some(opt => transcript.includes(opt))) {
            onMatch()
            console.log("Command matched:", transcript)
        }
    }

    recognition.onerror = (err: any) => {
        console.error("SpeechRecognition error:", err)
    }

    recognition.onend = () => {
        if (!isManuallyStopped) {
            console.log("SpeechRecognition ended. Restarting...")
            try {
                recognition.start()
            } catch (e) {
                console.warn("Restart failed:", e)
            }
        }
    }

    try {
        recognition.start()
    } catch (e) {
        console.warn("Start failed:", e)
    }

    // Add a custom stop method for cleanup
    recognition.stopManually = () => {
        isManuallyStopped = true
        recognition.stop()
    }

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
