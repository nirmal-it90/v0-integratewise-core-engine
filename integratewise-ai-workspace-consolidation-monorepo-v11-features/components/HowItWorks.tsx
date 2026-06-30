export type HowItWorksStep = { title: string; desc: string };

export function HowItWorks({ steps }: { steps: HowItWorksStep[] }) {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      className="scroll-mt-24"
    >
      <div className="iw-container py-14 sm:py-20">
        <div className="flex flex-col gap-8">
          <div className="max-w-2xl">
            <h2
              id="how-title"
              className="text-2xl font-semibold tracking-tight text-[color:var(--iw-text)] sm:text-3xl"
            >
              How it works
            </h2>
            <p className="mt-3 text-[color:var(--iw-text-muted)]">
              A simple pipeline from raw systems data to proactive, automated customer outcomes.
            </p>
          </div>

          <ol className="grid gap-4 sm:grid-cols-3">
            {steps.map((s, idx) => (
              <li
                key={s.title}
                className="rounded-[var(--iw-radius)] border border-[color:var(--iw-border)] bg-[color:var(--iw-surface)] p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-10 place-items-center rounded-xl bg-[color:color-mix(in_oklch,var(--iw-accent),transparent_80%)] text-sm font-semibold text-[color:var(--iw-text)] ring-1 ring-[color:var(--iw-border)]"
                  >
                    {idx + 1}
                  </span>
                  <h3 className="text-base font-semibold text-[color:var(--iw-text)]">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--iw-text-muted)]">
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
