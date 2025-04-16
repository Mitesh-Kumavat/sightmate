"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Newspaper } from "lucide-react"
import { motion } from "framer-motion"

type NewsCategory = "world" | "technology" | "health" | "sports"

export default function NewsPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<NewsCategory>("world")
    const [result, setResult] = useState<string | null>(null)

    const handleGetNews = () => {
        setIsLoading(true)
        setResult(null)

        // Simulate AI processing
        setTimeout(() => {
            setIsLoading(false)

            const newsContent = {
                world:
                    "Today's top world news: 1) United Nations Summit addresses climate change with new global initiatives. 2) Peace talks resume in conflict region with mediation from neighboring countries. 3) Major economic forum concludes with agreements on international trade reforms.",
                technology:
                    "Today's technology headlines: 1) New AI breakthrough enables more natural conversation with digital assistants. 2) Tech company unveils smartphone with revolutionary battery technology. 3) Global cybersecurity report warns of increasing sophisticated attacks targeting infrastructure.",
                health:
                    "Today's health updates: 1) Research shows promising results for new treatment approach to common neurological disorders. 2) Global health organization launches campaign to address mental health awareness. 3) New nutritional guidelines released focusing on sustainable food choices.",
                sports:
                    "Today's sports highlights: 1) Underdog team defeats champions in major upset at international tournament. 2) Record-breaking performance at world athletics championship by newcomer athlete. 3) Historic rivalry match ends in dramatic tie after extended play.",
            }

            setResult(newsContent[selectedCategory])
        }, 1500)
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">News Summarizer</h1>
            <p className="text-lg text-muted-foreground mb-8">Get concise audio summaries of today's top news stories.</p>

            <Card>
                <CardHeader>
                    <CardTitle>Today's News</CardTitle>
                    <CardDescription>Select a category and get summarized news</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Tabs
                        defaultValue="world"
                        className="w-full"
                        onValueChange={(value) => setSelectedCategory(value as NewsCategory)}
                    >
                        <TabsList className="grid grid-cols-4 mb-6">
                            <TabsTrigger value="world">World</TabsTrigger>
                            <TabsTrigger value="technology">Technology</TabsTrigger>
                            <TabsTrigger value="health">Health</TabsTrigger>
                            <TabsTrigger value="sports">Sports</TabsTrigger>
                        </TabsList>

                        <TabsContent value="world" className="mt-0">
                            <div className="flex items-center justify-center py-6">
                                <Newspaper className="h-16 w-16 text-primary/50" />
                            </div>
                        </TabsContent>
                        <TabsContent value="technology" className="mt-0">
                            <div className="flex items-center justify-center py-6">
                                <Newspaper className="h-16 w-16 text-primary/50" />
                            </div>
                        </TabsContent>
                        <TabsContent value="health" className="mt-0">
                            <div className="flex items-center justify-center py-6">
                                <Newspaper className="h-16 w-16 text-primary/50" />
                            </div>
                        </TabsContent>
                        <TabsContent value="sports" className="mt-0">
                            <div className="flex items-center justify-center py-6">
                                <Newspaper className="h-16 w-16 text-primary/50" />
                            </div>
                        </TabsContent>
                    </Tabs>

                    <Button size="lg" className="w-full text-base" onClick={handleGetNews} disabled={isLoading}>
                        {isLoading ? "Loading News..." : "Get Today's News"}
                    </Button>

                    <div className="w-full rounded-md border p-4 min-h-[200px]" aria-live="polite">
                        {isLoading ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center h-full justify-center"
                            >
                                <div className="h-8 w-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4" />
                                <p className="text-center text-muted-foreground">Fetching today's news...</p>
                            </motion.div>
                        ) : result ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <p className="text-lg font-medium mb-2">
                                    Today's {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News
                                </p>
                                <p className="text-base leading-relaxed">{result}</p>
                            </motion.div>
                        ) : (
                            <p className="text-center text-muted-foreground h-full flex items-center justify-center">
                                News summary will appear here
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
