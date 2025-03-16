import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Priority = "high" | "medium" | "low"

export interface Child {
  id: number
  name: string
  age: number
  preferences: {
    foodPreferences: string
    allergies: string
    bedtimeRoutine: string
    favoriteActivities: string
    specialNotes: string
  }
}

export interface Schedule {
  id: number
  date: string
  time: string
  activity: string
  notes: string
  caregiver: string
  priority: Priority
  completed: boolean
  childId?: number // Optional reference to a child
}

interface ScheduleStore {
  schedules: Schedule[]
  children: Child[]
  addSchedule: (schedule: Omit<Schedule, "id">) => void
  updateSchedule: (id: number, schedule: Partial<Schedule>) => void
  deleteSchedule: (id: number) => void
  toggleComplete: (id: number) => void
  addChild: (child: Omit<Child, "id">) => void
  updateChild: (id: number, child: Partial<Child>) => void
  deleteChild: (id: number) => void
}

export const useScheduleStore = create<ScheduleStore>()(
  persist(
    (set) => ({
      children: [
        {
          id: 1,
          name: "Emma",
          age: 7,
          preferences: {
            foodPreferences: "Loves pasta, dislikes broccoli",
            allergies: "Peanuts",
            bedtimeRoutine: "Story time at 8:30 PM",
            favoriteActivities: "Drawing, swimming",
            specialNotes: "Needs her stuffed bear for naps",
          },
        },
        {
          id: 2,
          name: "Noah",
          age: 5,
          preferences: {
            foodPreferences: "Likes chicken nuggets, hates peas",
            allergies: "None",
            bedtimeRoutine: "Bath before bed, lights out at 8 PM",
            favoriteActivities: "Building blocks, dinosaurs",
            specialNotes: "Afraid of the dark, needs night light",
          },
        },
      ],
      schedules: [
        {
          id: 1,
          date: "Today",
          time: "09:00",
          activity: "School Drop-off",
          notes: "Pack lunch and water bottle",
          caregiver: "Rihan Arfj",
          priority: "high",
          completed: false,
          childId: 1,
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
          childId: 1,
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
          childId: 1,
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
          childId: 2,
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
          childId: 2,
        },
        {
          id: 6,
          date: "In 2 days",
          time: "14:00",
          activity: "Playdate with Sam",
          notes: "At the park, bring snacks",
          caregiver: "Sarah Johnson",
          priority: "low",
          completed: false,
          childId: 1,
        },
        {
          id: 7,
          date: "In 3 days",
          time: "09:30",
          activity: "Dentist Appointment",
          notes: "Regular checkup",
          caregiver: "Michael Chen",
          priority: "high",
          completed: false,
          childId: 2,
        },
        {
          id: 8,
          date: "In a week",
          time: "17:00",
          activity: "Family Dinner",
          notes: "At Grandma's house",
          caregiver: "Sarah Johnson",
          priority: "medium",
          completed: false,
        },
      ],
      addSchedule: (schedule) =>
        set((state) => ({
          schedules: [...state.schedules, { ...schedule, id: Math.max(0, ...state.schedules.map((s) => s.id)) + 1 }],
        })),
      updateSchedule: (id, updatedSchedule) =>
        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule.id === id ? { ...schedule, ...updatedSchedule } : schedule,
          ),
        })),
      deleteSchedule: (id) =>
        set((state) => ({
          schedules: state.schedules.filter((schedule) => schedule.id !== id),
        })),
      toggleComplete: (id) =>
        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule.id === id ? { ...schedule, completed: !schedule.completed } : schedule,
          ),
        })),
      addChild: (child) =>
        set((state) => ({
          children: [...state.children, { ...child, id: Math.max(0, ...state.children.map((c) => c.id)) + 1 }],
        })),
      updateChild: (id, updatedChild) =>
        set((state) => ({
          children: state.children.map((child) => (child.id === id ? { ...child, ...updatedChild } : child)),
        })),
      deleteChild: (id) =>
        set((state) => ({
          children: state.children.filter((child) => child.id !== id),
          // Also remove schedules associated with this child
          schedules: state.schedules.filter((schedule) => schedule.childId !== id),
        })),
    }),
    {
      name: "schedule-storage",
    },
  ),
)

export const caregivers = ["Rihan Arfj", "Sarah Johnson", "Michael Chen"]

