"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation, type Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import Image from "next/image"
import type { Project } from "./ProjectData"

const variants: Variants = {
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", duration: 1, stiffness: 50 },
    },
    hidden: { opacity: 0, y: 15 },
    exit: { opacity: 0, y: 15 },
}

const ProjectCard = ({
    link,
    image,
    title,
    description,
    publishedAt,
}: Project) => {
    const [isLoading, setLoading] = useState(true)
    const controls = useAnimation()
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

    useEffect(() => {
        if (inView) controls.start("visible")
    }, [controls, inView])

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={variants}
            className="group"
        >
            <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto flex flex-col"
                aria-label={`View ${title} project`}
            >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-100 border border-neutral-200 p-1">
                    <Image
                        src={image}
                        alt={`${title} project preview image`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        className={`object-cover transition-all duration-300 rounded-xl ${
                            isLoading ? "grayscale" : "filter-none"
                        }`}
                        onLoad={() => setLoading(false)}
                    />
                </div>
            </Link>
            <div className="p-3">
                <h3 className="text-lg font-medium text-neutral-900 mb-1">
                    {title}
                </h3>
                <p className="text-sm text-neutral-600 mb-2">{description}</p>
                <time className="text-xs text-neutral-500">
                    {new Date(publishedAt).toLocaleDateString()}
                </time>
            </div>
        </motion.div>
    )
}

export default ProjectCard
