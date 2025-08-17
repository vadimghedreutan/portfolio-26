import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://vadimghedreutan.net"
    return [
        {
            url: `${base}/en`,
            lastModified: new Date(),
            alternates: {
                languages: {
                    en: `${base}/en`,
                    de: `${base}/de`,
                },
            },
        },
        {
            url: `${base}/de`,
            lastModified: new Date(),
            alternates: {
                languages: {
                    en: `${base}/en`,
                    de: `${base}/de`,
                },
            },
        },
    ]
}
