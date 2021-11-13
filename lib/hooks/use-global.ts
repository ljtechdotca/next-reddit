import { IInitialState } from "@components";
import { GlobalContext } from "@lib/context";
import { IAction } from "@lib/helpers";
import { useContext } from "react";

// todo : type the useGlobal hook
// typescript this sometime
// [initialValue: IInitialState, action: IAction]
export const useGlobal = () =>
  useContext<any>(GlobalContext);
