
import {
  ArrowDown,
  ArrowRight,
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  Timer,
} from "lucide-react"

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
    value: 0,
    icon: ArrowDown,
  },
  {
    label: "Flagged",
    value: 1,
    icon: ArrowRight,
  },
]
