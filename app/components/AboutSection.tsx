"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"

const timelineKeys = [
    {
        country: "timelineMoldovaCountry",
        detail: "timelineMoldovaDetail",
    },
    {
        country: "timelinePortugalCountry",
        detail: "timelinePortugalDetail",
    },
    {
        country: "timelineGermanyCountry",
        detail: "timelineGermanyDetail",
    },
] as const

export default function AboutSection() {
    const t = useTranslations("about")
    const reduceMotion = useReducedMotion() ?? false

    const sectionReveal = reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
    const sectionInitial = reduceMotion ? false : { opacity: 0, y: 16 }

    return (
        <section
            id="about"
            className="py-14 sm:py-20 lg:py-24"
            aria-labelledby="about-heading"
        >
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-neutral-950 px-3.5 py-1 text-sm font-medium tabular-nums text-white">
                        {t("sectionNumber")}
                    </span>
                    <h2
                        id="about-heading"
                        className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
                    >
                        {t("sectionTitle")}
                    </h2>
                </div>
                <hr className="border-border" aria-hidden="true" />
            </div>

            <motion.div
                className="mt-10 grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:grid-rows-[auto_1fr] md:gap-x-10 md:gap-y-8 lg:mt-12 lg:gap-x-16 xl:gap-x-20"
                initial={sectionInitial}
                whileInView={sectionReveal}
                viewport={{ once: true, amount: 0.15 }}
                transition={
                    reduceMotion
                        ? { duration: 0.2 }
                        : { duration: 0.45, ease: "easeOut" }
                }
            >
                <div className="min-w-0 md:col-start-1 md:row-start-1">
                    <Image
                        src="/profile_art.webp"
                        alt={t("portraitAlt")}
                        width={887}
                        height={861}
                        sizes="(min-width: 1024px) 280px, (min-width: 768px) 30vw, 260px"
                        className="h-auto w-full max-w-[260px] -rotate-[1.5deg] rounded-2xl shadow-[0_12px_32px_-16px_rgba(0,0,0,0.35)] md:max-w-[280px] lg:-rotate-3"
                    />
                </div>

                <div className="min-w-0 md:col-start-2 md:row-span-2 md:row-start-1">
                    <h3 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.03em] text-foreground">
                        {t("headlineLine1")}
                        <br />
                        {t("headlineLine2")}
                    </h3>

                    <div className="mt-6 max-w-[42rem] space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed lg:mt-8">
                        <p>{t("bioParagraph1")}</p>
                        <p>{t("bioParagraph2")}</p>
                    </div>
                </div>

                <div className="min-w-0 md:col-start-1 md:row-start-2">
                    <h3 className="text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
                        {t("journeyLine1")}
                        <br />
                        {t("journeyLine2")}
                    </h3>

                    <ol className="relative mt-5 space-y-4 border-l border-border pl-6 sm:pl-7">
                        {timelineKeys.map(({ country, detail }, index) => (
                            <motion.li
                                key={country}
                                className="relative"
                                initial={
                                    reduceMotion ? false : { opacity: 0, x: -8 }
                                }
                                whileInView={
                                    reduceMotion
                                        ? { opacity: 1 }
                                        : { opacity: 1, x: 0 }
                                }
                                viewport={{ once: true, amount: 0.4 }}
                                transition={
                                    reduceMotion
                                        ? { duration: 0.2 }
                                        : {
                                              duration: 0.35,
                                              ease: "easeOut",
                                              delay: index * 0.08,
                                          }
                                }
                            >
                                <span
                                    aria-hidden
                                    className="absolute top-1.5 -left-6 size-2 -translate-x-1/2 rounded-full bg-muted-foreground/45 sm:-left-7"
                                />
                                <p className="font-medium text-foreground">
                                    {t(country)}
                                </p>
                                <p className="mt-0.5 text-base leading-relaxed text-muted-foreground">
                                    {t(detail)}
                                </p>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </motion.div>
        </section>
    )
}
