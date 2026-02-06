import { Share2, Download, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { shareResults, downloadResultImage, copyToClipboard, canUseWebShare } from '../../utils/shareUtils';

interface ShareButtonProps {
  imageUrl: string;
  spiceName: string;
  confidence: number;
  resultElementId?: string;
}

export function ShareButton({ imageUrl, spiceName, confidence, resultElementId }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    await shareResults(imageUrl, spiceName, confidence);
    setShowMenu(false);
  };

  const handleDownload = async () => {
    if (resultElementId) {
      await downloadResultImage(resultElementId, spiceName);
    }
    setShowMenu(false);
  };

  const handleCopy = async () => {
    const text = `I just identified ${spiceName} with ${(confidence * 100).toFixed(1)}% confidence using the Moroccan Spices Classifier! 🌶️✨\n\n${window.location.href}`;
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShowMenu(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--moroccan-red)] to-[var(--moroccan-dark-red)] text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
      >
        <Share2 className="w-4 h-4" />
        Share Result
      </button>

      {showMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-[var(--border)] overflow-hidden z-50">
            {canUseWebShare() && (
              <button
                onClick={handleShare}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--moroccan-beige)] transition-colors text-left"
              >
                <Share2 className="w-4 h-4 text-[var(--moroccan-green)]" />
                <div>
                  <p className="text-sm font-medium">Share</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Share via apps</p>
                </div>
              </button>
            )}

            <button
              onClick={handleCopy}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--moroccan-beige)] transition-colors text-left"
            >
              {copied ? (
                <Check className="w-4 h-4 text-[var(--moroccan-green)]" />
              ) : (
                <Copy className="w-4 h-4 text-[var(--moroccan-green)]" />
              )}
              <div>
                <p className="text-sm font-medium">
                  {copied ? 'Copied!' : 'Copy Link'}
                </p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {copied ? 'Text copied to clipboard' : 'Copy to clipboard'}
                </p>
              </div>
            </button>

            {resultElementId && (
              <button
                onClick={handleDownload}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--moroccan-beige)] transition-colors text-left border-t border-[var(--border)]"
              >
                <Download className="w-4 h-4 text-[var(--moroccan-green)]" />
                <div>
                  <p className="text-sm font-medium">Download Image</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Save as PNG</p>
                </div>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
