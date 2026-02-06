import { Sparkles, Info } from "lucide-react";

const SPICES = [
  { name: "anis", displayName: "Anis", color: "#8b6f47" },
  { name: "cannelle", displayName: "Cannelle", color: "#c75b39" },
  { name: "carvi", displayName: "Carvi", color: "#d4af37" },
  { name: "clou_girofle", displayName: "Clou de Girofle", color: "#6b4423" },
  { name: "cubebe", displayName: "Cubèbe", color: "#006233" },
  { name: "cumin", displayName: "Cumin", color: "#a67c52" },
  { name: "curcuma", displayName: "Curcuma", color: "#e8b86d" },
  { name: "gingembre", displayName: "Gingembre", color: "#d4a574" },
  { name: "paprika", displayName: "Paprika", color: "#c1272d" },
  { name: "poivre_noir", displayName: "Poivre Noir", color: "#2c1810" },
  { name: "safran", displayName: "Safran", color: "#f4c430" },
];

interface SpicesGridProps {
  onSpiceClick?: (spiceId: string) => void;
}

export function SpicesGrid({ onSpiceClick }: SpicesGridProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 mb-3 text-[var(--moroccan-red)]">
          <Sparkles className="w-6 h-6" />
          Moroccan Spices Collection
        </h2>
        <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
          Our model recognizes 11 traditional Moroccan spices, each with unique
          flavors and aromas.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--moroccan-beige)] text-[var(--moroccan-red)] text-sm font-semibold shadow-sm">
          Click any spice card to learn more
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {SPICES.map((spice) => (
          <button
            key={spice.name}
            onClick={() => onSpiceClick?.(spice.name)}
            className="group relative bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-[var(--moroccan-green)] focus:outline-none focus:ring-2 focus:ring-[var(--moroccan-green)] focus:ring-offset-2 text-left"
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center shadow-inner transition-transform group-hover:scale-110"
              style={{ backgroundColor: spice.color }}
            >
              <div className="w-8 h-8 bg-white/20 rounded-full" />
            </div>
            <p className="text-center text-sm text-[var(--foreground)] mb-2">
              {spice.displayName}
            </p>
            <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[var(--moroccan-green)]">
              Learn more
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
