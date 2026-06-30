export function Badges({ badges }: { badges: string[] }) {
  return (
    <section aria-labelledby="badges-title">
      <div className="iw-container py-10">
        <h2 id="badges-title" className="sr-only">
          Security and reliability badges
        </h2>

        <ul className="flex flex-wrap items-center justify-center gap-2">
          {badges.map((b) => (
            <li key={b}>
              <span className="inline-flex items-center rounded-full border border-[color:var(--iw-border)] bg-[color:var(--iw-surface)] px-3 py-1.5 text-xs font-semibold text-[color:var(--iw-text)]">
                {b}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
