"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, Dumbbell, Clock, Target, Award, ArrowRight } from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function ClientDashboard() {
  return (
    <div className="container py-8">
      {/* Header */}
      <motion.div {...fadeInUp} className="mb-8">
        <h1 className="mb-2">Welcome back, John!</h1>
        <p className="text-muted-foreground">
          Track your progress and stay on top of your fitness goals.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Weight
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">185 lbs</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">-5 lbs</span> from last month
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
                Workouts This Week
              </CardTitle>
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 / 4</div>
              <p className="text-xs text-muted-foreground">
                1 more to reach your goal
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
                Total Volume
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24,500 lbs</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2,500 lbs</span> this week
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
                Current Streak
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12 days</div>
              <p className="text-xs text-muted-foreground">
                Keep it up!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Next Session */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Next Session
              </CardTitle>
              <CardDescription>Your upcoming training session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge>Upper Body</Badge>
                    <Badge variant="outline">Strength Training</Badge>
                  </div>
                  <h3 className="text-lg font-semibold mt-2">
                    Push Day - Chest & Triceps
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Tomorrow, Dec 8th</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>10:00 AM - 11:30 AM</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <h4 className="text-sm font-medium">Exercises Preview</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Bench Press - 4 sets x 8 reps</li>
                  <li>• Incline Dumbbell Press - 3 sets x 10 reps</li>
                  <li>• Cable Flyes - 3 sets x 12 reps</li>
                  <li>• Tricep Dips - 3 sets x 10 reps</li>
                </ul>
              </div>

              <Button className="w-full" asChild>
                <Link href="/schedule">
                  View Full Schedule
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Workouts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-primary" />
                Recent Workouts
              </CardTitle>
              <CardDescription>Your latest training sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  {
                    name: "Lower Body - Legs",
                    date: "Dec 6, 2025",
                    duration: "1h 15m",
                    exercises: 8,
                    volume: "8,250 lbs"
                  },
                  {
                    name: "Upper Body - Back & Biceps",
                    date: "Dec 4, 2025",
                    duration: "1h 30m",
                    exercises: 9,
                    volume: "7,800 lbs"
                  },
                  {
                    name: "Full Body Circuit",
                    date: "Dec 2, 2025",
                    duration: "45m",
                    exercises: 6,
                    volume: "5,200 lbs"
                  }
                ].map((workout, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
                  >
                    <div className="space-y-1">
                      <h4 className="font-medium">{workout.name}</h4>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{workout.date}</span>
                        <span>•</span>
                        <span>{workout.duration}</span>
                        <span>•</span>
                        <span>{workout.exercises} exercises</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{workout.volume}</div>
                      <div className="text-xs text-muted-foreground">total volume</div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/workout">
                  Log New Workout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Weight Trend Chart */}
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
              Weight Trend
            </CardTitle>
            <CardDescription>Your body weight over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for chart - will be implemented with Recharts */}
            <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center space-y-2">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Weight trend chart will be displayed here
                </p>
                <Button variant="outline" asChild>
                  <Link href="/analytics">
                    View Detailed Analytics
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
