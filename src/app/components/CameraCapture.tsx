import { useEffect, useRef, useState } from "react";
import { Camera, X, FlipHorizontal } from "lucide-react";

interface CameraCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

export function CameraCapture({
  isOpen,
  onClose,
  onCapture,
}: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>("");
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment",
  );

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    try {
      setError("");
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0);

    // Convert canvas to blob and create file
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `camera-capture-${Date.now()}.jpg`, {
            type: "image/jpeg",
          });
          onCapture(file);
          onClose();
        }
      },
      "image/jpeg",
      0.95,
    );
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[var(--moroccan-red)] to-[var(--moroccan-dark-red)] text-white">
          <h3 className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Capture Spice Image
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            title="Close camera capture"
            aria-label="Close camera capture"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera View */}
        <div className="relative bg-black aspect-video">
          {error ? (
            <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8">
              <div>
                <p className="mb-4">{error}</p>
                <button
                  onClick={startCamera}
                  className="px-4 py-2 bg-[var(--moroccan-red)] rounded-lg hover:bg-[var(--moroccan-dark-red)] transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Camera controls overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={toggleCamera}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    title="Flip camera"
                  >
                    <FlipHorizontal className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={handleCapture}
                    className="w-16 h-16 bg-[var(--moroccan-red)] rounded-full hover:bg-[var(--moroccan-dark-red)] transition-all hover:scale-110 shadow-lg border-4 border-white"
                    title="Capture photo"
                  >
                    <Camera className="w-8 h-8 text-white mx-auto" />
                  </button>
                  <div className="w-12" /> {/* Spacer for symmetry */}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Instructions */}
        <div className="p-4 bg-[var(--moroccan-beige)] text-sm text-center">
          <p className="text-[var(--muted-foreground)]">
            Position the spice in the frame and tap the capture button
          </p>
        </div>
      </div>
    </div>
  );
}
