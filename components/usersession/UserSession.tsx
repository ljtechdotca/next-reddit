import { fetchWrapper } from "@lib/helpers";
import { useGlobal, useSession } from "@lib/hooks";
import React from "react";

export interface UserSessionProps {}

export const UserSession = ({
  children,
}: React.PropsWithChildren<UserSessionProps>) => {
  const [{ token }, dispatch] = useGlobal();
  useSession(dispatch);

  return (
    <>
      <div>
        <b>TESTING CONSOLE</b>
        <button
          style={{ color: "white", padding: "1rem", border: "1px solid red" }}
          onClick={() => fetchWrapper.get(`/api/users/auth/${token}`)}
        >
          check token 🎈🎈🎈
        </button>
        <pre>{JSON.stringify({ token }, null, 2)}</pre>
        <b>END</b>
      </div>
      {children}
    </>
  );
};
