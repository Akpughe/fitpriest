"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Video, CheckCircle, Loader2, Mail, Phone, User } from "lucide-react"
import { useState } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

interface BookingFormData {
  name: string
  email: string
  phone: string
  notes: string
}

export default function ConsultationPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    notes: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<{ id: string; googleMeetLink?: string } | null>(null)

  // Available dates for next 14 days (excluding Sundays)
  const availableDates = Array.from({ length: 20 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1)
    return date
  })
    .filter(date => date.getDay() !== 0) // Exclude Sundays
    .slice(0, 14)
    .map(date => ({
      date: date.toISOString().split('T')[0],
      display: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    }))

  // Available times in 24-hour format for API
  const availableTimes = [
    { display: "9:00 AM", value: "09:00" },
    { display: "10:00 AM", value: "10:00" },
    { display: "11:00 AM", value: "11:00" },
    { display: "1:00 PM", value: "13:00" },
    { display: "2:00 PM", value: "14:00" },
    { display: "3:00 PM", value: "15:00" },
    { display: "4:00 PM", value: "16:00" }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!selectedDate || !selectedTime) {
      setError("Please select a date and time")
      return
    }

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          preferredDate: selectedDate,
          preferredTime: selectedTime,
          notes: formData.notes
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to book consultation")
      }

      // Success!
      setIsSuccess(true)
      setBookingDetails({
        id: data.consultation.id,
        googleMeetLink: data.consultation.googleMeetLink
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setSelectedDate(null)
    setSelectedTime(null)
    setFormData({ name: "", email: "", phone: "", notes: "" })
    setIsSuccess(false)
    setBookingDetails(null)
    setError(null)
  }

  // Success state
  if (isSuccess && bookingDetails) {
    return (
      <div className="py-12">
        <div className="container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mb-4 text-3xl font-extrabold">Consultation Booked!</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Your consultation has been confirmed. Check your email for all the details and calendar invite.
            </p>

            <Card className="mb-6 text-left">
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-brand-orange-500" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div className="text-sm text-muted-foreground">
                      {availableDates.find(d => d.date === selectedDate)?.display}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-brand-orange-500" />
                  <div>
                    <div className="font-medium">Time</div>
                    <div className="text-sm text-muted-foreground">
                      {availableTimes.find(t => t.value === selectedTime)?.display}
                    </div>
                  </div>
                </div>
                {bookingDetails.googleMeetLink && (
                  <div className="flex items-center gap-3">
                    <Video className="h-5 w-5 text-brand-orange-500" />
                    <div className="flex-1">
                      <div className="font-medium">Google Meet Link</div>
                      <a
                        href={bookingDetails.googleMeetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-brand-orange-500 hover:underline break-all"
                      >
                        {bookingDetails.googleMeetLink}
                      </a>
                    </div>
                  </div>
                )}
                <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-900 border border-blue-200">
                  <strong>Next steps:</strong> You'll receive a confirmation email with a Google Calendar invite.
                  The calendar event includes the Google Meet link for your video call.
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={resetForm}
              variant="outline"
              size="lg"
            >
              Book Another Consultation
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container max-w-6xl">
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-12">
          <Badge className="mb-4 bg-brand-orange-500 hover:bg-brand-orange-400">
            <Video className="mr-1 h-3 w-3" />
            Free Consultation
          </Badge>
          <h1 className="mb-4 text-4xl font-extrabold">Book Your Free Consultation</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Schedule a 30-minute video call to discuss your fitness goals and find the perfect plan for you.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
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
                  {/* Error Message */}
                  {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                      {error}
                    </div>
                  )}

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
                          type="button"
                          onClick={() => setSelectedDate(date.date)}
                          disabled={isSubmitting}
                          className={`p-3 text-sm rounded-lg border transition-all ${
                            selectedDate === date.date
                              ? 'bg-brand-orange-500 text-white border-brand-orange-500'
                              : 'hover:border-brand-orange-500 hover:bg-brand-orange-50'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
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
                            key={time.value}
                            type="button"
                            onClick={() => setSelectedTime(time.value)}
                            disabled={isSubmitting}
                            className={`p-3 text-sm rounded-lg border transition-all ${
                              selectedTime === time.value
                                ? 'bg-brand-orange-500 text-white border-brand-orange-500'
                                : 'hover:border-brand-orange-500 hover:bg-brand-orange-50'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            {time.display}
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
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number (Optional)
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">What are your fitness goals? (Optional)</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          placeholder="Tell me about what you want to achieve..."
                          rows={4}
                          value={formData.notes}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-brand-orange-500 hover:bg-brand-orange-400"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Booking...
                          </>
                        ) : (
                          "Confirm Booking"
                        )}
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
                        <CheckCircle className="h-5 w-5 text-brand-orange-500 shrink-0 mt-0.5" />
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
                <Card className="bg-brand-orange-50 border-brand-orange-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Session Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-orange-100 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-brand-orange-500" />
                      </div>
                      <div>
                        <div className="font-medium">Duration</div>
                        <div className="text-sm text-muted-foreground">30 minutes</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-orange-100 flex items-center justify-center">
                        <Video className="h-5 w-5 text-brand-orange-500" />
                      </div>
                      <div>
                        <div className="font-medium">Format</div>
                        <div className="text-sm text-muted-foreground">Google Meet</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-orange-100 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-brand-orange-500" />
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
                  <Card className="bg-gradient-to-br from-brand-orange-500 to-brand-orange-400 text-white border-0">
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
                        <span className="text-sm">
                          {availableTimes.find(t => t.value === selectedTime)?.display}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
