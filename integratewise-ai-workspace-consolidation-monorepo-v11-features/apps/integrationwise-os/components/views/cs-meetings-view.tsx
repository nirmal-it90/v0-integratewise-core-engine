"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronLeft, ChevronRight, Video } from "lucide-react"
import Link from "next/link"
import { CognitiveTwinChat } from "@/components/cognitive-twin-chat"

// Mock data - replace with actual Spine entity queries
const mockMeetings = [
  {
    id: "MEET-00523",
    title: "Weekly Check-in Meeting",
    accountId: "2",
    accountName: "Nexlify",
    date: "2025-11-01",
    time: "14:00",
    duration: 60,
    type: "check-in",
    status: "scheduled",
    attendees: ["Sarah Kim", "Mike Johnson"],
    recordingUrl: null,
  },
  {
    id: "MEET-00527",
    title: "Q4 Business Review (QBR)",
    accountId: "2",
    accountName: "Nexlify",
    date: "2025-11-05",
    time: "09:00",
    duration: 90,
    type: "qbr",
    status: "scheduled",
    attendees: ["Sarah Kim", "Mike Johnson", "Tom Chen"],
    recordingUrl: null,
  },
  {
    id: "MEET-00531",
    title: "Executive Business Review",
    accountId: "3",
    accountName: "InnovateCo",
    date: "2025-11-06",
    time: "14:00",
    duration: 60,
    type: "ebc",
    status: "scheduled",
    attendees: ["Sarah Kim", "VP CS"],
    recordingUrl: null,
  },
  {
    id: "MEET-00535",
    title: "Q4 Quarterly Business Review",
    accountId: "1",
    accountName: "DataFlow Inc",
    date: "2025-11-12",
    time: "10:00",
    duration: 90,
    type: "qbr",
    status: "scheduled",
    attendees: ["Mike Johnson", "+3 more"],
    recordingUrl: null,
  },
  {
    id: "MEET-00519",
    title: "Product Training Workshop",
    accountId: "4",
    accountName: "TechStart Solutions",
    date: "2025-10-28",
    time: "15:00",
    duration: 90,
    type: "workshop",
    status: "completed",
    attendees: ["Lisa Chen", "+12 attendees"],
    recordingUrl: "https://example.com/recording/123",
  },
  {
    id: "MEET-00515",
    title: "Monthly Check-in",
    accountId: "5",
    accountName: "BuildFast Corp",
    date: "2025-10-25",
    time: "11:00",
    duration: 60,
    type: "check-in",
    status: "completed",
    attendees: ["Tom Rivera", "+2 more"],
    recordingUrl: "https://example.com/recording/124",
  },
]

type MeetingType = "qbr" | "check-in" | "ebc" | "workshop" | "training"
type MeetingStatus = "scheduled" | "completed" | "cancelled"

