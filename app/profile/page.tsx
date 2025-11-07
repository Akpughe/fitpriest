"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Calendar, CreditCard, Bell, Lock, Save } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function ProfilePage() {
  return (
    <div className="container py-8">
      {/* Header */}
      <motion.div {...fadeInUp} className="mb-8">
        <h1 className="mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Overview */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Your account overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Avatar */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mb-3">
                    JD
                  </div>
                  <h3 className="font-semibold text-lg">John Doe</h3>
                  <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                  <Badge className="mt-2">Pro Plan</Badge>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold">72</div>
                    <div className="text-xs text-muted-foreground">Workouts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">6</div>
                    <div className="text-xs text-muted-foreground">Months</div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Change Photo
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Plan</span>
                    <Badge>Pro Plan</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="font-medium">$179/month</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Next Billing</span>
                    <span className="font-medium">Jan 1, 2026</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    Change Plan
                  </Button>
                  <Button variant="ghost" className="w-full text-destructive">
                    Cancel Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Settings Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  <Input id="location" defaultValue="New York, NY" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthday" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date of Birth
                  </Label>
                  <Input id="birthday" type="date" defaultValue="1990-01-15" />
                </div>

                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Fitness Profile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Fitness Profile</CardTitle>
                <CardDescription>
                  Update your fitness goals and measurements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (inches)</Label>
                    <Input id="height" type="number" defaultValue="72" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Current Weight (lbs)</Label>
                    <Input id="weight" type="number" defaultValue="183" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetWeight">Target Weight (lbs)</Label>
                    <Input id="targetWeight" type="number" defaultValue="175" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">Fitness Goals</Label>
                  <Input id="goals" defaultValue="Build muscle, lose fat, improve strength" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <select
                    id="experience"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    defaultValue="intermediate"
                  >
                    <option value="beginner">Beginner (0-1 year)</option>
                    <option value="intermediate">Intermediate (1-3 years)</option>
                    <option value="advanced">Advanced (3+ years)</option>
                  </select>
                </div>

                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Manage your notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Email notifications", description: "Receive updates via email" },
                  { label: "Session reminders", description: "Get reminded before sessions" },
                  { label: "Progress updates", description: "Weekly progress summaries" },
                  { label: "Marketing emails", description: "News and special offers" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security
                </CardTitle>
                <CardDescription>
                  Manage your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="••••••••" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="••••••••" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" />
                </div>

                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
