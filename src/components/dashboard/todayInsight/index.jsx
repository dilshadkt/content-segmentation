import React, { useState } from "react";
import { useQuery } from "react-query";
import { insight } from "../../../api/dashbaord";
import { getFormattedDate } from "../../../lib/GetFormatedDate";
import CustomeDateModal from "../../shared/datePicker/customePicker";
import NoDataLoading from "../../shared/loading";
import Header from "./header";
import StatCards from "./statCards";
import { useParams } from "react-router-dom";

const TodayInsight = ({ className }) => {
  const today = new Date();
  const { branchName } = useParams();
  const formattedDate = today.toISOString().split("T")[0];
  const [date, setDate] = useState({
    from: formattedDate,
    to: formattedDate,
  });
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customeDate, setCustomeDate] = useState({
    from: getFormattedDate(0),
    to: getFormattedDate(0),
  });
  const {
    data: insightData,
    isLoading,
    isError,
  } = useQuery(["insight", date, branchName], () => insight(date), {
    select: (data) => data?.data?.insight?.[0],
    onSuccess: () => setShowCustomModal(false),
  });

  const handleCustomDateSubmit = (e) => {
    e.preventDefault();
    setDate(customeDate);
  };
  if (isLoading || isError) {
    return (
      <NoDataLoading
        isError={isError}
        className="min-h-[280px] lg:col-span-3"
      />
    );
  }

  const renderContent = () => {
    if (
      insightData?.Expense === null &&
      insightData?.Income === null &&
      insightData?.GP === null
    ) {
      return (
        <NoDataLoading
          noData={true}
          className="h-full  min-h-[100px]   lg:col-span-3"
        />
      );
    } else {
      return <StatCards insightData={insightData} />;
    }
  };
  return (
    <div
      className={`lg:col-span-3 bg-[#0D0D0D] gap-y-6 flex flex-col
     p-5 rounded-xl ${className}`}
    >
      <Header setShowCustomModal={setShowCustomModal} date={date} />
      {renderContent()}
      {showCustomModal && (
        <CustomeDateModal
          dateRangeForCustome={customeDate}
          handleCustomDateSubmit={handleCustomDateSubmit}
          setDateRangeForCustome={setCustomeDate}
          setShowCustomModal={setShowCustomModal}
        />
      )}
    </div>
  );
};

export default TodayInsight;
