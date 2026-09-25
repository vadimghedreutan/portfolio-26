"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Menu, X } from "lucide-react"
import LocaleSwitcher from "./LocaleSwitcher"
import { GITHUB_PROFILE_URL, LINKEDIN_URL } from "@/lib/contact"

const navLinkClass =
    "text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

function GithubPill({ label }: { label: string }) {
    if (!GITHUB_PROFILE_URL) return null
    return (
        <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-9 items-center gap-0.5 rounded-full bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
            <span>{label}</span>
            <span aria-hidden>↗</span>
        </a>
    )
}

export default function Header() {
    const t = useTranslations("header")
    const menuId = useId()
    const [open, setOpen] = useState(false)
    const toggleRef = useRef<HTMLButtonElement>(null)

    const close = useCallback(() => setOpen(false), [])

    useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                close()
                toggleRef.current?.focus()
            }
        }
        document.addEventListener("keydown", onKey)
        return () => document.removeEventListener("keydown", onKey)
    }, [open, close])

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : ""
        return () => {
            document.body.style.overflow = ""
        }
    }, [open])

    const navItems = (
        <>
            <a href="#about" className={navLinkClass} onClick={close}>
                {t("about")}
            </a>
            <a href="#contact" className={navLinkClass} onClick={close}>
                {t("contact")}
            </a>
            {LINKEDIN_URL ? (
                <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={navLinkClass}
                >
                    {t("linkedin")}
                </a>
            ) : null}
            <LocaleSwitcher />
            <GithubPill label={t("github")} />
        </>
    )

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-10 sm:py-5">
                <Link
                    href="/"
                    prefetch={false}
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-neutral-950 font-serif text-lg text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label="Go to homepage"
                >
                    VG
                </Link>

                <nav
                    className="hidden items-center gap-5 lg:flex"
                    aria-label="Primary"
                >
                    {navItems}
                </nav>

                <div className="flex items-center gap-3 lg:hidden">
                    <LocaleSwitcher />
                    <button
                        ref={toggleRef}
                        type="button"
                        className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        aria-expanded={open}
                        aria-controls={menuId}
                        aria-label={open ? t("menuClose") : t("menuOpen")}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? (
                            <X className="size-5" aria-hidden />
                        ) : (
                            <Menu className="size-5" aria-hidden />
                        )}
                    </button>
                </div>
            </div>

            {open ? (
                <nav
                    id={menuId}
                    className="border-t border-border bg-white px-5 py-4 lg:hidden"
                    aria-label="Mobile"
                >
                    <div className="mx-auto flex max-w-6xl flex-col gap-4">
                        <a href="#about" className={navLinkClass} onClick={close}>
                            {t("about")}
                        </a>
                        <a href="#contact" className={navLinkClass} onClick={close}>
                            {t("contact")}
                        </a>
                        {LINKEDIN_URL ? (
                            <a
                                href={LINKEDIN_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={navLinkClass}
                            >
                                {t("linkedin")}
                            </a>
                        ) : null}
                        <GithubPill label={t("github")} />
                    </div>
                </nav>
            ) : null}
        </header>
    )
}
