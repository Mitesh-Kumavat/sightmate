"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ModeToggle } from "@/components/ui/theme-toggler"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/#features", label: "Features" },
        { href: "/#how-it-works", label: "How It Works" },
        { href: "#", label: "About" },
    ]

    return (
        <header className="mx-auto max-sm:px-2 container sticky top-0 z-40 md:px-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 md:gap-4">
                    <Link href="/" className="text-2xl font-bold">
                        SightMate
                    </Link>

                    <nav className="hidden md:flex gap-6 ml-6">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <div className="hidden md:flex items-center gap-4">
                        <Button variant="outline" asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                    </div>

                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-64 px-6 pt-10 pb-6 bg-background shadow-lg"
                        >
                            <div className="mb-6 text-center">
                                <Link
                                    href="/"
                                    className="text-2xl font-bold tracking-tight text-primary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    SightMate
                                </Link>
                            </div>
                            <nav className="flex flex-col gap-4">
                                {navLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="text-muted-foreground hover:text-foreground transition-colors text-base font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                            <hr className="my-6 border-muted" />
                            <div className="flex flex-col gap-3">
                                <Button variant="outline" asChild className="w-full">
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button asChild className="w-full">
                                    <Link href="/signup">Sign Up</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
