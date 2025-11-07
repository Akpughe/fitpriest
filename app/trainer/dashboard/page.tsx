"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, DollarSign, TrendingUp, Clock, Mail, Phone, MoreVertical } from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function TrainerDashboard() {
  return (
    <div className="container py-8">
      {/* Header */}
      <motion.div {...fadeInUp} className="mb-8">
        <h1 className="mb-2">Trainer Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your clients, sessions, and track your business performance.
        </p>
      </motion.div>

      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Clients
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+3</span> this month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sessions This Week
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18 / 32</div>
              <p className="text-xs text-muted-foreground">
                14 upcoming sessions
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Revenue This Month
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,280</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Client Progress
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">
                Goal achievement rate
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Today's Schedule
              </CardTitle>
              <CardDescription>Upcoming sessions for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  time: "9:00 AM",
                  client: "Sarah Johnson",
                  type: "Personal Training",
                  plan: "Pro Plan"
                },
                {
                  time: "10:30 AM",
                  client: "Mike Chen",
                  type: "Consultation",
                  plan: "New Client"
                },
                {
                  time: "2:00 PM",
                  client: "Emily Rodriguez",
                  type: "Personal Training",
                  plan: "Elite Plan"
                },
                {
                  time: "4:00 PM",
                  client: "David Kim",
                  type: "Form Check",
                  plan: "Starter Plan"
                }
              ].map((session, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-primary/10">
                      <Clock className="h-4 w-4 text-primary mb-1" />
                      <span className="text-xs font-medium">{session.time}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{session.client}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {session.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {session.plan}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button variant="outline" className="w-full" asChild>
                <Link href="/trainer/schedule">View Full Schedule</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Client List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Recent Clients
              </CardTitle>
              <CardDescription>Your most active clients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  name: "Sarah Johnson",
                  plan: "Pro Plan",
                  status: "Active",
                  lastSession: "Yesterday",
                  progress: "+15 lbs lost"
                },
                {
                  name: "Mike Chen",
                  plan: "Elite Plan",
                  status: "Active",
                  lastSession: "2 days ago",
                  progress: "+8 lbs muscle"
                },
                {
                  name: "Emily Rodriguez",
                  plan: "Starter Plan",
                  status: "Active",
                  lastSession: "3 days ago",
                  progress: "On track"
                },
                {
                  name: "David Kim",
                  plan: "Pro Plan",
                  status: "Active",
                  lastSession: "1 week ago",
                  progress: "+5 lbs lost"
                }
              ].map((client, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{client.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {client.plan}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {client.lastSession}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs mb-1">
                      {client.status}
                    </Badge>
                    <div className="text-xs text-green-600">
                      {client.progress}
                    </div>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full" asChild>
                <Link href="/trainer/clients">View All Clients</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Analytics Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Business Analytics
            </CardTitle>
            <CardDescription>Your performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Client Retention
                </div>
                <div className="text-3xl font-bold">94%</div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '94%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Session Completion
                </div>
                <div className="text-3xl font-bold">98%</div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '98%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Client Satisfaction
                </div>
                <div className="text-3xl font-bold">4.9/5</div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '98%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
