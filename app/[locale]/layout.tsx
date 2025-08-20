import { NextIntlClientProvider, hasLocale } from "next-intl"
import type { Metadata } from "next"
import { Bricolage_Grotesque } from "next/font/google"
import "./globals.css"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import Header from "../components/Header"

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
    title: {
        default: "Vadim Ghedreutan",
        template: "%s | Vadim Ghedreutan",
    },
    description: "Developer, System Administrator, and creator.",
    keywords: [
        "Vadim Ghedreutan",
        "Developer",
        "System Administrator",
        "Frontend",
        "Java Backend",
        "React",
        "Next.js",
    ],
    authors: [{ name: "Vadim Ghedreutan", url: "https://vadimghedreutan.net" }],
    alternates: {
        canonical: "https://vadimghedreutan.net",
    },
    openGraph: {
        title: "Vadim Ghedreutan",
        description: "Developer, System Administrator, and creator.",
        url: "https://vadimghedreutan.net",
        siteName: "Vadim Ghedreutan",
        images: [
            {
                url: "https://vadimghedreutan.net/og.jpg",
                width: 1920,
                height: 1080,
            },
        ],
        locale: "de-DE",
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
        description: "Developer, System Administrator, and creator.",
        images: ["https://vadimghedreutan.net/og.jpg"],
    },
    icons: {
        shortcut: "../favicon.ico",
        apple: "../apple-touch-icon.png",
    },
    verification: {
        google: "5cP42JTz0Y4vOZy_JAj7frAPm0KxsugsuzJ93GJQg5o",
    },
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

    return (
        <html lang={locale} className={bricolageGrotesque.className}>
            <body className="antialiased">
                <NextIntlClientProvider>
                    <div className="w-full flex flex-col min-h-screen">
                        <Header />
                        <div className="mt-auto">{children}</div>
                    </div>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
