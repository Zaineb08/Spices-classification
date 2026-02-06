import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MoroccanPattern } from "./components/MoroccanPattern";
import { UploadZone } from "./components/UploadZone";
import { LoadingState } from "./components/LoadingState";
import { ResultsSection } from "./components/ResultsSection";
import { EmptyState } from "./components/EmptyState";
import { SpicesGrid } from "./components/SpicesGrid";
import { ModelInfo } from "./components/ModelInfo";
import { SampleImages } from "./components/SampleImages";
import { SpiceInfoModal } from "./components/SpiceInfoModal";
import { ClassificationHistory } from "./components/ClassificationHistory";
import { ShareButton } from "./components/ShareButton";
import { Sparkles } from "lucide-react";
import {
  saveClassification,
  fileToBase64,
  type ClassificationHistoryItem,
} from "../utils/localStorage";
import { uploadImage } from "./services/api";

type AppState = "idle" | "loading" | "results" | "error";

interface Prediction {
  spice: string;
  confidence: number;
}

export default function App() {
  const { t, i18n } = useTranslation();
  const [appState, setAppState] = useState<AppState>("idle");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [selectedSpiceId, setSelectedSpiceId] = useState<string | null>(null);
  const [isSpiceModalOpen, setIsSpiceModalOpen] = useState(false);
  const [historyKey, setHistoryKey] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleImageSelect = async (file: File) => {
    // Create preview URL
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setAppState("loading");
    setErrorMessage("");

    try {
      // Call Flask API
      const result = await uploadImage(file);

      if (result.success && result.top_3_predictions) {
        const newPredictions: Prediction[] = result.top_3_predictions.map(
          (pred) => ({
            spice: pred.class,
            confidence: pred.probability / 100,
          }),
        );

        setPredictions(newPredictions);
        setAppState("results");

        // Convert image to base64 for persistent storage
        const base64Image = await fileToBase64(file);

        // Save to history
        saveClassification({
          imageUrl: base64Image,
          topPrediction: newPredictions[0],
          allPredictions: newPredictions,
        });
        setHistoryKey((prev) => prev + 1);
      } else {
        setErrorMessage(result.error || t("errors.modelError"));
        setAppState("error");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : t("errors.connectionError"),
      );
      setAppState("error");
    }
  };

  const handleSampleSelect = async (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setAppState("loading");
    setErrorMessage("");

    try {
      // Fetch image and send to API for real prediction
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const file = new File([blob], "sample.jpg", {
        type: blob.type || "image/jpeg",
      });

      const result = await uploadImage(file);

      if (result.success && result.top_3_predictions) {
        const newPredictions: Prediction[] = result.top_3_predictions.map(
          (pred) => ({
            spice: pred.class,
            confidence: pred.probability / 100,
          }),
        );

        setPredictions(newPredictions);
        setAppState("results");

        // Convert image to base64 for persistent storage
        const base64Image = await fileToBase64(file);

        saveClassification({
          imageUrl: base64Image,
          topPrediction: newPredictions[0],
          allPredictions: newPredictions,
        });
        setHistoryKey((prev) => prev + 1);
      } else {
        setErrorMessage(result.error || t("errors.modelError"));
        setAppState("error");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : t("errors.connectionError"),
      );
      setAppState("error");
    }
  };

  const handleReset = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(null);
    setPredictions([]);
    setAppState("idle");
  };

  const handleSpiceClick = (spiceId: string) => {
    setSelectedSpiceId(spiceId);
    setIsSpiceModalOpen(true);
  };

  const handleHistoryItemClick = (item: ClassificationHistoryItem) => {
    setUploadedImage(item.imageUrl);
    setPredictions(item.allPredictions);
    setAppState("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatSpiceName = (name: string) => {
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <MoroccanPattern className="absolute inset-0 text-[var(--moroccan-deep-blue)]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Header */}
        <header className="bg-gradient-to-r from-[var(--moroccan-red)] to-[var(--moroccan-dark-red)] text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                Moroccan Spices Classifier
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Discover the rich heritage of Moroccan cuisine through
                AI-powered spice identification. Upload an image and let our
                advanced model reveal the essence of your spice.
              </p>
            </div>
          </div>

          {/* Decorative wave */}
          <div className="relative h-8 md:h-12">
            <svg
              className="absolute bottom-0 w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill="var(--background)"
            >
              <path d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z" />
            </svg>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12 space-y-16">
          {/* Upload Section */}
          <section className="max-w-4xl mx-auto">
            <UploadZone onImageSelect={handleImageSelect} />
          </section>

          {/* Sample Images */}
          {appState === "idle" && (
            <section className="max-w-6xl mx-auto">
              <SampleImages onSampleSelect={handleSampleSelect} />
            </section>
          )}

          {/* Classification History */}
          {appState === "idle" && (
            <section className="max-w-6xl mx-auto">
              <ClassificationHistory
                key={historyKey}
                onHistoryItemClick={handleHistoryItemClick}
              />
            </section>
          )}

          {/* Results Section */}
          <section className="max-w-6xl mx-auto">
            {appState === "idle" && <EmptyState />}
            {appState === "loading" && <LoadingState />}
            {appState === "results" && uploadedImage && (
              <div className="space-y-6">
                <ResultsSection
                  imageUrl={uploadedImage}
                  topPrediction={predictions[0]}
                  predictions={predictions}
                  onSpiceClick={handleSpiceClick}
                />
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 bg-[var(--moroccan-green)] text-white rounded-lg hover:bg-[var(--moroccan-dark-green)] transition-colors shadow-lg"
                  >
                    Classify Another Spice
                  </button>
                  <ShareButton
                    imageUrl={uploadedImage}
                    spiceName={formatSpiceName(predictions[0].spice)}
                    confidence={predictions[0].confidence}
                  />
                </div>
              </div>
            )}
          </section>

          {/* Spices Grid */}
          <section className="max-w-7xl mx-auto">
            <SpicesGrid onSpiceClick={handleSpiceClick} />
          </section>

          {/* Model Info */}
          <section className="max-w-6xl mx-auto">
            <ModelInfo />
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[var(--moroccan-red)] text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-white/60 mt-2">
              © 2026 Moroccan Spices Classifier
            </p>
          </div>
        </footer>
      </div>

      {/* Spice Info Modal */}
      <SpiceInfoModal
        spiceId={selectedSpiceId}
        isOpen={isSpiceModalOpen}
        onClose={() => setIsSpiceModalOpen(false)}
      />
    </div>
  );
}
