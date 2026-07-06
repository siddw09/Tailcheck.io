import type { HistoryResponse } from "@tailcheck/shared";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type HistoryLogProps = {
  items: HistoryResponse["items"];
};

export function HistoryLog({ items }: HistoryLogProps) {
  return (
    <section className="rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,20,36,0.95),rgba(7,13,22,0.95))] p-4 shadow-glow">
      <div className="mb-3 flex items-center justify-between gap-4 px-1">
        <p className="text-[10px] uppercase tracking-[0.45em] text-console-muted">Recent Searches</p>
        <p className="text-xs text-slate-400">{items.length} items</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Registration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length > 0 ? (
            items.map((row) => (
              <TableRow key={`${row.hex}-${row.searchedAt}`}>
                <TableCell className="font-semibold text-white">{row.hex}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell className="text-right text-slate-400">{row.searchedAt}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-slate-400" colSpan={3}>
                No searches yet. Run a query to populate the backend history.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}