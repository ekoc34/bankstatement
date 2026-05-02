import Link from "next/link"
import { FileText } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full py-12 border-t border-border/50">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary">
              <FileText className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">BankStatement Pro</span>
          </div>
          
          <nav className="flex items-center gap-8">
            <Link 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>

          <p className="text-sm text-muted-foreground">
            © 2026 BankStatement Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
