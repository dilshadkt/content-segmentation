import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import DateSelector from "../../../../shared/datePicker";
import { UseCommon } from "../../../../../hooks/UseCommon";
const TargetHeader = ({ setDate, date }) => {
  const { isFullScreenModalOpen, setFullScreenModalOpen, setFullScreenGraph } =
    UseCommon();
  return (
    <div className="absolute top-4  flexBetween  left-0 pl-4 pr-5 right-0 w-full ">
      <span className="text-[#9F9C9C] text-sm font-semibold">
        Target Vs Reality{" "}
      </span>
      <div className="flexEnd gap-x-3">
        <DateSelector
          setDate={setDate}
          initialDate={date}
          dateOption={["This Year", "Previous Year", "Custom"]}
        />
        {!isFullScreenModalOpen ? (
          <button
            onClick={() =>
              setFullScreenGraph(
                <TargetVsReality
                  className={` w-[96%] md:w-[60%] h-fit md:h-[65%] px-7`}
                  graphClassName={` h-[230px] md:h-[400px]`}
                  initialDate={date}
                />
              )
            }
          >
            <img src="/icons/fullView.svg" alt="" className="w-3" />
          </button>
        ) : (
          <button onClick={() => setFullScreenModalOpen(false)}>
            <CloseIcon className="text-white/45" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TargetHeader;
