const BodyScripts: React.FC = () => (
  <>
    {/* <!-- Cloudflare Web Analytics --> */}
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon='{"token": "f5074a3337a649ae966caae56dfdb721"}'
    ></script>
    {/* <!-- End Cloudflare Web Analytics --> */}
  </>
);

/*
  const googleAnalyticsId = `G-DBM38ZZ9RE`;
  const googleAnalyticsScriptContent = `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${googleAnalyticsId}');`;
  <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
  <script dangerouslySetInnerHTML={{ __html: googleAnalyticsScriptContent }} />
  */

export default BodyScripts;
