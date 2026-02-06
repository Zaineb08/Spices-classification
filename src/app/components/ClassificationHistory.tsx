import { History, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import {
  getClassificationHistory,
  clearClassificationHistory,
  deleteHistoryItem,
  formatTimestamp,
  type ClassificationHistoryItem,
} from "../../utils/localStorage";

interface ClassificationHistoryProps {
  onHistoryItemClick?: (item: ClassificationHistoryItem) => void;
}

export function ClassificationHistory({
  onHistoryItemClick,
}: ClassificationHistoryProps) {
  const [history, setHistory] = useState<ClassificationHistoryItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    setHistory(getClassificationHistory());
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      clearClassificationHistory();
      setHistory([]);
    }
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteHistoryItem(id);
    loadHistory();
  };

  const formatSpiceName = (name: string) => {
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-[var(--border)] overflow-hidden">
      {/* Header */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
        className="w-full flex items-center justify-between p-4 hover:bg-[var(--moroccan-beige)] transition-colors"
      >
        <div className="flex items-center gap-2 text-[var(--moroccan-red)]">
          <History className="w-5 h-5" />
          <h3>Recent Classifications</h3>
          <span className="px-2 py-1 bg-[var(--moroccan-beige)] rounded-full text-xs text-[var(--muted-foreground)]">
            {history.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClearAll();
            }}
            className="px-3 py-1 text-xs text-[var(--moroccan-red)] hover:bg-[var(--moroccan-beige)] rounded transition-colors"
          >
            Clear All
          </button>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-[var(--muted-foreground)]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[var(--muted-foreground)]" />
          )}
        </div>
      </div>

      {/* History Items */}
      {isExpanded && (
        <div className="border-t border-[var(--border)]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-4">
            {history.map((item) => (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => onHistoryItemClick?.(item)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onHistoryItemClick?.(item);
                  }
                }}
                className="group relative bg-[var(--moroccan-beige)] rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[var(--moroccan-green)] focus:ring-offset-2"
              >
                {/* Image */}
                <div className="aspect-square relative">
                  <img
                    src={item.imageUrl}
                    alt={`${formatSpiceName(item.topPrediction.spice)} classification`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Delete button */}
                  <button
                    onClick={(e) => handleDeleteItem(item.id, e)}
                    className="absolute top-2 right-2 p-1.5 bg-[var(--moroccan-red)] text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-[var(--moroccan-dark-red)] transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-2 space-y-1">
                  <p className="text-xs font-medium text-[var(--foreground)] truncate">
                    {formatSpiceName(item.topPrediction.spice)}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--moroccan-green)]">
                      {(item.topPrediction.confidence * 100).toFixed(0)}%
                    </span>
                    <span className="text-[var(--muted-foreground)]">
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
