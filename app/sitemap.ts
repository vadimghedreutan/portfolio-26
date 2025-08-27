import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://vadimghedreutan.net"
    const lastModified = new Date()

    return [
        {
            url: `${base}/en`,
            lastModified,
            changeFrequency: "monthly",
            priority: 1.0,
            alternates: {
                languages: {
                    en: `${base}/en`,
                    de: `${base}/de`,
                    "x-default": `${base}/en`, // set your preferred default here
                },
            },
        },
        {
            url: `${base}/de`,
            lastModified,
            changeFrequency: "monthly",
            priority: 1.0,
            alternates: {
                languages: {
                    en: `${base}/en`,
                    de: `${base}/de`,
                    "x-default": `${base}/en`,
                },
            },
        },
    ]
}
