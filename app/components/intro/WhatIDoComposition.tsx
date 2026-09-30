"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"
import { ArrowUpRight, Pause, Play } from "lucide-react"
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
    TERMINAL_COMMAND,
} from "./WhatIDoCards"

export default function WhatIDoComposition() {
    const t = useTranslations("whatIDo")
    const reduceMotion = useReducedMotion() ?? false
    const [paused, setPaused] = useState(false)
    const [inView, setInView] = useState(false)
    // Set once the terminal is actually on screen; cleared when the whole
    // composition leaves the viewport. The cycle (and the typing, which starts
    // at phase 0) only runs after this, so the prompt is never seen empty.
    const [started, setStarted] = useState(false)
    const rootRef = useRef<HTMLDivElement>(null)
    const terminalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const root = rootRef.current
        const terminal = terminalRef.current
        if (!root || !terminal) return
        const rootObserver = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting)
                if (!entry.isIntersecting) setStarted(false)
            },
            { threshold: 0.12 },
        )
        const terminalObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setStarted(true)
            },
            { threshold: 0.6 },
        )
        rootObserver.observe(root)
        terminalObserver.observe(terminal)
        return () => {
            rootObserver.disconnect()
            terminalObserver.disconnect()
        }
    }, [])

    const animEnabled = !reduceMotion
    const { phase, progress } = useDemoCycle({
        enabled: animEnabled,
        inView: inView && started,
        paused,
    })

    const activeMain = reduceMotion ? 0 : phase % 3

    const commandLength = TERMINAL_COMMAND.length

    const typedLength = useMemo(() => {
        // Before the card has been seen, show the finished command rather than
        // an empty prompt.
        if (reduceMotion || !started || activeMain !== 0) return commandLength

        // Finish typing ~60% into the phase so "Started" stays readable.
        const local = (progress * 6) % 1
        return Math.min(commandLength, Math.floor(local * commandLength * 1.6))
    }, [activeMain, progress, reduceMotion, started, commandLength])

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
            <div className="mb-3 flex items-center justify-between md:mb-4 xl:mb-0">
                <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase xl:pl-1">
                    {t("sectionLabel")}
                </p>
                {animEnabled ? (
                    <button
                        type="button"
                        onClick={togglePause}
                        aria-label={
                            paused ? t("playAnimation") : t("pauseAnimation")
                        }
                        className="-my-3 -mr-3 inline-flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
                    >
                        {paused ? (
                            <Play className="size-4" aria-hidden />
                        ) : (
                            <Pause className="size-4" aria-hidden />
                        )}
                    </button>
                ) : null}
            </div>

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
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 xl:w-[990px] xl:origin-top-left xl:rotate-[1.5deg] xl:grid-cols-[330px_330px_300px] xl:gap-x-4 xl:gap-y-5">
                        <div
                            ref={terminalRef}
                            className="relative z-10 md:col-start-1 md:row-start-1 xl:self-start"
                        >
                        <DevelopmentCard
                            active={activeMain === 0}
                            typedLength={typedLength}
                            showReady={showReady}
                        />
                        </div>
                        <NetworkingCard
                            active={activeMain === 1}
                            pulse={activeMain === 1 && !reduceMotion}
                            className="relative z-10 max-md:order-4 md:col-start-2 md:row-start-1 xl:mt-4 xl:self-start"
                        />
                        <SystemAdminCard
                            active={activeMain === 2}
                            visibleRows={visibleRows}
                            className="relative z-20 max-md:order-3 md:col-span-2 md:row-start-2 xl:col-start-1 xl:-mt-7 xl:ml-[110px] xl:w-[500px] xl:self-start"
                        />
                        <DeploymentCard
                            visibleSteps={visibleSteps}
                            className="relative z-0 max-md:order-2 md:col-start-1 md:row-start-3 xl:row-start-2 xl:mt-10 xl:w-[220px] xl:self-start"
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
                        className="hidden rounded-sm text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:inline"
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
                        <ArrowUpRight size={16} aria-hidden />
                    </a>
                ) : null}
            </div>
        </div>
    )
}
