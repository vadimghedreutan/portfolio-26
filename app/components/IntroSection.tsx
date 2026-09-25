"use client"

import HeroIntro from "./intro/HeroIntro"
import WhatIDoComposition from "./intro/WhatIDoComposition"

type IntroSectionProps = {
    greeting: string
    headline: string
    description: string
    contactMe: string
    aboutMe: string
}

export default function IntroSection({
    greeting,
    headline,
    description,
    contactMe,
    aboutMe,
}: IntroSectionProps) {
    // 5.25rem matches the header height at sm+ (size-11 logo + py-5).
    return (
        <section
            className="w-full pb-12 pt-6 sm:pb-16 xl:flex xl:min-h-[calc(100svh-5.25rem)] xl:flex-col xl:justify-center xl:pb-10 xl:pt-4"
            aria-labelledby="hero-heading"
        >
            <div className="flex flex-col gap-10 xl:grid xl:grid-cols-[minmax(0,38fr)_minmax(0,62fr)] xl:items-center xl:gap-10">
                <HeroIntro
                    greeting={greeting}
                    headline={headline}
                    description={description}
                    contactMe={contactMe}
                    aboutMe={aboutMe}
                />
                <WhatIDoComposition />
            </div>
        </section>
    )
}
