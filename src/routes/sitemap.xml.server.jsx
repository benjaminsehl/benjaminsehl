export async function api(request, {}) {
  const baseUrl = new URL(request.url).origin;

  const urlsDatas = [
    {
      url: `${baseUrl}`,
      lastMod: "2022-06-22",
      changeFreq: "monthly",
    },
  ];

  return new Response(shopSitemap(urlsDatas), {
    headers: {
      "content-type": "application/xml",
      // Cache for 24 hours
      "cache-control": `max-age=${60 * 60 * 24}`,
    },
  });
}

function shopSitemap(urlsDatas) {
  return `
      <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      >
        ${urlsDatas.map((url) => renderUrlTag(url)).join("")}
      </urlset>`;
}

function renderUrlTag({ url, lastMod, changeFreq, image }) {
  return `
      <url>
        <loc>${url}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>${changeFreq}</changefreq>
        ${
          image
            ? `
          <image:image>
            <image:loc>${image.url}</image:loc>
            <image:title>${image.title ?? ""}</image:title>
            <image:caption>${image.caption ?? ""}</image:caption>
          </image:image>`
            : ""
        }
      </url>
    `;
}
