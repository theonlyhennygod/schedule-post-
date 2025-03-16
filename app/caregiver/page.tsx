"use client"

import { Check, CheckCircle2, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { useScheduleStore, type Priority } from "@/lib/store"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function CaregiverDashboard() {
  const { schedules, toggleComplete, children } = useScheduleStore()

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

  const todaySchedules = schedules.filter((s) => s.date === "Today")
  const completedToday = todaySchedules.filter((s) => s.completed).length
  const progressPercentage = todaySchedules.length > 0 ? (completedToday / todaySchedules.length) * 100 : 0

  const ChildPreferencesDialog = ({ childId }: { childId: number }) => {
    const child = children.find((c) => c.id === childId)

    if (!child) return null

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" size="sm" className="h-auto p-0 text-[#4182f9]">
            View preferences
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{child.name}'s Preferences</DialogTitle>
            <DialogDescription>Age: {child.age}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <h3 className="text-sm font-medium text-[#3e435d]">Food Preferences</h3>
              <p className="text-sm text-[#86909c]">{child.preferences.foodPreferences}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#3e435d]">Allergies</h3>
              <p className="text-sm text-[#86909c]">{child.preferences.allergies || "None"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#3e435d]">Bedtime Routine</h3>
              <p className="text-sm text-[#86909c]">{child.preferences.bedtimeRoutine}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#3e435d]">Favorite Activities</h3>
              <p className="text-sm text-[#86909c]">{child.preferences.favoriteActivities}</p>
            </div>

            {child.preferences.specialNotes && (
              <div>
                <h3 className="text-sm font-medium text-[#3e435d]">Special Notes</h3>
                <p className="text-sm text-[#86909c]">{child.preferences.specialNotes}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="flex bg-[#f9f9f9] min-h-screen font-sans">
      <Sidebar />

      <div className="ml-16 flex-1 flex flex-col">
        <Header userName="Rihan" userRole="caregiver" />

        <main className="pt-24 p-6 flex-1">
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
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-[#86909c]" />
                      <span className="text-sm font-medium">
                        {todaySchedules.filter((s) => !s.completed)[0]?.time} -{" "}
                        {todaySchedules.filter((s) => !s.completed)[0]?.activity}
                      </span>
                    </div>
                    {todaySchedules.filter((s) => !s.completed)[0]?.childId && (
                      <div className="flex items-center mt-1 ml-6">
                        <User className="h-3 w-3 mr-1 text-[#86909c]" />
                        <span className="text-xs text-[#86909c]">
                          For:{" "}
                          {children.find((c) => c.id === todaySchedules.filter((s) => !s.completed)[0]?.childId)?.name}
                        </span>
                      </div>
                    )}
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
                            {schedule.childId && (
                              <div className="flex items-center mt-2">
                                <User className="h-4 w-4 mr-1 text-[#86909c]" />
                                <span className={`text-xs ${schedule.completed ? "text-gray-400" : "text-[#86909c]"}`}>
                                  For: {children.find((c) => c.id === schedule.childId)?.name || "Unknown child"}
                                  <ChildPreferencesDialog childId={schedule.childId} />
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                    {todaySchedules.length === 0 && (
                      <div className="text-center py-8 text-[#86909c]">No tasks scheduled for today.</div>
                    )}
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
                            {schedule.childId && (
                              <div className="flex items-center mt-2">
                                <User className="h-4 w-4 mr-1 text-[#86909c]" />
                                <span className={`text-xs text-[#86909c]`}>
                                  For: {children.find((c) => c.id === schedule.childId)?.name || "Unknown child"}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                    {schedules.filter((schedule) => schedule.date !== "Today").length === 0 && (
                      <div className="text-center py-8 text-[#86909c]">No upcoming tasks scheduled.</div>
                    )}
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
                            {schedule.childId && (
                              <div className="flex items-center mt-2">
                                <User className="h-4 w-4 mr-1 text-gray-400" />
                                <span className="text-xs text-gray-400">
                                  For: {children.find((c) => c.id === schedule.childId)?.name || "Unknown child"}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                    {schedules.filter((schedule) => schedule.completed).length === 0 && (
                      <div className="text-center py-8 text-[#86909c]">No completed tasks yet.</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

