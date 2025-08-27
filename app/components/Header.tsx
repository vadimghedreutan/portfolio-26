"use client"

import Link from "next/link"

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
                className="flex items-center space-x-4 text-lg font-bold"
                aria-label="Social media links"
            >
                <Link
                    href="https://www.linkedin.com/in/vadimghedreutan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="Visit Vadim Ghedreutan's LinkedIn profile"
                >
                    in
                </Link>
            </nav>
        </header>
    )
}
