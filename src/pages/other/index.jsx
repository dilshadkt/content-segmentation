import React, { useEffect, useRef, useState } from "react";
import { VscArrowDown } from "react-icons/vsc";
import { IoMdMore } from "react-icons/io";

const invoiceData = [
  {
    id: 1,
    date: "09/08/2024",
    time: "10:00 AM",
    invoiceNo: "2324221131",
    customerName: "Thomas",
    paymentMode: "cash",
    amount: 300000,
    vat: 20.0,
  },
  {
    id: 2,
    date: "09/09/2024",
    time: "11:00 AM",
    invoiceNo: "2324221132",
    customerName: "Jane",
    paymentMode: "credit card",
    amount: 250000,
    vat: 25.0,
  },
  {
    id: 3,
    date: "09/10/2024",
    time: "12:00 PM",
    invoiceNo: "2324221133",
    customerName: "Michael",
    paymentMode: "debit card",
    amount: 400000,
    vat: 30.0,
  },
  {
    id: 4,
    date: "09/11/2024",
    time: "01:00 PM",
    invoiceNo: "2324221134",
    customerName: "Emily",
    paymentMode: "cash",
    amount: 150000,
    vat: 15.0,
  },
  {
    id: 5,
    date: "09/12/2024",
    time: "02:00 PM",
    invoiceNo: "2324221135",
    customerName: "Jacob",
    paymentMode: "credit card",
    amount: 350000,
    vat: 35.0,
  },
  {
    id: 6,
    date: "09/13/2024",
    time: "03:00 PM",
    invoiceNo: "2324221136",
    customerName: "Olivia",
    paymentMode: "debit card",
    amount: 500000,
    vat: 40.0,
  },
  {
    id: 7,
    date: "09/14/2024",
    time: "04:00 PM",
    invoiceNo: "2324221137",
    customerName: "William",
    paymentMode: "cash",
    amount: 200000,
    vat: 20.0,
  },
  {
    id: 8,
    date: "09/15/2024",
    time: "05:00 PM",
    invoiceNo: "2324221138",
    customerName: "Sophia",
    paymentMode: "credit card",
    amount: 450000,
    vat: 45.0,
  },
  {
    id: 9,
    date: "09/16/2024",
    time: "06:00 PM",
    invoiceNo: "2324221139",
    customerName: "James",
    paymentMode: "debit card",
    amount: 600000,
    vat: 50.0,
  },
  {
    id: 10,
    date: "09/17/2024",
    time: "07:00 PM",
    invoiceNo: "2324221140",
    customerName: "Ava",
    paymentMode: "cash",
    amount: 250000,
    vat: 25.0,
  },
  {
    id: 11,
    date: "09/18/2024",
    time: "08:00 PM",
    invoiceNo: "2324221141",
    customerName: "Benjamin",
    paymentMode: "credit card",
    amount: 500000,
    vat: 50.0,
  },
  {
    id: 12,
    date: "09/19/2024",
    time: "09:00 PM",
    invoiceNo: "2324221142",
    customerName: "Isabella",
    paymentMode: "debit card",
    amount: 700000,
    vat: 55.0,
  },
];

const navigator = [
  { id: 1, title: "Sales", path: "/" },
  { id: 2, title: "Sales return", path: "/" },
  { id: 3, title: "Purchase", path: "/" },
  { id: 4, title: "Purchase return", path: "/" },
  { id: 5, title: "Accounts", path: "/" },
];

const OtherReport = () => {
  const [filterBy, setFilterBy] = useState(navigator[0].title);
  const [isFilterMenuOpen, setFilterMenu] = useState(false);
  const menuRef = useRef();

  const stats = [
    {
      label: "Total Sales",
      value: invoiceData
        .reduce((acc, curr) => acc + curr.amount, 0)
        .toLocaleString(),
    },
    {
      label: "Total VAT",
      value: invoiceData
        .reduce((acc, curr) => acc + curr.vat, 0)
        .toLocaleString(),
    },
    { label: "Total Invoices", value: invoiceData.length },
    {
      label: "Average Sale",
      value: (
        invoiceData.reduce((acc, curr) => acc + curr.amount, 0) /
        invoiceData.length
      ).toLocaleString(),
    },
  ];
  useEffect(() => {
    const handleClose = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setFilterMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, []);
  return (
    <section className="w-full h-full overflow-y-auto font-radio flex flex-col p-1 md:p-6 ">
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:flex flex-wrap gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="border-[#898384]/70 group hover:border-[#92A5B5] hover:shadow-lg
            hover:shadow-[#92A5B5]/20 cursor-pointer rounded-lg border
            flex items-center justify-center gap-x-2 md:flex-col gap-y-3 lg:w-[210px]
            h-[70px] sm:h-[120px] md:h-[120px] "
          >
            <span className=" text-xs md:text-sm text-gray-600 group-hover:text-gray-300">
              {stat.label}
            </span>
            <button className="text-[#898384] md:text-2xl font-light">
              <VscArrowDown />
            </button>
          </div>
        ))}
      </div>

      <div className="flexBetween  md:flexstart">
        <span className="md:hidden">Filter By</span>
        <div className=" hidden md:flex items-center my-7 gap-3">
          {navigator.map((item) => (
            <button
              onClick={() => setFilterBy(item.title)}
              key={item.id}
              className={`text-sm ${
                filterBy === item.title
                  ? "bg-white text-black shadow-md"
                  : "text-gray-600"
              } hover:bg-white py-2 px-4 rounded-lg hover:text-black transition-all`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div ref={menuRef} className="cursor-pointer relative">
          <button onClick={() => setFilterMenu(!isFilterMenuOpen)}>
            <IoMdMore fontSize={"20"} />
          </button>
          {isFilterMenuOpen && (
            <div className="absolute  bg-gray-900 right-0 mt-2 z-40 rounded-md">
              {navigator.map((item) => (
                <button
                  onClick={() => {
                    setFilterBy(item.title);
                    setFilterMenu(false);
                  }}
                  key={item.id}
                  className={` whitespace-nowrap text-xs hover:bg-white py-2 w-full px-8 rounded-lg hover:text-black transition-all`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

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
    </section>
  );
};

export default OtherReport;
