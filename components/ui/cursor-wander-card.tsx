"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"

interface CursorWanderCardProps {
  cardholderName?: string
  className?: string
  theme?: {
    primaryColor?: string
    secondaryColor?: string
    glowColor?: string
  }
  avatarSrc?: string
  logoText?: {
    topText?: string
    bottomText?: string
  }
  height?: string | number
  width?: string | number
}

const CursorWanderCard: React.FC<CursorWanderCardProps> = ({
  cardholderName = "CARDHOLDER NAME",
  className = "",
  theme = {
    // Hijau sebagai tema utama seperti permintaan
    primaryColor: "#22c55e", // emerald-500
    secondaryColor: "#16a34a", // green-600
    glowColor: "rgba(34, 197, 94, 0.7)", // emerald glow
  },
  avatarSrc,
  logoText = { topText: "NEBULA", bottomText: "FLUX" },
  height = "280px",
  width = "450px",
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [time, setTime] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const timeAnimationRef = useRef<number>(0)
  const rotationRef = useRef({ x: 15, y: 20, z: 5 })
  const rotationSpeedRef = useRef({ x: 0.2, y: 0.3, z: 0.05 })

  const animate = () => {
    if (!cardRef.current || isHovered) return

    rotationRef.current.x += rotationSpeedRef.current.x
    rotationRef.current.y += rotationSpeedRef.current.y
    rotationRef.current.z += rotationSpeedRef.current.z

    if (Math.abs(rotationRef.current.x) > 15) rotationSpeedRef.current.x *= -1
    if (Math.abs(rotationRef.current.y) > 15) rotationSpeedRef.current.y *= -1
    if (Math.abs(rotationRef.current.z) > 5) rotationSpeedRef.current.z *= -1

    cardRef.current.style.transform = `
      rotateX(${rotationRef.current.x}deg)
      rotateY(${rotationRef.current.y}deg)
      rotateZ(${rotationRef.current.z}deg)
    `

    animationRef.current = requestAnimationFrame(animate)
  }

  const animateTime = () => {
    setTime((prev) => prev + 0.01)
    timeAnimationRef.current = requestAnimationFrame(animateTime)
  }

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const angleX = ((e.clientY - centerY) / (rect.height / 2)) * 50
      const angleY = (-(e.clientX - centerX) / (rect.width / 2)) * 50

      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })

      if (card) {
        card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) rotateZ(${Math.min(Math.abs(angleX) + Math.abs(angleY), 20) / 10}deg)`
      }
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
      cancelAnimationFrame(animationRef.current)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      animationRef.current = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (card) {
        setDimensions({
          width: card.offsetWidth,
          height: card.offsetHeight,
        })
      }
    }

    handleResize()
    animationRef.current = requestAnimationFrame(animate)
    timeAnimationRef.current = requestAnimationFrame(animateTime)

    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationRef.current)
      cancelAnimationFrame(timeAnimationRef.current)
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", handleResize)
    }
  }, [isHovered])

  return (
    <div ref={containerRef} className={`perspective-3000 ${className}`} style={{ perspective: "3000px" }}>
      <div
        ref={cardRef}
        className="relative transition-transform hover:scale-105"
        style={{
          transition: "transform 0.1s ease-out",
          transformStyle: "preserve-3d",
          width: width,
          height: height,
        }}
      >
        <div
          className="absolute w-full h-full rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #052e1a 0%, #065f46 50%, #047857 100%)",
            boxShadow: `0 25px 50px -12px ${theme.glowColor}`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at ${50 + Math.sin(time * 0.5) * 30}% ${50 + Math.cos(time * 0.7) * 30}%, ${theme.glowColor} 0%, transparent 70%),
                radial-gradient(circle at ${50 + Math.cos(time * 0.3) * 40}% ${50 + Math.sin(time * 0.4) * 40}%, rgba(34, 197, 94, 0.35) 0%, transparent 60%),
                radial-gradient(circle at ${50 + Math.sin(time * 0.6) * 35}% ${50 + Math.cos(time * 0.5) * 35}%, rgba(16, 185, 129, 0.3) 0%, transparent 55%)
              `,
              opacity: 0.9,
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at ${80 + Math.sin(time * 0.4) * 20}% ${20 + Math.cos(time * 0.3) * 20}%, rgba(34, 197, 94, 0.7) 0%, transparent 50%),
                radial-gradient(ellipse at ${20 + Math.cos(time * 0.5) * 20}% ${70 + Math.sin(time * 0.6) * 20}%, rgba(16, 185, 129, 0.6) 0%, transparent 60%),
                radial-gradient(ellipse at ${60 + Math.sin(time * 0.7) * 30}% ${40 + Math.cos(time * 0.8) * 30}%, rgba(5, 150, 105, 0.5) 0%, transparent 55%)
              `,
              mixBlendMode: "screen",
            }}
          />

          <div className="absolute inset-0 overflow-hidden">
            <div className="particles-container"></div>
          </div>

          <div
            className="absolute inset-0 animate-holographicShift"
            style={{
              background:
                "linear-gradient(45deg, transparent 40%, rgba(34, 197, 94, 0.15) 45%, rgba(34, 197, 94, 0.3) 50%, rgba(34, 197, 94, 0.15) 55%, transparent 60%)",
              backgroundSize: "200% 200%",
            }}
          />

          <div className="absolute inset-0 overflow-hidden">
            <div className="stars-small"></div>
            <div className="stars-medium"></div>
            <div className="stars-large"></div>
            <div className="stars-twinkle"></div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <div
                className="absolute w-full h-full animate-pulse-glow"
                style={{
                  background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 100%)`,
                  clipPath: "polygon(40% 0%, 60% 0%, 100% 40%, 100% 60%, 60% 100%, 40% 100%, 0% 60%, 0% 40%)",
                  transform: "rotate(45deg)",
                  opacity: 0.8,
                  filter: "blur(5px)",
                  boxShadow: `0 0 30px ${theme.glowColor}`,
                }}
              />
            </div>
          </div>

          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center">
            <div className="text-white text-xs sm:text-sm font-bold">
              <div className="flex items-center gap-2 sm:gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L17 7L12 12L17 17L12 22L7 17L12 12L7 7L12 2Z" fill="white" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm text-white/90">{logoText.topText}</span>
                  <span className="text-xs sm:text-sm text-white/90">{logoText.bottomText}</span>
                </div>
              </div>
            </div>
          </div>

          {avatarSrc ? (
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden ring-2 ring-white/20 shadow-md">
              {/* next/image tidak tersedia di file ini, gunakan img standar */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={avatarSrc} alt="avatar" className="h-full w-full object-cover" />
            </div>
          ) : null}

          <div className="absolute left-4 sm:left-6 top-16 sm:top-24">
            <div
              className="w-12 h-8 sm:w-16 sm:h-12 rounded-md opacity-90 chip-glow"
              style={{
                boxShadow: "0 2px 4px rgba(0,0,0,0.2), 0 0 10px rgba(34, 197, 94, 0.3)",
                background: "linear-gradient(135deg, #d4d4d4 0%, #a0a0a0 50%, #d4d4d4 100%)",
              }}
            />
          </div>

          <div className="absolute bottom-4 sm:bottom-6 left-0 w-full px-4 sm:px-6">
            <div className="text-white/80 tracking-wider text-xs sm:text-sm" style={{textShadow: "0 0 5px rgba(34, 197, 94, 0.5)"}}>{cardholderName}</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes holographicShift {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes aurora {
          0% { transform: translate(5%, 5%) scale(1.0); opacity: 0.7; }
          50% { transform: translate(-5%, -5%) scale(1.2); opacity: 0.9; }
          100% { transform: translate(5%, 5%) scale(1.0); opacity: 0.7; }
        }
        @keyframes pulse-slow {
          0% { opacity: 0.6; }
          50% { opacity: 0.9; }
          100% { opacity: 0.6; }
        }
        @keyframes pulse-glow {
          0% { filter: blur(5px) brightness(1); }
          50% { filter: blur(7px) brightness(1.3); }
          100% { filter: blur(5px) brightness(1); }
        }
        .stars-small, .stars-medium, .stars-large, .stars-twinkle {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .stars-small {
          background-image: radial-gradient(1px 1px at 20px 30px, white, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 40px 70px, white, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 50px 160px, white, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 90px 40px, white, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 130px 80px, white, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 160px 120px, white, rgba(0,0,0,0));
          background-size: 200px 200px;
          opacity: 0.4;
        }
        .stars-medium {
          background-image: radial-gradient(1.5px 1.5px at 150px 150px, white, rgba(0,0,0,0)),
                          radial-gradient(1.5px 1.5px at 220px 220px, white, rgba(0,0,0,0)),
                          radial-gradient(1.5px 1.5px at 80px 250px, white, rgba(0,0,0,0)),
                          radial-gradient(1.5px 1.5px at 180px 80px, white, rgba(0,0,0,0));
          background-size: 300px 300px;
          opacity: 0.4;
        }
        .stars-large {
          background-image: radial-gradient(2px 2px at 100px 100px, white, rgba(0,0,0,0)),
                          radial-gradient(2px 2px at 200px 200px, white, rgba(0,0,0,0)),
                          radial-gradient(2px 2px at 300px 300px, white, rgba(0,0,0,0));
          background-size: 400px 400px;
          opacity: 0.5;
          animation: stars-move 100s linear infinite;
        }
        .stars-twinkle {
          background-image: radial-gradient(2px 2px at 50px 50px, rgba(255,255,255,0.8), rgba(0,0,0,0)),
                          radial-gradient(2px 2px at 150px 150px, rgba(255,255,255,0.8), rgba(0,0,0,0)),
                          radial-gradient(2px 2px at 250px 250px, rgba(255,255,255,0.8), rgba(0,0,0,0));
          background-size: 300px 300px;
          opacity: 0;
          animation: twinkle 4s ease-in-out infinite alternate;
        }
        .particles-container {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image:
            radial-gradient(1px 1px at 10% 10%, rgba(255,255,255,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 15% 15%, rgba(255,255,255,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 20% 20%, rgba(34, 197, 94, 0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 25% 25%, rgba(255,255,255,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 30% 30%, rgba(34, 197, 94, 0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 35% 35%, rgba(255,255,255,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 40% 40%, rgba(34, 197, 94, 0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 45% 45%, rgba(255,255,255,0.8), rgba(0,0,0,0));
          background-size: 150% 150%;
          animation: particles-float 20s ease infinite;
          opacity: 0.6;
        }
        @keyframes stars-move { 0% { background-position: 0px 0px, 0px 0px, 0px 0px; } 100% { background-position: 400px 400px, 300px 300px, 200px 200px; } }
        @keyframes twinkle { 0% { opacity: 0.1; } 50% { opacity: 0.7; } 100% { opacity: 0.3; } }
        @keyframes particles-float { 0% { background-position: 0% 0%; } 50% { background-position: 75% 75%; } 100% { background-position: 0% 0%; } }
        .animate-holographicShift { animation: holographicShift 5s ease infinite; }
        .animate-aurora { animation: aurora 15s ease infinite; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .perspective-3000 { perspective: 3000px; }
        .chip-glow { position: relative; }
        .chip-glow::after { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: inherit; background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0) 100%); opacity: 0; animation: chip-pulse 4s ease-in-out infinite; }
        @keyframes chip-pulse { 0% { opacity: 0; } 50% { opacity: 0.7; } 100% { opacity: 0; } }
      `}</style>
    </div>
  )
}

export default CursorWanderCard
