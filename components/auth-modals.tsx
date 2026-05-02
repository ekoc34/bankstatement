"use client"

import { Lock, Zap, Check, Mail, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"

export function LoginModal() {
  const { showLoginModal, setShowLoginModal, login, isLoggingIn } = useAuth()
  const [email, setEmail] = useState("")

  if (!showLoginModal) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Login form submitted with email:", email)
    login()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md p-6 border-0 shadow-2xl relative z-[101]">
        <button
          onClick={() => setShowLoginModal(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 mb-4 mx-auto rounded-full bg-primary/10">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-2">
            Log in to your account
          </h3>
          <p className="text-muted-foreground">
            Enter your email to continue
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
          </div>
          
          <Button
            type="submit"
            disabled={isLoggingIn}
            className="w-full h-12 text-base font-medium"
            size="lg"
          >
            {isLoggingIn ? (
              <>
                <Spinner className="mr-2" />
                Logging in...
              </>
            ) : (
              "Continue with Email"
            )}
          </Button>
        </form>
        
        <div className="mt-6 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </Card>
    </div>
  )
}

export function UpgradeModal() {
  const { 
    showUpgradeModal, 
    setShowUpgradeModal, 
    upgrade, 
    isUpgrading,
    isLoggedIn,
    setShowLoginModal,
    FREE_LIMIT,
    PRO_PRICE 
  } = useAuth()

  if (!showUpgradeModal) return null

  const handleUpgrade = () => {
    console.log("[v0] Upgrade modal: upgrade button clicked, isLoggedIn:", isLoggedIn)
    if (!isLoggedIn) {
      setShowUpgradeModal(false)
      setShowLoginModal(true)
      return
    }
    upgrade()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md p-6 border-0 shadow-2xl relative z-[101]">
        <button
          onClick={() => setShowUpgradeModal(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 mb-4 mx-auto rounded-full bg-primary/10">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-2">
            Unlock Unlimited Conversions
          </h3>
          <p className="text-muted-foreground mb-4">
            {isLoggedIn 
              ? `You've used all ${FREE_LIMIT} free conversions. Upgrade to Pro for unlimited access.`
              : "Log in first to upgrade to Pro."
            }
          </p>
          <div className="text-3xl font-bold text-foreground mb-2">
            {PRO_PRICE}<span className="text-sm font-normal text-muted-foreground">/month</span>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 text-sm">
            <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-foreground">Unlimited bank statement processing</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-foreground">Structured Excel-ready CSV export</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-foreground">No blurred or limited output</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-foreground">Priority support</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button
            onClick={handleUpgrade}
            disabled={isUpgrading}
            className="w-full h-12 text-base font-medium gap-2"
            size="lg"
          >
            {isUpgrading ? (
              <>
                <Spinner className="w-5 h-5" />
                Redirecting to secure checkout...
              </>
            ) : isLoggedIn ? (
              <>
                <Zap className="w-5 h-5" />
                Upgrade to Pro
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                Log in to Upgrade
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowUpgradeModal(false)}
            className="w-full"
          >
            Maybe Later
          </Button>
        </div>
        <div className="mt-6 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            Cancel anytime - Secure payment - 30-day money-back guarantee
          </p>
        </div>
      </Card>
    </div>
  )
}
