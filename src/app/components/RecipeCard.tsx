import { Clock, Users, ChefHat } from 'lucide-react';
import type { Recipe } from '../../data/recipes';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Hard: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white border border-[var(--border)] rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="space-y-3">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="flex-1 text-[var(--moroccan-red)]">{recipe.name}</h4>
            <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[recipe.difficulty]}`}>
              {recipe.difficulty}
            </span>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] mb-3">{recipe.nameArabic}</p>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-3 text-xs text-[var(--muted-foreground)]">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{recipe.prepTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="w-3 h-3" />
            <span>{recipe.cookTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{recipe.serves}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
          {recipe.description}
        </p>

        {/* Key Ingredients */}
        <div>
          <p className="text-xs text-[var(--muted-foreground)] mb-2">Key Ingredients:</p>
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients.slice(0, 4).map((ingredient, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-[var(--moroccan-beige)] rounded text-xs text-[var(--foreground)]"
              >
                {ingredient}
              </span>
            ))}
            {recipe.ingredients.length > 4 && (
              <span className="px-2 py-1 text-xs text-[var(--muted-foreground)]">
                +{recipe.ingredients.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Spices Used */}
        <div>
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Spices:</p>
          <div className="flex flex-wrap gap-1">
            {recipe.spices.map((spice) => (
              <span
                key={spice}
                className="px-2 py-1 bg-gradient-to-br from-[var(--moroccan-red)] to-[var(--moroccan-dark-red)] text-white rounded text-xs"
              >
                {spice}
              </span>
            ))}
          </div>
        </div>

        {/* Brief Instructions */}
        <div className="pt-2 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--muted-foreground)] italic">
            {recipe.briefInstructions}
          </p>
        </div>
      </div>
    </div>
  );
}
