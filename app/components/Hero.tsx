"use client"

import Image from "next/image"
import {
    motion,
    useScroll,
    useTransform,
    useReducedMotion,
} from "motion/react"
import type { AvailabilityStatus } from "@/lib/availability"

type HeroProps = {
    greeting: string
    headline: string
    description: string
    exploreProjects: string
    contactMe: string
    availabilityStatus: AvailabilityStatus
    availabilityAvailable: string
    availabilityUnavailable: string
}

function useHeroMotion(disabled: boolean) {
    const { scrollY } = useScroll()

    const y = useTransform(scrollY, [0, 320], [0, -18])
    const opacity = useTransform(scrollY, [0, 320], [1, 0.97])

    const motionStyle = disabled ? {} : { y, opacity }
    const initial = disabled ? {} : { rotate: -6 }
    const whileHover = disabled ? {} : { rotate: 0 }

    return { motionStyle, initial, whileHover }
}

export default function Hero({
    greeting,
    headline,
    description,
    exploreProjects,
    contactMe,
    availabilityStatus,
    availabilityAvailable,
    availabilityUnavailable,
}: HeroProps) {
    const prefersReducedMotion = useReducedMotion()
    const motionDisabled = prefersReducedMotion ?? false
    const { motionStyle, initial, whileHover } = useHeroMotion(motionDisabled)

    const availabilityText =
        availabilityStatus === "available"
            ? availabilityAvailable
            : availabilityStatus === "unavailable"
              ? availabilityUnavailable
              : null

    const contentInitial = motionDisabled ? false : { opacity: 0, y: 12 }
    const contentAnimate = motionDisabled ? undefined : { opacity: 1, y: 0 }
    const contentTransition = motionDisabled
        ? undefined
        : { duration: 0.45, ease: "easeOut" as const }

    return (
        <section
            className="relative w-full pb-10 pt-6 sm:pb-14 sm:pt-10 lg:pb-16"
            aria-labelledby="hero-heading"
        >
            <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-14 xl:gap-20">
                <motion.div
                    className="shrink-0 self-center lg:self-auto"
                    style={motionStyle}
                >
                    <motion.div
                        initial={initial}
                        whileHover={whileHover}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                        <Image
                            src="/profile_art.webp"
                            alt="Portrait of Vadim Ghedreutan in an artistic style"
                            width={280}
                            height={280}
                            sizes="(max-width: 1024px) min(240px, 62vw), 280px"
                            className="aspect-square w-[min(280px,62vw)] rounded-2xl object-cover shadow-sm lg:w-[280px]"
                            priority
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    className="flex min-w-0 flex-1 flex-col gap-5 sm:gap-6"
                    initial={contentInitial}
                    animate={contentAnimate}
                    transition={contentTransition}
                >
                    <p className="text-base text-muted-foreground sm:text-lg">
                        {greeting}
                    </p>

                    <h1
                        id="hero-heading"
                        className="max-w-2xl text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.04em] text-foreground"
                    >
                        {headline}
                    </h1>

                    <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-1">
                        <a
                            href="#projects"
                            className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
                        >
                            {exploreProjects}
                        </a>
                        <a
                            href="#contact"
                            className="text-sm font-medium text-foreground underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
                        >
                            {contactMe}
                        </a>
                    </div>
                </motion.div>
            </div>

            <div className="mt-12 sm:mt-14">
                <hr className="border-border" aria-hidden="true" />
                {availabilityText ? (
                    <div className="mt-6 flex items-center gap-2.5 text-sm text-muted-foreground sm:text-base">
                        <span
                            className={`size-2.5 shrink-0 rounded-full ${
                                availabilityStatus === "available"
                                    ? "bg-emerald-500"
                                    : "bg-muted-foreground/50"
                            }`}
                            aria-hidden="true"
                        />
                        <p>{availabilityText}</p>
                    </div>
                ) : null}
            </div>
        </section>
    )
}
