"use client"

import { useState } from "react"
import {
  Bell,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Grid,
  Home,
  Image,
  Menu,
  Search,
  Settings,
  User,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function CaregiverDashboard() {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      date: "Today",
      time: "09:00",
      activity: "School Drop-off",
      notes: "Pack lunch and water bottle",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      date: "Today",
      time: "15:30",
      activity: "School Pick-up",
      notes: "Don't forget the art project",
      priority: "high",
      completed: true,
    },
    {
      id: 3,
      date: "Today",
      time: "18:00",
      activity: "Swimming Lesson",
      notes: "Bring towel and goggles",
      priority: "medium",
      completed: false,
    },
    {
      id: 4,
      date: "Tomorrow",
      time: "10:00",
      activity: "Doctor's Appointment",
      notes: "Bring health insurance card",
      priority: "high",
      completed: false,
    },
    {
      id: 5,
      date: "Tomorrow",
      time: "16:00",
      activity: "Piano Lesson",
      notes: "Practice sheet music beforehand",
      priority: "medium",
      completed: false,
    },
  ])

  const toggleComplete = (id) => {
    setSchedules(
      schedules.map((schedule) => (schedule.id === id ? { ...schedule, completed: !schedule.completed } : schedule)),
    )
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const todaySchedules = schedules.filter((s) => s.date === "Today")
  const completedToday = todaySchedules.filter((s) => s.completed).length
  const progressPercentage = todaySchedules.length > 0 ? (completedToday / todaySchedules.length) * 100 : 0

  return (
    <div className="flex h-screen bg-[#f9f9f9] font-sans">
      {/* Sidebar */}
      <div className="w-16 bg-white flex flex-col items-center py-6 border-r border-[#d9d9d9]">
        <div className="mb-8">
          <Avatar className="h-8 w-8 bg-[#efefef]">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Logo" />
            <AvatarFallback>L</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col items-center space-y-8">
          <button className="p-2 rounded-lg bg-[#efefef] text-[#4182f9]">
            <Home size={20} />
          </button>
          <button className="p-2 rounded-lg hover:bg-[#f9f9f9] text-[#86909c]">
            <Grid size={20} />
          </button>
          <button className="p-2 rounded-lg hover:bg-[#f9f9f9] text-[#86909c]">
            <Calendar size={20} />
          </button>
          <button className="p-2 rounded-lg hover:bg-[#f9f9f9] text-[#86909c]">
            <Image size={20} />
          </button>
          <button className="p-2 rounded-lg hover:bg-[#f9f9f9] text-[#86909c]">
            <User size={20} />
          </button>
          <button className="p-2 rounded-lg hover:bg-[#f9f9f9] text-[#86909c]">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white p-4 border-b border-[#d9d9d9] flex items-center justify-between">
          <div className="flex items-center">
            <Menu className="mr-4 text-[#86909c]" size={20} />
            <div>
              <h1 className="text-[#3e435d] font-medium text-lg">Welcome, Rihan</h1>
              <p className="text-[#86909c] text-xs">Tue, 07 June 2022</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-[#4182f9]">Caregiver Dashboard</Badge>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#86909c]" size={16} />
              <Input className="pl-10 pr-4 py-2 w-64 bg-[#f9f9f9] border-none text-sm" placeholder="Search" />
            </div>
            <button className="p-2 rounded-full hover:bg-[#f9f9f9] text-[#86909c]">
              <Bell size={20} />
            </button>
            <Avatar className="h-8 w-8 bg-[#efefef]">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Today's Progress</CardTitle>
                <CardDescription>Your schedule completion for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#86909c]">
                    {completedToday} of {todaySchedules.length} tasks completed
                  </span>
                  <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Next Task</CardTitle>
              </CardHeader>
              <CardContent>
                {todaySchedules.filter((s) => !s.completed)[0] ? (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-[#86909c]" />
                    <span className="text-sm font-medium">
                      {todaySchedules.filter((s) => !s.completed)[0]?.time} -{" "}
                      {todaySchedules.filter((s) => !s.completed)[0]?.activity}
                    </span>
                  </div>
                ) : (
                  <div className="text-sm text-[#86909c]">No pending tasks for today</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">High Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  {schedules.filter((s) => s.priority === "high" && !s.completed).length} high priority tasks
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="today">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Today's Schedule</CardTitle>
                  <CardDescription>Tasks assigned to you for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {schedules
                      .filter((schedule) => schedule.date === "Today")
                      .sort((a, b) => {
                        // Sort by completion status first, then by time
                        if (a.completed !== b.completed) return a.completed ? 1 : -1
                        return a.time.localeCompare(b.time)
                      })
                      .map((schedule) => (
                        <div
                          key={schedule.id}
                          className={`flex items-start p-3 border rounded-lg ${
                            schedule.completed ? "bg-gray-50" : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="mr-3 mt-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className={`h-6 w-6 rounded-full ${
                                schedule.completed ? "bg-green-100 text-green-600 border-green-200" : "text-gray-400"
                              }`}
                              onClick={() => toggleComplete(schedule.id)}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <span className="text-[#3e435d] font-medium">{schedule.time}</span>
                              <Badge className={`ml-2 ${getPriorityColor(schedule.priority)}`}>
                                {schedule.priority}
                              </Badge>
                            </div>
                            <h3
                              className={`font-medium ${schedule.completed ? "text-gray-500 line-through" : "text-[#3e435d]"}`}
                            >
                              {schedule.activity}
                            </h3>
                            <p className={`text-sm mt-1 ${schedule.completed ? "text-gray-400" : "text-[#86909c]"}`}>
                              {schedule.notes}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Schedule</CardTitle>
                  <CardDescription>Future tasks assigned to you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {schedules
                      .filter((schedule) => schedule.date !== "Today")
                      .map((schedule) => (
                        <div key={schedule.id} className="flex items-start p-3 border rounded-lg hover:bg-gray-50">
                          <div className="mr-3 mt-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 rounded-full text-gray-400"
                              disabled
                            >
                              <Clock className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <span className="text-[#3e435d] font-medium mr-2">{schedule.date}</span>
                              <span className="text-[#3e435d] font-medium">{schedule.time}</span>
                              <Badge className={`ml-2 ${getPriorityColor(schedule.priority)}`}>
                                {schedule.priority}
                              </Badge>
                            </div>
                            <h3 className="text-[#3e435d] font-medium">{schedule.activity}</h3>
                            <p className="text-[#86909c] text-sm mt-1">{schedule.notes}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Completed Tasks</CardTitle>
                  <CardDescription>Tasks you have completed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {schedules
                      .filter((schedule) => schedule.completed)
                      .map((schedule) => (
                        <div key={schedule.id} className="flex items-start p-3 border rounded-lg bg-gray-50">
                          <div className="mr-3 mt-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 rounded-full bg-green-100 text-green-600 border-green-200"
                              onClick={() => toggleComplete(schedule.id)}
                            >
                              <CheckCircle2 className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <span className="text-gray-500 font-medium mr-2">{schedule.date}</span>
                              <span className="text-gray-500 font-medium">{schedule.time}</span>
                              <Badge className={`ml-2 ${getPriorityColor(schedule.priority)}`}>
                                {schedule.priority}
                              </Badge>
                            </div>
                            <h3 className="text-gray-500 font-medium line-through">{schedule.activity}</h3>
                            <p className="text-gray-400 text-sm mt-1">{schedule.notes}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

