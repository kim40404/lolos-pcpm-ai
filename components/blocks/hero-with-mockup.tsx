import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Glow } from "@/components/ui/glow"
import { LucideIcon } from "lucide-react"

interface HeroProps {
  title: string
  description: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
    icon?: React.ReactNode
  }
  className?: string
}

export function HeroSection({
  title,
  description,
  primaryCta = {
    text: "Get Started",
    href: "/get-started",
  },
  secondaryCta,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative text-white flex flex-col justify-start",
        "pt-[40px] pb-16 px-4 md:pt-[50px] md:pb-24 lg:pt-[60px]",
        "overflow-hidden",
        className
      )}
      style={{ background: 'var(--c-navy-900)' }}
    >
      {/* Decorative Floating Logos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img src="/bi-icon-white.png" className="absolute top-20 left-[10%] w-24 opacity-[0.03] rotate-12 blur-[1px]" alt="" />
        <img src="/bi-icon-color.svg" className="absolute bottom-40 right-[15%] w-32 opacity-[0.05] -rotate-12 blur-[2px]" alt="" />
        <img src="/bi-logo-white.png" className="absolute top-40 right-[5%] w-48 opacity-[0.02] rotate-6" alt="" />
        <img src="/bi-icon-black.png" className="absolute bottom-20 left-[5%] w-32 opacity-[0.04] rotate-45 invert" alt="" />
      </div>

      <div className="relative mx-auto max-w-[1000px] flex flex-col gap-8 w-full">
        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          {/* Badge & Logo */}
          <div className="flex flex-col items-center gap-5 animate-appear">
            <img 
              src="/bi-logo.svg" 
              alt="Bank Indonesia" 
              className="h-28 md:h-40 w-auto object-contain bg-white rounded-[1.5rem] p-4 shadow-[0_0_30px_rgba(255,255,255,0.4)] border border-white/30"
            />
            <div className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-5 py-2 text-sm font-semibold text-brand-foreground shadow-sm">
              ✨ Platform Pelatihan PCPM BI Terpadu
            </div>
          </div>

          {/* Heading */}
          <h1
            className={cn(
              "inline-block animate-appear",
              "text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400",
              "text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-7xl",
              "leading-[1.1] sm:leading-[1.1]"
            )}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className={cn(
              "max-w-[750px] animate-appear opacity-0 [animation-delay:150ms]",
              "text-lg sm:text-xl md:text-xl",
              "text-gray-300",
              "font-medium leading-relaxed"
            )}
          >
            {description}
          </p>

          {/* CTAs */}
          <div
            className="relative z-10 flex flex-wrap justify-center gap-5 mt-6
            animate-appear opacity-0 [animation-delay:300ms]"
          >
            <Button
              asChild
              size="lg"
              className={cn(
                "bg-gradient-to-b from-brand to-brand/90 hover:from-brand/95 hover:to-brand/85",
                "text-white shadow-lg text-[19px] px-10 py-7 rounded-full font-bold",
                "transition-all duration-300 hover:scale-105"
              )}
            >
              <a href={primaryCta.href}>{primaryCta.text}</a>
            </Button>

            {secondaryCta && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className={cn(
                  "text-white bg-transparent border-gray-600",
                  "hover:bg-gray-800 hover:text-white shadow-lg text-[19px] px-10 py-7 rounded-full font-bold",
                  "transition-all duration-300 hover:scale-105"
                )}
              >
                <a href={secondaryCta.href}>
                  {secondaryCta.icon}
                  {secondaryCta.text}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Glow
          variant="above"
          className="animate-appear-zoom opacity-0 [animation-delay:600ms]"
        />
      </div>
    </section>
  )
}
