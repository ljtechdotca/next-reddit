import { useGlobal, useSession } from "@lib/hooks";
import React from "react";

export interface UserSessionProps {}

export const UserSession = ({
  children,
}: React.PropsWithChildren<UserSessionProps>) => {
  const [{ user }, dispatch] = useGlobal();
  useSession(dispatch);

  return (
    <>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {children}
    </>
  );
};
