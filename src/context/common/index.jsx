import { createContext, useContext, useState } from "react";

export const CommonContext = createContext();

export const CommonProvider = ({ children }) => {
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const [isFullScreenModalOpen, setFullScreenModalOpen] = useState(false); // this will help to know whether they need zoomed version of the graph
  const [Graph, setGraph] = useState(null);

  const setFullScreenGraph = (selectedGraph) => {
    setFullScreenModalOpen(true);
    setGraph(selectedGraph);
  };
  const value = {
    isSideBarOpen,
    setSideBarOpen,
    isFullScreenModalOpen,
    setFullScreenModalOpen,
    Graph,
    setGraph,
    setFullScreenGraph,
  };
  return (
    <CommonContext.Provider value={value}>{children}</CommonContext.Provider>
  );
};
