//アプリケーション全体のラッパー。全ページで共通の設定を適用する際に使用。
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
