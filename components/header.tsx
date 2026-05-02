import Link from "next/link"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
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
            <Button variant="ghost" size="sm">
              Log in
            </Button>
            <Button size="sm">
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
