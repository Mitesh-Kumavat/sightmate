declare global {
    interface Window {
        SpeechRecognition: any
        webkitSpeechRecognition: any
    }
}
interface SetupSpeechProps {
    options: string[]
    onMatch: () => void
    isAudioPlayingRef: React.MutableRefObject<boolean>
}

export const setupSpeechRecognition = ({
    options,
    onMatch,
    isAudioPlayingRef
}: SetupSpeechProps) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
        console.warn("SpeechRecognition API not supported in this browser.")
        return null
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.lang = "en-US"

    let isManuallyStopped = false

    recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase()
        if (options.some(opt => transcript.includes(opt))) {
            onMatch()
        }
    }

    recognition.onerror = (err: any) => {
        console.error("[❌ SpeechRecognition Error]:", err)
    }

    recognition.onend = () => {
        if (!isManuallyStopped && !isAudioPlayingRef.current) {
            try {
                recognition.start()
            } catch (e) {
                console.warn("[❌ Restart Failed]:", e)
            }
        }
    }

    try {
        recognition.start()
    } catch (e) {
        console.warn("[❌ Initial Start Failed]:", e)
    }

    recognition.stopManually = () => {
        isManuallyStopped = true
        recognition.stop()
    }

    recognition.startManually = () => {
        isManuallyStopped = false
        if (!isAudioPlayingRef.current) {
            try {
                recognition.start()
            } catch (e) {
                console.warn("[❌ Manual Start Failed]:", e)
            }
        }
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
