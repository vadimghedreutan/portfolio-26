import { getTranslations } from "next-intl/server"
import Hero from "../components/Hero"
import ProjectSection from "../components/ProjectSection"
import AboutSection from "../components/AboutSection"
import HoursSection from "../components/HoursSection"
import JourneySection from "../components/JourneySection"

export default async function Home({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    const t = await getTranslations("hero")

    return (
        <main className="px-5 sm:px-10">
            <Hero
                title={t("title")}
                name={t("name")}
                subtitle={t("subtitle")}
            />
            <ProjectSection />
            <AboutSection />
            <HoursSection />
            <JourneySection />
        </main>
    )
}
