import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [openSheet2, setOpenSheet2] = useState(false);

  return (
    <SidebarContext.Provider value={{ openSheet2, setOpenSheet2 }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
