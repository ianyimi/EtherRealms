import { AppProps } from "next/app";
import Head from "next/head";
import "../Realm/properties/RealmScene/utils/index.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>spacesvr project</title>
      </Head>
      <Component id="component" {...pageProps} />
    </>
  );
};
