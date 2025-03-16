"use client"

import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import CalendarView from "@/components/ui/calendar-view"

export default function CaregiverCalendarPage() {
  return (
    <div className="flex bg-[#f9f9f9] min-h-screen font-sans">
      <Sidebar />

      <div className="ml-16 flex-1 flex flex-col">
        <Header userName="Rihan" userRole="caregiver" />

        <main className="pt-24 p-6 flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#3e435d]">Schedule Calendar</h1>
            <p className="text-[#86909c]">View your assigned activities</p>
          </div>

          <CalendarView userRole="caregiver" />
        </main>
      </div>
    </div>
  )
}

