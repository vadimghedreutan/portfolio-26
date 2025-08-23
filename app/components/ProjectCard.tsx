"use client"

import type { Project } from "./ProjectData"
import { DirectionAwareHover } from "../../components/ui/direction-aware-hover"
import { motion } from "motion/react"
import { useInView } from "react-intersection-observer"

const ProjectCard = ({ link, image, title, description }: Project) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto flex flex-col"
                aria-label={`View ${title} project`}
            >
                <div className="relative w-full flex items-center justify-center">
                    <DirectionAwareHover imageUrl={image}>
                        <div className="space-y-1">
                            <h3 className="font-bold text-xl">{title}</h3>
                            {description && (
                                <p className="font-normal text-sm text-gray-300">
                                    {description}
                                </p>
                            )}
                        </div>
                    </DirectionAwareHover>
                </div>
            </a>
        </motion.div>
    )
}

export default ProjectCard
