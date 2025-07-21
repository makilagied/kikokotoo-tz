"use client"
import PensionCalculator from "@/components/pension-calculator"

export default function PensionGodApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-indigo-100/30"></div>
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <PensionCalculator />
        </div>
      </div>
    </div>
  )
}
