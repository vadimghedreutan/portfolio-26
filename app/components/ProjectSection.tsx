import ProjectCard from "./ProjectCard"
import { items } from "./ProjectData"

export default function ProjectSection() {
    return (
        <section
            id="projects"
            className="px-6 py-20"
            aria-labelledby="projects-heading"
        >
            <div className="mx-auto grid gap-12 xl:grid-cols-[300px_2fr]">
                {/* Left */}
                <div className="flex flex-col justify-start xl:sticky xl:top-20 xl:h-fit space-y-2">
                    <div className="flex xl:flex-col flex-row space-x-2 xl:space-y-2 xl:pt-40">
                        <h2 id="projects-heading" className="heading">
                            I do
                        </h2>
                        <div className="flex xl:flex-col flex-row space-x-2 xl:space-y-2">
                            <span className="badge">Development</span>
                            <span className="badge">Networking</span>
                            <span className="badge">System Administrator</span>
                        </div>
                    </div>
                    <div>
                        <p className="heading">and everything in between</p>
                    </div>
                </div>

                {/* Right */}
                <div
                    className="grid gap-4 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 py-12"
                    aria-label="Project portfolio grid"
                >
                    {items
                        .sort((a, b) =>
                            new Date(a.publishedAt) > new Date(b.publishedAt)
                                ? -1
                                : 1
                        )
                        .map((item) => (
                            <ProjectCard key={item.title} {...item} />
                        ))}
                </div>
            </div>
        </section>
    )
}
