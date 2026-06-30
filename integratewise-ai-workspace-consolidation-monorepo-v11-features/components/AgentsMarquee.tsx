import Link from "next/link";

export type Agent = { name: string; oneLiner: string; href: string };

export function AgentsMarquee({ agents }: { agents: Agent[] }) {
  const items = agents.length > 0 ? agents : [];
  const doubled = [...items, ...items];

  return (
    <section id="agents" aria-labelledby="agents-title" className="scroll-mt-24">
      <div className="iw-container py-14 sm:py-20">
        <div className="flex flex-col gap-8">
          <div className="max-w-2xl">
            <h2
              id="agents-title"
              className="text-2xl font-semibold tracking-tight text-[color:var(--iw-text)] sm:text-3xl"
            >
              7 AI agents, always on
            </h2>
            <p className="mt-3 text-[color:var(--iw-text-muted)]">
              Each agent has a single job—monitor, score, and run the right playbook at the right time.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[var(--iw-radius)] border border-[color:var(--iw-border)] bg-[color:var(--iw-surface)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-[linear-gradient(to_right,var(--iw-surface),transparent)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-[linear-gradient(to_left,var(--iw-surface),transparent)]"
            />

            <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <ul className="iw-marquee-track flex w-max items-stretch gap-3 p-4">
                {doubled.map((a, idx) => (
                  <li key={`${a.name}-${idx}`} className="min-w-[14rem]">
                    <Link
                      href={a.href}
                      className="group block h-full rounded-[calc(var(--iw-radius)-6px)] border border-[color:var(--iw-border)] bg-[color:var(--iw-surface-2)] p-4 shadow-sm transition hover:bg-[color:color-mix(in_oklch,var(--iw-surface-2),white_6%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--iw-focus)]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-[color:var(--iw-text)]">{a.name}</p>
                        <span
                          aria-hidden="true"
                          className="text-xs text-[color:var(--iw-text-muted)]"
                        >
                          →
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[color:var(--iw-text-muted)]">
                        {a.oneLiner}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-xs text-[color:var(--iw-text-muted)]">
            Prefer reduced motion? Your system settings will pause the animation.
          </p>
        </div>
      </div>
    </section>
  );
}
