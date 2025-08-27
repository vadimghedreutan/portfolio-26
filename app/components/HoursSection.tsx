"use client"

import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"
import { motion, useReducedMotion } from "motion/react"
import { useMemo } from "react"

type HourProp = {
    name: string
}

export default function HoursSection({ name }: HourProp) {
    const reduce = useReducedMotion()

    const code = useMemo(
        () => `const HoursInvested = () => {
    const [skills] = useState({
        React: "🚀 My daily driver",
        ReactNative: "📱 On Quest",
        WebDesign: "🎨 Pixel-perfect",
        Java: "☕ Coffee-powered",
        Networking: "🌐 Always curious",
        SysAdmin: "🛠️ Battle-tested",
        Curious: true,
        ExploringNewTech: "Always 🚀",
    });

    return (
        <div className="flex items-center justify-center">
            <pre className="text-left">
                {JSON.stringify(skills, null, 2)}
            </pre>
         </div>
        );
    };`,
        []
    )

    return (
        <section id="about" className="py-4">
            <div className="flex flex-col gap-3">
                <div className="flex items-center space-x-3">
                    <Badge className="rounded-3xl px-5 text-lg">20K+</Badge>
                    <h3 className="heading-subtitle--sm">{name}</h3>
                </div>
                <hr className="border-gray-300" />
            </div>

            <div className="py-16">
                <motion.div
                    className="max-w-7xl mx-auto w-full transform-gpu will-change-transform"
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={
                        reduce
                            ? { duration: 0.2 }
                            : { type: "spring", stiffness: 120, damping: 18 }
                    }
                >
                    <CodeBlock
                        language="tsx"
                        filename="HoursInvested.tsx"
                        highlightLines={[9, 13, 14, 18]}
                        code={code}
                    />
                </motion.div>
            </div>
        </section>
    )
}
