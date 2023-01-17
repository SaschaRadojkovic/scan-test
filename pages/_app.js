// import '@/styles/globals.css'

import dynamic from "next/dynamic";
const NoSSR = dynamic(() => import("react-no-ssr", { ssr: false }));

export default function App({ Component, pageProps }) {
  return (
    <NoSSR>
      <Component {...pageProps} />
    </NoSSR>
  );
}
