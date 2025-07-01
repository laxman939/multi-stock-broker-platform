import { ChevronDown } from "lucide-react";

const BrokerSelection = ({ onBrokerSelect }) => {
  const brokers = [
    { id: "zerodha", name: "Zerodha", logo: "🟢" },
    { id: "upstox", name: "Upstox", logo: "🟠" },
    { id: "angelone", name: "Angel One", logo: "🔵" },
    { id: "groww", name: "Groww", logo: "🟣" },
    { id: "icici", name: "ICICI Direct", logo: "🔴" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Choose Your Broker
          </h1>
          <p className="text-gray-600">Select a broker to start trading</p>
        </div>

        <div className="space-y-3">
          {brokers.map((broker) => (
            <button
              key={broker.id}
              onClick={() => onBrokerSelect(broker)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center space-x-4"
            >
              <span className="text-2xl">{broker.logo}</span>
              <span className="font-semibold text-gray-700">{broker.name}</span>
              <ChevronDown className="ml-auto w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrokerSelection;
