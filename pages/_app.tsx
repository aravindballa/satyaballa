import { AppProps } from "next/app";
import GoogleFonts from "next-google-fonts";

import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import "../styles.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,600;1,400&display=swap" />
      <Component {...pageProps} />
    </>
  );
}
