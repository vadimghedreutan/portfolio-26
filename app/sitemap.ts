import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://vadimghedreutan.net"
    const currentDate = new Date()

    // Base language routes
    const languageRoutes = [
        {
            url: `${base}/en`,
            lastModified: currentDate,
            alternates: {
                languages: {
                    en: `${base}/en`,
                    de: `${base}/de`,
                },
            },
        },
        {
            url: `${base}/de`,
            lastModified: currentDate,
            alternates: {
                languages: {
                    en: `${base}/en`,
                    de: `${base}/de`,
                },
            },
        },
    ]

    return languageRoutes
}
