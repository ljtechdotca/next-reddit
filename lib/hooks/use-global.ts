import { GlobalContext } from "@lib/context";
import { useContext } from "react";

export const useGlobal = () => useContext<any>(GlobalContext);
