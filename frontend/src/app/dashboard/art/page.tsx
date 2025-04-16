"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, PaintbrushIcon as PaintBrush } from "lucide-react"
import { motion } from "framer-motion"

export default function ArtPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [style, setStyle] = useState("detailed")
    const [result, setResult] = useState<string | null>(null)

    const handleAnalyze = () => {
        setIsAnalyzing(true)
        setResult(null)

        // Simulate AI processing
        setTimeout(() => {
            setIsAnalyzing(false)

            const descriptions = {
                detailed:
                    "You are in a cozy living room bathed in warm golden light from a setting sun. The walls are painted a soft cream color, adorned with framed landscape paintings that capture serene countryside scenes. A plush brown leather sofa sits in the center, topped with burgundy and mustard-colored pillows. A handcrafted oak coffee table rests on a woven area rug with intricate patterns in shades of burgundy and navy. A bookshelf in the corner houses leather-bound classics and small ceramic figurines. The gentle scent of cinnamon and vanilla hangs in the air, while soft classical music plays from hidden speakers, creating a perfect atmosphere for relaxation and contemplation.",
                poetic:
                    "The living space unfolds like a sonnet, bathed in honeyed light as day surrenders to dusk. Walls of alabaster stand as canvas to framed dreams of distant meadows where imagination roams free. The leather throne, rich as autumn earth, cradles burgundy and golden treasures like fallen leaves. A wooden altar, carved by devoted hands, anchors the scene upon a tapestry woven with stories untold. In the corner, wisdom waits in leather bindings, while porcelain dancers stand frozen mid-performance. Cinnamon clouds dance with vanilla whispers as invisible musicians paint the air with Baroque brushstrokes. Here, time itself pauses, allowing the soul to breathe.",
                minimal:
                    "Living room. Cream walls with landscape paintings. Brown leather sofa with burgundy and yellow pillows. Wooden coffee table on patterned rug. Bookshelf with books and figurines. Cinnamon scent. Classical music playing softly.",
            }

            setResult(descriptions[style as keyof typeof descriptions])
        }, 2000)
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Artistic Description</h1>
            <p className="text-lg text-muted-foreground mb-8">
                Experience your surroundings through rich, creative descriptions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Camera View</CardTitle>
                        <CardDescription>Capture your surroundings for artistic description</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <div className="w-full aspect-video bg-muted relative rounded-md overflow-hidden flex items-center justify-center mb-4">
                            <Camera className="h-16 w-16 text-muted-foreground/50" />
                        </div>

                        <div className="w-full mb-4">
                            <label className="text-sm font-medium mb-1 block">Description Style</label>
                            <Select defaultValue="detailed" onValueChange={setStyle}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select style" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="detailed">Detailed</SelectItem>
                                    <SelectItem value="poetic">Poetic</SelectItem>
                                    <SelectItem value="minimal">Minimal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button size="lg" className="w-full text-base" onClick={handleAnalyze} disabled={isAnalyzing}>
                            {isAnalyzing ? "Creating..." : "Create Artistic Description"}
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Artistic Description</CardTitle>
                        <CardDescription>Creative interpretation of your surroundings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="w-full rounded-md border p-4 min-h-[240px] flex items-center justify-center"
                            aria-live="polite"
                        >
                            {isAnalyzing ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                                    <div className="h-8 w-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4" />
                                    <p className="text-center text-muted-foreground">Creating artistic description...</p>
                                </motion.div>
                            ) : result ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <PaintBrush className="h-5 w-5 text-primary" />
                                        <p className="font-medium">Artistic Vision</p>
                                    </div>
                                    <p className="text-base leading-relaxed">{result}</p>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col items-center text-center text-muted-foreground">
                                    <PaintBrush className="h-10 w-10 mb-2" />
                                    <p>Artistic description will appear here</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
