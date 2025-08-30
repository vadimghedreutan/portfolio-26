import { getTranslations } from "next-intl/server"
import Hero from "../components/Hero"
import ProjectSection from "../components/ProjectSection"
import AboutSection from "../components/AboutSection"
import HoursSection from "../components/HoursSection"

export default async function Home({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    await params // locale is not used, so we just await it

    const [h, p, a, i] = await Promise.all([
        getTranslations("hero"),
        getTranslations("project"),
        getTranslations("about"),
        getTranslations("hours"),
    ])

    return (
        <main className="px-5 sm:px-10">
            <Hero
                title={h("title")}
                name={h("name")}
                subtitle={h("subtitle")}
            />
            <ProjectSection title={p("title")} subtitle={p("subtitle")} />
            <AboutSection
                name={a("name")}
                description_first={a("description_first")}
                description_second={a("description_second")}
            />
            <HoursSection name={i("name")} />
        </main>
    )
}
