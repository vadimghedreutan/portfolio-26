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
                    className={`text-sm px-2 py-1 font-semibold transition-opacity ${
                        l === locale
                            ? "opacity-100 underline"
                            : "opacity-60 hover:opacity-100"
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
