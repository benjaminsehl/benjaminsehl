import React from "react";
import renderHydrogen from "@shopify/hydrogen/entry-server";
import {
  FileRoutes,
  LocalizationProvider,
  Route,
  Router,
  ShopifyAnalytics,
  ShopifyProvider,
} from "@shopify/hydrogen";
import { Suspense } from "react";

function App({ request }) {
  const countryCode = request.headers.get("oxygen-buyer-country") || "CA";
  return (
    <Suspense fallback={null}>
      <ShopifyProvider>
        <LocalizationProvider countryCode={countryCode}>
          <Router>
            <FileRoutes />
            <Route path="*" page={<NotFound />} />
          </Router>
          <ShopifyAnalytics />
        </LocalizationProvider>
      </ShopifyProvider>
    </Suspense>
  );
}

function NotFound() {
  return <>404, sry</>;
}

export default renderHydrogen(App);
