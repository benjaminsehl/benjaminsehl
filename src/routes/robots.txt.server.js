/**
 * This API endpoint generates a robots.txt file. Use this to control
 * access to your resources from SEO crawlers.
 * Learn more: https://developers.google.com/search/docs/advanced/robots/create-robots-txt
 */

 export async function api(request) {
    const url = new URL(request.url);
  
    return new Response(robotsTxtData({url: url.origin}), {
      headers: {
        'content-type': 'text/plain',
        // Cache for 24 hours
        'cache-control': `max-age=${60 * 60 * 24}`,
      },
    });
  }
  
  function robotsTxtData({url}) {
    const sitemapUrl = url ? `${url}/sitemap.xml` : undefined;
  
    return `
      User-agent: *
      ${sitemapUrl ? `Sitemap: ${sitemapUrl}` : ''}
  
      # Google adsbot ignores robots.txt unless specifically named!
      User-agent: adsbot-google
  
      User-agent: Pinterest
      Crawl-delay: 1
  
      User-agent: Twitterbot
      Disallow:
    `.trim();
  }