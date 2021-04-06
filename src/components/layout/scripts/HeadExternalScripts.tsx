const googleAdsenseId = `ca-pub-2680194687384513`;

const HeadScripts: React.FC = () => (
  <>
    <script
      data-ad-client={googleAdsenseId}
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    />
  </>
);

/*
  const googleAnalyticsId = `G-DBM38ZZ9RE`;
  const googleAnalyticsScriptContent = `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${googleAnalyticsId}');`;
  <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
  <script dangerouslySetInnerHTML={{ __html: googleAnalyticsScriptContent }} />
  */

export default HeadScripts;
