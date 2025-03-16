"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { useScheduleStore } from "@/lib/store"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { ChatMessage } from "@/components/ui/chat-message"
import { LoadingDots } from "@/components/ui/loading-dots"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function ParentChatPage() {
  const { children } = useScheduleStore()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm your family assistant. You can ask me questions about your children's preferences, schedules, or any other information I might have.",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Create context about children for the AI
      const childrenContext = children
        .map((child) => {
          return `
          Child: ${child.name}, Age: ${child.age}
          Food Preferences: ${child.preferences.foodPreferences}
          Allergies: ${child.preferences.allergies || "None"}
          Bedtime Routine: ${child.preferences.bedtimeRoutine}
          Favorite Activities: ${child.preferences.favoriteActivities}
          Special Notes: ${child.preferences.specialNotes || "None"}
        `
        })
        .join("\n\n")

      // Generate AI response
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `${input}`,
        system: `You are a helpful family assistant that helps parents manage information about their children. 
        You have access to the following information about the children:
        
        ${childrenContext}
        
        Answer questions about the children based on this information. If you don't know the answer, say so politely.
        Keep your answers concise and friendly. If the question is not about the children or their preferences, 
        politely redirect the conversation back to how you can help with the children's information.`,
      })

      // Add AI response
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: text,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error generating response:", error)
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "I'm sorry, I couldn't process your request. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex bg-background min-h-screen font-sans">
      <Sidebar />

      <div className="ml-16 flex-1 flex flex-col">
        <Header userName="Amanda" userRole="parent" />

        <main className="pt-24 p-6 flex-1 flex flex-col">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Family Assistant</h1>
            <p className="text-muted-foreground">Ask questions about your children's preferences and schedules</p>
          </div>

          <Card className="flex-1 flex flex-col p-4 mb-4 overflow-hidden">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  content={message.content}
                  role={message.role}
                  timestamp={message.timestamp}
                  userName="Amanda"
                />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3 flex items-center">
                    <LoadingDots />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </Card>
        </main>
      </div>
    </div>
  )
}

