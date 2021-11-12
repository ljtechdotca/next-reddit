import { Context, initialState, reducer } from "@components";
import "@styles/globals.scss";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Context reducer={reducer} initialState={initialState}>
      <Component {...pageProps} />
    </Context>
  );
}

export default MyApp;
