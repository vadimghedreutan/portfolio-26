"use client"

import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"

export default function HoursSection() {
    const code = `const HoursInvested = () => {
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
    };

    `
    return (
        <section id="about" className="pb-20">
            <div className="flex flex-col gap-3">
                <div className="flex items-center space-x-3">
                    <Badge className=" rounded-3xl px-5 text-lg">20K+</Badge>
                    <h3 className="heading-subtitle--sm">Hours Invested</h3>
                </div>
                <div className="w-full border-b border-gray-300 mt-2"></div>
            </div>

            <div className="xl:mt-24 mt-16">
                <div className="max-w-7xl mx-auto w-full">
                    <CodeBlock
                        language="tsx"
                        filename="HoursInvested.tsx"
                        highlightLines={[9, 13, 14, 18]}
                        code={code}
                    />
                </div>
            </div>
        </section>
    )
}
