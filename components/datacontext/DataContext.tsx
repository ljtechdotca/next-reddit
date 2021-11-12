import { StateContext } from "@lib/context";
import { IPost, ISub } from "@lib/interfaces";
import { useReducer } from "react";

export interface IInitialState {
  theme: string | null;
  subs: ISub[];
  posts: IPost[];
}

export const initialState = {
  theme: null,
  subs: [],
  posts: [],
};

interface IContext {
  reducer: any;
  initialState: IInitialState;
  children: any;
}

export const DataContext = ({
  reducer,
  initialState,
  children,
}: React.PropsWithChildren<IContext>) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
