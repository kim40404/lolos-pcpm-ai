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
        "relative text-white",
        "py-16 px-4 md:py-32 lg:py-40",
        "overflow-hidden",
        className
      )}
      style={{ background: 'var(--c-navy-900)' }}
    >
      <div className="relative mx-auto max-w-[1000px] flex flex-col gap-12">
        <div className="relative z-10 flex flex-col items-center gap-6 pt-8 md:pt-16 text-center">
          {/* Badge & Logo */}
          <div className="flex flex-col items-center gap-4 animate-appear">
            <img 
              src="/bi-logo.svg" 
              alt="Bank Indonesia" 
              className="h-16 w-auto object-contain bg-white rounded-xl p-2 shadow-[0_0_15px_rgba(255,255,255,0.2)] border border-white/20"
            />
            <div className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand-foreground shadow-sm">
              ✨ Platform Pelatihan PCPM BI Terpadu
            </div>
          </div>

          {/* Heading */}
          <h1
            className={cn(
              "inline-block animate-appear",
              "text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400",
              "text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl",
              "leading-[1.1] sm:leading-[1.1]"
            )}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className={cn(
              "max-w-[750px] animate-appear opacity-0 [animation-delay:150ms]",
              "text-lg sm:text-xl md:text-2xl",
              "text-gray-300",
              "font-medium leading-relaxed"
            )}
          >
            {description}
          </p>

          {/* CTAs */}
          <div
            className="relative z-10 flex flex-wrap justify-center gap-6 mt-8
            animate-appear opacity-0 [animation-delay:300ms]"
          >
            <Button
              asChild
              size="lg"
              className={cn(
                "bg-gradient-to-b from-brand to-brand/90 hover:from-brand/95 hover:to-brand/85",
                "text-white shadow-lg text-lg px-8 py-6 rounded-full font-bold",
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
                  "hover:bg-gray-800 hover:text-white shadow-lg text-lg px-8 py-6 rounded-full font-bold",
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
