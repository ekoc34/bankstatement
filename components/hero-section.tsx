import { PDFConverter } from "@/components/pdf-converter"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-border/50 bg-muted/50 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Bank Statement Extractor
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground mb-6 text-balance">
            Convert Bank Statements
            <br />
            <span className="text-muted-foreground">to Excel in Seconds</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Upload your bank statement PDF and get clean Excel-ready data. 
            Fast, secure, and designed for accounting professionals.
          </p>
          
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-foreground">
              Perfect for freelancers, accountants, and small business owners
            </p>
            <p className="text-sm text-muted-foreground">
              Stop manually copying transactions into Excel
            </p>
          </div>
        </div>

        <PDFConverter />

        {/* Before/After Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="p-6 rounded-xl bg-muted/50 border border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span className="font-semibold text-foreground">Before</span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>❌ Messy PDF bank statements</p>
                <p>❌ Manual data entry for hours</p>
                <p>❌ Copy-paste errors</p>
                <p>❌ Lost time on admin work</p>
              </div>
            </div>

            {/* After */}
            <div className="p-6 rounded-xl bg-green-500/5 border border-green-500/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-semibold text-foreground">After</span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✅ Clean Excel-ready CSV</p>
                <p>✅ Instant extraction in seconds</p>
                <p>✅ Accurate transaction data</p>
                <p>✅ Focus on your business</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-12 border-t border-border/50">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              No data stored
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure processing
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Instant results
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
