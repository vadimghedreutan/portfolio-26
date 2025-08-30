"use client"

import React from "react"
import { motion, useReducedMotion, type Variants } from "motion/react"
import { Badge } from "../../components/ui/badge"
import { useTranslations } from "next-intl"

type IconProps = React.SVGProps<SVGSVGElement>
type Social = {
    name: string
    href: string
    Icon: (props: IconProps) => React.ReactElement
    title?: string
}

/* ---------- Icons (unchanged) ---------- */

const GithubIcon = (props: IconProps) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 .5C5.648.5.75 5.398.75 11.75c0 4.92 3.188 9.096 7.615 10.57.557.102.76-.242.76-.538 0-.266-.01-1.147-.016-2.08-3.096.674-3.75-1.324-3.75-1.324-.507-1.288-1.237-1.63-1.237-1.63-1.012-.692.077-.678.077-.678 1.118.078 1.706 1.148 1.706 1.148.995 1.705 2.612 1.212 3.25.927.102-.72.39-1.213.709-1.492-2.473-.281-5.073-1.236-5.073-5.501 0-1.216.434-2.21 1.147-2.987-.115-.282-.497-1.414.108-2.948 0 0 .938-.3 3.074 1.14a10.66 10.66 0 0 1 2.798-.376c.95.004 1.907.129 2.802.376 2.134-1.44 3.07-1.14 3.07-1.14.607 1.534.225 2.666.11 2.948.714.777 1.145 1.771 1.145 2.987 0 4.276-2.604 5.216-5.086 5.492.4.346.755 1.03.755 2.076 0 1.5-.014 2.708-.014 3.078 0 .298.2.647.77.537 4.424-1.477 7.61-5.651 7.61-10.57C23.25 5.398 18.352.5 12 .5z"
        />
    </svg>
)
const XIcon = (props: IconProps) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.5l-5.146-6.74-5.89 6.74H2.156l7.73-8.836L1.725 2.25h7.6l4.658 6.134 4.261-6.134zM16.729 19.55h1.833L7.393 4.33H5.426l11.303 15.22z" />
    </svg>
)
const MailIcon = (props: IconProps) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
        <path d="M20 4H4a2 2 0 0 0-2 2v12c0 1.103.897 2 2 2h16a2 2 0 0 0 2-2V6c0-1.103-.897-2-2-2zm0 2-8 5L4 6h16zm0 12H4V8l8 5 8-5v10z" />
    </svg>
)
const LinkedinIcon = (props: IconProps) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
)

/* ---------- Data ---------- */

const socials: Social[] = [
    {
        name: "GitHub",
        href: "https://github.com/vadimghedreutan",
        Icon: GithubIcon,
        title: "Open my GitHub profile",
    },
    {
        name: "Twitter",
        href: "https://twitter.com/GhedreutanVadim",
        Icon: XIcon,
        title: "Open my Twitter profile",
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/vadimghedreutan",
        Icon: LinkedinIcon,
        title: "Connect with me on LinkedIn",
    },
    {
        name: "Email",
        href: "mailto:dev.vadimghedreutan@gmail.com",
        Icon: MailIcon,
        title: "Send me an email",
    },
]

/* ---------- Main Component ---------- */

const Footer = () => {
    const c = useTranslations("contact")
    const currentYear = new Date().getFullYear()
    const reduce = useReducedMotion()

    const itemVariants: Variants = {
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 12 },
        show: (i: number) =>
            reduce
                ? { opacity: 1, transition: { duration: 0.2, delay: i * 0.08 } }
                : {
                      opacity: 1,
                      y: 0,
                      transition: {
                          type: "spring",
                          stiffness: 140,
                          damping: 18,
                          delay: i * 0.08,
                      },
                  },
    }

    return (
        <section id="contact" className="px-5 sm:px-10 py-4">
            <div className="flex flex-col gap-3">
                <div className="flex items-center space-x-3">
                    <Badge className="rounded-3xl px-5 text-lg">4</Badge>
                    <h3 className="heading-subtitle--sm">{c("name")}</h3>
                </div>
                <hr className="border-gray-300" />
            </div>

            <div className="flex flex-col items-center py-16">
                {/* Social icons */}
                <ul className="flex items-center justify-center gap-6">
                    {socials.map(({ name, href, Icon, title }, index) => (
                        <motion.li
                            key={name}
                            initial="hidden"
                            animate="show"
                            variants={itemVariants}
                            custom={index}
                            whileHover={!reduce ? { scale: 1.2 } : {}}
                            whileFocus={!reduce ? { scale: 1.2 } : {}}
                        >
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={name}
                                title={title ?? name}
                                className="inline-flex items-center justify-center"
                            >
                                <Icon className="h-7 w-7" />
                                <span className="sr-only">{name}</span>
                            </a>
                        </motion.li>
                    ))}
                </ul>

                {/* Footer text */}
                <div className="flex justify-between w-full mt-16 text-gray-600 text-sm">
                    <p>- {c("description")}</p>
                    <p>@{currentYear}</p>
                </div>
            </div>
        </section>
    )
}

export default Footer
