import { THEME } from '@/constants'
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

function getBasePath() {
  if (THEME) {
    return "/" + THEME + "/"
  }
  return "/";
}

export default function Document() {
  const basePath = getBasePath();
  return (
    <Html lang="en">
      <Head>
        {/* Favicons */}
        <link rel="icon" href={basePath + "favicon.ico"} />
        <link rel="apple-touch-icon" sizes="180x180" href={basePath + "/apple-touch-icon.png"} />
        <link rel="icon" type="image/png" sizes="32x32" href={basePath + "/favicon-32x32.png"} />
        <link rel="icon" type="image/png" sizes="16x16" href={basePath + "/favicon-16x16.png"} />
        <link rel="manifest" href={basePath + "/site.webmanifest"} />
        <link rel="mask-icon" href={basePath + "/safari-pinned-tab.svg"} color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        {/* Google Fonts */}
        <link 
          href="https://fonts.googleapis.com/css2?family=K2D:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;600;700&family=Anek+Latin:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Noto+Sans:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_FIREBASE_MEASURE_ID}`}
        />
        <Script
          id="ga4"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', '${process.env.NEXT_PUBLIC_FIREBASE_MEASURE_ID}');
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
