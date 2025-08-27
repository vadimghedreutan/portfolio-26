"use client"

import type { Project } from "./ProjectData"
import { motion } from "motion/react"
import { useInView } from "react-intersection-observer"
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card"
import Image from "next/image"

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
                <CardContainer className="w-full mx-auto">
                    <CardBody className="bg-gray-50 relative group/card  border-black/[0.1] w-full h-auto rounded-xl p-6 border  ">
                        <CardItem
                            translateZ="50"
                            className="xl:text-xl text-lg font-bold text-neutral-600"
                        >
                            {title}
                        </CardItem>
                        <CardItem
                            as="p"
                            translateZ="60"
                            className="text-neutral-500 text-sm max-w-sm mt-2"
                        >
                            {description}
                        </CardItem>
                        <CardItem
                            translateZ="30"
                            rotateX={5}
                            rotateZ={-3}
                            className="w-full mt-4 "
                        >
                            <div className="relative h-60 w-full">
                                <Image
                                    src={image}
                                    alt="thumbnail"
                                    fill
                                    className="object-cover rounded-xl group-hover/card:shadow-xl"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </div>
                        </CardItem>
                    </CardBody>
                </CardContainer>
            </a>
        </motion.div>
    )
}

export default ProjectCard
