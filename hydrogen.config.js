import {
  defineConfig,
  CookieSessionStorage,
  PerformanceMetricsServerAnalyticsConnector,
  ShopifyServerAnalyticsConnector,
} from "@shopify/hydrogen/config";

export default defineConfig({
  shopify: () => ({
    defaultLocale: "en",
    storeDomain: Oxygen.env.SHOPIFY_STORE_DOMAIN || "bsehl.myshopify.com",
    storefrontToken:
      Oxygen.env.SHOPIFY_STOREFRONT_API_PUBLIC_TOKEN ||
      "4e205acb7f8cd1d14910977cea4b7aef",
    storefrontApiVersion: "2022-07",
  }),
  session: CookieSessionStorage("__session", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
  }),
  serverAnalyticsConnectors: [
    PerformanceMetricsServerAnalyticsConnector,
    ShopifyServerAnalyticsConnector,
  ],
});
