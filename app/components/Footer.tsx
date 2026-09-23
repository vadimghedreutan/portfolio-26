"use client"

import { motion, useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"
import {
    CONTACT_EMAIL_HREF,
    GITHUB_PROFILE_URL,
    LINKEDIN_URL,
} from "@/lib/contact"

function ContactTextLink({
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
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex min-h-9 items-center gap-0.5 rounded-sm text-sm font-medium text-foreground underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
        >
            <span>{label}</span>
            <motion.span
                aria-hidden
                className="inline-block transition-transform group-focus-visible/link:translate-x-0.5 group-focus-visible/link:-translate-y-0.5"
                initial={false}
                whileHover={reduceMotion ? undefined : { x: 2, y: -2 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                ↗
            </motion.span>
        </a>
    )
}

function EmailLink({
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
            className="group/email inline-flex min-h-11 items-center justify-center gap-0.5 rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
        >
            <span>{label}</span>
            <motion.span
                aria-hidden
                className="inline-block transition-transform group-focus-visible/email:translate-x-0.5 group-focus-visible/email:-translate-y-0.5"
                initial={false}
                whileHover={reduceMotion ? undefined : { x: 2, y: -2 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                ↗
            </motion.span>
        </a>
    )
}

export default function Footer() {
    const t = useTranslations("contact")
    const reduceMotion = useReducedMotion() ?? false
    const currentYear = new Date().getFullYear()

    const sectionReveal = reduceMotion
        ? { opacity: 1 }
        : { opacity: 1, y: 0 }
    const sectionInitial = reduceMotion ? false : { opacity: 0, y: 16 }

    return (
        <footer className="mt-auto">
            <section
                id="contact"
                className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-10 sm:py-20 lg:py-24"
                aria-labelledby="contact-heading"
            >
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-neutral-950 px-3.5 py-1 text-sm font-medium tabular-nums text-white">
                            {t("sectionNumber")}
                        </span>
                        <h2
                            id="contact-heading"
                            className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
                        >
                            {t("sectionTitle")}
                        </h2>
                    </div>
                    <hr className="border-border" aria-hidden="true" />
                </div>

                <motion.div
                    className="mt-10 lg:mt-12"
                    initial={sectionInitial}
                    whileInView={sectionReveal}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={
                        reduceMotion
                            ? { duration: 0.2 }
                            : { duration: 0.45, ease: "easeOut" }
                    }
                >
                    <h3 className="text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground">
                        {t("headline")}
                    </h3>

                    <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {t("supporting")}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
                        {CONTACT_EMAIL_HREF ? (
                            <EmailLink
                                href={CONTACT_EMAIL_HREF}
                                label={t("sendEmail")}
                                reduceMotion={reduceMotion}
                            />
                        ) : null}
                        {LINKEDIN_URL ? (
                            <ContactTextLink
                                href={LINKEDIN_URL}
                                label={t("linkedin")}
                                reduceMotion={reduceMotion}
                            />
                        ) : null}
                        {GITHUB_PROFILE_URL ? (
                            <ContactTextLink
                                href={GITHUB_PROFILE_URL}
                                label={t("github")}
                                reduceMotion={reduceMotion}
                            />
                        ) : null}
                    </div>
                </motion.div>

                <hr
                    className="mt-14 border-border sm:mt-16"
                    aria-hidden="true"
                />

                <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    <p>{t("copyright", { year: currentYear })}</p>
                    <p className="sm:text-right">{t("footerCredit")}</p>
                </div>
            </section>
        </footer>
    )
}
