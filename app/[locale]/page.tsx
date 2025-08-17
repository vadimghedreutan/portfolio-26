import { useTranslations } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { use } from "react"

export default function Home({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = use(params)

    setRequestLocale(locale)

    const t = useTranslations("hero")

    return (
        <div>
            <h1 className="text-4xl font-bold font-bricolage_grotesque text-blue-700 ">
                {t("title")}
            </h1>
            <p>{t("subtitle")}</p>
        </div>
    )
}
