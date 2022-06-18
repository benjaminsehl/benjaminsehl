import React from "react";
import renderHydrogen from "@shopify/hydrogen/entry-server";
import {
  FileRoutes,
  Route,
  Router,
  ShopifyAnalytics,
  ShopifyProvider,
} from "@shopify/hydrogen";
import NotFound from "./routes/404.server";

function App() {
  return (
    <ShopifyProvider>
      <Router>
        <FileRoutes />
        <Route path="*" page={<NotFound />} />
      </Router>
      <ShopifyAnalytics />
    </ShopifyProvider>
  );
}

export default renderHydrogen(App);
