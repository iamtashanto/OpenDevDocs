import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";
import { SkipNav } from "@/components/ui/skip-nav";
import "./globals.css";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OpenDevDocs — Learn. Build. Debug. Deploy.",
    template: "%s | OpenDevDocs",
  },
  description:
    "The open-source developer knowledge platform. Learn technologies step-by-step, find commands quickly, solve common errors, follow practical recipes, and move from beginner to production-level development.",
  keywords: [
    "developer documentation",
    "programming tutorials",
    "open source docs",
    "coding guides",
    "web development",
    "DevOps",
    "command reference",
    "error troubleshooting",
  ],
  authors: [{ name: "OpenDevDocs Contributors" }],
  creator: "OpenDevDocs",
  metadataBase: new URL("https://docs.tashanto.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://docs.tashanto.com",
    siteName: "OpenDevDocs",
    title: "OpenDevDocs — Learn. Build. Debug. Deploy.",
    description:
      "The open-source developer knowledge platform. Step-by-step guides, command references, troubleshooting, recipes, and roadmaps.",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenDevDocs — Learn. Build. Debug. Deploy.",
    description:
      "The open-source developer knowledge platform. Step-by-step guides, command references, troubleshooting, recipes, and roadmaps.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body className="font-sans antialiased bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 min-h-screen">
        <SkipNav />
        <RootProvider
          search={{
            links: [
              ["📖 All Documentation Guides", "/docs"],
              ["⚡ CLI Commands Reference", "/commands"],
              ["🛡️ Common Errors & Solutions", "/errors"],
              ["🍳 Production Recipes", "/recipes"],
              ["🗺️ Developer Roadmaps", "/roadmaps"],
              ["🛠️ Developer Tools & Git", "/tools"],
            ],
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}

