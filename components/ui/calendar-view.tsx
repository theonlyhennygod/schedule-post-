"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useScheduleStore, type Schedule, type Priority } from "@/lib/store"

interface CalendarViewProps {
  userRole: "parent" | "caregiver"
}

export default function CalendarView({ userRole }: CalendarViewProps) {
  const { schedules, children, toggleComplete } = useScheduleStore()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"month" | "week">("month")
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null)
  const [filterChildId, setFilterChildId] = useState<string>("all")
  const [filterCaregiverId, setFilterCaregiverId] = useState<string>("all")

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)

  // Generate calendar days
  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ day: null, date: null })
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day)
    calendarDays.push({ day, date })
  }

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Format date to string (e.g., "Today", "Tomorrow", or "In 2 days")
  const formatDateToString = (date: Date): string => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const inTwoDays = new Date(today)
    inTwoDays.setDate(inTwoDays.getDate() + 2)

    const inThreeDays = new Date(today)
    inThreeDays.setDate(inThreeDays.getDate() + 3)

    const inAWeek = new Date(today)
    inAWeek.setDate(inAWeek.getDate() + 7)

    date.setHours(0, 0, 0, 0)

    if (date.getTime() === today.getTime()) return "Today"
    if (date.getTime() === tomorrow.getTime()) return "Tomorrow"
    if (date.getTime() === inTwoDays.getTime()) return "In 2 days"
    if (date.getTime() === inThreeDays.getTime()) return "In 3 days"
    if (date.getTime() === inAWeek.getTime()) return "In a week"

    return ""
  }

  // Get schedules for a specific date
  const getSchedulesForDate = (date: Date | null) => {
    if (!date) return []

    const dateString = formatDateToString(date)

    // If the date is not one of our special strings, return empty array
    if (!dateString && date.getMonth() === currentMonth) {
      // For demo purposes, randomly assign some schedules to dates that don't match our special strings
      // In a real app, you'd use actual date objects throughout
      if (Math.random() > 0.7) {
        return schedules.filter((_, index) => index % 5 === date.getDate() % 5)
      }
      return []
    }

    let filteredSchedules = schedules.filter((schedule) => schedule.date === dateString)

    // Apply child filter if selected
    if (filterChildId !== "all") {
      filteredSchedules = filteredSchedules.filter((schedule) => schedule.childId === Number.parseInt(filterChildId))
    }

    // Apply caregiver filter if selected (parent view only)
    if (userRole === "parent" && filterCaregiverId !== "all") {
      filteredSchedules = filteredSchedules.filter((schedule) => schedule.caregiver === filterCaregiverId)
    }

    return filteredSchedules
  }

  // Get color for priority
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
    }
  }

  // Get unique caregivers from schedules
  const caregivers = [...new Set(schedules.map((schedule) => schedule.caregiver))]

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Day names
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <div className="flex ml-4">
            <Button variant="outline" size="icon" onClick={prevMonth} className="mr-1">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="ml-2" onClick={goToToday}>
              Today
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select value={viewMode} onValueChange={(value) => setViewMode(value as "month" | "week")}>
            <SelectTrigger className="w-full sm:w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterChildId} onValueChange={setFilterChildId}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Filter by child" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Children</SelectItem>
              {children.map((child) => (
                <SelectItem key={child.id} value={child.id.toString()}>
                  {child.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {userRole === "parent" && (
            <Select value={filterCaregiverId} onValueChange={setFilterCaregiverId}>
              <SelectTrigger className="w-full sm:w-[150px]">
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
          )}
        </div>
      </div>

      <div className="bg-card rounded-lg shadow overflow-hidden">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 bg-muted/50">
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 border-t border-l border-border">
          {calendarDays.map((calendarDay, index) => {
            const isToday = calendarDay.date && new Date().toDateString() === calendarDay.date.toDateString()

            const daySchedules = calendarDay.date ? getSchedulesForDate(calendarDay.date) : []

            return (
              <div
                key={index}
                className={`min-h-[120px] p-1 border-r border-b border-border relative ${
                  isToday ? "bg-primary/5" : calendarDay.day ? "bg-card" : "bg-muted/20"
                }`}
              >
                {calendarDay.day && (
                  <>
                    <div className={`text-right p-1 ${isToday ? "font-bold text-primary" : ""}`}>{calendarDay.day}</div>
                    <div className="space-y-1 overflow-y-auto max-h-[80px]">
                      {daySchedules.map((schedule) => (
                        <div
                          key={schedule.id}
                          className={`text-xs p-1 rounded cursor-pointer transition-colors ${
                            schedule.completed
                              ? "bg-muted line-through text-muted-foreground"
                              : "bg-primary/5 hover:bg-primary/10"
                          }`}
                          onClick={() => setSelectedSchedule(schedule)}
                        >
                          <div className="flex items-center">
                            <span className="font-medium">{schedule.time}</span>
                            <Badge className={`ml-1 text-[0.6rem] py-0 px-1 ${getPriorityColor(schedule.priority)}`}>
                              {schedule.priority}
                            </Badge>
                          </div>
                          <div className="truncate">{schedule.activity}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Schedule Detail Dialog */}
      <Dialog open={!!selectedSchedule} onOpenChange={(open) => !open && setSelectedSchedule(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedSchedule?.activity}</DialogTitle>
            <DialogDescription>
              {selectedSchedule?.date} at {selectedSchedule?.time}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {selectedSchedule && (
              <>
                <div className="flex items-center justify-between">
                  <Badge className={getPriorityColor(selectedSchedule.priority)}>
                    {selectedSchedule.priority} priority
                  </Badge>
                  {selectedSchedule.completed && (
                    <Badge
                      variant="outline"
                      className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300"
                    >
                      Completed
                    </Badge>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Notes</h4>
                  <p className="text-sm text-muted-foreground">{selectedSchedule.notes || "No notes provided"}</p>
                </div>

                {selectedSchedule.childId && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Child</h4>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{children.find((c) => c.id === selectedSchedule.childId)?.name || "Unknown child"}</span>
                    </div>
                  </div>
                )}

                {userRole === "parent" && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Assigned to</h4>
                    <p className="text-sm">{selectedSchedule.caregiver}</p>
                  </div>
                )}

                {userRole === "caregiver" && !selectedSchedule.completed && (
                  <Button
                    className="w-full"
                    onClick={() => {
                      toggleComplete(selectedSchedule.id)
                      setSelectedSchedule(null)
                    }}
                  >
                    Mark as Completed
                  </Button>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

