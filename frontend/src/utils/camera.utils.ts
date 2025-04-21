export const speakWithWebSpeech = (text: string, onEnd?: () => void) => {
    if (!window.speechSynthesis) return

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.onend = () => {
        onEnd?.()
    }
    speechSynthesis.speak(utterance)
}
