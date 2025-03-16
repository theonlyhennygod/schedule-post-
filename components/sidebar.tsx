"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Grid, Home, MessageSquare, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname?.startsWith(path)
  }

  return (
    <div className="w-16 bg-background flex flex-col items-center py-6 border-r border-border h-screen fixed">
      <div className="mb-8">
        <Avatar className="h-8 w-8 bg-muted">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Logo" />
          <AvatarFallback>L</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col items-center space-y-8">
        <Link
          href="/"
          className={`p-2 rounded-lg ${isActive("/") && pathname === "/" ? "bg-muted text-primary" : "hover:bg-muted/50 text-muted-foreground"}`}
        >
          <Home size={20} />
        </Link>
        <Link
          href={pathname?.includes("/parent") ? "/parent" : "/caregiver"}
          className={`p-2 rounded-lg ${(isActive("/parent") || isActive("/caregiver")) && !isActive("/parent/children") && !isActive("/parent/calendar") && !isActive("/caregiver/children") && !isActive("/caregiver/calendar") ? "bg-muted text-primary" : "hover:bg-muted/50 text-muted-foreground"}`}
        >
          <Grid size={20} />
        </Link>
        <Link
          href={pathname?.includes("/parent") ? "/parent/children" : "/caregiver/children"}
          className={`p-2 rounded-lg ${isActive("/parent/children") || isActive("/caregiver/children") ? "bg-muted text-primary" : "hover:bg-muted/50 text-muted-foreground"}`}
        >
          <Users size={20} />
        </Link>
        <Link
          href={pathname?.includes("/parent") ? "/parent/calendar" : "/caregiver/calendar"}
          className={`p-2 rounded-lg ${isActive("/parent/calendar") || isActive("/caregiver/calendar") ? "bg-muted text-primary" : "hover:bg-muted/50 text-muted-foreground"}`}
        >
          <Calendar size={20} />
        </Link>
        <Link
          href={pathname?.includes("/parent") ? "/parent/chat" : "/caregiver/chat"}
          className={`p-2 rounded-lg ${isActive("/parent/chat") || isActive("/caregiver/chat") ? "bg-muted text-primary" : "hover:bg-muted/50 text-muted-foreground"}`}
        >
          <MessageSquare size={20} />
        </Link>
      </div>
    </div>
  )
}

