"use client"

import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import CalendarView from "@/components/ui/calendar-view"

export default function ParentCalendarPage() {
  return (
    <div className="flex bg-[#f9f9f9] min-h-screen font-sans">
      <Sidebar />

      <div className="ml-16 flex-1 flex flex-col">
        <Header userName="Amanda" userRole="parent" />

        <main className="pt-24 p-6 flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#3e435d]">Schedule Calendar</h1>
            <p className="text-[#86909c]">View and manage all scheduled activities</p>
          </div>

          <CalendarView userRole="parent" />
        </main>
      </div>
    </div>
  )
}

