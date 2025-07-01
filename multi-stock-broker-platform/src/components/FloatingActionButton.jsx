import { Plus, TrendingDown, TrendingUp, X } from "lucide-react";
import { useState } from "react";

const FloatingActionButton = ({ onBuyClick, onSellClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth - 80,
    y: window.innerHeight - 150,
  });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (e) => {
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 60, e.clientX - offsetX)),
        y: Math.max(0, Math.min(window.innerHeight - 60, e.clientY - offsetY)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleClick = () => {
    if (!isDragging) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="fixed z-40" style={{ left: position.x, top: position.y }}>
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-2">
          <button
            onClick={() => {
              onBuyClick();
              setIsExpanded(false);
            }}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition-colors"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Buy
          </button>
          <button
            onClick={() => {
              onSellClick();
              setIsExpanded(false);
            }}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
          >
            <TrendingDown className="w-4 h-4 mr-2" />
            Sell
          </button>
        </div>
      )}

      <button
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        className="w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center cursor-move"
      >
        {isExpanded ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default FloatingActionButton;
