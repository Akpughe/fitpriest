"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Plus, Trash2, Save, Search } from "lucide-react"
import { useState } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

interface Exercise {
  id: string
  name: string
  sets: { reps: number; weight: number }[]
}

export default function WorkoutLogPage() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const exerciseLibrary = [
    { name: "Bench Press", category: "Chest" },
    { name: "Squat", category: "Legs" },
    { name: "Deadlift", category: "Back" },
    { name: "Overhead Press", category: "Shoulders" },
    { name: "Barbell Row", category: "Back" },
    { name: "Pull-ups", category: "Back" },
    { name: "Dips", category: "Chest" },
    { name: "Bicep Curls", category: "Arms" },
    { name: "Tricep Extensions", category: "Arms" },
    { name: "Leg Press", category: "Legs" }
  ]

  const addExercise = (exerciseName: string) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: exerciseName,
      sets: [{ reps: 0, weight: 0 }]
    }
    setExercises([...exercises, newExercise])
  }

  const addSet = (exerciseId: string) => {
    setExercises(exercises.map(ex =>
      ex.id === exerciseId
        ? { ...ex, sets: [...ex.sets, { reps: 0, weight: 0 }] }
        : ex
    ))
  }

  const updateSet = (exerciseId: string, setIndex: number, field: 'reps' | 'weight', value: number) => {
    setExercises(exercises.map(ex =>
      ex.id === exerciseId
        ? {
            ...ex,
            sets: ex.sets.map((set, idx) =>
              idx === setIndex ? { ...set, [field]: value } : set
            )
          }
        : ex
    ))
  }

  const removeExercise = (exerciseId: string) => {
    setExercises(exercises.filter(ex => ex.id !== exerciseId))
  }

  const calculateTotalVolume = () => {
    return exercises.reduce((total, ex) => {
      return total + ex.sets.reduce((exTotal, set) => {
        return exTotal + (set.reps * set.weight)
      }, 0)
    }, 0)
  }

  const filteredExercises = exerciseLibrary.filter(ex =>
    ex.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container py-8">
      {/* Header */}
      <motion.div {...fadeInUp} className="mb-8">
        <h1 className="mb-2">Log Workout</h1>
        <p className="text-muted-foreground">
          Track your exercises, sets, reps, and weights
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Workout Log */}
        <div className="lg:col-span-2 space-y-6">
          {/* Workout Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Today's Workout</CardTitle>
                    <CardDescription>
                      {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {calculateTotalVolume().toLocaleString()} lbs
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Exercises */}
          {exercises.map((exercise, idx) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Dumbbell className="h-5 w-5 text-primary" />
                      {exercise.name}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeExercise(exercise.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Sets Header */}
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
                    <div className="col-span-2">Set</div>
                    <div className="col-span-5">Reps</div>
                    <div className="col-span-5">Weight (lbs)</div>
                  </div>

                  {/* Sets */}
                  {exercise.sets.map((set, setIdx) => (
                    <div key={setIdx} className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-2 text-sm font-medium">
                        {setIdx + 1}
                      </div>
                      <div className="col-span-5">
                        <Input
                          type="number"
                          min="0"
                          value={set.reps || ''}
                          onChange={(e) => updateSet(exercise.id, setIdx, 'reps', parseInt(e.target.value) || 0)}
                          placeholder="0"
                        />
                      </div>
                      <div className="col-span-5">
                        <Input
                          type="number"
                          min="0"
                          step="5"
                          value={set.weight || ''}
                          onChange={(e) => updateSet(exercise.id, setIdx, 'weight', parseInt(e.target.value) || 0)}
                          placeholder="0"
                        />
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addSet(exercise.id)}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Set
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Empty State */}
          {exercises.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Dumbbell className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Exercises Added</h3>
                  <p className="text-muted-foreground text-center mb-6">
                    Start by adding exercises from the library on the right
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Save Button */}
          {exercises.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button size="lg" className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Workout
              </Button>
            </motion.div>
          )}
        </div>

        {/* Exercise Library */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="sticky top-20"
          >
            <Card>
              <CardHeader>
                <CardTitle>Exercise Library</CardTitle>
                <CardDescription>
                  Search and add exercises to your workout
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search exercises..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {/* Exercise List */}
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {filteredExercises.map((exercise, i) => (
                    <button
                      key={i}
                      onClick={() => addExercise(exercise.name)}
                      className="w-full p-3 rounded-lg border hover:bg-accent transition-colors text-left"
                    >
                      <div className="font-medium">{exercise.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {exercise.category}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
