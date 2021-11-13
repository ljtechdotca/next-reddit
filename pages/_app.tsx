import {
  GlobalContextProvider,
  Header,
  initialState,
  UserSession,
} from "@components";
import { contextReducer } from "@lib/helpers";
import { useTheme } from "@lib/hooks";
import "@styles/globals.scss";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  useTheme();

  return (
    <GlobalContextProvider reducer={contextReducer} initialState={initialState}>
      <UserSession>
        <Header />
        <Component {...pageProps} />
      </UserSession>
    </GlobalContextProvider>
  );
}

export default MyApp;
