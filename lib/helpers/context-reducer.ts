import { IAction, IToken, IUser } from "@lib/interfaces";

export const contextReducer = (state: any, action: IAction) => {
  const { type, payload } = action;
  let newState = null;
  switch (type) {
    case "theme":
      {
        const theme: string | null = payload;
        newState = {
          ...state,
          theme,
        };
      }
      break;
    case "token":
      {
        const token: IToken | null = payload;
        newState = {
          ...state,
          token,
        };
      }
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};
