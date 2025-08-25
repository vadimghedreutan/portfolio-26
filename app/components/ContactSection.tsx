// "use client"

// import React from "react"
// import { motion } from "motion/react"

// type IconProps = React.SVGProps<SVGSVGElement>
// type Social = {
//     name: string
//     href: string
//     Icon: (props: IconProps) => React.ReactElement
//     title?: string
// }

// /* ---------- Inline SVG Icons ---------- */

// const GithubIcon = (props: IconProps) => (
//     <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
//         <path
//             fillRule="evenodd"
//             clipRule="evenodd"
//             d="M12 .5C5.648.5.75 5.398.75 11.75c0 4.92 3.188 9.096 7.615 10.57.557.102.76-.242.76-.538 0-.266-.01-1.147-.016-2.08-3.096.674-3.75-1.324-3.75-1.324-.507-1.288-1.237-1.63-1.237-1.63-1.012-.692.077-.678.077-.678 1.118.078 1.706 1.148 1.706 1.148.995 1.705 2.612 1.212 3.25.927.102-.72.39-1.213.709-1.492-2.473-.281-5.073-1.236-5.073-5.501 0-1.216.434-2.21 1.147-2.987-.115-.282-.497-1.414.108-2.948 0 0 .938-.3 3.074 1.14a10.66 10.66 0 0 1 2.798-.376c.95.004 1.907.129 2.802.376 2.134-1.44 3.07-1.14 3.07-1.14.607 1.534.225 2.666.11 2.948.714.777 1.145 1.771 1.145 2.987 0 4.276-2.604 5.216-5.086 5.492.4.346.755 1.03.755 2.076 0 1.5-.014 2.708-.014 3.078 0 .298.2.647.77.537 4.424-1.477 7.61-5.651 7.61-10.57C23.25 5.398 18.352.5 12 .5z"
//         />
//     </svg>
// )

// const TwitterIcon = (props: IconProps) => (
//     <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
//         <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 0 0 2.048-2.577 9.334 9.334 0 0 1-2.958 1.13 4.66 4.66 0 0 0-7.93 4.245 13.22 13.22 0 0 1-9.6-4.867 4.66 4.66 0 0 0 1.442 6.215 4.64 4.64 0 0 1-2.11-.583v.06a4.66 4.66 0 0 0 3.74 4.57 4.7 4.7 0 0 1-2.104.08 4.66 4.66 0 0 0 4.35 3.23A9.34 9.34 0 0 1 1.11 19.6a13.17 13.17 0 0 0 7.14 2.09c8.57 0 13.26-7.1 13.26-13.26l-.015-.603a9.48 9.48 0 0 0 2.315-2.42z" />
//     </svg>
// )

// const MailIcon = (props: IconProps) => (
//     <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
//         <path d="M20 4H4a2 2 0 0 0-2 2v12c0 1.103.897 2 2 2h16a2 2 0 0 0 2-2V6c0-1.103-.897-2-2-2zm0 2-8 5L4 6h16zm0 12H4V8l8 5 8-5v10z" />
//     </svg>
// )

// const LinkedinIcon = (props: IconProps) => (
//     <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
//         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//     </svg>
// )

// /* ---------- Data ---------- */

// const socials: Social[] = [
//     {
//         name: "GitHub",
//         href: "https://github.com/vadimghedreutan",
//         Icon: GithubIcon,
//         title: "Open my GitHub profile",
//     },
//     {
//         name: "Twitter",
//         href: "https://twitter.com/GhedreutanVadim",
//         Icon: TwitterIcon,
//         title: "Open my Twitter profile",
//     },
//     {
//         name: "LinkedIn",
//         href: "https://linkedin.com/in/vadimghedreutan",
//         Icon: LinkedinIcon,
//         title: "Connect with me on LinkedIn",
//     },
//     {
//         name: "Email",
//         href: "mailto:dev.vadimghedreutan@gmail.com",
//         Icon: MailIcon,
//         title: "Send me an email",
//     },
// ]

// /* ---------- Main Component ---------- */

// const ContactSection = () => {
//     return (
//         <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-4xl mx-auto text-center">
//                 <h3 className="text-2xl font-semibold text-gray-900 mb-8">
//                     Follow me
//                 </h3>
//                 <ul className="flex items-center justify-center space-x-4">
//                     {socials.map(({ name, href, Icon, title }, index) => (
//                         <li key={name}>
//                             <motion.a
//                                 href={href}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 aria-label={name}
//                                 title={title ?? name}
//                                 className="inline-flex items-center justify-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{
//                                     duration: 0.6,
//                                     delay: index * 0.1,
//                                     ease: "easeOut",
//                                 }}
//                                 whileHover={{ scale: 1.05 }}
//                                 whileFocus={{ scale: 1.05 }}
//                             >
//                                 <Icon className="h-5 w-5" />
//                                 <span className="sr-only">{name}</span>
//                             </motion.a>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </section>
//     )
// }

// export default ContactSection
