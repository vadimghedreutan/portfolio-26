"use client"

import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useState } from "react"
import clsx from "clsx"

export default function HoursSection() {
    const [isLoading, setIsLoading] = useState(true)

    const imgClass = clsx(
        "object-cover rounded-lg transition duration-500",
        isLoading ? "grayscale" : "grayscale-0"
    )

    // Helps Next decide sizes per breakpoint in a 2→3 column grid
    const sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"

    return (
        <section id="Journey" className="pb-20">
            <div className="flex flex-col gap-3">
                <div className="flex items-center space-x-3">
                    <Badge className="rounded-3xl px-5 text-lg">6</Badge>
                    <h3 className="heading-subtitle--sm">Journeys</h3>
                </div>
                <div className="w-full border-b border-gray-300 mt-2" />
            </div>

            <div className="xl:mt-24 mt-16">
                <div className="flex justify-end">
                    <div className="w-full max-w-4xl space-y-8">
                        {/* Images */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 auto-rows-[10rem] sm:auto-rows-[12rem]">
                            {/* 1 */}
                            <div className="relative">
                                <Image
                                    src="/profile/img_0166.webp"
                                    alt="Vadim Ghedreutan"
                                    fill
                                    sizes={sizes}
                                    priority
                                    className={imgClass}
                                    onLoad={() => setIsLoading(false)}
                                />
                            </div>

                            {/* 2 */}
                            <div className="relative sm:row-span-2">
                                <Image
                                    src="/profile/img_0457.webp"
                                    alt="Parque regional Montaña de Riaño"
                                    fill
                                    sizes={sizes}
                                    loading="lazy"
                                    className={imgClass}
                                    onLoad={() => setIsLoading(false)}
                                />
                            </div>

                            {/* 3 */}
                            <div className="relative">
                                <Image
                                    src="/profile/img_0205.webp"
                                    alt="Praia da Manta Rota, Algarve"
                                    fill
                                    sizes={sizes}
                                    loading="lazy"
                                    className={imgClass}
                                    onLoad={() => setIsLoading(false)}
                                />
                            </div>

                            {/* 4 */}
                            <div className="relative row-span-2">
                                <Image
                                    src="/profile/centralpark_2024.webp"
                                    alt="Central Park, 2024"
                                    fill
                                    sizes={sizes}
                                    loading="lazy"
                                    className={imgClass}
                                    onLoad={() => setIsLoading(false)}
                                />
                            </div>

                            {/* 5 */}
                            <div className="relative row-span-2">
                                <Image
                                    src="/profile/newyork_2024.webp"
                                    alt="New York, 2024"
                                    fill
                                    sizes={sizes}
                                    loading="lazy"
                                    className={imgClass}
                                    onLoad={() => setIsLoading(false)}
                                />
                            </div>

                            {/* 6 */}
                            <div className="relative">
                                <Image
                                    src="/profile/img_0213.webp"
                                    alt="Cabanas de Tavira"
                                    fill
                                    sizes={sizes}
                                    loading="lazy"
                                    className={imgClass}
                                    onLoad={() => setIsLoading(false)}
                                />
                            </div>
                        </div>
                        {/* /Images */}
                    </div>
                </div>
            </div>
        </section>
    )
}
