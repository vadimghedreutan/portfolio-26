import { Badge } from "@/components/ui/badge"
import Image from "next/image"

type AboutProps = {
    name: string
    description_first: string
    description_second: string
}

export default function AboutSection({
    name,
    description_first,
    description_second,
}: AboutProps) {
    return (
        <section id="about" className="py-4">
            <div className="flex flex-col gap-3">
                <div className="flex items-center space-x-3">
                    <Badge className="rounded-3xl px-5 text-lg">3</Badge>
                    <h3 className="heading-subtitle--sm">{name}</h3>
                </div>
                <div className="w-full border-b border-gray-300"></div>
            </div>

            <div className="py-16">
                <div className="flex justify-end">
                    <div className="max-w-6xl space-y-8">
                        {/* Flags */}
                        <div className="flex gap-3">
                            <Image
                                src="/md.svg"
                                alt="Flag of Moldova"
                                width={42}
                                height={42}
                                loading="lazy"
                            />
                            <Image
                                src="/pt.svg"
                                alt="Flag of Portugal"
                                width={42}
                                height={42}
                                loading="lazy"
                            />
                            <Image
                                src="/de.svg"
                                alt="Flag of Germany"
                                width={42}
                                height={42}
                                loading="lazy"
                            />
                        </div>
                        {/* Text Content */}
                        <div className="space-y-6">
                            <p className="text-about">{description_first}</p>
                            <p className="text-about">{description_second}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
