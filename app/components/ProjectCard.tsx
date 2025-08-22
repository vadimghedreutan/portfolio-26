"use client"

import { useState } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import type { Project } from "./ProjectData"

const overlayVariants: Variants = {
    rest: { opacity: 0, y: 8, transition: { duration: 0.2, ease: "easeOut" } },
    hover: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.25, ease: "easeOut", delay: 0.05 },
    },
}

/** NEW: card variants to nudge/scale on hover with image blur */
const cardVariants: Variants = {
    rest: {
        scale: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.2, ease: "easeOut" },
    },
    hover: {
        scale: 1.03,
        x: -4,
        y: -4,
        filter: "blur(8px)",
        transition: { duration: 0.25, ease: "easeOut" },
    },
}

const ProjectCard = ({
    link,
    image,
    title,
    description,
    publishedAt,
}: Project) => {
    const [isLoading, setLoading] = useState(true)
    const prefersReduced = useReducedMotion()

    return (
        <div>
            <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto flex flex-col"
                aria-label={`View ${title} project`}
            >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-100 border border-neutral-200 p-1">
                    {/* Parent drives hover state for itself and the overlay/veil */}
                    <motion.div
                        className="relative h-full w-full origin-top-left will-change-transform rounded-xl"
                        variants={cardVariants}
                        initial="rest"
                        animate="rest"
                        whileHover={prefersReduced ? undefined : "hover"}
                        whileTap={
                            prefersReduced
                                ? undefined
                                : {
                                      scale: 1.01,
                                      x: -2,
                                      y: -2,
                                  }
                        }
                    >
                        <Image
                            src={image}
                            alt={`${title} project preview image`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            className={[
                                "object-cover rounded-xl",
                                isLoading ? "grayscale" : "grayscale-0",
                            ].join(" ")}
                            onLoad={() => setLoading(false)}
                        />

                        {/* Text overlay */}
                        <motion.div
                            variants={overlayVariants}
                            className="pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-4"
                        >
                            <h3 className="text-base sm:text-lg font-medium text-white mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
                                {title}
                            </h3>
                            {description && (
                                <p className="text-xs sm:text-sm text-white/80 mb-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                                    {description}
                                </p>
                            )}
                            <time className="text-[11px] sm:text-xs text-white/70">
                                {new Date(publishedAt).toLocaleDateString()}
                            </time>
                        </motion.div>
                    </motion.div>
                </div>
            </Link>
        </div>
    )
}

export default ProjectCard
