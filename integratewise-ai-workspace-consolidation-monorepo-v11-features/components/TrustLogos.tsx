export function TrustLogos({ logos }: { logos: string[] }) {
  return (
    <section aria-labelledby="trust-title">
      <div className="iw-container pb-4 pt-2">
        <div className="flex flex-col items-center gap-6">
          <h2 id="trust-title" className="text-sm font-medium text-[color:var(--iw-text-muted)]">
            Trusted by teams shipping customer outcomes
          </h2>

          <ul className="flex flex-wrap items-center justify-center gap-3" aria-label="Trusted by">
            {logos.map((name) => (
              <li key={name}>
                <span className="inline-flex items-center rounded-full border border-[color:var(--iw-border)] bg-[color:var(--iw-surface)] px-4 py-2 text-sm font-semibold text-[color:var(--iw-text)]">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
