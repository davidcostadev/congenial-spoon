import type { AppProps } from "next/app";
import Head from "next/head";
import "styles/globals.css";

import { UserProvider } from "contexts/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Next.js + Prisma + Tailwind CSS</title>
      </Head>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}
