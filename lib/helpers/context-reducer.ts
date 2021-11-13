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
      }
      break;
    case "user":
      {
        const user: any = payload;
        console.log({ user });
        newState = {
          ...state,
          user,
        };
        console.log({ newState });
      }
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};
