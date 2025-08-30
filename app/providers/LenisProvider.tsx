"use client"

import { ReactNode, useEffect, useRef } from "react"
import Lenis from "lenis"

export function LenisProvider({ children }: { children: ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null)
    const rafIdRef = useRef<number | null>(null)

    useEffect(() => {
        if (typeof window === "undefined") return
        if (lenisRef.current) return

        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches

        try {
            const lenis = new Lenis({
                // Choose ONE smoothing strategy → duration (remove lerp)
                duration: prefersReduced ? 0.6 : 1.0, // slightly shorter for 120Hz
                // ease-out with minimal tail; avoids floaty feel on ProMotion
                easing: (t: number) => 1 - Math.pow(1 - t, 3),
                smoothWheel: !prefersReduced,
                syncTouch: true,
                wheelMultiplier: 1, // keep neutral; tweak 0.9–1.1 if needed
                touchMultiplier: 1.6, // trackpad pace; lower if it feels “slippery”
                infinite: false,
            })

            lenisRef.current = lenis

            const raf = (time: number) => {
                lenis.raf(time)
                rafIdRef.current = requestAnimationFrame(raf)
            }
            rafIdRef.current = requestAnimationFrame(raf)

            return () => {
                if (rafIdRef.current != null)
                    cancelAnimationFrame(rafIdRef.current)
                rafIdRef.current = null
                lenisRef.current?.destroy()
                lenisRef.current = null
            }
        } catch (e) {
            console.error("Lenis init failed:", e)
        }
    }, [])

    return <>{children}</>
}
