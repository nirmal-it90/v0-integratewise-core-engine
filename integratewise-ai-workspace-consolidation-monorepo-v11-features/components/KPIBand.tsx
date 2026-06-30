export type KPI = { label: string; value: string };

export function KPIBand({ kpis }: { kpis: KPI[] }) {
  return (
    <section aria-labelledby="kpis-title" className="border-y border-[color:var(--iw-border)]">
      <div className="iw-container py-10">
        <h2 id="kpis-title" className="sr-only">
          Key outcomes
        </h2>

        <dl className="grid gap-4 sm:grid-cols-3">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-[var(--iw-radius)] border border-[color:var(--iw-border)] bg-[color:var(--iw-surface)] p-6 shadow-sm"
            >
              <dt className="text-sm text-[color:var(--iw-text-muted)]">{kpi.label}</dt>
              <dd className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--iw-text)]">
                {kpi.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
