import renderHydrogen from "@shopify/hydrogen/entry-server";
import {
  FileRoutes,
  LocalizationProvider,
  Route,
  Router,
  ShopifyAnalytics,
  ShopifyProvider,
  PerformanceMetrics,
} from "@shopify/hydrogen";
import { Suspense } from "react";
import NotFound from "./routes/404.server";

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
          <PerformanceMetrics />
          <ShopifyAnalytics />
        </LocalizationProvider>
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);
