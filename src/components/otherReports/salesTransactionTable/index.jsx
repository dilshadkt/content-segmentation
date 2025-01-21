import React from "react";

const SalesTransactionTable = ({ invoiceData }) => {
  return (
    <div className=" min-h-[70vh] rounded-lg shadow-md overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className=" bg-[#232323] sticky top-0 text-[#FFFFFF]">
          <tr>
            <th className="p-4 whitespace-nowrap">S No</th>
            <th className="p-4 whitespace-nowrap">Date</th>
            <th className="p-4 whitespace-nowrap">Time</th>
            <th className="p-4 whitespace-nowrap">Invoice No</th>
            <th className="p-4 whitespace-nowrap">Customer Name</th>
            <th className="p-4 whitespace-nowrap">Payment Mode</th>
            <th className="p-4 whitespace-nowrap">Amount</th>
            <th className="p-4">VAT</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.map((row) => (
            <tr key={row.id} className="border-t hover:bg-gray-900">
              <td className="p-4">{row.id}</td>
              <td className="p-4 whitespace-nowrap">{row.date}</td>
              <td className="p-4 whitespace-nowrap">{row.time}</td>
              <td className="p- whitespace-nowrap">{row.invoiceNo}</td>
              <td className="p-4 whitespace-nowrap">{row.customerName}</td>
              <td className="p-4 whitespace-nowrap capitalize">
                {row.paymentMode}
              </td>
              <td className="p-4 whitespace-nowrap">
                {row.amount.toLocaleString()}
              </td>
              <td className="p-4 whitespace-nowrap">{row.vat.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTransactionTable;
