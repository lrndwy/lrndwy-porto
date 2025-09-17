"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { gsap, registerGsapPlugins } from "@/lib/gsap"

interface MenuItem {
  icon: LucideIcon | React.FC
  label: string
  href: string
  gradient: string
  iconColor: string
}

interface MenuBarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MenuItem[]
  activeItem?: string
  onItemClick?: (label: string) => void
}

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring" as const, stiffness: 300, damping: 25 },
    },
  },
}

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

export const MenuBar = React.forwardRef<HTMLDivElement, MenuBarProps>(
  ({ className, items, activeItem, onItemClick, ...props }, ref) => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(false)

    React.useEffect(() => {
      const root = document.documentElement
      const update = () => setIsDarkTheme(root.classList.contains("dark"))
      update()
      const observer = new MutationObserver(update)
      observer.observe(root, { attributes: true, attributeFilter: ["class"] })
      return () => observer.disconnect()
    }, [])

    // Register GSAP plugins on mount
    React.useEffect(() => {
      registerGsapPlugins()
    }, [])

    const handleMenuClick = React.useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
      e.preventDefault()

      // Call onItemClick if provided
      onItemClick?.(label)

      // Get target element
      const targetId = href.startsWith('#') ? href.slice(1) : href
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // Calculate target position with offset
        const offset = 80
        const targetPosition = targetElement.offsetTop - offset

        // Create overshoot effect: jump past target instantly, then snap back quickly
        const overshootDistance = 140
        const overshootPosition = targetPosition - overshootDistance

        // Disable native smooth scroll temporarily so the jump is immediate
        const root = document.documentElement
        const body = document.body
        const prevRootBehavior = root.style.scrollBehavior
        const prevBodyBehavior = body.style.scrollBehavior
        root.style.scrollBehavior = "auto"
        body.style.scrollBehavior = "auto"

        // Instant jump to overshoot position
        window.scrollTo({ top: overshootPosition, behavior: "auto" })

        // Quick animate back to final target (keeps visible animation via GSAP)
        gsap.to(window, {
          duration: 0.35,
          scrollTo: {
            y: targetPosition,
            autoKill: false
          },
          ease: "power3.out",
          onComplete: () => {
            // restore previous behaviors
            root.style.scrollBehavior = prevRootBehavior
            body.style.scrollBehavior = prevBodyBehavior
          }
        })
      }
    }, [onItemClick])

    return (
      <motion.nav
        ref={ref}
        className={cn(
          "p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border border-border/40 shadow-lg relative overflow-hidden",
          className,
        )}
        initial="initial"
        whileHover="hover"
      >
        <motion.div
          className={`absolute -inset-2 bg-gradient-radial from-transparent ${
            isDarkTheme
              ? "via-blue-400/30 via-30% via-purple-400/30 via-60% via-red-400/30 via-90%"
              : "via-blue-400/20 via-30% via-purple-400/20 via-60% via-red-400/20 via-90%"
          } to-transparent rounded-3xl z-0 pointer-events-none`}

        />
        <ul className="flex items-center gap-2 relative z-10 overflow-x-auto overscroll-x-contain snap-x snap-mandatory px-1 -mx-1">
          {items.map((item) => {
            const Icon = item.icon as any
            const isActive = item.label === activeItem

            return (
              <motion.li key={item.label} className="relative shrink-0 snap-start">
                <a
                  href={item.href}
                  onClick={(e) => handleMenuClick(e, item.href, item.label)}
                  className="block w-full"
                >
                  <motion.div
                    className="block rounded-xl overflow-visible group relative"
                    style={{ perspective: "600px" }}
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.div
                      className="absolute inset-0 z-0 pointer-events-none"
                      animate={isActive ? "hover" : "initial"}
                      style={{
                        background: item.gradient,
                        opacity: isActive ? 1 : 0,
                        borderRadius: "16px",
                      }}
                    />
                    <motion.div
                      className={cn(
                        "flex items-center gap-2 px-3 sm:px-4 py-2 relative z-10 bg-transparent transition-colors rounded-xl",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                      variants={itemVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center bottom",
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          isActive ? item.iconColor : "text-foreground",
                          `group-hover:${item.iconColor}`,
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="hidden sm:inline">{item.label}</span>
                    </motion.div>
                    <motion.div
                      className={cn(
                        "flex items-center gap-2 px-3 sm:px-4 py-2 absolute inset-0 z-10 bg-transparent transition-colors rounded-xl",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                      variants={backVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center top",
                        rotateX: 90,
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          isActive ? item.iconColor : "text-foreground",
                          `group-hover:${item.iconColor}`,
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="hidden sm:inline">{item.label}</span>
                    </motion.div>
                  </motion.div>
                </a>
              </motion.li>
            )
          })}
        </ul>
      </motion.nav>
    )
  },
)

MenuBar.displayName = "MenuBar"

export default MenuBar
