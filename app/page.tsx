"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9f9f9] p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-8 text-[#3e435d]">Family Schedule App</h1>
        <div className="space-y-4">
          <Link href="/parent" className="block w-full">
            <Button className="w-full py-6 text-lg bg-[#4182f9] hover:bg-[#3a75e0]">Parent Dashboard</Button>
          </Link>
          <Link href="/caregiver" className="block w-full">
            <Button className="w-full py-6 text-lg bg-[#4182f9] hover:bg-[#3a75e0]">Caregiver Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

