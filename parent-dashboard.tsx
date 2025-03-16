"use client"

import { useState } from "react"
import {
  Bell,
  Calendar,
  Clock,
  Edit,
  Grid,
  Home,
  Image,
  Menu,
  MoreHorizontal,
  Search,
  Settings,
  Trash2,
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ParentDashboard() {
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
      completed: true,
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
      date: "Tomorrow",
      time: "10:00",
      activity: "Doctor's Appointment",
      notes: "Bring health insurance card",
      caregiver: "Rihan Arfj",
      priority: "high",
      completed: false,
    },
    {
      id: 5,
      date: "Tomorrow",
      time: "16:00",
      activity: "Piano Lesson",
      notes: "Practice sheet music beforehand",
      caregiver: "Rihan Arfj",
      priority: "medium",
      completed: false,
    },
  ])

  const [editingSchedule, setEditingSchedule] = useState(null)

  const handleAddSchedule = (e) => {
    e.preventDefault()
    const form = e.target

    const newSchedule = {
      id: editingSchedule ? editingSchedule.id : schedules.length + 1,
      date: form.date.value || "Today",
      time: form.time.value,
      activity: form.activity.value,
      notes: form.notes.value,
      caregiver: form.caregiver.value,
      priority: form.priority.value,
      completed: editingSchedule ? editingSchedule.completed : false,
    }

    if (editingSchedule) {
      setSchedules(schedules.map((schedule) => (schedule.id === editingSchedule.id ? newSchedule : schedule)))
      setEditingSchedule(null)
    } else {
      setSchedules([...schedules, newSchedule])
    }

    // Reset form
    form.reset()
  }

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule)
  }

  const handleDelete = (id) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id))
  }

  const cancelEdit = () => {
    setEditingSchedule(null)
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

  const caregivers = ["Rihan Arfj", "Sarah Johnson", "Michael Chen"]

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
              <h1 className="text-[#3e435d] font-medium text-lg">Welcome, Amanda</h1>
              <p className="text-[#86909c] text-xs">Tue, 07 June 2022</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-[#4182f9]">Parent Dashboard</Badge>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Form for creating/editing schedules */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">{editingSchedule ? "Edit Schedule" : "Create Schedule"}</CardTitle>
                <CardDescription>
                  {editingSchedule ? "Update the schedule details" : "Add a new schedule for your caregiver"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddSchedule} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Select name="date" defaultValue={editingSchedule?.date || "Today"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Today">Today</SelectItem>
                        <SelectItem value="Tomorrow">Tomorrow</SelectItem>
                        <SelectItem value="In 2 days">In 2 days</SelectItem>
                        <SelectItem value="In 3 days">In 3 days</SelectItem>
                        <SelectItem value="In a week">In a week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-[#86909c]" />
                      <Input id="time" name="time" type="time" defaultValue={editingSchedule?.time || ""} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activity">Activity</Label>
                    <Input
                      id="activity"
                      name="activity"
                      placeholder="Enter activity name"
                      defaultValue={editingSchedule?.activity || ""}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Add instructions or notes"
                      defaultValue={editingSchedule?.notes || ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="caregiver">Assign to Caregiver</Label>
                    <Select name="caregiver" defaultValue={editingSchedule?.caregiver || caregivers[0]}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select caregiver" />
                      </SelectTrigger>
                      <SelectContent>
                        {caregivers.map((caregiver) => (
                          <SelectItem key={caregiver} value={caregiver}>
                            {caregiver}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <RadioGroup
                      defaultValue={editingSchedule?.priority || "medium"}
                      name="priority"
                      className="flex space-x-4"
                    >
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

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1 bg-[#4182f9]">
                      {editingSchedule ? "Update Schedule" : "Add Schedule"}
                    </Button>
                    {editingSchedule && (
                      <Button type="button" variant="outline" onClick={cancelEdit}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Schedule List */}
            <div className="col-span-2">
              <Tabs defaultValue="all">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="all">All Schedules</TabsTrigger>
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>

                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by caregiver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Caregivers</SelectItem>
                      {caregivers.map((caregiver) => (
                        <SelectItem key={caregiver} value={caregiver}>
                          {caregiver}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <TabsContent value="all" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">All Schedules</CardTitle>
                      <CardDescription>Manage all your scheduled activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {schedules.map((schedule) => (
                          <div key={schedule.id} className="flex items-start p-3 border rounded-lg hover:bg-gray-50">
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                <span className="text-[#3e435d] font-medium mr-2">{schedule.date}</span>
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
                              <div className="flex items-center mt-2">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Caregiver" />
                                  <AvatarFallback>CA</AvatarFallback>
                                </Avatar>
                                <span className="text-[#86909c] text-xs">Assigned to {schedule.caregiver}</span>
                              </div>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(schedule)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(schedule.id)}>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="today">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Today's Schedules</CardTitle>
                      <CardDescription>Activities scheduled for today</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {schedules
                          .filter((schedule) => schedule.date === "Today")
                          .map((schedule) => (
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
                                <div className="flex items-center mt-2">
                                  <Avatar className="h-6 w-6 mr-2">
                                    <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Caregiver" />
                                    <AvatarFallback>CA</AvatarFallback>
                                  </Avatar>
                                  <span className="text-[#86909c] text-xs">Assigned to {schedule.caregiver}</span>
                                </div>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEdit(schedule)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDelete(schedule.id)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="upcoming">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Upcoming Schedules</CardTitle>
                      <CardDescription>Future scheduled activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {schedules
                          .filter((schedule) => schedule.date !== "Today")
                          .map((schedule) => (
                            <div key={schedule.id} className="flex items-start p-3 border rounded-lg hover:bg-gray-50">
                              {/* Same content as above */}
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
                                <div className="flex items-center mt-2">
                                  <Avatar className="h-6 w-6 mr-2">
                                    <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Caregiver" />
                                    <AvatarFallback>CA</AvatarFallback>
                                  </Avatar>
                                  <span className="text-[#86909c] text-xs">Assigned to {schedule.caregiver}</span>
                                </div>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEdit(schedule)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDelete(schedule.id)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="completed">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Completed Schedules</CardTitle>
                      <CardDescription>Activities that have been completed</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {schedules
                          .filter((schedule) => schedule.completed)
                          .map((schedule) => (
                            <div
                              key={schedule.id}
                              className="flex items-start p-3 border rounded-lg hover:bg-gray-50 bg-gray-50"
                            >
                              {/* Same content as above */}
                              <div className="flex-1">
                                <div className="flex items-center mb-1">
                                  <span className="text-[#3e435d] font-medium mr-2">{schedule.date}</span>
                                  <span className="text-[#3e435d] font-medium">{schedule.time}</span>
                                  <Badge className={`ml-2 ${getPriorityColor(schedule.priority)}`}>
                                    {schedule.priority}
                                  </Badge>
                                  <Badge className="ml-2 bg-blue-100 text-blue-800">Completed</Badge>
                                </div>
                                <h3 className="text-[#3e435d] font-medium">{schedule.activity}</h3>
                                <p className="text-[#86909c] text-sm mt-1">{schedule.notes}</p>
                                <div className="flex items-center mt-2">
                                  <Avatar className="h-6 w-6 mr-2">
                                    <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Caregiver" />
                                    <AvatarFallback>CA</AvatarFallback>
                                  </Avatar>
                                  <span className="text-[#86909c] text-xs">Assigned to {schedule.caregiver}</span>
                                </div>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEdit(schedule)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDelete(schedule.id)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
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
      </div>
    </div>
  )
}

