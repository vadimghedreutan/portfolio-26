"use client"

import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"
import { motion, useReducedMotion } from "motion/react"
import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const OPTIONS: { value: "light" | "system" | "dark"; Icon: LucideIcon }[] = [
    { value: "light", Icon: Sun },
    { value: "system", Icon: Monitor },
    { value: "dark", Icon: Moon },
]

const containerClass =
    "inline-flex items-center gap-0.5 rounded-full border border-border bg-muted p-[3px]"

export default function ThemeSwitcher({
    className,
    idPrefix = "theme",
}: {
    className?: string
    // Distinct layoutId per instance (desktop nav + mobile menu can coexist).
    idPrefix?: string
}) {
    const t = useTranslations("theme")
    const { theme, setTheme } = useTheme()
    const reduceMotion = useReducedMotion() ?? false
    const [mounted, setMounted] = useState(false)
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

    useEffect(() => setMounted(true), [])

    // Same footprint as the real control so nothing shifts after hydration.
    if (!mounted) {
        return (
            <div
                className={cn(containerClass, className)}
                aria-hidden
            >
                {OPTIONS.map(({ value }) => (
                    <span key={value} className="size-8" />
                ))}
            </div>
        )
    }

    const current = theme ?? "system"
    const activeIndex = Math.max(
        0,
        OPTIONS.findIndex((o) => o.value === current),
    )

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        const step =
            e.key === "ArrowRight" || e.key === "ArrowDown"
                ? 1
                : e.key === "ArrowLeft" || e.key === "ArrowUp"
                  ? -1
                  : 0
        let next = activeIndex
        if (step) next = (activeIndex + step + OPTIONS.length) % OPTIONS.length
        else if (e.key === "Home") next = 0
        else if (e.key === "End") next = OPTIONS.length - 1
        else return
        e.preventDefault()
        setTheme(OPTIONS[next].value)
        buttonRefs.current[next]?.focus()
    }

    return (
        <div
            role="radiogroup"
            aria-label={t("label")}
            className={cn(containerClass, className)}
            onKeyDown={onKeyDown}
        >
            {OPTIONS.map(({ value, Icon }, i) => {
                const active = i === activeIndex
                const label = t(value)
                return (
                    <button
                        key={value}
                        ref={(el) => {
                            buttonRefs.current[i] = el
                        }}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        aria-label={label}
                        title={label}
                        tabIndex={active ? 0 : -1}
                        onClick={() => setTheme(value)}
                        className={cn(
                            "relative inline-flex size-8 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                            active
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground",
                        )}
                    >
                        {active ? (
                            <motion.span
                                layoutId={`${idPrefix}-switcher-thumb`}
                                aria-hidden
                                className="absolute inset-0 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.06)] dark:bg-neutral-800 dark:shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                                transition={
                                    reduceMotion
                                        ? { duration: 0 }
                                        : {
                                              type: "spring",
                                              stiffness: 400,
                                              damping: 30,
                                          }
                                }
                            />
                        ) : null}
                        <Icon className="relative size-4" aria-hidden />
                    </button>
                )
            })}
        </div>
    )
}
