"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
    Camera,
    FileText,
    Newspaper,
    HelpCircle,
    DollarSign,
    PaintbrushIcon as PaintBrush,
    BellRing,
    User,
    LogOut,
    Menu,
    X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/ui/theme-toggler"
import {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarTrigger,
    SidebarSeparator,
    SidebarGroup,
} from "@/components/ui/sidebar"

interface NavItem {
    title: string
    href: string
    icon: React.ReactNode
    description: string
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const navItems: NavItem[] = [
        {
            title: "Scene Description",
            href: "/dashboard/scene",
            icon: <Camera className="h-5 w-5" />,
            description: "Real-time scene analysis and description",
        },
        {
            title: "News Summarizer",
            href: "/dashboard/news",
            icon: <Newspaper className="h-5 w-5" />,
            description: "Today's news summarized for you",
        },
        {
            title: "Document Reader",
            href: "/dashboard/document",
            icon: <FileText className="h-5 w-5" />,
            description: "Extract and read text from documents",
        },
        {
            title: "Ask a Question",
            href: "/dashboard/qna",
            icon: <HelpCircle className="h-5 w-5" />,
            description: "Get answers to your questions",
        },
        {
            title: "Currency Recognizer",
            href: "/dashboard/currency",
            icon: <DollarSign className="h-5 w-5" />,
            description: "Identify and describe currency notes",
        },
        {
            title: "Artistic Description",
            href: "/dashboard/art",
            icon: <PaintBrush className="h-5 w-5" />,
            description: "Creative and detailed scene descriptions",
        },
        {
            title: "Emergency Alert",
            href: "/dashboard/emergency",
            icon: <BellRing className="h-5 w-5 text-destructive" />,
            description: "Send emergency alerts with your location",
        },
    ]

    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                {/* Sidebar for larger screens */}
                <Sidebar variant="sidebar" collapsible="icon">
                    <SidebarHeader className="flex flex-col items-center justify-center py-6">
                        <Link href="/" className="text-2xl font-bold">
                            SightMate
                        </Link>
                    </SidebarHeader>
                    <SidebarSeparator />
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarMenu>
                                {navItems.map((item, index) => (
                                    <SidebarMenuItem key={index}>
                                        <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                                            <Link href={item.href}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="w-full justify-start px-2 mb-2">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                            <AvatarFallback>JD</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col text-left">
                                            <span className="text-sm font-medium">John Doe</span>
                                            <span className="text-xs text-muted-foreground">user@example.com</span>
                                        </div>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarFooter>
                </Sidebar>

                {/* Main content area */}
                <div className="flex-1 flex flex-col">
                    {/* Header for the dashboard */}
                    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <div className="flex h-16 items-center px-4 md:px-6">
                            <SidebarTrigger />

                            {/* Mobile sidebar trigger */}
                            <Sheet>
                                <SheetTrigger asChild className="md:hidden ml-2">
                                    <Button variant="outline" size="icon" className="md:hidden">
                                        <Menu className="h-5 w-5" />
                                        <span className="sr-only">Toggle mobile menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[240px] sm:w-[300px] pr-0">
                                    <div className="flex flex-col h-full">
                                        <div className="py-4 flex items-center justify-between px-4">
                                            <Link href="/" className="text-xl font-bold">
                                                SightMate
                                            </Link>
                                            <SheetTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <X className="h-5 w-5" />
                                                </Button>
                                            </SheetTrigger>
                                        </div>
                                        <nav className="flex-1 px-2 py-4 space-y-2">
                                            {navItems.map((item, index) => {
                                                const isActive = pathname === item.href
                                                return (
                                                    <Link
                                                        key={index}
                                                        href={item.href}
                                                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                                                            }`}
                                                    >
                                                        {item.icon}
                                                        <div className="flex flex-col">
                                                            <span>{item.title}</span>
                                                            <span className="text-xs text-muted-foreground">{item.description}</span>
                                                        </div>
                                                    </Link>
                                                )
                                            })}
                                        </nav>
                                        <div className="border-t p-4 mt-auto">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                                    <AvatarFallback>JD</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium">John Doe</p>
                                                    <p className="text-xs text-muted-foreground">user@example.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>

                            <div className="ml-auto flex items-center gap-2">
                                <span className="text-sm hidden md:inline-block">Welcome, John Doe</span>
                                <ModeToggle />
                            </div>
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="flex-1 p-4 md:p-6">
                        {isMounted && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="h-full"
                            >
                                {children}
                            </motion.div>
                        )}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}
