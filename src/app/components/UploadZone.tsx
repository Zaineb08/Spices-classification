import {
  Upload,
  Image as ImageIcon,
  Camera,
  AlertCircle,
  CheckCircle2,
  Info,
} from "lucide-react";
import { useState, useCallback, useRef } from "react";
import { CameraCapture } from "./CameraCapture";
import {
  validateImage,
  type ImageValidationResult,
} from "../../utils/imageValidation";

interface UploadZoneProps {
  onImageSelect: (file: File) => void;
}

export function UploadZone({ onImageSelect }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [validation, setValidation] = useState<ImageValidationResult | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.startsWith("image/")) {
      await processFile(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0]) {
        await processFile(files[0]);
      }
    },
    [],
  );

  const processFile = async (file: File) => {
    const validationResult = await validateImage(file);
    setValidation(validationResult);

    if (validationResult.isValid) {
      onImageSelect(file);
    }
  };

  const handleBrowseClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleCameraCapture = async (file: File) => {
    await processFile(file);
  };

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
          ${
            isDragging
              ? "border-[var(--moroccan-green)] bg-[var(--moroccan-beige)]"
              : "border-[var(--moroccan-sand)] bg-white hover:border-[var(--moroccan-green)] hover:bg-[var(--moroccan-beige)]"
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          title="Upload spice image file"
          aria-label="Upload spice image file"
        />

        <div className="flex flex-col items-center gap-4">
          <div
            className={`
            w-20 h-20 rounded-full flex items-center justify-center transition-colors
            ${isDragging ? "bg-[var(--moroccan-green)]" : "bg-[var(--moroccan-beige)]"}
          `}
          >
            {isDragging ? (
              <ImageIcon className="w-10 h-10 text-white" />
            ) : (
              <Upload className="w-10 h-10 text-[var(--moroccan-red)]" />
            )}
          </div>

          <div>
            <h3 className="mb-2 text-[var(--moroccan-red)]">
              {isDragging ? "Drop your image here" : "Upload Spice Image"}
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              Drag and drop an image or use the buttons below
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleBrowseClick}
                className="px-6 py-2.5 bg-[var(--moroccan-red)] text-white rounded-lg hover:bg-[var(--moroccan-dark-red)] transition-colors shadow-md"
              >
                Browse Files
              </button>

              <button
                onClick={() => setIsCameraOpen(true)}
                className="px-6 py-2.5 bg-[var(--moroccan-green)] text-white rounded-lg hover:bg-[var(--moroccan-dark-green)] transition-colors shadow-md flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Take Photo
              </button>
            </div>
          </div>

          <p className="text-xs text-[var(--muted-foreground)]">
            Supports JPG, PNG, WebP (max 10MB)
          </p>

          {/* Validation Feedback */}
          {validation && (
            <div className="mt-4 p-4 bg-[var(--moroccan-beige)] rounded-lg text-left w-full max-w-md space-y-2">
              {validation.errors.length > 0 && (
                <div className="space-y-1">
                  {validation.errors.map((error, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-sm text-[var(--moroccan-red)]"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  ))}
                </div>
              )}

              {validation.warnings.length > 0 && (
                <div className="space-y-1">
                  {validation.warnings.map((warning, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-sm text-[var(--moroccan-gold)]"
                    >
                      <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{warning}</span>
                    </div>
                  ))}
                </div>
              )}

              {validation.suggestions.length > 0 && (
                <div className="space-y-1">
                  {validation.suggestions.map((suggestion, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-sm text-[var(--moroccan-green)]"
                    >
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <CameraCapture
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />
    </>
  );
}
