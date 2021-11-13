import { useGlobal, useSession } from "@lib/hooks";
import React from "react";

export interface UserSessionProps {}

export const UserSession = ({
  children,
}: React.PropsWithChildren<UserSessionProps>) => {
  const [{ token }, dispatch] = useGlobal();
  useSession(dispatch);

  return <>{children}</>;
};
