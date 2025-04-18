"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
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
import useAuth from "@/hooks/use-auth"

interface NavItem {
    title: string
    href: string
    icon: React.ReactNode
    description: string
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isMounted, setIsMounted] = useState(false)
    const [user, setUser] = useState<string | null>("")
    const [email, setEmail] = useState<string | null>("")
    const router = useRouter();

    useEffect(() => {
        const { user, email } = useAuth();
        setIsMounted(true)
        if (!user || !email) {
            router.push("/")
            return
        }
        setUser(user)
        setEmail(email)
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
        <div className="flex overflow-hidden h-fit w-full">
            <SidebarProvider>
                <div className="flex min-h-screen min-w-full">
                    <Sidebar variant="sidebar">
                        <SidebarHeader className="flex min-w-full flex-col items-center justify-center py-3">
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
                                                <AvatarFallback>{user && user[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col text-left">
                                                <span className="text-sm font-medium">{user}</span>
                                                <span className="text-xs text-muted-foreground">{email}</span>
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
                                    <DropdownMenuItem onClick={() => {
                                        localStorage.removeItem("user")
                                        localStorage.removeItem("userId")
                                        localStorage.removeItem("email")
                                        router.push("/")
                                    }}>
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
                            <div className="flex h-14 items-center px-4 md:px-6">
                                <SidebarTrigger />

                                <div className="ml-auto flex items-center gap-2">
                                    <span className="text-sm hidden md:inline-block">Welcome, {user}</span>
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
        </div>

    )
}
