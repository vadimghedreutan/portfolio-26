"use client"

import Image from "next/image"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"

type HeroProps = {
    title: string
    name: string
    subtitle: string
}

function useHeroMotion(disabled: boolean) {
    // Track page scroll (always call hooks unconditionally)
    const { scrollY } = useScroll()

    // Map the first 240px of scroll to y: 0 → -46 and opacity: 1 → 0.95
    // (kept -46 to match original visuals; comment + code now consistent)
    const y = useTransform(scrollY, [0, 240], [0, -46])
    const opacity = useTransform(scrollY, [0, 240], [1, 0.95])

    // When motion is disabled, return empty style/props
    const motionStyle = disabled ? {} : { y, opacity }
    const initial = disabled ? {} : { rotate: -6 }
    const whileHover = disabled ? {} : { rotate: 0 }

    return { motionStyle, initial, whileHover }
}

export default function Hero({ title, subtitle, name }: HeroProps) {
    const prefersReducedMotion = useReducedMotion()
    const { motionStyle, initial, whileHover } = useHeroMotion(
        prefersReducedMotion ?? false
    )

    return (
        <section
            className="relative w-full min-h-dvh flex"
            aria-labelledby="hero-heading"
            aria-describedby="hero-subtitle"
        >
            <div className="mt-auto w-full">
                <div className="flex flex-col space-y-4 pb-32">
                    <motion.div
                        className="group flex items-center gap-7"
                        style={motionStyle}
                    >
                        <motion.div
                            initial={initial}
                            whileHover={whileHover}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <Image
                                src="/profile_art.webp"
                                alt="Portrait of Vadim Ghedreutan in an artistic style"
                                width={120}
                                height={120}
                                sizes="(max-width: 640px) 80px, 120px"
                                className="rounded-xl object-cover"
                                priority
                            />
                        </motion.div>

                        <div>
                            <h1 id="hero-heading" className="heading-title">
                                {title}
                            </h1>
                            {/* Use a true heading for the name to aid screen-reader navigation */}
                            <h2 className="heading-title">{name}</h2>
                        </div>
                    </motion.div>

                    <div>
                        <p id="hero-subtitle" className="heading-subtitle">
                            {subtitle}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
