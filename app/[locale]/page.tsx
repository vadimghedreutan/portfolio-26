import { getTranslations } from "next-intl/server"
import Hero from "../components/Hero"
import ProjectSection from "../components/ProjectSection"

export default async function Home({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    const t = await getTranslations("hero")

    return (
        <main className="px-2 2xl:px-[4vw]">
            <Hero
                title={t("title")}
                name={t("name")}
                subtitle={t("subtitle")}
            />
            <ProjectSection />
        </main>
    )
}
