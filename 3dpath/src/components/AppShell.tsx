import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { TOPICS, topicPath } from "../data/catalogue";
import PaceToggle from "./PaceToggle";
import ScrollToTop from "./ScrollToTop";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/areas", label: "Areas", end: false },
  { to: "/reference", label: "Reference", end: false },
  { to: "/notes", label: "Notes", end: false },
];

export default function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <div className="min-h-screen">
      <div aria-hidden className="shop-texture" />
      <ScrollToTop />

      <header className="sticky top-0 z-50 border-b border-line bg-night/92 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[2300px] items-center gap-4 px-5 desk:px-8">
          <Link to="/" className="display text-2xl font-bold tracking-wide">
            3d<span className="text-amber">Path</span>
          </Link>
          <span className="hidden font-mono text-[0.68rem] text-faint desk:inline">
            FiveM mapping school
          </span>

          <div className="ml-auto hidden desk:block">
            <PaceToggle compact />
          </div>

          {/* Landscape: inline nav */}
          <nav aria-label="Main" className="hidden items-center gap-1 desk:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `rounded-[4px] px-3 py-1.5 text-[0.88rem] transition-colors ${
                    isActive ? "bg-panel text-amber" : "text-muted hover:bg-panel hover:text-paper"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          {/* Portrait: slide-over trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-label="Open menu"
            className="ml-auto flex h-11 w-11 items-center justify-center rounded-[4px] border border-line text-muted hover:border-line2 hover:text-paper desk:hidden"
          >
            <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden>
              <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
      </header>

      {/* Slide-over menu (portrait) */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] desk:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-night/70"
          />
          <div className="absolute top-0 right-0 flex h-full w-80 flex-col border-l border-line bg-panel px-6 py-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="display text-xl font-bold">
                3d<span className="text-amber">Path</span>
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-[4px] border border-line text-muted hover:text-paper"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            </div>

            <nav aria-label="Menu" className="mt-8 space-y-1">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.end}
                  className={({ isActive }) =>
                    `block rounded-[4px] px-3 py-2.5 text-[1rem] ${
                      isActive ? "bg-night text-amber" : "text-muted hover:text-paper"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>

            <p className="mt-8 mb-2 font-mono text-[0.7rem] text-faint">Pace</p>
            <PaceToggle />

            <p className="mt-8 mb-2 font-mono text-[0.7rem] text-faint">Topics</p>
            <nav aria-label="Topics" className="space-y-1">
              {TOPICS.map((t) => (
                <NavLink
                  key={t.id}
                  to={topicPath(t)}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-[4px] px-3 py-2.5 text-[0.95rem] ${
                      isActive ? "bg-night text-amber" : "text-muted hover:text-paper"
                    }`
                  }
                >
                  {t.name}
                  <span className="stamp border-line text-faint">{t.stamp}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}

      <main className="relative z-10 mx-auto max-w-[2300px] px-5 py-6 desk:px-8 desk:py-8">
        <Outlet />
      </main>
    </div>
  );
}
