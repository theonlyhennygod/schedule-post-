"use client"

import { Bell, Menu, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

interface HeaderProps {
  userName: string
  userRole: "parent" | "caregiver"
}

export default function Header({ userName, userRole }: HeaderProps) {
  return (
    <header className="bg-background p-4 border-b border-border flex items-center justify-between fixed top-0 right-0 left-16 z-10">
      <div className="flex items-center">
        <Menu className="mr-4 text-muted-foreground" size={20} />
        <div>
          <h1 className="text-foreground font-medium text-lg">Welcome, {userName}</h1>
          <p className="text-muted-foreground text-xs">
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Badge className="bg-primary text-primary-foreground">
          {userRole === "parent" ? "Parent Dashboard" : "Caregiver Dashboard"}
        </Badge>
        {userRole === "parent" && (
          <Link href="/caregiver" className="text-sm text-primary hover:underline">
            View Caregiver Dashboard
          </Link>
        )}
        {userRole === "caregiver" && (
          <Link href="/parent" className="text-sm text-primary hover:underline">
            View Parent Dashboard
          </Link>
        )}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input className="pl-10 pr-4 py-2 w-64 bg-muted/50 border-none text-sm" placeholder="Search" />
        </div>
        <ThemeToggle />
        <button className="p-2 rounded-full hover:bg-muted text-muted-foreground">
          <Bell size={20} />
        </button>
        <Avatar className="h-8 w-8 bg-muted">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
          <AvatarFallback>{userName[0]}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

