import { Zap, Shield, Globe, Sparkles } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process documents in seconds, not minutes. Our optimized engine handles even large files with ease.",
  },
  {
    icon: Shield,
    title: "Secure by Design",
    description: "Your files are processed locally and never stored on our servers. Privacy is our priority.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered OCR",
    description: "Extract text from scanned documents and images within PDFs with industry-leading accuracy.",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Support for 50+ languages including complex scripts like Chinese, Arabic, and Japanese.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-24 md:py-32 bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4 text-balance">
            Built for professionals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Everything you need to convert PDFs efficiently, with no compromises.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
