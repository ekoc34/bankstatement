"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useAuth, PRO_PRICE } from "@/lib/auth-context"

const plans = [
  {
    name: "Free",
    price: "€0",
    period: "forever",
    description: "Perfect for occasional use",
    features: [
      "3 PDF conversions",
      "Max 10 MB file size",
      "Standard processing speed",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
    actionType: "scroll" as const,
  },
  {
    name: "Pro",
    price: PRO_PRICE,
    period: "per month",
    description: "For professionals who need more",
    features: [
      "Unlimited conversions",
      "Max 100 MB file size",
      "Priority processing",
      "Batch upload support",
      "OCR for scanned PDFs",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    popular: true,
    actionType: "upgrade" as const,
  },
]

export function PricingSection() {
  const { isLoggedIn, isProUser, setShowLoginModal, setShowUpgradeModal } = useAuth()

  const handlePlanClick = (plan: typeof plans[0]) => {
    if (plan.actionType === "scroll") {
      // Scroll to the converter section for free plan
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    
    if (plan.actionType === "upgrade") {
      if (isProUser) {
        // Already Pro, just scroll to converter
        window.scrollTo({ top: 0, behavior: "smooth" })
        return
      }
      
      if (!isLoggedIn) {
        setShowLoginModal(true)
      } else {
        setShowUpgradeModal(true)
      }
    }
  }

  const getButtonText = (plan: typeof plans[0]) => {
    if (plan.name === "Pro" && isProUser) {
      return "Current Plan"
    }
    return plan.cta
  }

  return (
    <section className="w-full py-24 md:py-32">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4 text-balance">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Choose the plan that works best for you. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative flex flex-col border-0 shadow-lg transition-all duration-300 hover:shadow-xl",
                plan.popular && "ring-2 ring-primary shadow-xl scale-105"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="pb-0">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground ml-2">/{plan.period}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  onClick={() => handlePlanClick(plan)}
                  disabled={plan.name === "Pro" && isProUser}
                >
                  {getButtonText(plan)}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
