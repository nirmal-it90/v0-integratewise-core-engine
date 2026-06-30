import Link from "next/link";

type HeaderLink = { label: string; href: string };

const defaultLinks: HeaderLink[] = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Agents", href: "#agents" },
  { label: "FAQ", href: "#faq" },
];

export function Header({
  links = defaultLinks,
  cta = { text: "Request Demo", href: "/demo" },
}: {
  links?: HeaderLink[];
  cta?: { text: string; href: string };
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--iw-border)] bg-[color:color-mix(in_oklch,var(--iw-bg),transparent_10%)] backdrop-blur">
      <a className="iw-skip" href="#main">
        Skip to content
      </a>
      <div className="iw-container">
        <div className="flex h-16 items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--iw-focus)]"
              aria-label="IntegrateWise home"
            >
              <span
                aria-hidden="true"
                className="grid size-9 place-items-center rounded-xl bg-[color:var(--iw-surface)] text-[color:var(--iw-text)] shadow-sm ring-1 ring-[color:var(--iw-border)]"
              >
                IW
              </span>
              <span className="text-sm font-semibold tracking-tight text-[color:var(--iw-text)]">
                IntegrateWise
              </span>
            </Link>
          </div>

          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-[color:var(--iw-text-muted)] underline-offset-4 hover:text-[color:var(--iw-text)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--iw-focus)]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={cta.href}
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--iw-text)] px-4 py-2 text-sm font-semibold text-[color:var(--iw-bg)] shadow-sm ring-1 ring-[color:color-mix(in_oklch,var(--iw-text),transparent_70%)] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--iw-focus)]"
            >
              {cta.text}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
