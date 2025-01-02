import React, { useState } from "react";
import BranchTargetsTable from "../../components/branch/table";
import { ToastContainer } from "react-toastify";
import SetTarget from "../../components/target/setTarget";
import TargetSettingsModal from "../../components/target/modal";
const TargetSettings = () => {
  const [isSettingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const branches = [
    {
      name: "ABU DHABI",
      weekTargets: {
        Sunday: { minTarget: "1000", target: "2000" },
        Monday: { minTarget: "1100", target: "2100" },
        Tuesday: { minTarget: "1200", target: "2200" },
        Wednesday: { minTarget: "1300", target: "2300" },
        Thursday: { minTarget: "1400", target: "2400" },
        Friday: { minTarget: "1500", target: "2500" },
        Saturday: { minTarget: null, target: null },
      },
    },
    {
      name: "SHARJAH",
      weekTargets: {
        Sunday: { minTarget: "1000", target: "2000" },
        Monday: { minTarget: "1100", target: "2100" },
        Tuesday: { minTarget: "1200", target: "2200" },
        Wednesday: { minTarget: null, target: null },
        Thursday: { minTarget: "1400", target: "2400" },
        Friday: { minTarget: "1500", target: "2500" },
        Saturday: { minTarget: null, target: null },
      },
    },
    {
      name: "MALAPPURAM",
      weekTargets: {
        Sunday: { minTarget: "1000", target: "2000" },
        Monday: { minTarget: "1100", target: "2100" },
        Tuesday: { minTarget: "1200", target: "2200" },
        Wednesday: { minTarget: null, target: null },
        Thursday: { minTarget: "1400", target: "2400" },
        Friday: { minTarget: "1500", target: "2500" },
        Saturday: { minTarget: null, target: null },
      },
    },
  ];
  const [weekTarget, setWeekTargets] = useState(branches);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [currentBranch, setCurrentBranch] = useState(null);

  const handleSelectedBranch = (branch) => {
    setSettingsMenuOpen(true);
    setSelectedBranch(branch);
  };

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
        day={weekTarget[0].weekTargets}
        isSettingsMenuOpen={isSettingsMenuOpen}
        setSettingsMenuOpen={setSettingsMenuOpen}
        selectedBranch={selectedBranch}
        setWeekTargets={setWeekTargets}
      />
    </section>
  );
};

export default TargetSettings;
