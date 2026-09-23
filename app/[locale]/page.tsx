import { getTranslations } from "next-intl/server"
import Hero from "../components/Hero"
import ProjectSection from "../components/ProjectSection"
import AboutSection from "../components/AboutSection"
import HoursSection from "../components/HoursSection"
import { getAvailabilityStatus } from "@/lib/availability"

export default async function Home({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    await params

    const h = await getTranslations("hero")

    return (
        <main className="mx-auto w-full max-w-6xl px-5 sm:px-10">
            <Hero
                greeting={h("greeting")}
                headline={h("headline")}
                description={h("description")}
                exploreProjects={h("exploreProjects")}
                contactMe={h("contactMe")}
                availabilityStatus={getAvailabilityStatus()}
                availabilityAvailable={h("availabilityAvailable")}
                availabilityUnavailable={h("availabilityUnavailable")}
            />
            <ProjectSection />
            <AboutSection />
            <HoursSection />
        </main>
    )
}
