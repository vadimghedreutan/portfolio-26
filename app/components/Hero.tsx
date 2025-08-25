"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "motion/react"
import { useState, useEffect } from "react"

type HeroProps = {
    title: string
    name: string
    subtitle: string
}

export default function Hero({ title, subtitle, name }: HeroProps) {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
        setPrefersReducedMotion(mediaQuery.matches)

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches)
        }

        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [])

    // Global scroll tracking
    const { scrollY } = useScroll()

    // Transform scroll values: first 240px of scroll maps to y: 0 → -96 and opacity: 1 → 0.95
    const y = useTransform(scrollY, [0, 240], [0, -46])
    const opacity = useTransform(scrollY, [0, 240], [1, 0.95])

    return (
        <section
            className="relative w-full min-h-dvh flex"
            aria-labelledby="hero-heading"
        >
            <div className="mt-auto w-full">
                <div className="flex flex-col space-y-4 pb-30">
                    <motion.div
                        className="group flex gap-7 items-center"
                        style={prefersReducedMotion ? {} : { y, opacity }}
                    >
                        <motion.div
                            initial={prefersReducedMotion ? {} : { rotate: -6 }}
                            whileHover={
                                prefersReducedMotion ? {} : { rotate: 0 }
                            }
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <Image
                                src="/profile_art.webp"
                                alt="Profile portrait of Vadim Ghedreutan with artistic styling"
                                width={120}
                                height={120}
                                className="rounded-xl object-cover"
                                priority
                            />
                        </motion.div>
                        <div>
                            <h1 id="hero-heading" className="heading-title">
                                {title}
                            </h1>
                            <p className="heading-title">{name}</p>
                        </div>
                    </motion.div>
                    <div>
                        <p className="heading-subtitle">{subtitle}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
