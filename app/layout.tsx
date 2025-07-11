import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Productivity Dashboard",
  description: "Personal productivity tools in one place",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  // Fallback for SSR: usePathname hook is only for client components
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen bg-gradient-to-br from-slate-50/80 to-slate-100/80 dark:from-slate-900/80 dark:to-slate-800/80">
            <aside className="hidden md:flex flex-col w-20 bg-white/60 dark:bg-slate-900/60 neumorphic-sidebar shadow-xl">
              <nav className="flex flex-col items-center gap-8 py-8">
                <Link href="/" className={`flex flex-col items-center gap-1 text-slate-700 dark:text-slate-200 hover:text-blue-500 ${pathname === "/" ? "font-bold text-blue-600" : ""}`}>🏠<span className="text-xs">Home</span></Link>
                <Link href="/dashboard" className={`flex flex-col items-center gap-1 text-slate-700 dark:text-slate-200 hover:text-green-500 ${pathname.startsWith("/dashboard") ? "font-bold text-green-600" : ""}`}>📊<span className="text-xs">Dashboard</span></Link>
                <Link href="/settings" className={`flex flex-col items-center gap-1 text-slate-700 dark:text-slate-200 hover:text-pink-500 ${pathname.startsWith("/settings") ? "font-bold text-pink-600" : ""}`}>⚙️<span className="text-xs">Settings</span></Link>
              </nav>
            </aside>
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
