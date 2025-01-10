//アプリケーション全体のラッパー。全ページで共通の設定を適用する際に使用。
// src/pages/_app.tsx
import { UserProvider } from "../context/UserContext";
import "../styles/globals.css";

import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
