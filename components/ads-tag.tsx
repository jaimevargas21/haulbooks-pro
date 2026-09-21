import Script from "next/script";

export function AdsTag() {
  const id = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
  if (!id || !/^(AW|G)-[A-Za-z0-9]+$/.test(id)) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="haulbooks-gtag" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
