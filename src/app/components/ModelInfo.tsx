import { Brain, Target, Layers } from 'lucide-react';

export function ModelInfo() {
  return (
    <div className="bg-gradient-to-br from-[var(--moroccan-red)] to-[var(--moroccan-dark-red)] text-white rounded-2xl p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
          <Brain className="w-6 h-6" />
        </div>
        <h2>Model Information</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center gap-2 mb-3 text-[var(--moroccan-gold)]">
            <Layers className="w-5 h-5" />
            <h4>Architecture</h4>
          </div>
          <p className="text-2xl mb-1">EfficientNet-B3</p>
          <p className="text-sm text-white/70">
            State-of-the-art CNN for image classification
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center gap-2 mb-3 text-[var(--moroccan-gold)]">
            <Target className="w-5 h-5" />
            <h4>Test Accuracy</h4>
          </div>
          <p className="text-2xl mb-1">98.79%</p>
          <p className="text-sm text-white/70">
            Validated on holdout test set
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center gap-2 mb-3 text-[var(--moroccan-gold)]">
            <Brain className="w-5 h-5" />
            <h4>Parameters</h4>
          </div>
          <p className="text-2xl mb-1">10.71M</p>
          <p className="text-sm text-white/70">
            Optimized for performance
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
        <p className="text-sm text-white/80">
          This deep learning model has been trained on thousands of images to accurately identify and classify Moroccan spices with high precision.
        </p>
      </div>
    </div>
  );
}