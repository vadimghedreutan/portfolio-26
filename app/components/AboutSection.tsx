import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function AboutSection() {
    return (
        <section id="about" className="py-20">
            <div className="flex flex-col gap-3">
                <div className="flex items-center space-x-3">
                    <Badge className=" rounded-3xl px-5 text-lg">3</Badge>
                    <h3 className="heading-subtitle--sm">Countries</h3>
                </div>
                <div className="w-full border-b border-gray-300 mt-2"></div>
            </div>

            <div className="xl:mt-24 mt-16">
                <div className="flex justify-end">
                    <div className="max-w-6xl space-y-8">
                        {/* Flags */}
                        <div className="flex gap-3">
                            <Image
                                src="/md.svg"
                                alt="Flag of Moldova"
                                width={48}
                                height={48}
                                loading="lazy"
                            />
                            <Image
                                src="/pt.svg"
                                alt="Flag of Portugal"
                                width={48}
                                height={48}
                                loading="lazy"
                            />
                            <Image
                                src="/de.svg"
                                alt="Flag of Germany"
                                width={48}
                                height={48}
                                loading="lazy"
                            />
                        </div>
                        {/* Text Content */}
                        <div className="space-y-6">
                            <p className="text-about">
                                Born and raised in Chișinău, Republic of
                                Moldova, I began my career in Portugal as a
                                System Administrator before moving to Germany.
                                Along the way, I worked in various roles outside
                                of development while pursuing freelance projects
                                in web development and IT support.
                            </p>
                            <p className="text-about">
                                I’m continuously expanding my skills, exploring
                                emerging technologies, and building apps that
                                bring ideas to life. Whether for client work or
                                personal passion, I love creating functional,
                                well-designed digital experiences — always
                                making sure there’s a bit of fun in the process.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
