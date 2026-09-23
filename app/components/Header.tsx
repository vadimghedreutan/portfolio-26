"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import LocaleSwitcher from "./LocaleSwitcher"

const navLinkClass =
    "text-sm sm:text-base font-medium text-foreground/80 hover:text-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

export default function Header() {
    const t = useTranslations("header")

    return (
        <header className="w-full border-b border-transparent">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-10 sm:py-6">
                <Link
                    href="/"
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-neutral-950 font-serif text-lg text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label="Go to homepage"
                >
                    VG
                </Link>

                <nav
                    className="flex max-w-[min(100%,42rem)] flex-wrap items-center justify-end gap-x-4 gap-y-2 sm:gap-x-6"
                    aria-label="Primary"
                >
                    <a href="#projects" className={navLinkClass}>
                        {t("projects")}
                    </a>
                    <a href="#about" className={navLinkClass}>
                        {t("about")}
                    </a>
                    <a href="#contact" className={navLinkClass}>
                        {t("contact")}
                    </a>
                    <a
                        href="https://www.linkedin.com/in/vadimghedreutan/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={navLinkClass}
                    >
                        {t("linkedin")}
                    </a>
                    <LocaleSwitcher />
                </nav>
            </div>
        </header>
    )
}
