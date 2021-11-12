import { createContext, FC, useContext, useReducer } from "react";

interface IContext {
  theme: string | null;
}

const StateContext = createContext<any>(null);

export const reducer = (state: any, action: { type: string; payload: any }) => {
  const { type, payload } = action;
  console.log({ action });
  let newState = null;
  switch (type) {
    case "theme": {
      const theme = payload;
      newState = {
        ...state,
        theme,
      };
    }
    default:
      newState = state;
  }
  console.log({ newState });
  return newState;
};

export const initialState = {
  theme: "",
};

interface IStateProvider {
  reducer: any;
  initialState: any;
  children: any;
}

export const Context: FC<IStateProvider> = ({
  reducer,
  initialState,
  children,
}) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useGlobalStateValue = () => useContext(StateContext);
