"use client"

import type React from "react"

import { useState } from "react"
import { Edit, MoreHorizontal, Plus, Trash2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { useScheduleStore, caregivers, type Priority } from "@/lib/store"

export default function ParentDashboard() {
  const { schedules, addSchedule, updateSchedule, deleteSchedule, children } = useScheduleStore()
  const [editingSchedule, setEditingSchedule] = useState<number | null>(null)

  const handleAddSchedule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const newSchedule = {
      date: (formData.get("date") as string) || "Today",
      time: formData.get("time") as string,
      activity: formData.get("activity") as string,
      notes: formData.get("notes") as string,
      caregiver: formData.get("caregiver") as string,
      priority: formData.get("priority") as Priority,
      completed: false,
      childId: formData.get("childId") ? Number.parseInt(formData.get("childId") as string) : undefined,
    }

    if (editingSchedule !== null) {
      updateSchedule(editingSchedule, newSchedule)
      setEditingSchedule(null)
    } else {
      addSchedule(newSchedule)
    }

    // Reset form
    form.reset()
  }

  const handleEdit = (id: number) => {
    setEditingSchedule(id)
  }

  const cancelEdit = () => {
    setEditingSchedule(null)
  }

  const getPriorityColor = (priority: Priority) => {
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

  const editingScheduleData = editingSchedule !== null ? schedules.find((s) => s.id === editingSchedule) : null

  return (
    <div className="flex bg-[#f9f9f9] min-h-screen font-sans">
      <Sidebar />

      <div className="ml-16 flex-1 flex flex-col">
        <Header userName="Amanda" userRole="parent" />

        <main className="pt-24 p-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Form for creating/editing schedules */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">
                  {editingSchedule !== null ? "Edit Schedule" : "Create Schedule"}
                </CardTitle>
                <CardDescription>
                  {editingSchedule !== null ? "Update the schedule details" : "Add a new schedule for your caregiver"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddSchedule} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Select name="date" defaultValue={editingScheduleData?.date || "Today"}>
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
                    <Label htmlFor="childId">Child</Label>
                    <Select name="childId" defaultValue={editingScheduleData?.childId?.toString() || ""}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select child" />
                      </SelectTrigger>
                      <SelectContent>
                        {children.map((child) => (
                          <SelectItem key={child.id} value={child.id.toString()}>
                            {child.name} (Age: {child.age})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" name="time" type="time" defaultValue={editingScheduleData?.time || ""} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activity">Activity</Label>
                    <Input
                      id="activity"
                      name="activity"
                      placeholder="Enter activity name"
                      defaultValue={editingScheduleData?.activity || ""}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Add instructions or notes"
                      defaultValue={editingScheduleData?.notes || ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="caregiver">Assign to Caregiver</Label>
                    <Select name="caregiver" defaultValue={editingScheduleData?.caregiver || caregivers[0]}>
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
                      defaultValue={editingScheduleData?.priority || "medium"}
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
                      {editingSchedule !== null ? (
                        "Update Schedule"
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" /> Add Schedule
                        </>
                      )}
                    </Button>
                    {editingSchedule !== null && (
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
                        {schedules.length === 0 ? (
                          <div className="text-center py-8 text-[#86909c]">
                            No schedules found. Create one to get started.
                          </div>
                        ) : (
                          schedules.map((schedule) => (
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
                                <div className="flex items-center mt-2 space-x-4">
                                  <div className="flex items-center">
                                    <Avatar className="h-6 w-6 mr-2">
                                      <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Caregiver" />
                                      <AvatarFallback>CA</AvatarFallback>
                                    </Avatar>
                                    <span className="text-[#86909c] text-xs">Assigned to {schedule.caregiver}</span>
                                  </div>
                                  {schedule.childId && (
                                    <div className="flex items-center">
                                      <User className="h-4 w-4 mr-1 text-[#86909c]" />
                                      <span className="text-[#86909c] text-xs">
                                        For: {children.find((c) => c.id === schedule.childId)?.name || "Unknown child"}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEdit(schedule.id)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => deleteSchedule(schedule.id)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          ))
                        )}
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
                                <div className="flex items-center mt-2 space-x-4">
                                  <div className="flex items-center">
                                    <Avatar className="h-6 w-6 mr-2">
                                      <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Caregiver" />
                                      <AvatarFallback>CA</AvatarFallback>
                                    </Avatar>
                                    <span className="text-[#86909c] text-xs">Assigned to {schedule.caregiver}</span>
                                  </div>
                                  {schedule.childId && (
                                    <div className="flex items-center">
                                      <User className="h-4 w-4 mr-1 text-[#86909c]" />
                                      <span className="text-[#86909c] text-xs">
                                        For: {children.find((c) => c.id === schedule.childId)?.name || "Unknown child"}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEdit(schedule.id)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => deleteSchedule(schedule.id)}>
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
                                <div className="flex items-center mt-2 space-x-4">
                                  <div className="flex items-center">
                                    <Avatar className="h-6 w-6 mr-2">
                                      <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Caregiver" />
                                      <AvatarFallback>CA</AvatarFallback>
                                    </Avatar>
                                    <span className="text-[#86909c] text-xs">Assigned to {schedule.caregiver}</span>
                                  </div>
                                  {schedule.childId && (
                                    <div className="flex items-center">
                                      <User className="h-4 w-4 mr-1 text-[#86909c]" />
                                      <span className="text-[#86909c] text-xs">
                                        For: {children.find((c) => c.id === schedule.childId)?.name || "Unknown child"}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEdit(schedule.id)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => deleteSchedule(schedule.id)}>
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
                                <div className="flex items-center mt-2 space-x-4">
                                  <div className="flex items-center">
                                    <Avatar className="h-6 w-6 mr-2">
                                      <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Caregiver" />
                                      <AvatarFallback>CA</AvatarFallback>
                                    </Avatar>
                                    <span className="text-[#86909c] text-xs">Assigned to {schedule.caregiver}</span>
                                  </div>
                                  {schedule.childId && (
                                    <div className="flex items-center">
                                      <User className="h-4 w-4 mr-1 text-[#86909c]" />
                                      <span className="text-[#86909c] text-xs">
                                        For: {children.find((c) => c.id === schedule.childId)?.name || "Unknown child"}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEdit(schedule.id)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => deleteSchedule(schedule.id)}>
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
        </main>
      </div>
    </div>
  )
}

