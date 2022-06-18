import renderHydrogen from "@shopify/hydrogen/entry-server";
import {
  FileRoutes,
  Route,
  Router,
  ShopifyAnalytics,
  ShopifyProvider,
  PerformanceMetrics,
} from "@shopify/hydrogen";
import { Suspense } from "react";
import NotFound from "./components/404.client";

function App() {
  return (
    <Suspense fallback={null}>
      <ShopifyProvider>
        <Router>
          <FileRoutes />
          <Route path="*" page={<NotFound />} />
        </Router>
        <PerformanceMetrics />
        <ShopifyAnalytics />
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);
