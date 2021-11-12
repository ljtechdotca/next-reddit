import { IPost, ISub } from "@lib/interfaces";

export interface IAction {
  type: string;
  payload: any;
}

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
        console.log({ newState });
      }
      break;
    case "subs":
      {
        const subs: ISub[] = payload;
        newState = {
          ...state,
          subs,
        };
      }
      break;
    case "posts":
      {
        const posts: IPost[] = payload;
        newState = {
          ...state,
          posts,
        };
      }
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};
