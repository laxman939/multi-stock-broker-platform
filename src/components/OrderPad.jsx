import { X } from "lucide-react";
import { useState } from "react";

const OrderPad = ({ stock, orderType, onClose, onSubmit }) => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(stock?.currentPrice || 0);
  const [orderMode, setOrderMode] = useState("MARKET");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      symbol: stock.symbol,
      type: orderType,
      quantity,
      price: orderMode === "MARKET" ? stock.currentPrice : price,
      orderMode,
    });
    onClose();
  };

  const bgColor = orderType === "BUY" ? "bg-green-500" : "bg-red-500";
  const textColor = "text-white";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div
          className={`${bgColor} ${textColor} p-6 rounded-t-2xl flex justify-between items-center`}
        >
          <h2 className="text-xl font-bold">
            {orderType} {stock?.symbol}
          </h2>
          <button
            onClick={onClose}
            className="hover:bg-white hover:bg-opacity-20 p-1 rounded"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock
            </label>
            <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
              <>
                <div className="font-semibold">{stock?.symbol}</div>
                <div className="text-sm text-gray-600">{stock?.name}</div>
              </>
              <div className="text-lg font-bold">
                ₹{stock?.currentPrice?.toFixed(2)}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order Type
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setOrderMode("MARKET")}
                className={`flex-1 p-2 rounded-lg border ${
                  orderMode === "MARKET"
                    ? "bg-blue-500 text-white"
                    : "border-gray-300"
                }`}
              >
                Market
              </button>
              <button
                type="button"
                onClick={() => setOrderMode("LIMIT")}
                className={`flex-1 p-2 rounded-lg border ${
                  orderMode === "LIMIT"
                    ? "bg-blue-500 text-white"
                    : "border-gray-300"
                }`}
              >
                Limit
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="1"
              required
            />
          </div>

          {orderMode === "LIMIT" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                step="0.01"
                required
              />
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>Total Value:</span>
              <span className="font-semibold">
                ₹
                {(
                  (orderMode === "MARKET" ? stock?.currentPrice : price) *
                  quantity
                ).toFixed(2)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full ${bgColor} ${textColor} py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
          >
            Place {orderType} Order
          </button>
        </form>
      </div>
    </div>
  );
};
export default OrderPad;
