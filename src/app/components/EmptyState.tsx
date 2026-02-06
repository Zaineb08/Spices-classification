import { ImageOff } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="bg-white rounded-xl p-12 shadow-md border-2 border-dashed border-[var(--moroccan-sand)]">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-20 h-20 rounded-full bg-[var(--moroccan-beige)] flex items-center justify-center">
          <ImageOff className="w-10 h-10 text-[var(--moroccan-red)]" />
        </div>
        <div>
          <h3 className="mb-2 text-[var(--moroccan-red)]">
            No Image Uploaded Yet
          </h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            Upload an image of a Moroccan spice to get started with classification
          </p>
        </div>
      </div>
    </div>
  );
}