export function Header() {
  return (
    <header className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,24,48,0.96),rgba(7,17,31,0.95))] px-5 py-4 shadow-glow backdrop-blur-xl sm:px-6">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.45em] text-console-muted">Flight Ops Console</p>
          <h1 className="display-font mt-2 text-4xl font-semibold tracking-[0.24em] text-white sm:text-5xl">TAILCHECK</h1>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-console-panel/80 px-4 py-3 text-right">
            <p className="text-[10px] uppercase tracking-[0.35em] text-console-muted">UTC Clock</p>
            <p className="mt-1 text-lg font-semibold text-white">09:36:58</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-console-panel/80 px-4 py-3 text-right">
            <p className="text-[10px] uppercase tracking-[0.35em] text-console-muted">Feed Status</p>
            <p className="mt-1 text-sm font-semibold text-red-300">Feed error</p>
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_0.82fr] md:items-start">
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.5em] text-console-muted">Aviation Intelligence</p>
          <h2 className="display-font max-w-xl text-[clamp(2.3rem,5vw,4.1rem)] leading-[0.92] tracking-[0.08em] text-white">
            Track aircraft identity,
            <br />
            route intelligence, and live
            <br />
            radar telemetry.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-slate-400 sm:text-[15px]">
            Search by registration to pull airframe metadata from AviationStack and position telemetry from OpenSky in one command center view.
          </p>
        </div>
        <div className="hidden rounded-[24px] border border-white/10 bg-white/[0.02] p-3 md:block">
          <div className="h-full rounded-[20px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(79,209,197,0.1),transparent_50%),linear-gradient(180deg,rgba(12,23,41,0.95),rgba(8,14,24,0.95))]" />
        </div>
      </div>
    </header>
  );
}