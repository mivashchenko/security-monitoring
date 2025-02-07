
import {
  ArrowDown,
  ArrowRight,
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  Timer,
} from "lucide-react"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const severities = [
  {
    value: "no issue",
    label: "No issue",
    icon: HelpCircle,
  },
  {
    value: "low",
    label: "Low",
    icon: Circle,
  },
  {
    value: "medium",
    label: "Medium",
    icon: Timer,
  },
  {
    value: "high",
    label: "High",
    icon: CheckCircle,
  },
  {
    value: "critical",
    label: "Critical",
    icon: CircleOff,
  },
]

export const statuses = [
  {
    label: "Ok",
    value: "ok",
    icon: ArrowDown,
  },
  {
    label: "Alert",
    value: "alert",
    icon: ArrowRight,
  },
]
