import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { StatusDot, type Status } from "./StatusDot";
import type { Employee } from "./AttendanceTable";

export function HistoryDrawer({ employee, onClose }: { employee: Employee | null; onClose: () => void }) {
  return (
    <Sheet open={!!employee} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full sm:max-w-md">
        {employee && (
          <>
            <SheetHeader>
              <SheetTitle>{employee.name}</SheetTitle>
              <SheetDescription>{employee.id} · {employee.site}</SheetDescription>
            </SheetHeader>
            <p className="mt-6 px-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">5 derniers pointages</p>
            <ul className="mx-4 mt-3 divide-y divide-border rounded-lg border border-border">
              {employee.history.map(([d, a, dep, s]) => (
                <li key={d} className="flex items-center justify-between px-4 py-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground">{d}</p>
                    <p className="tabular-nums text-xs text-muted-foreground">{a} — {dep}</p>
                  </div>
                  <StatusDot status={s as Status} />
                </li>
              ))}
            </ul>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
