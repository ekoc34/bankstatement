"use client"

import Link from "next/link"
import { FileText, Crown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const { 
    isLoggedIn, 
    isProUser, 
    setShowLoginModal, 
    setShowUpgradeModal,
    logout
  } = useAuth()

  const handleLoginClick = () => {
    console.log("[v0] Header: Log in button clicked")
    setShowLoginModal(true)
  }

  const handleUpgradeClick = () => {
    console.log("[v0] Header: Upgrade button clicked, isLoggedIn:", isLoggedIn)
    if (!isLoggedIn) {
      setShowLoginModal(true)
    } else {
      setShowUpgradeModal(true)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary transition-transform group-hover:scale-105">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">BankStatement Pro</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="#features" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link 
              href="#pricing" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                {isProUser ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Crown className="w-4 h-4" />
                    Pro
                  </div>
                ) : (
                  <Button size="sm" onClick={handleUpgradeClick}>
                    Upgrade to Pro
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={handleLoginClick}>
                  Log in
                </Button>
                <Button size="sm" onClick={handleUpgradeClick}>
                  Upgrade to Pro
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
