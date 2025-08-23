"use client"

import Image from "next/image"

type HeroProps = {
    title: string
    name: string
    subtitle: string
}

export default function Hero({ title, subtitle, name }: HeroProps) {
    return (
        <section
            className="relative w-full h-[calc(100dvh-76px)]"
            aria-labelledby="hero-heading"
        >
            <div className="flex flex-col justify-end h-full">
                <div className="flex flex-col space-y-4 pb-20">
                    <div className="group flex gap-7 items-center">
                        <Image
                            src="/profile_art.webp"
                            alt="Profile portrait of Vadim Ghedreutan with artistic styling"
                            width={120}
                            height={120}
                            className="rounded-xl -rotate-6 object-cover transition-transform duration-300 group-hover:rotate-0"
                            priority
                        />
                        <div>
                            <h1 id="hero-heading" className="heading-title">
                                {title}
                            </h1>
                            <p className="heading-title">{name}</p>
                        </div>
                    </div>
                    <div>
                        <p className="heading-subtitle">{subtitle}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
