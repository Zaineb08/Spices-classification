import { CheckCircle2, TrendingUp, Info } from 'lucide-react';

interface Prediction {
  spice: string;
  confidence: number;
}

interface ResultsSectionProps {
  imageUrl: string;
  topPrediction: Prediction;
  predictions: Prediction[];
  onSpiceClick?: (spiceId: string) => void;
}

export function ResultsSection({ imageUrl, topPrediction, predictions, onSpiceClick }: ResultsSectionProps) {
  const formatSpiceName = (name: string) => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Preview Image */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-[var(--moroccan-red)]">
          <CheckCircle2 className="w-5 h-5" />
          Uploaded Image
        </h3>
        <div className="rounded-xl overflow-hidden shadow-lg border-2 border-[var(--moroccan-green)]">
          <img 
            src={imageUrl} 
            alt="Uploaded spice" 
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      {/* Predictions */}
      <div className="space-y-6">
        <div>
          <h3 className="flex items-center gap-2 text-[var(--moroccan-red)] mb-4">
            <TrendingUp className="w-5 h-5" />
            Prediction Results
          </h3>
          
          {/* Top Prediction */}
          <div className="bg-gradient-to-br from-[var(--moroccan-red)] to-[var(--moroccan-dark-red)] text-white p-6 rounded-xl shadow-lg mb-6">
            <p className="text-sm opacity-90 mb-2">Predicted Spice</p>
            <div className="flex items-center justify-between gap-3 mb-3">
              <h2>
                {formatSpiceName(topPrediction.spice)}
              </h2>
              {onSpiceClick && (
                <button
                  onClick={() => onSpiceClick(topPrediction.spice)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Learn more about this spice"
                >
                  <Info className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {/* Confidence Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Confidence</span>
                <span>{(topPrediction.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-white h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${topPrediction.confidence * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Predictions */}
        <div>
          <h4 className="mb-3 text-[var(--moroccan-red)]">Top 3 Predictions</h4>
          <div className="space-y-3">
            {predictions.map((prediction, index) => (
              <button
                key={prediction.spice}
                onClick={() => onSpiceClick?.(prediction.spice)}
                className="w-full flex items-center gap-3 p-4 bg-white rounded-lg border border-[var(--border)] hover:border-[var(--moroccan-green)] transition-colors text-left group"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--moroccan-beige)] flex items-center justify-center">
                  <span className="text-sm text-[var(--moroccan-red)]">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm mb-1">{formatSpiceName(prediction.spice)}</p>
                  <div className="w-full bg-[var(--moroccan-beige)] rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-[var(--moroccan-green)] h-full rounded-full transition-all duration-700"
                      style={{ width: `${prediction.confidence * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm text-[var(--muted-foreground)]">
                  {(prediction.confidence * 100).toFixed(1)}%
                </span>
                <Info className="w-4 h-4 text-[var(--moroccan-green)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}