"use client"

import Link from "next/link"
import LocaleSwitcher from "./LocaleSwitcher"

type IconProps = React.SVGProps<SVGSVGElement>

const LinkedinIcon = (props: IconProps) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
)

export default function Header() {
    return (
        <header className="w-full flex items-center justify-between px-5 lg:px-10 py-4 3xl:max-w-[120rem] mx-auto">
            <div className="bg-neutral-950 text-white px-4 py-2 rounded-sm">
                <Link
                    href="/"
                    className="text-lg font-bold"
                    aria-label="Go to homepage"
                >
                    VG
                </Link>
            </div>

            {/* Right side: social links */}
            <nav
                className="flex items-center gap-4 text-lg font-bold"
                aria-label="Social media links"
            >
                <a
                    href="https://www.linkedin.com/in/vadimghedreutan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit my LinkedIn profile"
                    className="hover:opacity-80 transition-opacity"
                >
                    <LinkedinIcon className="h-6 w-6" />
                </a>
                <LocaleSwitcher />
            </nav>
        </header>
    )
}
