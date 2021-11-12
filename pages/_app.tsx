import { DataContext, Header, initialState } from "@components";
import { contextReducer } from "@lib/helpers";
import { useGlobal, useTheme } from "@lib/hooks";
import "@styles/globals.scss";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {

  useTheme(contextReducer);

  return (
    <DataContext reducer={contextReducer} initialState={initialState}>
      <Header />
      <Component {...pageProps} />
    </DataContext>
  );
}

export default MyApp;
