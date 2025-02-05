'use client'

import { cn } from "@/lib/utils"

export type SeverityLevel = "low" | "medium" | "high" | "critical" | "no issue"

interface SeverityBadgeProps {
  level: SeverityLevel
  className?: string
}

const severityConfig: Record<SeverityLevel, { color: string; label: string }> = {
  ["no issue"]: { color: "bg-green-100 text-green-800", label: "No Issue" },
  low: { color: "bg-yellow-50 text-yellow-800", label: "Low" },
  medium: { color: "bg-yellow-100 text-yellow-800", label: "Medium" },
  high: { color: "bg-orange-100 text-orange-800", label: "High" },
  critical: { color: "bg-red-100 text-red-800", label: "Critical" },
}

export function SeverityBadge({ level, className }: SeverityBadgeProps) {
  const { color, label } = severityConfig[level] || severityConfig["no issue"]

  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2.5 py-0 text-xs font-medium", color, className)}
      role="status"
    >
      {label}
    </span>
  )
}