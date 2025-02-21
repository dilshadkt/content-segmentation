import React, { useState } from "react";
import BranchTargetsTable from "../../components/branch/table";
import { ToastContainer } from "react-toastify";
import SetTarget from "../../components/target/setTarget";
import TargetSettingsModal from "../../components/target/modal";
import { useQuery } from "react-query";
import { GetAllBranches, GetBranchTargetSettings } from "../../api/branches";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const TargetSettings = () => {
  const [isSettingsMenuOpen, setSettingsMenuOpen] = useState(false);

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [currentBranch, setCurrentBranch] = useState(null);
  const { data, isLoading } = useQuery(
    "targetSettings",
    GetBranchTargetSettings,
    {
      select: (data) => {
        return data?.data?.map((branch) => {
          const formattedWeekTargets = {};
          // initialize all  days with null value
          weekDays.map((day) => {
            formattedWeekTargets[day] = { minTarget: null, target: null };
          });
          // Fill the days that exist in the API response
          if (branch?.weekTargets.length === 0) {
            return { ...branch, weekTargets: formattedWeekTargets };
          } else {
            branch?.weekTargets?.forEach((target) => {
              formattedWeekTargets[target?.dayName] = {
                minTarget: target.minTargetAmount,
                target: target.targetAmount,
              };
            });

            return {
              ...branch,
              weekTargets: formattedWeekTargets,
            };
          }
        });
      },
      onSuccess: (data) => setWeekTargets(data),
    }
  );
  const [weekTarget, setWeekTargets] = useState(data);
  const handleSelectedBranch = (branch) => {
    setSettingsMenuOpen(true);
    setSelectedBranch(branch);
  };
  if (isLoading) {
    return <div className="text-white w-full h-full flexCenter"></div>;
  }

  return (
    <section className="w-full h-full font-radio text-gray-50 py-4 px-4 md:px-10 mx-auto flex flex-col ">
      <h4 className="text-xl font-semibold text-gray-300">Target Settings</h4>
      <div className="flex flex-col mt-7">
        <SetTarget
          branches={weekTarget}
          setWeekTargets={setWeekTargets}
          setCurrentBranch={setCurrentBranch}
        />
        <BranchTargetsTable
          weekTarget={weekTarget}
          handleSelectedBranch={handleSelectedBranch}
          setSettingsMenuOpen={setSettingsMenuOpen}
          currentBranch={currentBranch}
        />
      </div>
      <ToastContainer />
      <TargetSettingsModal
        day={weekTarget?.[0]?.weekTargets}
        isSettingsMenuOpen={isSettingsMenuOpen}
        setSettingsMenuOpen={setSettingsMenuOpen}
        selectedBranch={selectedBranch}
        setWeekTargets={setWeekTargets}
      />
    </section>
  );
};

export default TargetSettings;
