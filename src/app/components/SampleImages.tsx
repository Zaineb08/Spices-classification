import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sparkles } from "lucide-react";

interface SampleImage {
  url: string;
  name: string;
  expectedSpice: string;
}

const SAMPLE_IMAGES: SampleImage[] = [
  {
    url: "/samples/safran.jpg",
    name: "Safran",
    expectedSpice: "safran",
  },
  {
    url: "/samples/cumin.jpg",
    name: "Cumin",
    expectedSpice: "cumin",
  },
  {
    url: "/samples/cannelle.jpg",
    name: "Cinnamon",
    expectedSpice: "cannelle",
  },
  {
    url: "/samples/curcuma.jpg",
    name: "Turmeric",
    expectedSpice: "curcuma",
  },
  {
    url: "/samples/paprika.webp",
    name: "Paprika",
    expectedSpice: "paprika",
  },
  {
    url: "/samples/gingembre.webp",
    name: "Ginger",
    expectedSpice: "gingembre",
  },
];

interface SampleImagesProps {
  onSampleSelect: (imageUrl: string) => void;
}

export function SampleImages({ onSampleSelect }: SampleImagesProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="flex items-center justify-center gap-2 mb-2 text-[var(--moroccan-red)]">
          <Sparkles className="w-5 h-5" />
          Try with Sample Images
        </h3>
        <p className="text-sm text-[var(--muted-foreground)]">
          Click any image below to see instant classification results
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {SAMPLE_IMAGES.map((sample) => (
          <button
            key={sample.expectedSpice}
            onClick={() => onSampleSelect(sample.url)}
            className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-[var(--moroccan-green)] focus:outline-none focus:ring-2 focus:ring-[var(--moroccan-green)] focus:ring-offset-2"
          >
            <div className="aspect-square">
              <ImageWithFallback
                src={sample.url}
                alt={sample.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-sm font-medium transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              {sample.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
