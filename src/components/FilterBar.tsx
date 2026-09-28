export const filters = [
  { key: "all", label: "Tous" },
  { key: "plateau", label: "Plateau" },
  { key: "pikine", label: "Pikine" },
  { key: "diamniadio", label: "Diamniadio" },
  { key: "terrain", label: "Terrain" },
] as const;

export function FilterBar({
  active,
  onChange,
}: {
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f.key}
          type="button"
          onClick={() => onChange(f.key)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            active === f.key
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
