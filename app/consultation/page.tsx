"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Video, CheckCircle } from "lucide-react"
import { useState } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function ConsultationPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // Mock available dates for next 7 days
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1)
    return {
      date: date.toISOString().split('T')[0],
      display: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    }
  })

  const availableTimes = [
    "9:00 AM", "10:00 AM", "11:00 AM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ]

  return (
    <div className="py-12">
      <div className="container max-w-6xl">
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-12">
          <Badge className="mb-4">
            <Video className="mr-1 h-3 w-3" />
            Free Consultation
          </Badge>
          <h1 className="mb-4">Book Your Free Consultation</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Schedule a 30-minute video call to discuss your fitness goals and find the perfect plan for you.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Your Session</CardTitle>
                <CardDescription>
                  Select a date and time that works for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Selection */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Select Date
                  </Label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {availableDates.map((date) => (
                      <button
                        key={date.date}
                        onClick={() => setSelectedDate(date.date)}
                        className={`p-3 text-sm rounded-lg border transition-all ${
                          selectedDate === date.date
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'hover:border-primary hover:bg-primary/5'
                        }`}
                      >
                        {date.display}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3"
                  >
                    <Label className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Select Time
                    </Label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 text-sm rounded-lg border transition-all ${
                            selectedTime === time
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'hover:border-primary hover:bg-primary/5'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Contact Information */}
                {selectedTime && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 pt-6 border-t"
                  >
                    <h3 className="font-semibold">Your Information</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goals">What are your fitness goals?</Label>
                      <Textarea
                        id="goals"
                        placeholder="Tell me about what you want to achieve..."
                        rows={4}
                      />
                    </div>

                    <Button size="lg" className="w-full">
                      Confirm Booking
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            {/* What to Expect */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What to Expect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "Discuss your fitness goals",
                    "Review your current routine",
                    "Assess your experience level",
                    "Answer all your questions",
                    "Recommend the best plan"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Session Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Session Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Duration</div>
                      <div className="text-sm text-muted-foreground">30 minutes</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Video className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Format</div>
                      <div className="text-sm text-muted-foreground">Video call (Zoom)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Cost</div>
                      <div className="text-sm text-muted-foreground">100% Free</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Selected Time Summary */}
            {selectedDate && selectedTime && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="bg-gradient-to-br from-primary to-accent text-white border-0">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Your Selection</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        {availableDates.find(d => d.date === selectedDate)?.display}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{selectedTime}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
