"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useState } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function SchedulePage() {
  const [currentWeek, setCurrentWeek] = useState(0)

  // Generate week dates
  const getWeekDates = (weekOffset: number) => {
    const dates = []
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay() + weekOffset * 7)

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const weekDates = getWeekDates(currentWeek)

  // Mock sessions data
  const sessions = {
    "2025-12-08": [
      { time: "10:00 AM", title: "Push Day - Chest & Triceps", type: "Strength Training", duration: "90 min" }
    ],
    "2025-12-10": [
      { time: "10:00 AM", title: "Pull Day - Back & Biceps", type: "Strength Training", duration: "90 min" }
    ],
    "2025-12-12": [
      { time: "10:00 AM", title: "Leg Day", type: "Strength Training", duration: "90 min" }
    ],
    "2025-12-14": [
      { time: "9:00 AM", title: "Upper Body Hypertrophy", type: "Strength Training", duration: "75 min" }
    ]
  }

  const getSessionsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return sessions[dateStr as keyof typeof sessions] || []
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <motion.div {...fadeInUp} className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2">Training Schedule</h1>
          <p className="text-muted-foreground">
            View and manage your upcoming training sessions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Book Session
        </Button>
      </motion.div>

      {/* Week Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">
                {weekDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentWeek(currentWeek - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentWeek(0)}
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentWeek(currentWeek + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {weekDates.map((date, i) => {
                const isToday = date.toDateString() === new Date().toDateString()
                const hasSessions = getSessionsForDate(date).length > 0

                return (
                  <div
                    key={i}
                    className={`p-4 rounded-lg border text-center cursor-pointer transition-all ${
                      isToday
                        ? 'bg-primary text-primary-foreground border-primary'
                        : hasSessions
                        ? 'bg-accent border-accent-foreground/20 hover:bg-accent/80'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <div className="text-xs font-medium mb-1">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="text-2xl font-bold">
                      {date.getDate()}
                    </div>
                    {hasSessions && (
                      <div className={`mt-2 w-2 h-2 rounded-full mx-auto ${
                        isToday ? 'bg-white' : 'bg-primary'
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sessions List */}
      <div className="grid gap-6 md:grid-cols-2">
        {weekDates.map((date, i) => {
          const dateSessions = getSessionsForDate(date)
          if (dateSessions.length === 0) return null

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                      </CardTitle>
                      <CardDescription>
                        {dateSessions.length} session{dateSessions.length !== 1 ? 's' : ''} scheduled
                      </CardDescription>
                    </div>
                    {date.toDateString() === new Date().toDateString() && (
                      <Badge>Today</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dateSessions.map((session, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold mb-1">{session.title}</h4>
                          <Badge variant="outline">{session.type}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{session.time}</span>
                        </div>
                        <span>•</span>
                        <span>{session.duration}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Empty State */}
      {weekDates.every(date => getSessionsForDate(date).length === 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Sessions Scheduled</h3>
              <p className="text-muted-foreground text-center mb-6">
                You don't have any training sessions scheduled for this week.
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Schedule Your First Session
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
