export interface Project {
    title: string
    image: string
    description: string
    link: string
    publishedAt: string
}

export const projects: Project[] = [
    {
        title: "Python Linux Blog",
        image: "/projects/blog_website.webp",
        description: "Next.js 13, Tailwind CSS",
        link: "https://python-linux-blog.vercel.app",
        publishedAt: "2023-03-10",
    },
    {
        title: "Instagram redesign",
        image: "/projects/insta_re.webp",
        description: "Next.js, Firebase",
        link: "https://github.com/vadimghedreutan/instagram-redesign-nextjs",
        publishedAt: "2022-01-22",
    },
    {
        title: "Fitness studio design",
        image: "/projects/design_re.webp",
        description: "Figma, WordPress",
        link: "https://github.com/vadimghedreutan/fitness-studio-design",
        publishedAt: "2020-01-21",
    },
    {
        title: "Tabs design",
        image: "/projects/tabs_js.webp",
        description: "JavaScript, Tailwind CSS",
        link: "https://navigation-tabs-js.netlify.app",
        publishedAt: "2022-01-23",
    },
    {
        title: "tofanconsult.de",
        image: "/projects/tofanconsult.webp",
        description: "Next.js, SASS",
        link: "https://www.tofanconsult.de",
        publishedAt: "2022-11-13",
    },
    {
        title: "Linktree theme",
        image: "/projects/linktree.webp",
        description: "Next.js 13, Tailwind CSS",
        link: "https://linktree-redesign-theme.vercel.app",
        publishedAt: "2023-02-12",
    },
    {
        title: "File Keeper App",
        image: "/projects/keepdata.webp",
        description: "Next.js 14, Shadcn/ui",
        link: "https://github.com/vadimghedreutan/FileKeeper-app",
        publishedAt: "2024-03-18",
    },
]

export const items = projects
