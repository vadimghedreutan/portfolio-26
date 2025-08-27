import "./globals.css"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Bricolage_Grotesque } from "next/font/google"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import {
    setRequestLocale,
    getMessages,
    getTranslations,
} from "next-intl/server"

import { routing } from "@/i18n/routing"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { LenisProvider } from "../providers/LenisProvider"

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
}

// Next.js 15: params is a Promise — await it here
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "metadata" })

    return {
        title: {
            default: "Vadim Ghedreutan",
            template: "%s | Vadim Ghedreutan",
        },
        description: t("description"),
        keywords: t("keywords").split(", "),
        authors: [
            { name: "Vadim Ghedreutan", url: "https://vadimghedreutan.net" },
        ],
        alternates: {
            canonical: "https://vadimghedreutan.net",
            languages: {
                en: "https://vadimghedreutan.net/en",
                de: "https://vadimghedreutan.net/de",
            },
        },
        openGraph: {
            title: "Vadim Ghedreutan",
            description: t("description"),
            url: "https://vadimghedreutan.net",
            siteName: "Vadim Ghedreutan",
            images: [
                {
                    url: "https://vadimghedreutan.net/og.jpg",
                    width: 1920,
                    height: 1080,
                },
            ],
            locale: locale === "de" ? "de-DE" : "en-US",
            type: "website",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        twitter: {
            card: "summary_large_image",
            title: "Vadim Ghedreutan",
            description: t("description"),
            images: ["https://vadimghedreutan.net/og.jpg"],
        },
        icons: { shortcut: "/favicon.ico", apple: "/apple-touch-icon.png" },
        verification: { google: "5cP42JTz0Y4vOZy_JAj7frAPm0KxsugsuzJ93GJQg5o" },
    }
}

const bricolageGrotesque = Bricolage_Grotesque({
    subsets: ["latin"],
    weight: ["300", "400", "700"],
    display: "swap",
})

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode
    params: Promise<{ locale: string }>
}>) {
    const { locale } = await params

    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }

    setRequestLocale(locale)
    const messages = await getMessages()

    return (
        <html lang={locale} className={bricolageGrotesque.className}>
            <body className="antialiased">
                <NextIntlClientProvider messages={messages}>
                    <LenisProvider>
                        <div className="flex flex-col min-h-screen">
                            <Header />
                            <main className="flex-1">{children}</main>
                            <div className="mt-auto">
                                <Footer />
                            </div>
                        </div>
                    </LenisProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
