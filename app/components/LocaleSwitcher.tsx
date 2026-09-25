"use client"

import { usePathname } from "@/i18n/navigation"
import { useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"

export default function LocaleSwitcher() {
    const locale = useLocale()
    const pathname = usePathname()
    const locales = ["en", "de"] as const

    return (
        <div className="flex items-center gap-2">
            {locales.map((l) => (
                <Link
                    key={l}
                    href={pathname}
                    locale={l}
                    prefetch={false}
                    className={`rounded-sm px-1 py-0.5 text-sm font-medium transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                        l === locale
                            ? "text-foreground underline decoration-foreground underline-offset-4"
                            : "text-foreground/60 hover:text-foreground"
                    }`}
                    aria-current={l === locale ? "true" : undefined}
                    aria-label={`Switch language to ${l.toUpperCase()}`}
                >
                    {l.toUpperCase()}
                </Link>
            ))}
        </div>
    )
}
