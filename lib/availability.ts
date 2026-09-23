export type AvailabilityStatus = "available" | "unavailable" | "off"

export function getAvailabilityStatus(): AvailabilityStatus {
    const raw = process.env.NEXT_PUBLIC_AVAILABILITY_STATUS?.trim().toLowerCase()

    if (raw === "available" || raw === "unavailable" || raw === "off") {
        return raw
    }

    return "off"
}
