import { SPICE_DATABASE } from '../../data/spiceDatabase';

interface SpicePairingsProps {
  currentSpiceId: string;
  pairings: string[];
}

export function SpicePairings({ currentSpiceId, pairings }: SpicePairingsProps) {
  // Map pairing names to spice IDs
  const getPairingSpice = (pairingName: string) => {
    const normalizedName = pairingName.toLowerCase();
    
    // Direct matches
    const directMatch = Object.values(SPICE_DATABASE).find(
      spice => spice.name.toLowerCase() === normalizedName
    );
    if (directMatch) return directMatch;

    // Partial matches
    const partialMatch = Object.values(SPICE_DATABASE).find(
      spice => 
        spice.name.toLowerCase().includes(normalizedName) || 
        normalizedName.includes(spice.name.toLowerCase())
    );
    return partialMatch;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {pairings.map((pairing, idx) => {
        const pairingSpice = getPairingSpice(pairing);
        
        return (
          <div
            key={idx}
            className="group relative bg-gradient-to-br from-white to-[var(--moroccan-beige)] border border-[var(--border)] rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            {pairingSpice && (
              <div 
                className="absolute top-2 right-2 w-3 h-3 rounded-full"
                style={{ backgroundColor: pairingSpice.color }}
                title={pairingSpice.name}
              />
            )}
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-[var(--foreground)] capitalize">
                {pairing}
              </span>
              {pairingSpice && (
                <span className="text-xs text-[var(--muted-foreground)]">
                  {pairingSpice.nameFrench}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
