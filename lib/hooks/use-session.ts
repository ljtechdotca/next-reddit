import { fetchWrapper, handleCookies } from "@lib/helpers";
import { useEffect } from "react";

export const useSession = (dispatch: any) => {
  useEffect(() => {
    const token = handleCookies.get("user");
    if (!token) {
      return;
    } else {
      fetchWrapper
        .get(`/api/users/auth/${token}`)
        .then((data) => dispatch({ type: "token", payload: data }));
    }
  }, [dispatch]);
};
