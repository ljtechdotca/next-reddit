import { StateContext } from "@lib/context";
import { useContext } from "react";

export const useGlobal = () => useContext<any>(StateContext);
