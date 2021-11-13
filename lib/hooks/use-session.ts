import { handleCookies } from "@lib/helpers";
import { useEffect } from "react";

export const useSession = (dispatch: any) => {
  useEffect(() => {
    const userValue = handleCookies.get("user");
    if (!userValue) {
      return;
    } else {
      console.log("USER IS SIGNED IN");
      dispatch({type: "user", payload: userValue})
      // fetchWrapper.get(`/api/users/auth/${userValue}`);
    }
  }, [dispatch]);
};
