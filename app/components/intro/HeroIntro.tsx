"use client"

import { motion, useReducedMotion } from "motion/react"

type HeroIntroProps = {
    greeting: string
    headline: string
    description: string
    contactMe: string
    aboutMe: string
}

function ArrowLink({
    href,
    label,
    reduceMotion,
}: {
    href: string
    label: string
    reduceMotion: boolean
}) {
    return (
        <a
            href={href}
            className="group/about inline-flex min-h-9 items-center gap-0.5 rounded-sm text-sm font-medium text-foreground underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
        >
            <span>{label}</span>
            <motion.span
                aria-hidden
                className="inline-block transition-transform group-focus-visible/about:translate-x-0.5 group-focus-visible/about:-translate-y-0.5"
                initial={false}
                whileHover={reduceMotion ? undefined : { x: 2, y: -2 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                ↗
            </motion.span>
        </a>
    )
}

export default function HeroIntro({
    greeting,
    headline,
    description,
    contactMe,
    aboutMe,
}: HeroIntroProps) {
    const reduceMotion = useReducedMotion() ?? false
    const initial = reduceMotion ? false : { opacity: 0, y: 14 }
    const animate = reduceMotion ? undefined : { opacity: 1, y: 0 }

    return (
        <motion.div
            className="flex min-w-0 flex-col gap-5 sm:gap-6 xl:pb-10"
            initial={initial}
            animate={animate}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <p className="text-base text-muted-foreground sm:text-lg">
                {greeting}
            </p>
            <h1
                id="hero-heading"
                className="max-w-[6.5em] text-[clamp(2.5rem,7vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-foreground md:max-w-2xl xl:max-w-[6.5em]"
            >
                {headline}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg xl:max-w-[25rem]">
                {description}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                    href="#contact"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
                >
                    {contactMe}
                </a>
                <ArrowLink
                    href="#about"
                    label={aboutMe}
                    reduceMotion={reduceMotion}
                />
            </div>
        </motion.div>
    )
}
