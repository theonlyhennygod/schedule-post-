import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  content: string
  role: "user" | "assistant"
  timestamp: Date | string
  userName?: string
}

export function ChatMessage({ content, role, timestamp, userName = "User" }: ChatMessageProps) {
  const formatTime = (date: Date | string) => {
    if (typeof date === "string") {
      return date
    }

    try {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } catch (error) {
      // Fallback in case of error
      return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  }

  const isUser = role === "user"

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="h-8 w-8 mr-2 mt-1">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div className={cn("max-w-[80%] rounded-lg p-3", isUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        <p className="text-xs mt-1 opacity-70 text-right">{formatTime(timestamp)}</p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 ml-2 mt-1">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userName} />
          <AvatarFallback>{userName[0]}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

