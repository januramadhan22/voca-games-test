import Providers from "@/lib/redux/Provider";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Providers>
        <div className={plusJakartaSans.className}>
          <Component {...pageProps} />
        </div>
      </Providers>
    </SessionProvider>
  );
}
