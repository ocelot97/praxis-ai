export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-ice flex flex-col font-sans">
      {/* Header skeleton */}
      <header className="sticky top-0 z-50 bg-ice/95 border-b border-border">
        <div className="section-container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-navy/10 animate-pulse" />
            <div className="h-5 w-24 rounded bg-navy/10 animate-pulse" />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-4 w-32 rounded bg-navy/10 animate-pulse hidden sm:block" />
            <div className="h-4 w-16 rounded bg-navy/10 animate-pulse" />
          </div>
        </div>
      </header>

      <main className="section-container py-8 md:py-12 flex-1">
        {/* Title */}
        <div className="h-8 w-64 rounded bg-navy/10 animate-pulse mb-8" />

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="card-base flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-navy/[0.06] animate-pulse" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-3 w-20 rounded bg-navy/10 animate-pulse" />
                <div className="h-7 w-12 rounded bg-navy/10 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 h-10 rounded-lg bg-navy/[0.06] animate-pulse" />
          <div className="w-36 h-10 rounded-lg bg-navy/[0.06] animate-pulse" />
          <div className="w-36 h-10 rounded-lg bg-navy/[0.06] animate-pulse" />
        </div>

        {/* Table skeleton */}
        <div className="card-base p-0">
          <div className="px-4 py-3.5 border-b border-border flex gap-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-3 rounded bg-navy/10 animate-pulse"
                style={{ width: `${60 + i * 20}px` }}
              />
            ))}
          </div>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="px-4 py-4 border-b border-border flex gap-4 items-center"
            >
              <div className="h-4 w-24 rounded bg-navy/[0.06] animate-pulse" />
              <div className="h-4 w-36 rounded bg-navy/[0.06] animate-pulse" />
              <div className="h-4 w-20 rounded bg-navy/[0.06] animate-pulse hidden md:block" />
              <div className="h-6 w-16 rounded-full bg-navy/[0.06] animate-pulse" />
              <div className="h-4 w-20 rounded bg-navy/[0.06] animate-pulse" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
