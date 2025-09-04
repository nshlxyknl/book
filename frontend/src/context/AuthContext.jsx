
import { createContext, useContext } from "react";

const Nis = createContext();

export const useAuth = () => useContext(Nis);

export default Nis