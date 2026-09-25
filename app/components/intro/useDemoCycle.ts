"use client"

import { useEffect, useRef, useSyncExternalStore } from "react"

const CYCLE_MS = 18_000
const PHASE_COUNT = 6
/** Cap React notifications — demo visuals update at most ~10 Hz */
const NOTIFY_MS = 100

type Snapshot = { phase: number; progress: number; revision: number }

function createStore() {
    let snapshot: Snapshot = { phase: 0, progress: 0, revision: 0 }
    const listeners = new Set<() => void>()

    return {
        getSnapshot: () => snapshot,
        subscribe: (listener: () => void) => {
            listeners.add(listener)
            return () => listeners.delete(listener)
        },
        setProgress: (progress: number, phase: number) => {
            const prev = snapshot
            const phaseChanged = phase !== prev.phase
            const progressStep =
                Math.floor(progress * 120) !== Math.floor(prev.progress * 120)
            if (!phaseChanged && !progressStep) return
            snapshot = {
                phase,
                progress,
                revision: prev.revision + 1,
            }
            listeners.forEach((l) => l())
        },
        reset: () => {
            snapshot = { phase: 0, progress: 0, revision: 0 }
            listeners.forEach((l) => l())
        },
    }
}

const store = createStore()

export function useDemoCycle(options: {
    enabled: boolean
    inView: boolean
    paused: boolean
}) {
    const { enabled, inView, paused } = options
    const rafRef = useRef<number>(0)
    const startRef = useRef<number>(0)
    const lastNotifyRef = useRef<number>(0)

    useEffect(() => {
        if (!enabled || !inView || paused) {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            return
        }

        startRef.current = performance.now()
        lastNotifyRef.current = 0

        const tick = (now: number) => {
            const elapsed = (now - startRef.current) % CYCLE_MS
            const progress = elapsed / CYCLE_MS
            const phase = Math.min(
                PHASE_COUNT - 1,
                Math.floor(progress * PHASE_COUNT),
            )

            if (
                lastNotifyRef.current === 0 ||
                now - lastNotifyRef.current >= NOTIFY_MS
            ) {
                lastNotifyRef.current = now
                store.setProgress(progress, phase)
            }

            rafRef.current = requestAnimationFrame(tick)
        }

        rafRef.current = requestAnimationFrame(tick)
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [enabled, inView, paused])

    useEffect(() => {
        const onVisibility = () => {
            if (document.hidden && rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
        }
        document.addEventListener("visibilitychange", onVisibility)
        return () => document.removeEventListener("visibilitychange", onVisibility)
    }, [])

    const snapshot = useSyncExternalStore(
        store.subscribe,
        store.getSnapshot,
        store.getSnapshot,
    )

    return {
        phase: snapshot.phase,
        progress: snapshot.progress,
        cycleMs: CYCLE_MS,
    }
}
