import React from "react";

const BranchTargetsTable = ({
  weekTarget,
  handleSelectedBranch,
  currentBranch,
}) => {
  return (
    <div className="w-full overflow-x-auto mt-10">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th
              rowSpan={2}
              className="p-3 border whitespace-nowrap text-center border-gray-600/50 font-medium"
            >
              Branch name
            </th>
            {Object.keys(weekTarget[0].weekTargets).map((dayName) => (
              <th
                key={dayName}
                className="p-3 border font-normal text-sm text-gray-400 border-gray-600/50 text-center"
                colSpan={2}
              >
                {dayName}
              </th>
            ))}
          </tr>
          <tr>
            {Object.keys(weekTarget[0].weekTargets).map((dayName) => (
              <React.Fragment key={`${dayName}-targets`}>
                <th className="text-yellow-700 whitespace-nowrap p-2 border border-gray-600/50 text-sm font-medium">
                  Min target
                </th>
                <th className="p-2 text-green-700 border border-gray-600/50 text-sm font-medium">
                  Target
                </th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {weekTarget.map((branch) => {
            let firstNullFound = false;

            return (
              <tr
                key={branch.name}
                className={`${
                  branch.name === currentBranch
                    ? `bg-blue-800`
                    : `bg-gray-800 hover:bg-gray-700`
                }`}
              >
                <td className="p-3 border border-gray-600 flex items-center gap-2">
                  <button onClick={() => handleSelectedBranch(branch)}>
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  {branch.name}
                </td>

                {Object.entries(branch.weekTargets).map(
                  ([dayName, targets]) => {
                    const isFirstNull =
                      !firstNullFound &&
                      (targets.minTarget === null || targets.target === null);

                    if (isFirstNull) {
                      firstNullFound = true;
                    }

                    return (
                      <React.Fragment key={`${branch.name}-${dayName}`}>
                        <td
                          className={`p-3 border border-gray-600 text-center ${
                            isFirstNull && branch.name === currentBranch
                              ? "bg-black  border-2 border-dashed border-white text-white"
                              : "text-blue-400"
                          }`}
                        >
                          {targets.minTarget === null
                            ? "---"
                            : targets.minTarget}
                        </td>
                        <td
                          className={`p-3 border border-gray-600 text-center ${
                            isFirstNull && branch.name === currentBranch
                              ? "bg-black border-2 border-dashed border-white text-white"
                              : ""
                          }`}
                        >
                          {targets.target === null ? "---" : targets.target}
                        </td>
                      </React.Fragment>
                    );
                  }
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BranchTargetsTable;
