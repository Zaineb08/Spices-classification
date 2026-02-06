import { Loader2, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getRandomSpiceFact } from '../../data/spiceFacts';

export function LoadingState() {
  const [currentFact, setCurrentFact] = useState(getRandomSpiceFact());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact(getRandomSpiceFact());
    }, 4000); // Change fact every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl p-12 shadow-lg border border-[var(--moroccan-green)]">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--moroccan-green)] to-[var(--moroccan-dark-green)] flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--moroccan-green)] to-[var(--moroccan-dark-green)] animate-ping opacity-20" />
        </div>
        
        <div className="text-center">
          <h3 className="mb-2 text-[var(--moroccan-red)]">
            Analyzing Your Spice...
          </h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            Our AI is examining the image to identify the spice
          </p>
        </div>

        <div className="w-full max-w-xs">
          <div className="h-2 bg-[var(--moroccan-beige)] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[var(--moroccan-red)] to-[var(--moroccan-green)] animate-pulse" />
          </div>
        </div>

        {/* Educational Fact */}
        <div className="mt-4 p-4 bg-gradient-to-br from-[var(--moroccan-beige)] to-[var(--moroccan-warm-beige)] rounded-lg max-w-md">
          <div className="flex items-start gap-2">
            <Sparkles className="w-5 h-5 text-[var(--moroccan-gold)] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--foreground)] leading-relaxed animate-fade-in">
              {currentFact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}