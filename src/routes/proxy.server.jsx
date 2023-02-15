export async function api(request, { params }) {
  // This approach is only supported by Oxygen
  // const { handle } = params;
  const response = await fetch("https://checkout.sehl.ca/", {
    headers: {
      // It's important to set or forward a User-Agent, otherwise the Online Store might block the request
      "User-Agent": "Hydrogen",
    },
  });
  const data = await response.text();
  return new Response(
    data.replace('"monorailRegion":"shop_domain"', '"monorailRegion":"global"'),
    { headers: { "content-type": "text/html" } }
  );
}
