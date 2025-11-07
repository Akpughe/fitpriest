"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Dumbbell } from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function PlansPage() {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "month",
      description: "Perfect for beginners starting their fitness journey",
      features: [
        "2 Training sessions per week",
        "Custom workout plan",
        "Basic nutrition guidance",
        "Progress tracking dashboard",
        "Email support",
        "Mobile app access"
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$179",
      period: "month",
      description: "For serious athletes ready to level up",
      features: [
        "4 Training sessions per week",
        "Fully customized workout plan",
        "Detailed meal planning & macros",
        "Advanced analytics & insights",
        "Priority support (24hr response)",
        "Weekly progress check-ins",
        "Form video reviews",
        "Exercise library access"
      ],
      buttonText: "Go Pro",
      popular: true
    },
    {
      name: "Elite",
      price: "$299",
      period: "month",
      description: "Complete transformation with unlimited support",
      features: [
        "Unlimited training sessions",
        "Fully personalized program",
        "1-on-1 nutrition coaching",
        "Real-time form checks",
        "24/7 chat support",
        "Monthly body assessments",
        "Supplement recommendations",
        "Injury prevention strategies",
        "Competition prep (if applicable)",
        "Direct phone line access"
      ],
      buttonText: "Go Elite",
      popular: false
    }
  ]

  return (
    <div className="py-20">
      <div className="container">
        {/* Header */}
        <motion.div {...fadeInUp} className="mx-auto max-w-3xl text-center mb-16">
          <Badge className="mb-4">
            <Dumbbell className="mr-1 h-3 w-3" />
            Flexible Plans
          </Badge>
          <h1 className="mb-4">Choose Your Coaching Plan</h1>
          <p className="text-lg text-muted-foreground">
            Select the package that fits your goals and budget. All plans include access to our premium features.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={plan.popular ? 'lg:scale-105' : ''}
            >
              <Card className={`h-full flex flex-col ${plan.popular ? 'border-primary shadow-xl' : ''}`}>
                <CardHeader>
                  {plan.popular && (
                    <Badge className="mb-4 w-fit">Most Popular</Badge>
                  )}
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="min-h-[40px]">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-lg">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    size="lg"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-auto max-w-3xl mt-20"
        >
          <h2 className="text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I switch plans later?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                q: "What if I need to cancel?",
                a: "You can cancel anytime with no penalties. Your access will continue until the end of your billing period."
              },
              {
                q: "Do you offer refunds?",
                a: "We offer a 14-day money-back guarantee for all new clients. If you're not satisfied, we'll refund your first payment."
              },
              {
                q: "Is there a long-term commitment?",
                a: "No contracts required. All plans are month-to-month, though we recommend at least 3 months to see real results."
              }
            ].map((faq, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-auto max-w-2xl mt-20 text-center"
        >
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Still Not Sure?</CardTitle>
              <CardDescription className="text-base">
                Book a free 30-minute consultation to discuss your goals and find the perfect plan for you.
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
              <Button size="lg" asChild>
                <Link href="/consultation">Book Free Consultation</Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
