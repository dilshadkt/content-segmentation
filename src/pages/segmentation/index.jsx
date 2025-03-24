import React, { useState, useEffect } from "react";
import { getSegmentationReport } from "../../api/hook";

const Segmentation = () => {
  const { data, isLoading } = getSegmentationReport();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showInfoPopup, setShowInfoPopup] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setFilteredData(data);
    }
  }, [data]);

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (customer) =>
          customer.CustomerName.toLowerCase().includes(term) ||
          customer.Recency.toString().includes(term) ||
          customer.Frequency.toString().includes(term) ||
          customer.Monetary.toString().includes(term)
      );
      setFilteredData(filtered);
    }
  };

  // Helper function to show column information
  const toggleInfoPopup = (column) => {
    if (showInfoPopup === column) {
      setShowInfoPopup(null);
    } else {
      setShowInfoPopup(column);
    }
  };

  // Column descriptions based on the RFM analysis
  const columnDescriptions = {
    Recency: {
      title: "Recency (R)",
      description:
        "How recently a customer made a purchase. Measured in days since last transaction. Lower values are better — recent customers are more engaged and likely to buy again.",
    },
    Frequency: {
      title: "Frequency (F)",
      description:
        "How often a customer makes purchases. Counts the total number of unique transactions. Higher values are better — frequent buyers are more loyal.",
    },
    Monetary: {
      title: "Monetary (M)",
      description:
        "How much money a customer has spent. Totals all purchases made by the customer. Higher values are better — high spenders are more valuable to the business.",
    },
  };

  if (isLoading) {
    return (
      <section className="w-full font-radio gap-y-3 flexCenter flex-col h-full overflow-y-auto">
        <p>Processing.....</p>
      </section>
    );
  }

  return (
    <section className="w-full font-radio gap-y-3 flex flex-col h-full overflow-y-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Customer Segmentation Report</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-3 pr-10 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilteredData(data);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded mb-4">
        <h3 className="text-gray-300 font-semibold mb-2">
          RFM Analysis Explanation
        </h3>
        <p className="text-gray-400 text-sm mb-2">
          RFM analysis is a customer segmentation technique that uses three
          metrics to categorize customers:
        </p>
        <ul className="text-gray-400 text-sm list-disc pl-5 space-y-1">
          <li>
            <span className="font-semibold">Recency (R):</span> Days since last
            purchase. Lower values = more recent activity.
          </li>
          <li>
            <span className="font-semibold">Frequency (F):</span> Number of
            purchases. Higher values = more loyal customers.
          </li>
          <li>
            <span className="font-semibold">Monetary (M):</span> Total spending
            amount. Higher values = more valuable customers.
          </li>
        </ul>
      </div>

      {data && data.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-800">
              <thead className="sticky top-0">
                <tr className="bg-black">
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-300 uppercase tracking-wider relative">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => toggleInfoPopup("Recency")}
                    >
                      Recency (Days)
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    {showInfoPopup === "Recency" && (
                      <div className="absolute top-full left-0 mt-1 p-3 bg-gray-700 rounded shadow-lg z-10 w-64">
                        <p className="text-xs text-gray-300">
                          {columnDescriptions.Recency.description}
                        </p>
                      </div>
                    )}
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-300 uppercase tracking-wider relative">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => toggleInfoPopup("Frequency")}
                    >
                      Frequency
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    {showInfoPopup === "Frequency" && (
                      <div className="absolute top-full left-0 mt-1 p-3 bg-gray-700 rounded shadow-lg z-10 w-64">
                        <p className="text-xs text-gray-300">
                          {columnDescriptions.Frequency.description}
                        </p>
                      </div>
                    )}
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-300 uppercase tracking-wider relative">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => toggleInfoPopup("Monetary")}
                    >
                      Monetary
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    {showInfoPopup === "Monetary" && (
                      <div className="absolute top-full left-0 mt-1 p-3 bg-gray-700 rounded shadow-lg z-10 w-64">
                        <p className="text-xs text-gray-300">
                          {columnDescriptions.Monetary.description}
                        </p>
                      </div>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {filteredData.map((customer, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {customer.CustomerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {customer.Recency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {customer.Frequency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {typeof customer.Monetary === "number"
                        ? customer.Monetary.toFixed(2)
                        : customer.Monetary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredData.length === 0 && (
            <p className="text-gray-400 mt-4">No matching results found.</p>
          )}
        </>
      ) : (
        <p className="text-gray-400">No segmentation data available.</p>
      )}
    </section>
  );
};

export default Segmentation;
