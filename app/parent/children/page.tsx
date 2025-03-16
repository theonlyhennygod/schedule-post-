"use client"

import type React from "react"

import { useState } from "react"
import { Edit, MoreHorizontal, Plus, Trash2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { useScheduleStore, type Child } from "@/lib/store"

export default function ChildrenManagement() {
  const { children, addChild, updateChild, deleteChild } = useScheduleStore()
  const [editingChild, setEditingChild] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<string>("list")

  const handleAddChild = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const newChild = {
      name: formData.get("name") as string,
      age: Number.parseInt(formData.get("age") as string),
      preferences: {
        foodPreferences: formData.get("foodPreferences") as string,
        allergies: formData.get("allergies") as string,
        bedtimeRoutine: formData.get("bedtimeRoutine") as string,
        favoriteActivities: formData.get("favoriteActivities") as string,
        specialNotes: formData.get("specialNotes") as string,
      },
    }

    if (editingChild !== null) {
      updateChild(editingChild, newChild)
      setEditingChild(null)
    } else {
      addChild(newChild)
    }

    // Reset form
    form.reset()
    setActiveTab("list")
  }

  const handleEdit = (child: Child) => {
    setEditingChild(child.id)
    setActiveTab("add")
  }

  const cancelEdit = () => {
    setEditingChild(null)
    setActiveTab("list")
  }

  const editingChildData = editingChild !== null ? children.find((c) => c.id === editingChild) : null

  return (
    <div className="flex bg-[#f9f9f9] min-h-screen font-sans">
      <Sidebar />

      <div className="ml-16 flex-1 flex flex-col">
        <Header userName="Amanda" userRole="parent" />

        <main className="pt-24 p-6 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#3e435d]">Children Management</h1>
            {activeTab === "list" && (
              <Button onClick={() => setActiveTab("add")} className="bg-[#4182f9]">
                <Plus className="mr-2 h-4 w-4" /> Add Child
              </Button>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="list">Children List</TabsTrigger>
              <TabsTrigger value="add">{editingChild !== null ? "Edit Child" : "Add Child"}</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {children.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-[#86909c]">
                    No children added yet. Click "Add Child" to get started.
                  </div>
                ) : (
                  children.map((child) => (
                    <Card key={child.id} className="overflow-hidden">
                      <CardHeader className="bg-[#f0f7ff] pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <div className="bg-[#4182f9] rounded-full p-2 mr-3">
                              <User className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{child.name}</CardTitle>
                              <CardDescription>Age: {child.age}</CardDescription>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(child)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteChild(child.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
            </TabsContent>

            <TabsContent value="add" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{editingChild !== null ? "Edit Child Information" : "Add New Child"}</CardTitle>
                  <CardDescription>
                    {editingChild !== null
                      ? "Update your child's information and preferences"
                      : "Enter your child's information and preferences"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddChild} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Child's Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter name"
                          defaultValue={editingChildData?.name || ""}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          min="0"
                          max="18"
                          placeholder="Enter age"
                          defaultValue={editingChildData?.age || ""}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="foodPreferences">Food Preferences</Label>
                      <Textarea
                        id="foodPreferences"
                        name="foodPreferences"
                        placeholder="Likes and dislikes"
                        defaultValue={editingChildData?.preferences.foodPreferences || ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Textarea
                        id="allergies"
                        name="allergies"
                        placeholder="Any allergies or dietary restrictions"
                        defaultValue={editingChildData?.preferences.allergies || ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bedtimeRoutine">Bedtime Routine</Label>
                      <Textarea
                        id="bedtimeRoutine"
                        name="bedtimeRoutine"
                        placeholder="Describe the bedtime routine"
                        defaultValue={editingChildData?.preferences.bedtimeRoutine || ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="favoriteActivities">Favorite Activities</Label>
                      <Textarea
                        id="favoriteActivities"
                        name="favoriteActivities"
                        placeholder="Games, toys, activities they enjoy"
                        defaultValue={editingChildData?.preferences.favoriteActivities || ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialNotes">Special Notes</Label>
                      <Textarea
                        id="specialNotes"
                        name="specialNotes"
                        placeholder="Any other important information"
                        defaultValue={editingChildData?.preferences.specialNotes || ""}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1 bg-[#4182f9]">
                        {editingChild !== null ? "Update Child" : "Add Child"}
                      </Button>
                      <Button type="button" variant="outline" onClick={cancelEdit}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

