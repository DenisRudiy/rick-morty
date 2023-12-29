import "@/styles/globals.scss";
import "@/styles/Header.scss";
import "@/styles/Footer.scss";
import "@/styles/Main.scss";
import "@/styles/Characters.scss";
import "@/styles/CurrCharacter.scss";
import "@/styles/Locations.scss";
import "@/styles/CurrLocation.scss";
import type { AppProps } from "next/app";
import Layout from "../../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
