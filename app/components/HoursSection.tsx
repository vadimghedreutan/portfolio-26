"use client"

import { motion, useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"

const skillGroupKeys = [
    {
        label: "group1Label",
        technologies: "group1Technologies",
        description: "group1Description",
    },
    {
        label: "group2Label",
        technologies: "group2Technologies",
        description: "group2Description",
    },
    {
        label: "group3Label",
        technologies: "group3Technologies",
        description: "group3Description",
    },
] as const

export default function HoursSection() {
    const t = useTranslations("skills")
    const reduceMotion = useReducedMotion() ?? false

    const sectionReveal = reduceMotion
        ? { opacity: 1 }
        : { opacity: 1, y: 0 }
    const sectionInitial = reduceMotion ? false : { opacity: 0, y: 16 }

    return (
        <section
            id="hours"
            className="py-14 sm:py-20 lg:py-24"
            aria-labelledby="skills-heading"
        >
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-neutral-950 px-3.5 py-1 text-sm font-medium tabular-nums text-white">
                        {t("sectionNumber")}
                    </span>
                    <h2
                        id="skills-heading"
                        className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
                    >
                        {t("sectionTitle")}
                    </h2>
                </div>
                <hr className="border-border" aria-hidden="true" />
            </div>

            <motion.div
                className="mt-10 grid items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,18fr)] lg:mt-12 lg:gap-16 xl:gap-24"
                initial={sectionInitial}
                whileInView={sectionReveal}
                viewport={{ once: true, amount: 0.15 }}
                transition={
                    reduceMotion
                        ? { duration: 0.2 }
                        : { duration: 0.45, ease: "easeOut" }
                }
            >
                <div className="min-w-0 lg:max-w-xs">
                    <h3 className="text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
                        {t("introLine1")}
                        <br />
                        {t("introLine2")}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {t("introSupporting")}
                    </p>
                </div>

                <div className="min-w-0 divide-y divide-border">
                    {skillGroupKeys.map(
                        ({ label, technologies, description }, index) => (
                            <motion.div
                                key={label}
                                className="py-8 first:pt-0 last:pb-0 sm:py-9"
                                initial={
                                    reduceMotion
                                        ? false
                                        : { opacity: 0, y: 10 }
                                }
                                whileInView={
                                    reduceMotion
                                        ? { opacity: 1 }
                                        : { opacity: 1, y: 0 }
                                }
                                viewport={{ once: true, amount: 0.2 }}
                                transition={
                                    reduceMotion
                                        ? { duration: 0.2 }
                                        : {
                                              duration: 0.4,
                                              ease: "easeOut",
                                              delay: index * 0.07,
                                          }
                                }
                            >
                                <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                                    {t(label)}
                                </p>
                                <p className="mt-3 text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl">
                                    {t(technologies)}
                                </p>
                                <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                    {t(description)}
                                </p>
                            </motion.div>
                        ),
                    )}
                </div>
            </motion.div>
        </section>
    )
}
