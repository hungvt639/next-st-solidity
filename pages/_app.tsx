import "../styles/globals.css";
import "../styles/globals.scss";
import "antd/dist/antd.css";
import "../locales/i18n";
// import "../styles/antd-custom.less";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