export function CSMeetingsView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10, 1)) // November 2025

  // Calculate stats
  const stats = useMemo(() => {
    const totalMeetings = mockMeetings.length
    const thisMonth = mockMeetings.filter((m) => {
      const meetingDate = new Date(m.date)
      return (
        meetingDate.getMonth() === currentMonth.getMonth() &&
        meetingDate.getFullYear() === currentMonth.getFullYear()
      )
    }).length
    const upcoming7d = mockMeetings.filter((m) => {
      const meetingDate = new Date(m.date)
      const today = new Date()
      const daysDiff = Math.ceil((meetingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      return daysDiff >= 0 && daysDiff <= 7 && m.status === "scheduled"
    }).length
    const qbrsCompleted = mockMeetings.filter((m) => m.type === "qbr" && m.status === "completed").length
    const recordingsAvailable = mockMeetings.filter((m) => m.recordingUrl).length

    return {
      totalMeetings,
      thisMonth,
      upcoming7d,
      qbrsCompleted,
      recordingsAvailable,
    }
  }, [currentMonth])

  // Filter meetings
  const filteredMeetings = useMemo(() => {
    return mockMeetings.filter((meeting) => {
      const matchesSearch =
        meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.accountName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.attendees.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesFilter =
        filterType === "all" ||
        (filterType === "upcoming" && meeting.status === "scheduled") ||
        (filterType === "qbrs" && meeting.type === "qbr") ||
        (filterType === "my-meetings" && true) || // In real app, filter by current user
        (filterType === "with-recordings" && meeting.recordingUrl)

      return matchesSearch && matchesFilter
    })
  }, [searchQuery, filterType])

  const getTypeBadge = (type: MeetingType) => {
    const variants = {
      qbr: "bg-purple-100 text-purple-800 border-purple-500",
      "check-in": "bg-blue-100 text-blue-800 border-blue-500",
      ebc: "bg-amber-100 text-amber-800 border-amber-500",
      workshop: "bg-green-100 text-green-800 border-green-500",
      training: "bg-muted text-muted-foreground border-border",
    }
    return variants[type] || variants["check-in"]
  }

  const getStatusBadge = (status: MeetingStatus) => {
    const variants = {
      scheduled: "bg-blue-100 text-blue-800 border-blue-500",
      completed: "bg-green-100 text-green-800 border-green-500",
      cancelled: "bg-red-100 text-red-800 border-red-500",
    }
    return variants[status] || variants.scheduled
  }

  // Calendar generation
  const generateCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const getMeetingsForDay = (day: number | null) => {
    if (day === null) return []
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return mockMeetings.filter((m) => m.date === dateStr)
  }

  const isToday = (day: number | null) => {
    if (day === null) return false
    const today = new Date()
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    )
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const goToToday = () => {
    setCurrentMonth(new Date())
  }

  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  const calendarDays = generateCalendar()
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-8">
      {/* Cognitive Twin Chat - Floating in CS View */}
      <div className="fixed bottom-6 right-6 z-50 w-96">
        <CognitiveTwinChat />
      </div>
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Meetings Hub</h1>
        <p className="text-base text-muted-foreground max-w-3xl">Customer meetings, QBRs, and engagement tracking</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <Card className="bg-gradient-to-br from-card to-card/95">
            <CardContent className="p-6">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Total Meetings</div>
              <div className="text-3xl font-bold text-foreground mb-2">{stats.totalMeetings}</div>
              <div className="text-sm text-muted-foreground">All time</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/95">
            <CardContent className="p-6">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">This Month</div>
              <div className="text-3xl font-bold text-foreground mb-2">{stats.thisMonth}</div>
              <div className="text-xs text-muted-foreground mt-1">+12% from last month</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/95">
            <CardContent className="p-6">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Upcoming (7 days)</div>
              <div className="text-3xl font-bold text-foreground mb-2">{stats.upcoming7d}</div>
              <div className="text-sm text-muted-foreground">5 QBRs scheduled</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/95">
            <CardContent className="p-6">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">QBRs Completed (Q4)</div>
              <div className="text-3xl font-bold text-foreground mb-2">{stats.qbrsCompleted}</div>
              <div className="text-sm text-muted-foreground">Target: 24 accounts</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/95">
            <CardContent className="p-6">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Recordings Available</div>
              <div className="text-3xl font-bold text-foreground mb-2">{stats.recordingsAvailable}</div>
              <div className="text-sm text-muted-foreground">
                {Math.round((stats.recordingsAvailable / stats.totalMeetings) * 100)}% recorded
              </div>
            </CardContent>
          </Card>
        </div>

      {/* Calendar View */}
      <Card className="bg-gradient-to-br from-card to-card/95">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold">{monthName} - Meeting Calendar</CardTitle>
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigateMonth("prev")} size="sm" className="rounded-lg">
                  <ChevronLeft className="w-4 h-4" /> October
                </Button>
                <Button variant="outline" onClick={goToToday} size="sm" className="rounded-lg">
                  Today
                </Button>
                <Button variant="outline" onClick={() => navigateMonth("next")} size="sm" className="rounded-lg">
                  December <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
          </div>
        </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-0.5">
              {weekDays.map((day) => (
                <div key={day} className="bg-foreground text-background p-2 text-center text-xs font-bold">
                  {day}
                </div>
              ))}
              {calendarDays.map((day, idx) => {
                const meetings = getMeetingsForDay(day)
                const today = isToday(day)

                return (
                  <div
                    key={idx}
                    className={`min-h-[100px] p-2 border border-border bg-card relative ${
                      today ? "bg-primary/10 border-2 border-primary" : ""
                    } ${day === null ? "opacity-50" : ""}`}
                  >
                    {day && (
                      <>
                        <div className="font-bold mb-2 text-foreground">{day}</div>
                        {meetings.map((meeting) => (
                          <div
                            key={meeting.id}
                            className={`text-xs p-1 mb-1 rounded text-white ${
                              meeting.type === "qbr"
                                ? "bg-purple-600"
                                : meeting.type === "ebc"
                                ? "bg-amber-600"
                                : "bg-blue-600"
                            }`}
                          >
                            {formatTime(meeting.time)} {meeting.title}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search meetings by title, account, or attendee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 border-2"
            />
          </div>
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            onClick={() => setFilterType("all")}
            className="h-12 px-6 border-2"
          >
            All Meetings
          </Button>
          <Button
            variant={filterType === "upcoming" ? "default" : "outline"}
            onClick={() => setFilterType("upcoming")}
            className="h-12 px-6 border-2"
          >
            Upcoming
          </Button>
          <Button
            variant={filterType === "qbrs" ? "default" : "outline"}
            onClick={() => setFilterType("qbrs")}
            className="h-12 px-6 border-2"}
          >
            QBRs
          </Button>
          <Button
            variant={filterType === "my-meetings" ? "default" : "outline"}
            onClick={() => setFilterType("my-meetings")}
            className="h-12 px-6 border-2"}
          >
            My Meetings
          </Button>
          <Button
            variant={filterType === "with-recordings" ? "default" : "outline"}
            onClick={() => setFilterType("with-recordings")}
            className="h-12 px-6 border-2"}
          >
            With Recordings
          </Button>
        </div>

        {/* Meetings List */}
        <Card className="border-3 border-border">
          <CardHeader className="bg-foreground text-background">
            <CardTitle className="text-base">Upcoming Meetings (Next 30 Days)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filteredMeetings.map((meeting, idx) => (
              <div
                key={meeting.id}
                className={`grid grid-cols-[150px_2fr_150px_120px_200px_120px] gap-4 p-5 items-center border-b-2 border-border hover:bg-muted/50 ${
                  meeting.status === "completed" ? "bg-muted/30" : ""
                }`}
              >
                <div className="font-mono text-xs text-muted-foreground">{meeting.id}</div>
                <div>
                  <div className="font-bold text-sm text-foreground">{meeting.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatDate(meeting.date)} • {formatTime(meeting.time)} - {meeting.duration} min
                  </div>
                </div>
                <Badge variant="outline" className={`${getTypeBadge(meeting.type)} border-2`}>
                  {meeting.type.toUpperCase().replace("-", " ")}
                </Badge>
                <Badge variant="outline" className={`${getStatusBadge(meeting.status)} border-2`}>
                  {meeting.status.toUpperCase()}
                </Badge>
                <Link
                  href={`/cs/accounts/${meeting.accountId}`}
                  className="text-primary font-semibold text-sm hover:underline"
                >
                  {meeting.accountName}
                </Link>
                <div>
                  <div className="flex flex-wrap gap-1 mb-1">
                    {meeting.attendees.slice(0, 2).map((attendee, aIdx) => (
                      <span key={aIdx} className="inline-block px-2 py-1 bg-muted text-xs rounded">
                        {attendee}
                      </span>
                    ))}
                    {meeting.attendees.length > 2 && (
                      <span className="inline-block px-2 py-1 bg-muted text-xs rounded">
                        +{meeting.attendees.length - 2} more
                      </span>
                    )}
                  </div>
                  {meeting.recordingUrl && (
                    <a
                      href={meeting.recordingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-xs font-semibold hover:underline flex items-center gap-1"
                    >
                      <Video className="w-3 h-3" />
                      View Recording
                    </a>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Schema Info */}
        <Card className="border-3 border-border bg-amber-50">
              <CardContent className="p-6">
            <div className="text-base font-bold mb-2 text-foreground">📌 Database Schema: Meetings</div>
            <div className="text-sm leading-relaxed space-y-1 text-muted-foreground">
              <div>
                <strong className="text-foreground">Key Fields:</strong> Record ID [MEET-], Meeting Title [title], ↔️ Account [relation: → Master Accounts] **REQUIRED**, Date [date + time], Meeting Type [select: QBR/Check-in/EBC/Workshop/etc], Owner [person], Attendees [person: multi] **FIXED from text**, Duration [number: minutes], Status [select: Scheduled/Completed/Cancelled], Recording URL [url], ↔️ Meeting Notes [relation: two-way]
              </div>
              <div>
                <strong className="text-foreground">Relations:</strong> Two-way link to Master Accounts Registry (FIXED Oct 22, 2025)
              </div>
              <div>
                <strong className="text-foreground">Meeting Types:</strong> QBR (Quarterly Business Review), Check-in, EBC (Executive Business Review), Workshop, Training
              </div>
              <div>
                <strong className="text-foreground">Recording Integration:</strong> Stores Zoom/Google Meet recording URLs
              </div>
              <div>
                <strong className="text-foreground">Calendar Sync:</strong> Integrates with Google Calendar, Outlook
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
