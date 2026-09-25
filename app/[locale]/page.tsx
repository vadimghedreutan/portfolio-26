import { getTranslations } from "next-intl/server"
import IntroSection from "../components/IntroSection"
import AboutSection from "../components/AboutSection"

export default async function Home({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    await params

    const h = await getTranslations("hero")

    return (
        <main className="mx-auto w-full max-w-6xl px-5 sm:px-10">
            <IntroSection
                greeting={h("greeting")}
                headline={h("headline")}
                description={h("description")}
                contactMe={h("contactMe")}
                aboutMe={h("aboutMe")}
            />
            <AboutSection />
        </main>
    )
}
