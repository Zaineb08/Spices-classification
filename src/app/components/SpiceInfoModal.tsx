import {
  X,
  Info,
  Heart,
  Package,
  Leaf,
  BookOpen,
  UtensilsCrossed,
} from "lucide-react";
import { getSpiceInfo } from "../../data/spiceDatabase";
import { getRecipesBySpice } from "../../data/recipes";
import { RecipeCard } from "./RecipeCard";
import { SpicePairings } from "./SpicePairings";

interface SpiceInfoModalProps {
  spiceId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SpiceInfoModal({
  spiceId,
  isOpen,
  onClose,
}: SpiceInfoModalProps) {
  if (!isOpen || !spiceId) return null;

  const spice = getSpiceInfo(spiceId);
  const recipes = getRecipesBySpice(spiceId);

  if (!spice) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex-shrink-0 p-6 text-white relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${spice.color} 0%, ${spice.color}dd 100%)`,
          } as any}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10">
            <h2 className="text-3xl mb-2">{spice.name}</h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/90">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                {spice.nameFrench}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                {spice.nameArabic}
              </span>
            </div>
            <p className="mt-3 text-white/90 italic">{spice.flavor}</p>
          </div>

          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8">
            {/* Description */}
            <section>
              <div className="flex items-center gap-2 mb-3 text-[var(--moroccan-red)]">
                <Info className="w-5 h-5" />
                <h3>About {spice.name}</h3>
              </div>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                {spice.description}
              </p>
              <p className="text-sm text-[var(--muted-foreground)] mt-2">
                <strong>Origin:</strong> {spice.origin}
              </p>
            </section>

            {/* Traditional Uses */}
            <section>
              <div className="flex items-center gap-2 mb-3 text-[var(--moroccan-red)]">
                <UtensilsCrossed className="w-5 h-5" />
                <h3>Traditional Moroccan Uses</h3>
              </div>
              <ul className="space-y-2">
                {spice.traditionalUses.map((use, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-[var(--muted-foreground)]"
                  >
                    <span className="text-[var(--moroccan-green)] mt-1">•</span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Health Benefits */}
            <section>
              <div className="flex items-center gap-2 mb-3 text-[var(--moroccan-red)]">
                <Heart className="w-5 h-5" />
                <h3>Health Benefits</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {spice.healthBenefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-3 bg-[var(--moroccan-beige)] rounded-lg"
                  >
                    <Leaf className="w-4 h-4 text-[var(--moroccan-green)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[var(--foreground)]">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Storage Tips */}
            <section>
              <div className="flex items-center gap-2 mb-3 text-[var(--moroccan-red)]">
                <Package className="w-5 h-5" />
                <h3>Storage Tips</h3>
              </div>
              <ul className="space-y-2">
                {spice.storageTips.map((tip, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-[var(--muted-foreground)]"
                  >
                    <span className="text-[var(--moroccan-gold)] mt-1">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Spice Pairings */}
            <section>
              <div className="flex items-center gap-2 mb-3 text-[var(--moroccan-red)]">
                <Leaf className="w-5 h-5" />
                <h3>Pairs Well With</h3>
              </div>
              <SpicePairings
                currentSpiceId={spiceId}
                pairings={spice.pairsWith}
              />
            </section>

            {/* Common Dishes */}
            <section>
              <div className="flex items-center gap-2 mb-3 text-[var(--moroccan-red)]">
                <UtensilsCrossed className="w-5 h-5" />
                <h3>Common Dishes</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {spice.commonDishes.map((dish, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gradient-to-br from-[var(--moroccan-beige)] to-[var(--moroccan-warm-beige)] rounded-full text-sm text-[var(--foreground)]"
                  >
                    {dish}
                  </span>
                ))}
              </div>
            </section>

            {/* Recipes */}
            {recipes.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4 text-[var(--moroccan-red)]">
                  <BookOpen className="w-5 h-5" />
                  <h3>Traditional Recipes</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 bg-[var(--moroccan-beige)] border-t border-[var(--border)]">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-6 py-3 bg-[var(--moroccan-red)] text-white rounded-lg hover:bg-[var(--moroccan-dark-red)] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
