/** @format */

import "../styles/globals.scss";
//import "../styles/var.scss";
import type { AppProps } from "next/app";
import NavHead from "@/components/NavHeader";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <NavHead />
      <Component {...pageProps} />
    </div>
  );
}
