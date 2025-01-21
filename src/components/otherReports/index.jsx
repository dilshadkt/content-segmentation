import FilterHeader from "./filterHeader";
import SalesTransactionTable from "./salesTransactionTable";
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

const OtherReports = () => {
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

  return (
    <section className="w-full h-full overflow-y-auto font-radio flex flex-col p-1 md:p-6 ">
      <FilterHeader stats={stats} />
      <SalesTransactionTable invoiceData={invoiceData} />
    </section>
  );
};

export default OtherReports;
