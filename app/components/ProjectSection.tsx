"use client"

import { useInView } from "react-intersection-observer"
import {
    items,
    getProjectLinks,
    formatProjectTech,
    GITHUB_PROFILE_URL,
} from "./ProjectData"
import type { Project } from "./ProjectData"
import { useEffect, useState, useMemo } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"

const specialtyKeys = [
    "specialtyDevelopment",
    "specialtyNetworking",
    "specialtySystemAdmin",
] as const

function ProjectLink({
    href,
    label,
    projectTitle,
    reduceMotion,
}: {
    href: string
    label: string
    projectTitle: string
    reduceMotion: boolean
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (${projectTitle})`}
            className="group/link inline-flex min-h-9 items-center gap-0.5 rounded-sm text-sm font-medium text-foreground transition-colors hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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

function ProjectRow({
    project,
    index,
    reduceMotion,
    githubLabel,
    websiteLabel,
}: {
    project: Project
    index: number
    reduceMotion: boolean
    githubLabel: string
    websiteLabel: string
}) {
    const { github, website } = getProjectLinks(project)
    const indexLabel = String(index).padStart(2, "0")

    return (
        <motion.li
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={
                reduceMotion
                    ? { duration: 0.2 }
                    : {
                          duration: 0.4,
                          ease: "easeOut",
                          delay: (index - 1) * 0.05,
                      }
            }
            className="border-b border-border py-6 sm:py-7"
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
                <div className="flex min-w-0 gap-5 sm:gap-8">
                    <span
                        className="w-6 shrink-0 pt-0.5 text-sm tabular-nums text-muted-foreground"
                        aria-hidden
                    >
                        {indexLabel}
                    </span>
                    <div className="min-w-0">
                        <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
                            {project.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                            {formatProjectTech(project.description)}
                        </p>
                    </div>
                </div>

                {(github || website) && (
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pl-11 sm:shrink-0 sm:justify-end sm:pl-0">
                        {github ? (
                            <ProjectLink
                                href={github}
                                label={githubLabel}
                                projectTitle={project.title}
                                reduceMotion={reduceMotion}
                            />
                        ) : null}
                        {website ? (
                            <ProjectLink
                                href={website}
                                label={websiteLabel}
                                projectTitle={project.title}
                                reduceMotion={reduceMotion}
                            />
                        ) : null}
                    </div>
                )}
            </div>
        </motion.li>
    )
}

export default function ProjectSection() {
    const t = useTranslations("project")
    const prefersReduced = useReducedMotion()
    const reduceMotion = prefersReduced ?? false

    const [sentinelRef, sentinelInView] = useInView({
        rootMargin: "-20px 0px 0px 0px",
        threshold: 0,
        triggerOnce: false,
        initialInView: true,
        fallbackInView: true,
    })

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    const isStickyActive = mounted ? !sentinelInView : false

    const sorted = useMemo(
        () =>
            [...items].sort(
                (a, b) =>
                    new Date(b.publishedAt).getTime() -
                    new Date(a.publishedAt).getTime(),
            ),
        [],
    )

    const countLabel = String(sorted.length).padStart(2, "0")

    return (
        <section
            id="projects"
            className="py-14 sm:py-20 lg:py-24"
            aria-labelledby="projects-heading"
        >
            <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,18fr)] lg:gap-16 xl:gap-24">
                <div className="relative min-w-0 space-y-2 lg:max-w-xs">
                    <div
                        ref={sentinelRef}
                        aria-hidden="true"
                        className="absolute -top-20 left-0 h-px w-px"
                    />

                    <div className="flex flex-col justify-start space-y-2 xl:sticky xl:top-20 xl:h-fit">
                        <motion.div
                            className="flex flex-col space-y-4"
                            style={{ transformOrigin: "top left" }}
                            animate={
                                isStickyActive
                                    ? { scale: 0.97, opacity: 0.9 }
                                    : { scale: 1, opacity: 1 }
                            }
                            transition={
                                prefersReduced
                                    ? { duration: 0 }
                                    : { duration: 0.3, ease: "easeOut" }
                            }
                        >
                            <h2
                                id="projects-heading"
                                className="text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl"
                            >
                                {t("title")}
                            </h2>
                            <div
                                className={`flex flex-wrap gap-2 xl:flex-col xl:gap-3 ${
                                    isStickyActive ? "badges--dark" : ""
                                }`}
                            >
                                {specialtyKeys.map((key) => (
                                    <span key={key} className="badge">
                                        {t(key)}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="min-w-0">
                    <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                        <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                            {t("selectedProjects")}
                        </p>
                        <p
                            className="text-xs tabular-nums text-muted-foreground"
                            aria-label={t("projectCount", {
                                count: sorted.length,
                            })}
                        >
                            {countLabel}
                        </p>
                    </div>

                    <ul aria-label={t("selectedProjects")}>
                        {sorted.map((project, i) => (
                            <ProjectRow
                                key={project.title}
                                project={project}
                                index={i + 1}
                                reduceMotion={reduceMotion}
                                githubLabel={t("githubLink")}
                                websiteLabel={t("visitWebsite")}
                            />
                        ))}
                    </ul>

                    {GITHUB_PROFILE_URL ? (
                        <div className="pt-5">
                            <ProjectLink
                                href={GITHUB_PROFILE_URL}
                                label={t("moreOnGithub")}
                                projectTitle={t("moreOnGithubContext")}
                                reduceMotion={reduceMotion}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    )
}
