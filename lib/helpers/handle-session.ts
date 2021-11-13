import { handleCookies } from ".";

export const _signOut = (dispatch: any) => {
  dispatch({ type: "token", payload: null });
  handleCookies.set("user", "", -1, "/");
};

export const _signIn = () => {};

export const handleSession = {
  signOut: _signOut,
  signIn: _signIn,
};
