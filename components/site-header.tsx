"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { siteConfig, contentSections } from "@/config/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SearchButton } from "@/components/ui/search-button";
import { Badge } from "@/components/ui/badge";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [prevPathname, setPrevPathname] = React.useState(pathname);

  // Close mobile menu immediately if pathname changed during render
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Lock body scroll and handle Escape key when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <header
      role="banner"
      className="sticky top-0 z-40 w-full border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60 transition-colors"
    >
      <div className="container-site flex h-16 items-center justify-between gap-4">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
            aria-label={`${siteConfig.name} Homepage`}
          >
            <div className="relative flex items-center justify-center size-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4.5"
                aria-hidden="true"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10" />
                <path d="M6 10h7" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-slate-100">
                {siteConfig.name}
              </span>
              <Badge variant="brand" size="sm" className="hidden sm:inline-flex text-[10px] py-0 px-1.5 font-semibold">
                Beta
              </Badge>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-0.5 text-sm font-medium"
          >
            {contentSections.map((section) => {
              const isActive = pathname.startsWith(section.href);
              return (
                <Link
                  key={section.key}
                  href={section.href}
                  className={cn(
                    "px-3 py-1.5 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/50"
                  )}
                >
                  {section.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Search, GitHub, Theme Toggle, Mobile Menu Trigger */}
        <div className="flex items-center gap-2">
          {/* Desktop Search Trigger */}
          <div className="hidden sm:block">
            <SearchButton variant="full" />
          </div>

          {/* Mobile Search Trigger */}
          <div className="block sm:hidden">
            <SearchButton variant="icon" />
          </div>

          {/* GitHub Link */}
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="OpenDevDocs on GitHub (opens in new tab)"
            title="GitHub Repository"
            className="inline-flex items-center justify-center size-9 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          >
            <GithubIcon className="size-4" aria-hidden="true" />
          </a>

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex md:hidden items-center justify-center size-9 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {mobileMenuOpen ? (
              <X className="size-4.5" aria-hidden="true" />
            ) : (
              <Menu className="size-4.5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Overlay Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-x-0 top-16 bottom-0 z-50 md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50 overflow-y-auto p-4 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="pb-2">
              <SearchButton variant="full" className="max-w-full w-full" />
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2">
              Sections
            </p>

            <nav className="grid grid-cols-1 gap-1">
              {contentSections.map((section) => {
                const isActive = pathname.startsWith(section.href);
                return (
                  <Link
                    key={section.key}
                    href={section.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-200",
                      isActive
                        ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                    )}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-900 dark:text-slate-100">
                        {section.label}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {section.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              <GithubIcon className="size-4" />
              <span>GitHub Repository</span>
            </a>
            <span>MIT License</span>
          </div>
        </div>
      )}
    </header>
  );
}
