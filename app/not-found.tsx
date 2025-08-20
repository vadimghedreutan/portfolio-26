import Link from "next/link"

export default function NotFound() {
    return (
        <section className="relative flex min-h-[calc(100dvh-76px)] flex-col items-center justify-center px-5 text-center">
            <h1 className="text-6xl font-bold tracking-tighter text-neutral-900">
                404
            </h1>
            <p className="mt-4 text-2xl font-medium text-neutral-700">
                Oh no! This page does not exist.
            </p>
            <p className="mt-2 text-neutral-600">
                It looks like you have stumbled on a broken link or a page that
                has been moved.
            </p>
            <Link
                href="/"
                className="mt-6 inline-block rounded-full border border-neutral-300 bg-neutral-900 px-6 py-3 text-white transition-colors duration-200 hover:bg-neutral-800"
            >
                Back to Home
            </Link>
        </section>
    )
}
