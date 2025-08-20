import { useTranslations } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { use } from "react"
import Hero from "../components/Hero"
import ProjectSection from "../components/ProjectSection"

export default function Home({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = use(params)

    setRequestLocale(locale)

    const t = useTranslations("hero")

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
