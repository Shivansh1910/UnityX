import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import {
  Hydrate,
  hydrate,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import useDeviceSize from "src/utils/useDeviceSize";
import useUIStore from "src/stores/ui.store";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Compose, { IComposeProps } from "src/components/compose";
import NavBar from "src/components/layout/navbar/navbar";
import { SocketProvider } from "src/server/socket";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchInterval: 10 * 60 * 1000, // 10 minutes
            staleTime: 30 * 60 * 1000, // 30 minutes
          },
        },
      })
  );

  const { width } = useDeviceSize();
  const navBarVisible = useUIStore((state) => state.navBarVisible);

  // * Set ENVs
  useEffect(() => {
    const tempClient = new QueryClient();
    hydrate(tempClient, pageProps.dehydratedState);
  }, [pageProps.dehydratedState]);

  const providers: IComposeProps["providers"] = [
    [
      MantineProvider,
      {
        withGlobalStyles: true,
        withNormalizeCSS: true,
        theme: {
          colorScheme: "dark",
          fontFamily: '"DM Sans", sans-serif',
          focusRing: "never",
        },
      },
    ],
    [
      NotificationsProvider,
      {
        limit: 10,
        position: "top-right",
        sx: {
          top: width <= 768 ? 20 : 40,
          right: width <= 768 ? 10 : 40,
          width: width <= 768 ? width - 20 : 343,
        },
      },
    ],
    [QueryClientProvider, { client: queryClient }],
    [Hydrate, { state: pageProps.dehydratedState }],
  ];

  return (
    <Compose providers={providers}>
      <SocketProvider>
        {/* {navBarVisible && <NavBar />} */}
        <Component {...pageProps} />
      </SocketProvider>
    </Compose>
  );
}
