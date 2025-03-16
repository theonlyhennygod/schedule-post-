"use client"

import { useState } from "react"
import {
  Bell,
  Calendar,
  Clock,
  Grid,
  Home,
  Image,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  User,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"

export default function SchedulePost() {
  const [userRole, setUserRole] = useState("parent")
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      date: "Today",
      time: "09:00",
      activity: "School Drop-off",
      notes: "Pack lunch and water bottle",
      caregiver: "Rihan Arfj",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      date: "Today",
      time: "15:30",
      activity: "School Pick-up",
      notes: "Don't forget the art project",
      caregiver: "Rihan Arfj",
      priority: "high",
      completed: false,
    },
    {
      id: 3,
      date: "Today",
      time: "18:00",
      activity: "Swimming Lesson",
      notes: "Bring towel and goggles",
      caregiver: "Rihan Arfj",
      priority: "medium",
      completed: false,
    },
    {
      id: 4,
      date: "Today",
      time: "20:00",
      activity: "Bedtime Routine",
      notes: "Read a story before sleep",
      caregiver: "Rihan Arfj",
      priority: "medium",
      completed: false,
    },
  ])

  const handleAddSchedule = (e) => {
    e.preventDefault()
    const form = e.target
    const newSchedule = {
      id: schedules.length + 1,
      date: "Today",
      time: form.time.value,
      activity: form.activity.value,
      notes: form.notes.value,
      caregiver: "Rihan Arfj",
      priority: form.priority.value,
      completed: false,
    }
    setSchedules([...schedules, newSchedule])

    // Reset form
    form.reset()
  }

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
          <button className="p-2 rounded-lg hover:bg-[#f9f9f9] text-[#86909c]">
            <Home size={20} />
          </button>
          <button className="p-2 rounded-lg bg-[#efefef] text-[#4182f9]">
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
              <h1 className="text-[#3e435d] font-medium text-lg">Welcome, Amanda</h1>
              <p className="text-[#86909c] text-xs">Tue, 07 June 2022</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={userRole} onValueChange={setUserRole}>
              <SelectTrigger className="w-[180px] bg-[#f9f9f9] border-none">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="caregiver">Caregiver</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#86909c]" size={16} />
              <Input className="pl-10 pr-4 py-2 w-64 bg-[#f9f9f9] border-none text-sm" placeholder="Search" />
            </div>
            <button className="p-2 rounded-full hover:bg-[#f9f9f9] text-[#86909c]">
              <Bell size={20} />
            </button>
            <Avatar className="h-8 w-8 bg-[#efefef]">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <Tabs defaultValue="home" className="w-full">
            <TabsList className="bg-transparent border-b border-[#d9d9d9] w-full justify-start mb-4 p-0 h-auto">
              <TabsTrigger
                value="home"
                className="text-sm px-0 py-2 mr-6 data-[state=active]:border-b-2 data-[state=active]:border-[#4182f9] data-[state=active]:text-[#4182f9] data-[state=active]:shadow-none rounded-none bg-transparent h-auto"
              >
                Home
              </TabsTrigger>
              <TabsTrigger
                value="schedule-post"
                className="text-sm px-0 py-2 mr-6 data-[state=active]:border-b-2 data-[state=active]:border-[#4182f9] data-[state=active]:text-[#4182f9] data-[state=active]:shadow-none rounded-none bg-transparent h-auto"
              >
                Schedule Post
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Form for creating schedules - only visible to parents */}
                {userRole === "parent" && (
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle className="text-lg">Create Schedule</CardTitle>
                      <CardDescription>Add a new schedule for your caregiver</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddSchedule} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="time">Time</Label>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-[#86909c]" />
                            <Input id="time" name="time" type="time" required />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="activity">Activity</Label>
                          <Input id="activity" name="activity" placeholder="Enter activity name" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes">Notes</Label>
                          <Textarea id="notes" name="notes" placeholder="Add instructions or notes" />
                        </div>

                        <div className="space-y-2">
                          <Label>Priority</Label>
                          <RadioGroup defaultValue="medium" name="priority" className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="high" id="high" />
                              <Label htmlFor="high" className="text-red-600">
                                High
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="medium" id="medium" />
                              <Label htmlFor="medium" className="text-orange-600">
                                Medium
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="low" id="low" />
                              <Label htmlFor="low" className="text-green-600">
                                Low
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch id="recurring" />
                          <Label htmlFor="recurring">Recurring schedule</Label>
                        </div>

                        <Button type="submit" className="w-full bg-[#4182f9]">
                          <Plus className="mr-2 h-4 w-4" /> Add Schedule
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Schedule List - visible to both parents and caregivers */}
                <div className={`${userRole === "parent" ? "col-span-2" : "col-span-3"}`}>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Today's Schedule</CardTitle>
                        <CardDescription>July 21, 2022</CardDescription>
                      </div>
                      {userRole === "caregiver" && <Badge className="bg-[#4182f9]">Assigned to you</Badge>}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {schedules.map((schedule) => (
                          <div key={schedule.id} className="flex items-start p-3 border rounded-lg hover:bg-gray-50">
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                <span className="text-[#3e435d] font-medium">{schedule.time}</span>
                                <Badge className={`ml-2 ${getPriorityColor(schedule.priority)}`}>
                                  {schedule.priority}
                                </Badge>
                                {schedule.completed && (
                                  <Badge className="ml-2 bg-blue-100 text-blue-800">Completed</Badge>
                                )}
                              </div>
                              <h3 className="text-[#3e435d] font-medium">{schedule.activity}</h3>
                              <p className="text-[#86909c] text-sm mt-1">{schedule.notes}</p>
                            </div>

                            {userRole === "caregiver" && (
                              <div className="ml-4">
                                <Button
                                  variant={schedule.completed ? "outline" : "default"}
                                  size="sm"
                                  onClick={() => toggleComplete(schedule.id)}
                                  className={schedule.completed ? "border-green-500 text-green-500" : "bg-[#4182f9]"}
                                >
                                  {schedule.completed ? "Completed" : "Mark Complete"}
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule-post" className="mt-0">
              <h2 className="text-xl font-medium text-[#3e435d] mb-4">Schedule Post</h2>
              <Tabs defaultValue="schedule-on" className="w-full">
                <TabsList className="bg-transparent border-b border-[#d9d9d9] w-full justify-start mb-4 p-0 h-auto">
                  <TabsTrigger
                    value="schedule-on"
                    className="text-sm px-0 py-2 mr-6 data-[state=active]:border-b-2 data-[state=active]:border-[#4182f9] data-[state=active]:text-[#4182f9] data-[state=active]:shadow-none rounded-none bg-transparent h-auto"
                  >
                    Schedule On
                  </TabsTrigger>
                  <TabsTrigger
                    value="post-content"
                    className="text-sm px-0 py-2 mr-6 data-[state=active]:border-b-2 data-[state=active]:border-[#4182f9] data-[state=active]:text-[#4182f9] data-[state=active]:shadow-none rounded-none bg-transparent h-auto"
                  >
                    Post Content
                  </TabsTrigger>
                  <TabsTrigger
                    value="schedule-for"
                    className="text-sm px-0 py-2 mr-6 data-[state=active]:border-b-2 data-[state=active]:border-[#4182f9] data-[state=active]:text-[#4182f9] data-[state=active]:shadow-none rounded-none bg-transparent h-auto"
                  >
                    Schedule For
                  </TabsTrigger>
                  <TabsTrigger
                    value="schedule-by"
                    className="text-sm px-0 py-2 mr-6 data-[state=active]:border-b-2 data-[state=active]:border-[#4182f9] data-[state=active]:text-[#4182f9] data-[state=active]:shadow-none rounded-none bg-transparent h-auto"
                  >
                    Schedule By
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="schedule-on" className="mt-0">
                  <div className="space-y-0">
                    {[...Array(8)].map((_, index) => (
                      <div key={index} className="flex items-center py-3 border-b border-[#efefef]">
                        <div className="w-36">
                          <p className="text-[#3e435d] text-sm font-medium">Today</p>
                          <p className="text-[#86909c] text-xs">at 09:00, July 21 2022</p>
                        </div>

                        <div className="flex items-center flex-1">
                          <Avatar className="h-8 w-8 mr-3 bg-[#efefef]">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Post" />
                            <AvatarFallback>P</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-[#3e435d] text-sm font-medium">Hi Guys!</p>
                            <p className="text-[#86909c] text-xs">Lorem ipsum is simply dummy text.</p>
                          </div>
                        </div>

                        <div className="flex items-center w-32">
                          <Avatar className="h-8 w-8 mr-3 bg-[#efefef]">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Dribbble" />
                            <AvatarFallback>D</AvatarFallback>
                          </Avatar>
                          <span className="text-[#3e435d] text-sm">Dribbble</span>
                        </div>

                        <div className="flex items-center w-32">
                          <Avatar className="h-8 w-8 mr-3 bg-[#efefef]">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                            <AvatarFallback>R</AvatarFallback>
                          </Avatar>
                          <span className="text-[#3e435d] text-sm">Rihan Arfj</span>
                        </div>

                        <button className="text-[#86909c] p-1 ml-2">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="post-content">
                  <div className="text-center py-8 text-[#86909c]">Post content tab content</div>
                </TabsContent>

                <TabsContent value="schedule-for">
                  <div className="text-center py-8 text-[#86909c]">Schedule for tab content</div>
                </TabsContent>

                <TabsContent value="schedule-by">
                  <div className="text-center py-8 text-[#86909c]">Schedule by tab content</div>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

