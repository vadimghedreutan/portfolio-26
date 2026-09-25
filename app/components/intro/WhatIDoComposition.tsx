"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"
import { GITHUB_PROFILE_URL } from "@/lib/contact"
import { useDemoCycle } from "./useDemoCycle"
import {
    DeploymentCard,
    DevelopmentCard,
    FirewallCard,
    MonitoringCard,
    NetworkingCard,
    ServerCard,
    SystemAdminCard,
} from "./WhatIDoCards"

export default function WhatIDoComposition() {
    const t = useTranslations("whatIDo")
    const reduceMotion = useReducedMotion() ?? false
    const [paused, setPaused] = useState(false)
    const [inView, setInView] = useState(true)
    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const node = rootRef.current
        if (!node) return
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.12 },
        )
        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    const animEnabled = !reduceMotion
    const { phase, progress } = useDemoCycle({
        enabled: animEnabled,
        inView,
        paused,
    })

    const activeMain = reduceMotion ? 0 : phase % 3

    const commandLength = "pnpm dev".length

    const typedLength = useMemo(() => {
        if (reduceMotion || activeMain !== 0) return commandLength

        const local = (progress * 6) % 1
        return Math.min(commandLength, Math.floor(local * 10))
    }, [activeMain, progress, reduceMotion, commandLength])

    const showReady = typedLength >= commandLength

    const visibleRows = reduceMotion
        ? 3
        : activeMain === 2
          ? Math.min(3, 1 + Math.floor(((progress * 6) % 1) * 4))
          : 3

    const visibleSteps = reduceMotion
        ? 4
        : phase === 3
          ? Math.min(4, 1 + Math.floor(((progress * 6) % 1) * 4))
          : phase > 3
            ? 4
            : 1

    const cpuPct = reduceMotion
        ? 24
        : 22 + Math.round(Math.sin(progress * Math.PI * 2) * 4)
    const memPct = reduceMotion
        ? 56
        : 54 + Math.round(Math.cos(progress * Math.PI * 2) * 3)

    const togglePause = useCallback(() => setPaused((p) => !p), [])

    return (
        <div
            ref={rootRef}
            className="relative min-w-0 xl:[--bleed:calc((100vw_-_min(100vw,72rem))/2_+_2.5rem)] xl:mr-[calc(var(--bleed)*-1)]"
        >
            <p className="mb-4 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase xl:mb-0 xl:pl-1">
                {t("sectionLabel")}
            </p>

            <div className="relative xl:overflow-hidden">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle,var(--color-border)_1px,transparent_1px)] bg-size-[22px_22px] opacity-70 xl:block"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-20 bg-linear-to-l from-white to-transparent xl:block"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden h-12 bg-linear-to-t from-white to-transparent xl:block"
                />

                <div
                    className={`relative xl:pb-14 xl:pl-3 xl:pt-4 ${
                        reduceMotion ? "" : "intro-cards-float"
                    }`}
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:w-[990px] xl:origin-top-left xl:rotate-[1.5deg] xl:grid-cols-[330px_330px_300px] xl:gap-x-4 xl:gap-y-5">
                        <DevelopmentCard
                            active={activeMain === 0}
                            typedLength={typedLength}
                            showReady={showReady}
                            className="relative z-10 md:col-start-1 md:row-start-1 xl:self-start"
                        />
                        <NetworkingCard
                            active={activeMain === 1}
                            pulse={activeMain === 1 && !reduceMotion}
                            className="relative z-10 md:col-start-2 md:row-start-1 xl:mt-4 xl:self-start"
                        />
                        <SystemAdminCard
                            active={activeMain === 2}
                            visibleRows={visibleRows}
                            className="relative z-20 md:col-span-2 md:row-start-2 xl:col-start-1 xl:-mt-7 xl:ml-[110px] xl:w-[500px] xl:self-start"
                        />
                        <DeploymentCard
                            visibleSteps={visibleSteps}
                            className="relative z-0 hidden md:col-start-1 md:row-start-3 md:block xl:row-start-2 xl:mt-10 xl:w-[220px] xl:self-start"
                        />
                        <div className="hidden flex-col gap-4 md:col-start-2 md:row-start-3 md:flex xl:col-start-3 xl:row-span-2 xl:row-start-1 xl:mt-2 xl:gap-5">
                            <ServerCard cpuPct={cpuPct} memPct={memPct} />
                            <FirewallCard className="hidden xl:block" />
                            <MonitoringCard className="hidden xl:block" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-20 mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-5 xl:-mt-14 xl:pr-[var(--bleed)]">
                {animEnabled ? (
                    <button
                        type="button"
                        onClick={togglePause}
                        className="self-start rounded-sm text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:self-auto"
                    >
                        {paused ? t("resumeAnimation") : t("pauseAnimation")}
                    </button>
                ) : (
                    <span className="sr-only">{t("animationStatic")}</span>
                )}

                {GITHUB_PROFILE_URL ? (
                    <a
                        href={GITHUB_PROFILE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 w-full items-center justify-center gap-0.5 rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
                    >
                        <span>{t("viewGithub")}</span>
                        <span aria-hidden>↗</span>
                    </a>
                ) : null}
            </div>
        </div>
    )
}
