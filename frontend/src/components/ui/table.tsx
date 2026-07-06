import * as React from "react";
import { cn } from "@/utils/cn";

function Table({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-console-panel/80 shadow-glow">
      <table className={cn("w-full text-left text-sm", className)} {...props} />
    </div>
  );
}

function TableHeader(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="border-b border-white/10 text-slate-300" {...props} />;
}

function TableBody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className="divide-y divide-white/5" {...props} />;
}

function TableRow(props: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className="transition-colors hover:bg-white/5" {...props} />;
}

function TableHead(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400" {...props} />;
}

function TableCell(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className="px-4 py-4 text-slate-200" {...props} />;
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };