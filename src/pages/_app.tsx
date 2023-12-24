import "@/styles/globals.scss";
import "@/styles/Header.scss";
import "@/styles/Main.scss";
import type { AppProps } from "next/app";
import Layout from "../../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
