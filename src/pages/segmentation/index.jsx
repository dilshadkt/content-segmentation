import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL =
  "https://forzareport-gpbhfsbshdfvhuh8.eastus-01.azurewebsites.net/api";

const Segmentation = () => {
  const [segmentationData, setSegmentationData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showInfoPopup, setShowInfoPopup] = useState(null);

  // Fetch segmentation summary data
  useEffect(() => {
    const fetchSegmentationData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BASE_URL}/customer-segmentation`);
        if (response.data.isSucess) {
          setSegmentationData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching segmentation data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSegmentationData();
  }, []);

  // Handle category selection and fetch filtered data
  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL}/customer-segmentation-filter`,
        {
          headers: {
            filterText: category,
          },
        }
      );

      if (response.data.isSucess) {
        setCustomerData(response.data.data);
        setFilteredData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error);
      setCustomerData([]);
      setFilteredData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredData(customerData);
    } else {
      const filtered = customerData.filter(
        (customer) =>
          customer.CustomerName?.toLowerCase().includes(term) ||
          (customer.Recency?.toString() || "").includes(term) ||
          (customer.Frequency?.toString() || "").includes(term) ||
          (customer.Monetary?.toString() || "").includes(term)
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

  // Card color styles based on category
  const getCategoryColor = (category) => {
    switch (category) {
      case "High Spender":
        return "bg-green-700 hover:bg-green-600";
      case "Upper Mid":
        return "bg-blue-700 hover:bg-blue-600";
      case "Moderate":
        return "bg-yellow-700 hover:bg-yellow-600";
      case "Low Spender":
        return "bg-orange-700 hover:bg-orange-600";
      case "Very Low":
        return "bg-red-700 hover:bg-red-600";
      default:
        return "bg-gray-700 hover:bg-gray-600";
    }
  };

  if (isLoading && !segmentationData.length) {
    return (
      <section className="w-full h-screen font-radio flexCenter flex-col overflow-hidden">
        <p className="text-gray-300">Loading segmentation data...</p>
      </section>
    );
  }

  return (
    <section className="w-full h-screen flex flex-col font-radio overflow-hidden">
      {/* Main scrollable container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">
            Customer Segmentation Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {segmentationData.map((segment, index) => (
              <div
                key={index}
                className={`${getCategoryColor(
                  segment.MonetaryCategory
                )} p-4 rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                  selectedCategory === segment.MonetaryCategory
                    ? "ring-2 ring-white"
                    : ""
                }`}
                onClick={() => handleCategorySelect(segment.MonetaryCategory)}
              >
                <h3 className="text-lg font-semibold text-white">
                  {segment.MonetaryCategory}
                </h3>
                <p className="text-2xl font-bold text-white mt-2">
                  {segment.TotalCustomers}
                </p>
                <p className="text-sm text-gray-200 mt-1">customers</p>
              </div>
            ))}
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
              <span className="font-semibold">Recency (R):</span> Days since
              last purchase. Lower values = more recent activity.
            </li>
            <li>
              <span className="font-semibold">Frequency (F):</span> Number of
              purchases. Higher values = more loyal customers.
            </li>
            <li>
              <span className="font-semibold">Monetary (M):</span> Total
              spending amount. Higher values = more valuable customers.
            </li>
          </ul>
        </div>

        {selectedCategory ? (
          <>
            <div className="flex justify-between items-center mb-4 sticky top-0 z-10 bg-black bg-opacity-90 py-2">
              <h2 className="text-xl font-bold">
                {selectedCategory} Segment Customers
              </h2>
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
                      setFilteredData(customerData);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-300">Loading customer data...</p>
              </div>
            ) : customerData.length > 0 ? (
              <div className="overflow-auto rounded border border-gray-800">
                <table className="min-w-full divide-y divide-gray-600">
                  <thead className="bg-black sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Customer Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider relative">
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() => toggleInfoPopup("Recency")}
                        >
                          {/* Recency (Days) */}
                          {/* <svg
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
                          </svg> */}
                        </div>
                        {showInfoPopup === "Recency" && (
                          <div className="absolute top-full left-0 mt-1 p-3 bg-gray-700 rounded shadow-lg z-20 w-64">
                            <p className="text-xs text-gray-300">
                              {columnDescriptions.Recency.description}
                            </p>
                          </div>
                        )}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider relative">
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() => toggleInfoPopup("Frequency")}
                        >
                          {/* Frequency */}
                          {/* <svg
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
                          </svg> */}
                        </div>
                        {showInfoPopup === "Frequency" && (
                          <div className="absolute top-full left-0 mt-1 p-3 bg-gray-700 rounded shadow-lg z-20 w-64">
                            <p className="text-xs text-gray-300">
                              {columnDescriptions.Frequency.description}
                            </p>
                          </div>
                        )}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider relative">
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
                          <div className="absolute top-full left-0 mt-1 p-3 bg-gray-700 rounded shadow-lg z-20 w-64">
                            <p className="text-xs text-gray-300">
                              {columnDescriptions.Monetary.description}
                            </p>
                          </div>
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900 divide-y divide-gray-600">
                    {filteredData.map((customer, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                        }
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
                {filteredData.length === 0 && (
                  <div className="text-center py-8 bg-gray-900">
                    <p className="text-gray-400">No matching results found.</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-400 py-8 text-center">
                No customer data available for this segment.
              </p>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-gray-300">
            <p>Select a segment category from above to view customer details</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Segmentation;
