"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/landing/navbar"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Camera,
  FileText,
  Newspaper,
  DollarSign,
  PaintbrushIcon as PaintBrush,
  BellRing,
} from "lucide-react"
import { useEffect } from "react"
import useAuth from "@/hooks/use-auth"

export default function LandingPage() {

  const router = useRouter()

  const features = [
    {
      title: "Scene Description",
      description: "Real-time analysis and audio description of your surroundings",
      icon: <Camera className="h-10 w-10 text-primary" />,
    },
    {
      title: "Document Reader",
      description: "Convert text in images to speech with high accuracy",
      icon: <FileText className="h-10 w-10 text-primary" />,
    },
    {
      title: "News Summarizer",
      description: "Get concise audio summaries of today's top news",
      icon: <Newspaper className="h-10 w-10 text-primary" />,
    },
    {
      title: "Currency Recognition",
      description: "Identify Indian currency notes instantly",
      icon: <DollarSign className="h-10 w-10 text-primary" />,
    },
    {
      title: "Artistic Descriptions",
      description: "Experience the world through rich, creative descriptions",
      icon: <PaintBrush className="h-10 w-10 text-primary" />,
    },
    {
      title: "Emergency Alerts",
      description: "Send location-based alerts to emergency contacts",
      icon: <BellRing className="h-10 w-10 text-primary" />,
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Take a Picture",
      description: "Capture your surroundings with a simple tap",
    },
    {
      number: "02",
      title: "AI Processes Image",
      description: "Our advanced AI analyzes the visual content",
    },
    {
      number: "03",
      title: "Hear the Description",
      description: "Listen to detailed audio descriptions in real-time",
    },
  ]

  const technologies = [
    "Next.js",
    "TypeScript",
    "Groq",
    "Python",
    "FastAPI",
    "LangChain",
  ]

  useEffect(() => {
    const { user, userId } = useAuth();
    if (user && userId) {
      router.push("/dashboard/scene");
    }
  }, [])

  return (
    <div className="min-h-screen w-auto mx-auto flex flex-col ">
      <Navbar />

      {/* Hero Section */}

      <section className="relative py-20 md:py-28 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              SightMate – AI-Powered Vision for the Blind
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10">
              Empowering the visually impaired to navigate and understand their world through cutting-edge AI
              technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/dashboard/scene">Try Demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-6 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our cutting-edge technology provides a range of assistive features for the visually impaired.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Using SightMate is simple and intuitive, designed with accessibility in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 md:py-24 px-6 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powered By</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge technologies for reliability and performance.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="px-6 py-3 bg-background rounded-full shadow-sm border">
                  <span className="text-lg font-medium">{tech}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-16 px-6 mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center border-t pt-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">SightMate</h3>
              <p className="text-muted-foreground">AI-Powered Vision for the Blind</p>
            </div>
            <div className="flex gap-8">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="text-center mt-8 text-muted-foreground">
            <p>© {new Date().getFullYear()} SightMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
