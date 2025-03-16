"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { useScheduleStore } from "@/lib/store"

export default function CaregiverChildrenView() {
  const { children } = useScheduleStore()

  return (
    <div className="flex bg-[#f9f9f9] min-h-screen font-sans">
      <Sidebar />

      <div className="ml-16 flex-1 flex flex-col">
        <Header userName="Rihan" userRole="caregiver" />

        <main className="pt-24 p-6 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#3e435d]">Children Information</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children.length === 0 ? (
              <div className="col-span-full text-center py-8 text-[#86909c]">No children information available.</div>
            ) : (
              children.map((child) => (
                <Card key={child.id} className="overflow-hidden">
                  <CardHeader className="bg-[#f0f7ff] pb-2">
                    <div className="flex items-center">
                      <div className="bg-[#4182f9] rounded-full p-2 mr-3">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{child.name}</CardTitle>
                        <CardDescription>Age: {child.age}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
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
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

