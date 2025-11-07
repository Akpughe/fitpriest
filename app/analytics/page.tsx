"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Dumbbell, Calendar, Target, Award } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function AnalyticsPage() {
  // Mock data for charts
  const weightData = [
    { month: "Jul", weight: 195 },
    { month: "Aug", weight: 192 },
    { month: "Sep", weight: 189 },
    { month: "Oct", weight: 187 },
    { month: "Nov", weight: 185 },
    { month: "Dec", weight: 183 }
  ]

  const volumeData = [
    { week: "Week 1", volume: 18500 },
    { week: "Week 2", volume: 19200 },
    { week: "Week 3", volume: 20100 },
    { week: "Week 4", volume: 21300 },
    { week: "Week 5", volume: 22800 },
    { week: "Week 6", volume: 24500 }
  ]

  return (
    <div className="container py-8">
      {/* Header */}
      <motion.div {...fadeInUp} className="mb-8">
        <h1 className="mb-2">Analytics & Progress</h1>
        <p className="text-muted-foreground">
          Track your fitness journey with detailed metrics and insights
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
                Weight Change
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-12 lbs</div>
              <p className="text-xs text-muted-foreground">
                Last 6 months
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
                Total Workouts
              </CardTitle>
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72</div>
              <p className="text-xs text-muted-foreground">
                Last 6 months
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
                Avg. Volume/Week
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">21,200 lbs</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+18%</span> from last month
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
                Consistency
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">
                Sessions completed
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Body Weight Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-primary" />
                Body Weight Trend
              </CardTitle>
              <CardDescription>Your weight over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Simple Bar Chart Representation */}
                <div className="space-y-3">
                  {weightData.map((data, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{data.month}</span>
                        <Badge variant="outline">{data.weight} lbs</Badge>
                      </div>
                      <div className="h-8 rounded-lg bg-muted overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                          style={{ width: `${(data.weight / 195) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="pt-4 border-t space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Starting Weight</span>
                    <span className="font-medium">195 lbs</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current Weight</span>
                    <span className="font-medium">183 lbs</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Change</span>
                    <span className="font-medium text-green-600">-12 lbs</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Avg. Loss/Month</span>
                    <span className="font-medium">2 lbs</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Training Volume Trend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Training Volume Trend
              </CardTitle>
              <CardDescription>Total volume lifted per week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Simple Bar Chart Representation */}
                <div className="space-y-3">
                  {volumeData.map((data, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{data.week}</span>
                        <Badge variant="outline">{data.volume.toLocaleString()} lbs</Badge>
                      </div>
                      <div className="h-8 rounded-lg bg-muted overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent to-primary transition-all"
                          style={{ width: `${(data.volume / 25000) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="pt-4 border-t space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Starting Volume</span>
                    <span className="font-medium">18,500 lbs</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current Volume</span>
                    <span className="font-medium">24,500 lbs</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Increase</span>
                    <span className="font-medium text-green-600">+6,000 lbs</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Growth Rate</span>
                    <span className="font-medium">+32%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Personal Records */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Personal Records
            </CardTitle>
            <CardDescription>Your best lifts across major exercises</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { exercise: "Bench Press", weight: "225 lbs", date: "Nov 15" },
                { exercise: "Squat", weight: "315 lbs", date: "Nov 20" },
                { exercise: "Deadlift", weight: "405 lbs", date: "Dec 1" },
                { exercise: "Overhead Press", weight: "155 lbs", date: "Nov 28" }
              ].map((pr, i) => (
                <div key={i} className="p-4 rounded-lg border bg-accent/50">
                  <div className="text-sm text-muted-foreground mb-1">{pr.exercise}</div>
                  <div className="text-2xl font-bold mb-1">{pr.weight}</div>
                  <div className="text-xs text-muted-foreground">{pr.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Recent Milestones
            </CardTitle>
            <CardDescription>Achievements unlocked on your fitness journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "10 lbs Lost", description: "Reached your weight loss milestone", date: "Nov 30" },
                { title: "50 Workouts Completed", description: "Consistency is key!", date: "Nov 15" },
                { title: "New PR: Deadlift", description: "Lifted 405 lbs", date: "Dec 1" },
                { title: "2-Week Streak", description: "Didn't miss a single workout", date: "Oct 20" }
              ].map((milestone, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{milestone.title}</h4>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{milestone.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
