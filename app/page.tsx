"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/ui/stat-card"
import { FloatingBadge } from "@/components/ui/floating-badge"
import { AvatarGroup } from "@/components/ui/avatar-group"
import { DecorativeCurves, DecorativeCircles } from "@/components/ui/decorative-curves"
import { ArrowRight, CheckCircle, Dumbbell, TrendingUp, Calendar, Target, Users, Trophy, Heart, Instagram, Youtube, Twitter } from "lucide-react"

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
      {/* Hero Section - Dark Premium Design */}
      <section className="relative min-h-screen bg-brand-black overflow-hidden flex items-center">
        {/* Decorative Background Elements */}
        <DecorativeCurves />
        <DecorativeCircles />

        {/* Social Media Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-6"
        >
          <a href="#" className="text-white/60 hover:text-brand-orange-500 transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-white/60 hover:text-brand-orange-500 transition-colors">
            <Youtube className="w-5 h-5" />
          </a>
          <a href="#" className="text-white/60 hover:text-brand-orange-500 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
        </motion.div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
            {/* Left Column - Content */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-white leading-none"
              >
                Personalized Plans
                <br />
                for Maximum
                <br />
                <span className="text-brand-orange-500">Impact</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-300 max-w-xl leading-relaxed"
              >
                No matter where you are in your fitness journey, I'm here to help you
                take the next step. We'll work together to build the strength, energy, and
                confidence you deserve.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <Link href="/consultation">
                  <button className="btn-primary">
                    Schedule a Consultation
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column - Hero Image & Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Placeholder for trainer image */}
              <div className="relative aspect-[3/4] max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange-500/20 to-brand-gold-500/10 rounded-3xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Dumbbell className="w-32 h-32 text-brand-orange-500/30" />
                </div>

                {/* Floating Stats Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -top-4 -right-4 lg:right-0"
                >
                  <FloatingBadge variant="light">
                    <div className="text-center">
                      <div className="text-2xl font-black text-brand-orange-500">10+</div>
                      <div className="text-xs text-gray-600">Years of Practice</div>
                    </div>
                  </FloatingBadge>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-4 -left-4 lg:left-0"
                >
                  <FloatingBadge variant="light">
                    <div className="space-y-2">
                      <div className="text-xs text-gray-600 mb-1">300+ Happy customers</div>
                      <AvatarGroup
                        avatars={[
                          { src: "/avatars/1.jpg", alt: "Client 1" },
                          { src: "/avatars/2.jpg", alt: "Client 2" },
                          { src: "/avatars/3.jpg", alt: "Client 3" },
                          { src: "/avatars/4.jpg", alt: "Client 4" },
                          { src: "/avatars/5.jpg", alt: "Client 5" },
                        ]}
                        max={3}
                        size="sm"
                      />
                    </div>
                  </FloatingBadge>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-dark-rust pointer-events-none" />
      </section>

      {/* About Me Section with Stat Cards */}
      <section className="py-20 lg:py-32 bg-brand-cream-100">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              About me
            </motion.h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <StatCard
                icon={Users}
                value="120K+"
                label="Thousands trust for reviews. Join these and discover your incredible"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <StatCard
                icon={Trophy}
                value="4.8"
                label="Positive savings by power around the work. Check out the reviews here"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <StatCard
                icon={Heart}
                value="100%"
                label="User satisfaction with better, reflecting stronger project performance"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
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
              <Card className="h-full hover:shadow-large transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-brand-orange-100 flex items-center justify-center">
                    <Target className="h-6 w-6 text-brand-orange-500" />
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
              <Card className="h-full hover:shadow-large transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-brand-orange-100 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-brand-orange-500" />
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
              <Card className="h-full hover:shadow-large transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-brand-orange-100 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-brand-orange-500" />
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
                    <CheckCircle className="h-5 w-5 text-brand-orange-500" />
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
                <Dumbbell className="h-32 w-32 text-brand-orange-500/40" />
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
                <Card className={`h-full ${plan.popular ? 'border-brand-orange-500 border-2 shadow-orange-glow scale-105' : ''}`}>
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
                          <CheckCircle className="h-4 w-4 text-brand-orange-500" />
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
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange-500 text-white font-bold">
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

      {/* CTA Section - Black Background with Orange Accent */}
      <section className="relative py-32 bg-brand-black overflow-hidden">
        <DecorativeCircles />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="mb-6 text-white">
                Stay Connected, Anywhere, Anytime
              </h2>
              <h3 className="text-white/90 font-normal max-w-3xl mx-auto">
                Unlock Your Fitness Potential with Our App
              </h3>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-12 text-lg text-gray-300 max-w-2xl mx-auto"
            >
              Take your fitness journey to the next level with our mobile app and desktop! Our app puts the
              power of fitness and health right at your fingertips.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <Link href="/consultation">
                <button className="btn-primary">
                  Download Here
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Orange Accent Stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-brand-orange-500" />
      </section>
    </div>
  )
}
