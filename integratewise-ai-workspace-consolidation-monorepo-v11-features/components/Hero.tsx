import Link from "next/link";

export function Hero({
  headline,
  subhead,
  ctaPrimary,
  ctaSecondary,
  trustLine,
}: {
  headline: string;
  subhead: string;
  ctaPrimary: { text: string; href: string };
  ctaSecondary: { text: string; href: string };
  trustLine?: string;
}) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-14rem] mx-auto h-[28rem] w-[55rem] max-w-[120%] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--iw-accent),transparent_35%),transparent_60%)] blur-3xl"
      />

      <div className="iw-container pb-14 pt-14 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          {trustLine && (
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--iw-border)] bg-[color:var(--iw-surface)] px-3 py-1 text-xs font-medium text-[color:var(--iw-text-muted)]">
              <span
                aria-hidden="true"
                className="inline-block size-2 rounded-full bg-[color:var(--iw-accent)]"
              />
              {trustLine}
            </p>
          )}

          <h1
            id="hero-title"
            className="text-balance text-4xl font-semibold tracking-tight text-[color:var(--iw-text)] sm:text-5xl"
          >
            {headline}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-[color:var(--iw-text-muted)]">
            {subhead}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={ctaPrimary.href}
              className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--iw-text)] px-5 py-3 text-sm font-semibold text-[color:var(--iw-bg)] shadow-sm ring-1 ring-[color:color-mix(in_oklch,var(--iw-text),transparent_70%)] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--iw-focus)] sm:w-auto"
            >
              {ctaPrimary.text}
            </Link>
            <Link
              href={ctaSecondary.href}
              className="inline-flex w-full items-center justify-center rounded-full border border-[color:var(--iw-border)] bg-[color:var(--iw-surface)] px-5 py-3 text-sm font-semibold text-[color:var(--iw-text)] transition hover:bg-[color:var(--iw-surface-2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--iw-focus)] sm:w-auto"
            >
              {ctaSecondary.text}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
