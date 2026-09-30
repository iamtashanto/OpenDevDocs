import type { Metadata } from "next";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
