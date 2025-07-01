import { useEffect, useState } from "react";
import mockApiService from "../APIs/mockAPIService";
import { TrendingDown, TrendingUp } from "lucide-react";

const Positions = ({ onStockSelect, onStocksLoaded }) => {
  const [positionData, setPositionData] = useState({
    positions: [],
    totalPnl: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await mockApiService.getPositions();
        setPositionData(response.data);
        // Extract stocks from positions for FAB functionality
        const stocks = response.data.positions.map((position) => ({
          symbol: position.symbol,
          currentPrice: position.currentPrice,
        }));
        onStocksLoaded && onStocksLoaded(stocks);
      } catch (error) {
        console.error("Error fetching positions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, [onStocksLoaded]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Positions P&L</h2>
        <p
          className={`text-3xl font-bold ${
            positionData.totalPnl >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ₹{positionData.totalPnl.toFixed(2)}
        </p>
      </div>

      <div className="space-y-3">
        {positionData.positions.map((position, index) => (
          <div
            key={index}
            onClick={() =>
              onStockSelect({
                symbol: position.symbol,
                currentPrice: position.currentPrice,
              })
            }
            className="bg-white rounded-xl shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-800">
                  {position.symbol}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    position.type === "LONG"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {position.type}
                </span>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ₹{position.currentPrice.toFixed(2)}
                </p>
                <div
                  className={`flex items-center text-sm ${
                    position.pnl >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {position.pnl >= 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {position.pnlPercent.toFixed(2)}%
                </div>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Qty: {position.quantity}</span>
              <span>Entry: ₹{position.entryPrice.toFixed(2)}</span>
              <span
                className={
                  position.pnl >= 0 ? "text-green-600" : "text-red-600"
                }
              >
                ₹{position.pnl.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Positions;
