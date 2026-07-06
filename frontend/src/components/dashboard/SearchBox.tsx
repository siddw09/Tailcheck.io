"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  isLoading?: boolean;
};

export function SearchBox({ value, onChange, onSubmit, isLoading = false }: SearchBoxProps) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(12,23,41,0.98),rgba(8,14,24,0.98))] p-5 shadow-glow">
      <form
        className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(value);
        }}
      >
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.45em] text-console-muted">ICAO24 Hex Code</label>
          <Input
            aria-label="Aircraft hex"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="ABC123"
            className="h-12 rounded-2xl border-white/10 bg-console-panel/60 text-[15px] tracking-[0.26em]"
          />
          <p className="text-xs leading-6 text-slate-400">
            Tip: use a 6-character ICAO24 hex code, for example 3C6444.
          </p>
        </div>
        <Button className="h-12 rounded-2xl px-6 text-[15px] font-semibold tracking-wide shadow-[0_0_0_1px_rgba(45,212,191,0.18)]" disabled={isLoading}>
          {isLoading ? "Querying..." : "Query Aircraft"}
        </Button>
      </form>
    </section>
  );
}