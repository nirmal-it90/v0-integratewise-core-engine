export type FAQItem = { q: string; a: string };

export function FAQList({ items }: { items: FAQItem[] }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24">
      <div className="iw-container py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2
            id="faq-title"
            className="text-2xl font-semibold tracking-tight text-[color:var(--iw-text)] sm:text-3xl"
          >
            FAQ
          </h2>
          <p className="mt-3 text-[color:var(--iw-text-muted)]">
            Quick answers to common questions about setup, integrations, and security.
          </p>

          <div className="mt-8 divide-y divide-[color:var(--iw-border)] rounded-[var(--iw-radius)] border border-[color:var(--iw-border)] bg-[color:var(--iw-surface)]">
            {items.map((it) => (
              <details key={it.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--iw-focus)]">
                  <span className="font-semibold text-[color:var(--iw-text)]">{it.q}</span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 text-[color:var(--iw-text-muted)] transition group-open:rotate-180"
                  >
                    ▾
                  </span>
                </summary>
                <div className="mt-3 text-sm leading-relaxed text-[color:var(--iw-text-muted)]">
                  {it.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
