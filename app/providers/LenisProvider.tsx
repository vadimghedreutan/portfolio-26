"use client"

import { ReactNode, useEffect, useRef } from "react"
import Lenis from "lenis"

export function LenisProvider({ children }: { children: ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        // Only initialize Lenis on the client side
        if (typeof window === "undefined") return

        try {
            const lenis = new Lenis({
                duration: 1.2, // Animation duration
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
                lerp: 0.1, // Smoothness (0 = instant, 1 = never)
                smoothWheel: true, // Enable smooth wheel scrolling
                wheelMultiplier: 1, // Wheel sensitivity
                touchMultiplier: 2, // Touch sensitivity
                infinite: false, // Disable infinite scrolling
            })

            lenisRef.current = lenis

            function raf(time: number) {
                lenis.raf(time)
                requestAnimationFrame(raf)
            }
            requestAnimationFrame(raf)

            return () => {
                if (lenisRef.current) {
                    lenisRef.current.destroy()
                    lenisRef.current = null
                }
            }
        } catch (error) {
            console.error("Failed to initialize Lenis:", error)
            // Fallback to normal scrolling if Lenis fails
        }
    }, [])

    return <>{children}</>
}
