"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BACKEND_URL } from "@/constants"
import axios from 'axios'
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        console.log(email, password);

        try {
            const response = await axios.post(`${BACKEND_URL}/login`, {
                email,
                password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (response.status === 200) {
                const data = response.data
                localStorage.setItem("user", JSON.stringify(data.user))
                localStorage.setItem("userId", JSON.stringify(data.id))
                localStorage.setItem("email", JSON.stringify(data.email))
                router.push("/dashboard")
            } else {
                alert("Invalid email or password")
            }

        } catch (error: any) {
            alert(error.response.data.detail || "An error occurred during login")
            console.log("ERROR DUIRNG LOGIN", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="w-full">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Login to SightMate</CardTitle>
                        <CardDescription className="text-center">
                            Enter your email and password to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                    className="text-base h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        required
                                        className="text-base h-12 pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </Button>
                                </div>
                            </div>
                            <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                        <div className="mt-4 text-center">
                            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                                Forgot your password?
                            </Link>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <div className="text-center mt-2">
                            <span className="text-muted-foreground">Don&apos;t have an account?</span>{" "}
                            <Link href="/signup" className="text-primary hover:underline font-medium">
                                Sign up
                            </Link>
                        </div>
                        <Button variant="outline" className="mt-4 w-full" onClick={() => router.push("/")}>
                            Go Back Home
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}
