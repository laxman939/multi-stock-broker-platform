import { useEffect, useState } from "react";
import mockApiService from "../APIs/mockAPIService";
import { TrendingDown, TrendingUp } from "lucide-react";

const Holdings = ({ onStockSelect, onStocksLoaded }) => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await mockApiService.getHoldings();
        setHoldings(response.data);
        onStocksLoaded && onStocksLoaded(response.data);
      } catch (error) {
        console.error("Error fetching holdings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, [onStocksLoaded]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const totalPnl = holdings.reduce((sum, holding) => sum + holding.pnl, 0);

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Portfolio Overview
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total P&L</p>
            <p
              className={`text-2xl font-bold ${
                totalPnl >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              ₹{totalPnl.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Holdings</p>
            <p className="text-2xl font-bold text-gray-800">
              {holdings.length}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {holdings.map((holding) => (
          <div
            key={holding.symbol}
            onClick={() => onStockSelect(holding)}
            className="bg-white rounded-xl shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-800">
                  {holding.symbol}
                </h3>
                <p className="text-sm text-gray-600">{holding.name}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ₹{holding.currentPrice.toFixed(2)}
                </p>
                <div
                  className={`flex items-center text-sm ${
                    holding.pnl >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {holding.pnl >= 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {holding.pnlPercent.toFixed(2)}%
                </div>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Qty: {holding.quantity}</span>
              <span>Avg: ₹{holding.avgPrice.toFixed(2)}</span>
              <span
                className={holding.pnl >= 0 ? "text-green-600" : "text-red-600"}
              >
                ₹{holding.pnl.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Holdings;
