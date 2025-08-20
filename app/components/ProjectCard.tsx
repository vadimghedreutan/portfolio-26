"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation, type Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import Image from "next/image"
import clsx from "clsx"

interface Props {
    title: string
    image: string
    description: string
    link: string
    publishedAt: string
}

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
}: Props) => {
    const [isLoading, setLoading] = useState(true)
    const controls = useAnimation()
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

    useEffect(() => {
        if (inView) controls.start("visible")
    }, [controls, inView])

    return (
        <motion.div
            ref={ref as any}
            animate={controls}
            initial="hidden"
            variants={variants}
        >
            <Link href={link} target="_blank" className="mx-auto flex flex-col">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-100 border border-neutral-200 p-1">
                    <Image
                        src={image}
                        alt={`${title} preview image`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        className={clsx(
                            "object-cover transition rounded-xl", // ✅ make the image itself rounded
                            isLoading ? "grayscale" : "filter-none"
                        )}
                        onLoad={() => setLoading(false)}
                    />
                </div>
            </Link>
            <div className="p-3">
                {/* <p className="sm:text-lg sm:font-medium">
                    {title}{" "}
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        – {publishedAt}
                    </span>
                </p> */}
                {/* <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-1">
                    {description}
                </p> */}
            </div>
        </motion.div>
    )
}

export default ProjectCard
