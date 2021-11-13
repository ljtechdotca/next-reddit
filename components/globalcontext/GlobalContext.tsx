import { GlobalContext } from "@lib/context";
import { IUser } from "@lib/interfaces";
import { useReducer } from "react";

export interface IInitialState {
  theme: string | null;
  user: IUser | null;
}

export const initialState = {
  theme: null,
  user: null,
};

interface IGlobalContext {
  reducer: any;
  initialState: IInitialState;
  children: any;
}

export const GlobalContextProvider = ({
  reducer,
  initialState,
  children,
}: React.PropsWithChildren<IGlobalContext>) => (
  <GlobalContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </GlobalContext.Provider>
);
