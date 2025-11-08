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
    <div className="min-h-screen pt-24 pb-12">
      <div className="container">
        {/* Header */}
        <motion.div {...fadeInUp} className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">
            Welcome back, John!
          </h1>
          <p className="text-lg text-muted-foreground">
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
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Weight
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">185 lbs</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 font-medium">-5 lbs</span> from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Workouts This Week
                </CardTitle>
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3 / 4</div>
                <p className="text-xs text-muted-foreground mt-1">
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
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Volume
                </CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24,500 lbs</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 font-medium">+2,500 lbs</span> this week
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Streak
                </CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12 days</div>
                <p className="text-xs text-muted-foreground mt-1">
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
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Calendar className="h-5 w-5 text-brand-orange-500" />
                  Next Session
                </CardTitle>
                <CardDescription>Your upcoming training session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-brand-orange-500 hover:bg-brand-orange-400">
                        Upper Body
                      </Badge>
                      <Badge variant="outline">Strength Training</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mt-2">
                      Push Day - Chest & Triceps
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
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
                  <h4 className="text-sm font-semibold">Exercises Preview</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-brand-orange-500 mt-0.5">•</span>
                      <span>Bench Press - 4 sets x 8 reps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-orange-500 mt-0.5">•</span>
                      <span>Incline Dumbbell Press - 3 sets x 10 reps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-orange-500 mt-0.5">•</span>
                      <span>Cable Flyes - 3 sets x 12 reps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-orange-500 mt-0.5">•</span>
                      <span>Tricep Dips - 3 sets x 10 reps</span>
                    </li>
                  </ul>
                </div>

                <Button className="w-full bg-brand-orange-500 hover:bg-brand-orange-400" asChild>
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
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Dumbbell className="h-5 w-5 text-brand-orange-500" />
                  Recent Workouts
                </CardTitle>
                <CardDescription>Your latest training sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
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
                      className="flex items-center justify-between p-4 rounded-lg border hover:border-brand-orange-500 hover:bg-accent transition-all cursor-pointer group"
                    >
                      <div className="space-y-1 flex-1">
                        <h4 className="font-semibold group-hover:text-brand-orange-500 transition-colors">
                          {workout.name}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {workout.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {workout.duration}
                          </span>
                          <span>•</span>
                          <span>{workout.exercises} exercises</span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm font-bold">{workout.volume}</div>
                        <div className="text-xs text-muted-foreground">volume</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full border-brand-orange-500 text-brand-orange-500 hover:bg-brand-orange-50"
                  asChild
                >
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
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-5 w-5 text-brand-orange-500" />
                Weight Trend
              </CardTitle>
              <CardDescription>Your body weight over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for chart - will be implemented with Recharts */}
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-brand-orange-50 to-transparent rounded-lg border border-brand-orange-200">
                <div className="text-center space-y-3">
                  <TrendingUp className="h-12 w-12 text-brand-orange-500 mx-auto" />
                  <p className="text-sm text-muted-foreground font-medium">
                    Weight trend chart will be displayed here
                  </p>
                  <Button
                    variant="outline"
                    className="border-brand-orange-500 text-brand-orange-500 hover:bg-brand-orange-50"
                    asChild
                  >
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
    </div>
  )
}
