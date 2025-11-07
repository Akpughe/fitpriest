"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Dumbbell, TrendingUp, Calendar, Target } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-20 md:py-32">
        <div className="container">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <Badge className="mb-4">
                <Dumbbell className="mr-1 h-3 w-3" />
                Your Personal Fitness Journey Starts Here
              </Badge>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="mb-6">
              Transform Your Body,
              <br />
              <span className="text-primary">Elevate Your Life</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="mb-8 text-xl text-muted-foreground">
              Get personalized coaching, custom workout plans, and expert guidance
              to achieve your fitness goals faster than ever before.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/consultation">
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/plans">View Plans</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 grid grid-cols-3 gap-8 border-t pt-8"
            >
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Clients Transformed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="mb-4">Why Choose THE FITNESS PRIEST</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to succeed in your fitness journey, all in one place.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Personalized Plans</CardTitle>
                  <CardDescription>
                    Custom workout and nutrition plans tailored to your goals, fitness level, and lifestyle.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Flexible Scheduling</CardTitle>
                  <CardDescription>
                    Book sessions that fit your schedule with easy online booking and calendar integration.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Track Progress</CardTitle>
                  <CardDescription>
                    Monitor your workouts, body metrics, and achievements with detailed analytics and insights.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trainer Section */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Badge>Meet Your Coach</Badge>
              <h2>Expert Guidance, Proven Results</h2>
              <p className="text-lg text-muted-foreground">
                With over 10 years of experience in personal training and nutrition coaching,
                I've helped hundreds of clients achieve their fitness goals and transform their lives.
              </p>

              <div className="space-y-3">
                {[
                  "Certified Personal Trainer (CPT)",
                  "Nutrition Specialist",
                  "Sports Performance Coach",
                  "Injury Prevention Expert"
                ].map((cert, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" asChild>
                <Link href="/consultation">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Dumbbell className="h-32 w-32 text-primary/40" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plans Preview */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="mb-4">Choose Your Plan</h2>
            <p className="text-lg text-muted-foreground">
              Select the coaching package that fits your goals and budget.
            </p>
          </div>

          <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "$99",
                period: "month",
                features: [
                  "2 Sessions per week",
                  "Custom workout plan",
                  "Basic nutrition guidance",
                  "Progress tracking",
                  "Email support"
                ]
              },
              {
                name: "Pro",
                price: "$179",
                period: "month",
                popular: true,
                features: [
                  "4 Sessions per week",
                  "Custom workout plan",
                  "Detailed meal planning",
                  "Advanced analytics",
                  "Priority support",
                  "Weekly check-ins"
                ]
              },
              {
                name: "Elite",
                price: "$299",
                period: "month",
                features: [
                  "Unlimited sessions",
                  "Fully personalized program",
                  "1-on-1 nutrition coaching",
                  "Real-time form checks",
                  "24/7 chat support",
                  "Monthly assessments",
                  "Supplement guidance"
                ]
              }
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`h-full ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                  <CardHeader>
                    {plan.popular && (
                      <Badge className="mb-2 w-fit">Most Popular</Badge>
                    )}
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                      <Link href="/plans">Get Started</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="mb-4">Client Success Stories</h2>
            <p className="text-lg text-muted-foreground">
              See what our clients have to say about their transformation journey.
            </p>
          </div>

          <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                role: "Lost 30 lbs",
                content: "The personalized approach made all the difference. I finally found a sustainable way to reach my fitness goals!",
                avatar: "SJ"
              },
              {
                name: "Mike Chen",
                role: "Built 15 lbs muscle",
                content: "Expert guidance and constant support kept me motivated. Best investment I've made in my health.",
                avatar: "MC"
              },
              {
                name: "Emily Rodriguez",
                role: "Marathon Finisher",
                content: "From couch to marathon in 6 months! The structured training plan and accountability were game-changers.",
                avatar: "ER"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <CardTitle className="text-base">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{testimonial.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-primary to-accent p-12 text-center text-white"
          >
            <h2 className="mb-4 text-white">Ready to Start Your Journey?</h2>
            <p className="mb-8 text-lg text-white/90">
              Book a free consultation today and let's create a plan tailored just for you.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/consultation">
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link href="/plans">View All Plans</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
