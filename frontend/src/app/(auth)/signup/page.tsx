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
import { Eye, EyeOff } from "lucide-react"
import axios from "axios"
import { BACKEND_URL } from "@/constants"
import { toast } from "sonner"

export default function SignupPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const { firstname, lastname, email, password } = Object.fromEntries(formData.entries())

        try {
            const response = await axios.post(`${BACKEND_URL}/signup`, {
                firstname,
                lastname,
                email,
                password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (response.status.toString().startsWith("2")) {
                toast.success("Account created successfully!")
                router.push("/login")
            } else {
                toast.error(response.data.message || "An error occurred while creating your account.")
            }
        } catch (error: any) {
            toast.error(error.response.data.detail || "An error occurred while creating your account.")
            console.error("Error creating account:", error)
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
                        <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
                        <CardDescription className="text-center">
                            Enter your information to create a SightMate account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstname">First Name</Label>
                                    <Input id="firstname" name="firstname" placeholder="John" required className="text-base h-12" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastname">Last Name</Label>
                                    <Input id="lastname" name="lastname" placeholder="Doe" required className="text-base h-12" />
                                </div>
                            </div>
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
                                        placeholder="Create a password"
                                        autoComplete="new-password"
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
                                {isLoading ? "Creating account..." : "Create Account"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <div className="text-center mt-2">
                            <span className="text-muted-foreground">Already have an account?</span>{" "}
                            <Link href="/login" className="text-primary hover:underline font-medium">
                                Log in
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
