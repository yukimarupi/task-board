//アプリケーション全体のラッパー。全ページで共通の設定を適用する際に使用。
// src/pages/_app.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '../context/UserContext';
import '../styles/globals.css';

import { AppProps } from 'next/app';
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>{' '}
    </QueryClientProvider>
  );
}

export default MyApp;
