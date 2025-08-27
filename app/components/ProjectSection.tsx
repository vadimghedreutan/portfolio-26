"use client"

import { useInView } from "react-intersection-observer"
import ProjectCard from "./ProjectCard"
import { items } from "./ProjectData"
import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"

type ProjectProps = {
    title: string
    subtitle: string
}

export default function ProjectSection({ title, subtitle }: ProjectProps) {
    const [sentinelRef, sentinelInView] = useInView({
        rootMargin: "-20px 0px 0px 0px", // match your sticky top
        threshold: 0,
        triggerOnce: false,
        initialInView: true, // <- prevents dark flash
        fallbackInView: true, // <- safer on mobile/iOS
    })

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    const isStickyActive = mounted ? !sentinelInView : false

    const prefersReduced = useReducedMotion()

    return (
        <section
            id="projects"
            className="xl:py-20 sm:py-6 py-3"
            aria-labelledby="projects-heading"
        >
            <div className="mx-auto grid gap-12 xl:grid-cols-[300px_2fr]">
                {/* LEFT COLUMN WRAPPER (grid item #1) */}
                <div className="space-y-2">
                    {/* Sentinel lives INSIDE the left column, so it doesn't add a new grid item */}
                    <div className="relative">
                        <div
                            ref={sentinelRef}
                            aria-hidden="true"
                            className="absolute -top-20 left-0 w-px h-px"
                        />
                    </div>

                    {/* Sticky block */}
                    <div className="flex flex-col justify-start xl:sticky xl:top-20 xl:h-fit space-y-2">
                        <motion.div
                            className="flex flex-col space-y-2 xl:pt-10"
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
                            <h2 id="projects-heading" className="heading">
                                {title}
                            </h2>
                            <div
                                className={`flex xl:flex-col flex-row space-x-2 xl:space-y-2 ${
                                    isStickyActive ? "badges--dark" : ""
                                }`}
                            >
                                <span className="badge">Development</span>
                                <span className="badge">Networking</span>
                                <span className="badge">
                                    System Administrator
                                </span>
                            </div>
                        </motion.div>
                        <p className="heading">{subtitle}</p>
                    </div>
                </div>

                {/* RIGHT COLUMN (grid item #2) */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-7 py-12"
                    aria-label="Project portfolio grid"
                >
                    {items
                        .sort((a, b) =>
                            new Date(a.publishedAt) > new Date(b.publishedAt)
                                ? -1
                                : 1
                        )
                        .map((item) => (
                            <ProjectCard key={item.title} {...item} />
                        ))}
                </div>
            </div>
        </section>
    )
}
