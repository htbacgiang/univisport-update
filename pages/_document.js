// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="kNL7mAgNeJ_YF0n5xp1aWaEILSmJvt4hFsNJPOpMujY" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Các meta tag toàn cục chung */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

