"use client"

import {
    Code2,
    Globe,
    Monitor,
    Network,
    Server,
    Shield,
    Cloud,
    Check,
    Terminal,
    Activity,
    Container,
} from "lucide-react"
import { useTranslations } from "next-intl"

function CardShell({
    children,
    className = "",
    active = false,
    peripheral = false,
}: {
    children: React.ReactNode
    className?: string
    active?: boolean
    peripheral?: boolean
}) {
    const tone = peripheral
        ? "opacity-60 shadow-sm"
        : active
          ? "shadow-[0_10px_30px_-14px_rgba(0,0,0,0.22)] ring-1 ring-black/[0.04]"
          : "shadow-sm"

    return (
        <div
            className={`rounded-2xl border border-border bg-white p-4 transition-shadow duration-700 ${tone} ${className}`}
        >
            {children}
        </div>
    )
}

function CardHeader({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode
    title: string
    description: string
}) {
    return (
        <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-white">
                {icon}
            </span>
            <div className="min-w-0">
                <h3 className="text-base font-semibold leading-tight text-foreground">
                    {title}
                </h3>
                <p className="mt-1 text-[13px] leading-snug text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
    )
}

export function DevelopmentCard({
    active,
    typedLength,
    showReady,
    className,
}: {
    active: boolean
    typedLength: number
    showReady: boolean
    className?: string
}) {
    const t = useTranslations("whatIDo")
    const command = "pnpm dev"
    const visible = command.slice(0, typedLength)

    return (
        <CardShell active={active} className={className}>
            <CardHeader
                icon={<Code2 className="size-4" aria-hidden />}
                title={t("developmentTitle")}
                description={t("developmentDescription")}
            />
            <div className="mt-3 rounded-xl border border-border bg-neutral-50 px-3 py-2.5 font-mono text-xs">
                <div className="mb-1.5 flex gap-1.5" aria-hidden>
                    <span className="size-2 rounded-full bg-red-400" />
                    <span className="size-2 rounded-full bg-amber-400" />
                    <span className="size-2 rounded-full bg-emerald-400" />
                </div>
                <p className="text-muted-foreground">~/portfolio</p>
                <p className="mt-0.5 text-foreground">
                    <span className="text-emerald-600">$</span> {visible}
                    {!showReady && typedLength < command.length ? (
                        <span
                            aria-hidden
                            className="ml-0.5 inline-block h-3 w-px animate-pulse bg-foreground align-middle"
                        />
                    ) : null}
                </p>
                <p
                    className={`mt-0.5 text-foreground transition-opacity duration-500 ${
                        showReady ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <span className="text-emerald-600">✓</span>{" "}
                    {t("terminalReady")}
                </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2 py-1 text-xs font-medium">
                    <span className="flex size-4 items-center justify-center rounded-full bg-neutral-950 text-[9px] text-white">
                        N
                    </span>
                    Next.js
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2 py-1 text-xs font-medium">
                    <span className="flex size-4 items-center justify-center rounded bg-[#3178c6] text-[8px] font-bold text-white">
                        TS
                    </span>
                    TypeScript
                </span>
            </div>
        </CardShell>
    )
}

export function NetworkingCard({
    active,
    pulse,
    className,
}: {
    active: boolean
    pulse: boolean
    className?: string
}) {
    const t = useTranslations("whatIDo")

    return (
        <CardShell active={active} className={className}>
            <CardHeader
                icon={<Network className="size-4" aria-hidden />}
                title={t("networkingTitle")}
                description={t("networkingDescription")}
            />
            <div className="mt-4 flex flex-col items-center">
                <TopologyNode
                    icon={<Globe className="size-3.5" />}
                    label="Internet"
                />
                <svg
                    width="2"
                    height="14"
                    className="text-border"
                    aria-hidden
                >
                    <line
                        x1="1"
                        y1="0"
                        x2="1"
                        y2="14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                </svg>
                <TopologyNode
                    icon={<Network className="size-3.5" />}
                    label="Router"
                />
                <svg
                    viewBox="0 0 200 28"
                    className="h-7 w-full max-w-[220px] text-border"
                    aria-hidden
                >
                    <path
                        d="M100 0 V12 H40 V28 M100 12 H160 V28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <circle
                        r="3"
                        fill="#10b981"
                        cx="100"
                        cy="12"
                        className={
                            pulse ? "animate-pulse opacity-100" : "opacity-0"
                        }
                    />
                </svg>
                <div className="flex w-full max-w-[260px] justify-between gap-2">
                    <TopologyNode
                        icon={<Network className="size-3.5" />}
                        label="Switch"
                    />
                    <TopologyNode
                        icon={<Server className="size-3.5" />}
                        label="Server"
                    />
                </div>
            </div>
        </CardShell>
    )
}

function TopologyNode({
    icon,
    label,
}: {
    icon: React.ReactNode
    label: string
}) {
    return (
        <div className="flex items-center gap-2 rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-medium shadow-xs">
            <span className="text-muted-foreground" aria-hidden>
                {icon}
            </span>
            {label}
        </div>
    )
}

export function SystemAdminCard({
    active,
    visibleRows,
    className,
}: {
    active: boolean
    visibleRows: number
    className?: string
}) {
    const t = useTranslations("whatIDo")
    const rows = [
        {
            service: "SSH",
            icon: <Terminal className="size-3.5" aria-hidden />,
            desc: t("sshDescription"),
        },
        {
            service: "Nginx",
            icon: (
                <span
                    className="w-3.5 text-center text-xs font-bold text-neutral-800"
                    aria-hidden
                >
                    N
                </span>
            ),
            desc: t("nginxDescription"),
        },
        {
            service: "Docker",
            icon: (
                <Container
                    className="size-3.5 text-[#2496ed]"
                    aria-hidden
                />
            ),
            desc: t("dockerDescription"),
        },
    ]

    return (
        <CardShell active={active} className={className}>
            <CardHeader
                icon={<Monitor className="size-4" aria-hidden />}
                title={t("sysadminTitle")}
                description={t("sysadminDescription")}
            />
            <div className="mt-3 overflow-hidden rounded-xl border border-border">
                <div className="grid grid-cols-[1fr_auto] gap-x-3 bg-neutral-50 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground md:grid-cols-[7rem_6rem_1fr]">
                    <span>{t("tableService")}</span>
                    <span>{t("tableStatus")}</span>
                    <span className="hidden md:inline">
                        {t("tableDescription")}
                    </span>
                </div>
                {rows.map((row, i) => {
                    const revealed = i < visibleRows
                    return (
                        <div
                            key={row.service}
                            className="grid grid-cols-[1fr_auto] items-center gap-x-3 border-t border-border px-3 py-2 text-sm md:grid-cols-[7rem_6rem_1fr]"
                        >
                            <div className="flex items-center gap-2 font-medium">
                                {row.icon}
                                {row.service}
                            </div>
                            <div
                                className={`flex items-center gap-1.5 text-xs font-medium text-emerald-600 transition-opacity duration-500 ${
                                    revealed ? "opacity-100" : "opacity-25"
                                }`}
                            >
                                <span
                                    className="size-1.5 rounded-full bg-emerald-500"
                                    aria-hidden
                                />
                                {t("statusRunning")}
                            </div>
                            <span className="hidden text-xs text-muted-foreground md:inline">
                                {row.desc}
                            </span>
                        </div>
                    )
                })}
            </div>
        </CardShell>
    )
}

export function DeploymentCard({
    visibleSteps,
    className,
}: {
    visibleSteps: number
    className?: string
}) {
    const t = useTranslations("whatIDo")
    const steps = [
        t("deployStep1"),
        t("deployStep2"),
        t("deployStep3"),
        t("deployStep4"),
    ]

    return (
        <CardShell peripheral className={className}>
            <div className="flex items-center gap-2">
                <Cloud className="size-4 text-muted-foreground" aria-hidden />
                <h4 className="text-sm font-semibold">
                    {t("deploymentTitle")}
                </h4>
            </div>
            <ul className="mt-3 space-y-2">
                {steps.map((step, i) => (
                    <li
                        key={step}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                        <Check
                            className={`size-3.5 shrink-0 transition-colors duration-500 ${
                                i < visibleSteps
                                    ? "text-emerald-600"
                                    : "text-border"
                            }`}
                            aria-hidden
                        />
                        {step}
                    </li>
                ))}
            </ul>
        </CardShell>
    )
}

export function ServerCard({
    cpuPct,
    memPct,
    className,
}: {
    cpuPct: number
    memPct: number
    className?: string
}) {
    const t = useTranslations("whatIDo")

    return (
        <CardShell peripheral className={className}>
            <div className="flex items-center gap-2">
                <Server className="size-4 text-muted-foreground" aria-hidden />
                <h4 className="text-sm font-semibold">{t("serverTitle")}</h4>
            </div>
            <p className="mt-2 text-xs font-medium text-foreground">
                {t("serverName")}
            </p>
            <p className="text-xs text-muted-foreground">{t("serverSpecs")}</p>
            <p className="mt-1 text-xs text-muted-foreground">
                {t("serverUptime")}
            </p>
            <div className="mt-3 space-y-2">
                <MetricBar label="CPU" value={cpuPct} />
                <MetricBar label={t("memoryLabel")} value={memPct} />
            </div>
        </CardShell>
    )
}

function MetricBar({ label, value }: { label: string; value: number }) {
    return (
        <div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>{label}</span>
                <span className="font-medium text-foreground">{value}%</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-neutral-100">
                <div
                    className="h-full rounded-full bg-blue-600 transition-[width] duration-1000 ease-out"
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    )
}

export function FirewallCard({ className }: { className?: string }) {
    const t = useTranslations("whatIDo")
    const ports = [
        { port: "22", label: "SSH" },
        { port: "80", label: "HTTP" },
        { port: "443", label: "HTTPS" },
    ]

    return (
        <CardShell peripheral className={className}>
            <div className="flex items-center gap-2">
                <Shield className="size-4 text-muted-foreground" aria-hidden />
                <h4 className="text-sm font-semibold">{t("firewallTitle")}</h4>
            </div>
            <ul className="mt-2 divide-y divide-border">
                {ports.map((p) => (
                    <li
                        key={p.port}
                        className="flex items-center justify-between py-1.5 text-xs"
                    >
                        <span className="flex items-center gap-2">
                            <span
                                className="size-1.5 rounded-full bg-emerald-500"
                                aria-hidden
                            />
                            Port {p.port}
                        </span>
                        <span className="text-muted-foreground">{p.label}</span>
                    </li>
                ))}
            </ul>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                <span
                    className="size-1.5 rounded-full bg-emerald-500"
                    aria-hidden
                />
                {t("firewallActive")}
            </span>
        </CardShell>
    )
}

export function MonitoringCard({ className }: { className?: string }) {
    const t = useTranslations("whatIDo")

    return (
        <CardShell peripheral className={className}>
            <div className="flex items-center gap-2">
                <Activity
                    className="size-4 text-muted-foreground"
                    aria-hidden
                />
                <h4 className="text-sm font-semibold">
                    {t("monitoringTitle")}
                </h4>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <span
                    className="size-1.5 rounded-full bg-emerald-500"
                    aria-hidden
                />
                {t("monitoringStatus")}
            </p>
            <svg
                viewBox="0 0 200 48"
                className="mt-3 h-10 w-full text-blue-600"
                aria-hidden
            >
                <defs>
                    <linearGradient
                        id="monitorFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
                <path
                    d="M0 36 L30 28 L60 32 L90 18 L120 24 L150 12 L180 20 L200 8 V48 H0 Z"
                    fill="url(#monitorFill)"
                    opacity="0.15"
                />
                <path
                    d="M0 36 L30 28 L60 32 L90 18 L120 24 L150 12 L180 20 L200 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                />
            </svg>
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-2 text-center">
                <div>
                    <p className="text-[10px] text-muted-foreground">
                        {t("uptimeLabel")}
                    </p>
                    <p className="text-sm font-semibold">99.9%</p>
                </div>
                <div>
                    <p className="text-[10px] text-muted-foreground">
                        {t("responseLabel")}
                    </p>
                    <p className="text-sm font-semibold">42 ms</p>
                </div>
            </div>
        </CardShell>
    )
}
