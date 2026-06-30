import Link from "next/link";

export type FooterColumn = { title: string; links: string[] };

function formatLinkLabel(href: string) {
  const last = href.split("/").filter(Boolean).slice(-1)[0] ?? href;
  return last
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

export function Footer({ columns }: { columns: FooterColumn[] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[color:var(--iw-border)] bg-[color:var(--iw-bg)]">
      <div className="iw-container py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-[color:var(--iw-text)]">IntegrateWise</p>
            <p className="text-sm leading-relaxed text-[color:var(--iw-text-muted)]">
              Customer Success data spine + AI agents that score health, detect churn risk, and run playbooks.
            </p>
          </div>

          {columns.map((c) => (
            <div key={c.title} className="space-y-3">
              <p className="text-sm font-semibold text-[color:var(--iw-text)]">{c.title}</p>
              <ul className="space-y-2">
                {c.links.map((href) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-[color:var(--iw-text-muted)] underline-offset-4 hover:text-[color:var(--iw-text)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--iw-focus)]"
                    >
                      {formatLinkLabel(href)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[color:var(--iw-border)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[color:var(--iw-text-muted)]">© {year} IntegrateWise. All rights reserved.</p>
          <p className="text-xs text-[color:var(--iw-text-muted)]">
            Built with accessibility and performance in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
